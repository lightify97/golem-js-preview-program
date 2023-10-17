import { TaskExecutor } from "@golem-sdk/golem-js";
import { program } from "commander";
import * as fs from "fs";
import path from "path";

program.option("-i, --image <path>", "path to the image to be processed");
program.parse();

const imagePath = program.opts().image;

fs.access(imagePath, fs.constants.R_OK, (err) => {
    if (err) {
        console.error("Image file is not readable");
        process.exit(1);
    }
});
const imgName = path.basename(imagePath);

(async function main() {
    const executor = await TaskExecutor.create({
        package: "02fcbea7c453f2a51c1bdb38fcc6c5b06983d53beba6c0ccc5e5ab95",
        yagnaOptions: { apiKey: `${process.env.YAGNA_APPKEY}` },
    });

    await executor.run(async (ctx) => {
        await ctx.uploadFile(imagePath, `/golem/work/${imgName}`);

        await ctx.run(
            `tesseract /golem/work/${imgName} - -l eng > /golem/work/ocr.txt`
        );

        await ctx.downloadFile(`/golem/work/ocr.txt`, `./output/ocr.txt`);
    });

    await executor.end();
})();
