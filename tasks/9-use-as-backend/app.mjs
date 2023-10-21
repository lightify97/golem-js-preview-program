import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import multer from "multer";
import { GolemNetwork, JobState } from "@golem-sdk/golem-js";
import fs from "fs";

const app = express();
const port = 3000;

// set multer filename and destination to uploads/ directory
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const uploader = multer({ storage: storage });

app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

const golem = new GolemNetwork({
    image: "e8a84adfcc19d1df939a626004b64b50fa0729664e40856933d708ed",
    yagnaOptions: { apiKey: `${process.env.YAGNA_APPKEY}` },
    taskTimeout: 60 * 60 * 1000,
});
golem
    .init()
    .then(() => {
        console.log("Connected to the Golem Network!");
    })
    .catch((err) => {
        console.error("Error connecting to the Golem Network:", err);
        process.exit(1);
    });

// accept a wav file from the client and return the text content
app.post("/stt", uploader.single("audioFile"), async (req, res) => {
    const job = await golem.createJob(async (ctx) => {
        const file = req.file.path;
        await ctx.uploadFile(file, "/golem/work/input.wav");
        let output = (
            await ctx.run(
                `whisper /golem/work/input.wav --model tiny --language en`
            )
        ).stdout;
        return output;
    });

    let state = await job.fetchState();
    // check jobs status every 5 seconds
    while (state !== JobState.Done || state !== JobState.Failed) {
        console.log(`Job state: ${state}`);
        await new Promise((resolve) => setTimeout(resolve, 5000));
        state = await job.fetchState();
        if (state === "done") break;
    }
    const error = await job.fetchError();
    if (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
        return;
    }
    const output = await job.fetchResults();
    console.log(output);
    fs.unlinkSync(req.file.path);
    res.json({ status: "success", text: output });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

process.on("SIGINT", async () => {
    await golem.close();
    process.exit(0);
});
