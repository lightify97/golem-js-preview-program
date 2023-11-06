import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import multer from "multer";
import { GolemNetwork, Job, JobState } from "@golem-sdk/golem-js";

const app = express();
const port = 3000;

// set multer filename and destination to uploads/ directory
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "_" + file.originalname);
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

app.post("/stt", uploader.array("audioFile", 15), async (req, res) => {
    // Create an array of Promises for job creation
    const jobPromises = req.files.map(async (file) => {
        const job = await golem.createJob(async (ctx) => {
            await ctx.uploadFile(file.path, `/golem/work/${file.filename}`);
            const result = (
                await ctx.run(
                    `whisper \"/golem/work/${file.filename}\" --model tiny --language en`
                )
            ).stdout;
            await ctx.run(`rm \"/golem/work/${file.filename}\"`);
            return result;
        });

        return {
            id: job.id, // Get the job ID from the resolved job
            file: file.originalname,
            queuedTime: Date.now(),
        };
    });

    // Wait for all job creation operations to complete
    const activeJobs = await Promise.all(jobPromises);

    res.json({ jobs: activeJobs });
});

// return the status of a job
app.get("/stt/:id", async (req, res) => {
    const job = golem.getJobById(req.params.id);
    try {
        const state = await job.fetchState();

        if (state === JobState.Done) {
            const result = await job.fetchResults();
            return res.send(result);
        } else if (state === JobState.Rejected) {
            return res.send("Conversion Rejected");
        } else if (state === JobState.New) {
            return res.send("Conversion not started");
        } else if (state === JobState.Pending) {
            return res.send("Conversion Pending");
        } else if (state === JobState.Retry) {
            return res.send("Conversion Retry");
        }
    } catch (err) {
        res.status(404).json({ error: "Job not found" });
    }
});

app.get("/stt/result/:id", async (req, res) => {
    const job = golem.getJobById(req.params.id);
    try {
        const state = await job.fetchState();
        if (state.state === JobState.Finished) {
            const result = await job.fetchResults();
            res.send(result);
        } else {
            res.status(102).send("Job not finished");
        }
    } catch (err) {
        res.status(404).send("Job not found");
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

process.on("SIGINT", async () => {
    await golem.close();
    process.exit(0);
});
