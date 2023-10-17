import { TaskExecutor } from "https://unpkg.com/@golem-sdk/golem-js";

let results = [];
function setImage() {
    // set the uploaded image to the image tag
    const imageInput = document.getElementById("image");
    const uploadedImage = document.getElementById("uploaded-image");
    const imageDisplaySection = document.getElementById(
        "image-display-section"
    );

    uploadedImage.src = URL.createObjectURL(imageInput.files[0]);
    imageDisplaySection.style.display = "block";
}

function readFile(file) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(file);

        fileReader.onload = () => {
            resolve(new Uint8Array(fileReader.result));
        };

        fileReader.onerror = (error) => {
            reject(error);
        };
    });
}

// append new images to processed images section
function appendImage(image) {
    // unhide the processed images section
    const processedImagesSection = document.getElementById(
        "processed-images-section"
    );
    const processedImages = document.getElementById("processed-images");
    processedImagesSection.hidden = false;
    processedImagesSection.classList.add("flex");
    const imageElement = document.createElement("img");
    imageElement.className = "w-full mx-3 rounded-lg";
    imageElement.style.maxWidth = "200px";
    imageElement.style.maxHeight = "200px";
    console.log(image);
    imageElement.src = URL.createObjectURL(
        new Blob([image], { type: "image/jpeg" })
    );
    processedImages.appendChild(imageElement);
}

function appendLog(msg) {
    const logs_el = document.getElementById("logs");
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(msg));
    logs_el.appendChild(li);
}

const logger = {
    log: (msg) => appendLog(`[${new Date().toISOString()}] ${msg}`),
    warn: (msg) => appendLog(`[${new Date().toISOString()}] [warn] ${msg}`),
    debug: (msg) => null,
    error: (msg) => appendLog(`[${new Date().toISOString()}] [error] ${msg}`),
    info: (msg) => appendLog(`[${new Date().toISOString()}] [info] ${msg}`),
    table: (msg) => appendLog(JSON.stringify(msg, null, "\t")),
};

async function run() {
    const imageInput = document.getElementById("image");
    console.log(imageInput.files[0]);
    const fileData = await readFile(imageInput.files[0]);
    const extension = imageInput.files[0].name.split(".").pop();
    const inputImage = `/golem/input/input.${extension}`;

    const executor = await TaskExecutor.create({
        package: "7faa6a327c0a568fb3ad18ed1adf91a7493a445fc0dc640ab3d2eab0",
        yagnaOptions: { apiKey: "a8840f21a44a4205bf05307b61018a53" },
        maxParallelTasks: 5,
        taskTimeout: 5 * 60 * 1000, // set timeout to 1 hour
        logger,
    });

    executor.beforeEach(async (ctx) => {
        await ctx.uploadData(fileData, inputImage);
    });

    let filters = [
        {
            name: "grayscale",
            enabled: document.getElementById("grayscaleFilter").checked,
            command: `magick ${inputImage} -colorspace Gray /golem/output/output-grayscale.${extension}`,
        },
        {
            name: "charcoal",
            enabled: document.getElementById("charcoalFilter").checked,
            command: `magick ${inputImage} -charcoal 1.2 /golem/output/output-charcoal.${extension}`,
        },
        {
            name: "blur",
            enabled: document.getElementById("blurFilter").checked,
            command: `magick ${inputImage}  -blur 0x8  /golem/output/output-blur.${extension}`,
        },
        {
            name: "brightness",
            enabled: document.getElementById("brightnessFilter").checked,
            command: `magick ${inputImage} -brightness-contrast 20x10  /golem/output/output-brightness.${extension}`,
        },
        {
            name: "contrast",
            enabled: document.getElementById("contrastFilter").checked,
            command: `magick ${inputImage} -brightness-contrast 10x20  /golem/output/output-contrast.${extension}`,
        },
    ];

    const activeFilters = filters.filter((f) => f.enabled);

    if (activeFilters.length === 0) {
        alert("Please select at least one filter");
        return;
    }

    // process iamge
    await executor.forEach(activeFilters, async (ctx, filter) => {
        await ctx.run(filter.command);

        results.push(
            // download output
            await ctx.downloadData(
                `/golem/output/output-${filter.name}.${extension}`
            )
        );
    });

    await executor.end();
    console.log(results);
}

(function init() {
    const imageInput = document.getElementById("image");
    imageInput.addEventListener("change", setImage);
    // attach the form submit event listener to run function
    const startButton = document.getElementById("submit");
    startButton.addEventListener("click", async (e) => {
        e.preventDefault();
        await run();
        results.forEach((result) => {
            if (result?.data) appendImage(result.data);
        });
    });
})();
