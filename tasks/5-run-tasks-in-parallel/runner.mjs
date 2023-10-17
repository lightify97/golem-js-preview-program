import { TaskExecutor } from "@golem-sdk/golem-js";
import { program } from "commander";
import * as fs from "fs";
import * as path from "path";

// get the images directory from user as a command line argument
program.option("-i, --images <path>", "path to images directory");
program.parse();

const imagesPath = program.opts().images;

// if the user did not provide the images directory, exit the program
if (!imagesPath) {
    console.error("Please provide the path to the images directory");
    process.exit(1);
}

(async function main() {
    const executor = await TaskExecutor.create({
        package: "28716c377b8484abe9fb11dfb94b97831233f18a42658d677657f88b",
        yagnaOptions: { apiKey: `${process.env.YAGNA_APPKEY}` },
        taskTimeout: 60 * 60 * 1000, // set timeout to 1 hour
    });

    const images = fs.readdirSync(imagesPath);

    // if the path provided by the user is not a directory, exit the program
    if (!images) {
        console.error("Please provide a valid path to the images directory");
        process.exit(1);
    }

    // create an array of objects with the image path, name and file extension
    const imagesData = images
        .map((image) => {
            const [name, ext] = image.split(".");
            if (ext == "jpg" || ext == "png") {
                return {
                    path: `./images/${image}`,
                    name,
                    ext,
                };
            } else {
                return;
            }
        })
        .filter((image) => image && !image.name.startsWith("upscaled-"));

    console.log(imagesData);
    // do not proceed if there are no valid images to process in the ./images directory of jpg or png type
    if (!imagesData.length) {
        console.error("No images to process");
        process.exit(1);
    }

    console.log(`Found ${imagesData.length} images to process`);

    await executor.forEach(imagesData, async (ctx, image) => {
        let fileName = path.basename(image.path);

        await ctx.uploadFile(image.path, `/golem/work/${fileName}`);

        await ctx.run(
            `realesrgan-ncnn-vulkan -i /golem/work/${fileName} -o /golem/work/upscaled-${fileName} -n realesr-animevideov3-x2 -s 2 -f ${image.ext} -x`
        );

        await ctx.downloadFile(
            `/golem/work/upscaled-${fileName}`,
            `${imagesPath}/upscaled-${fileName}`
        );
    });

    executor.end();
})();
