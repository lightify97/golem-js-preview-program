import { TaskExecutor } from "@golem-sdk/golem-js";

(async function main() {
    const executor = await TaskExecutor.create({
        package: "a7db2f25445de01650a62ffcfb35219ed48f014ece83cfea15c36b0f",
        yagnaOptions: { apiKey: `${process.env.YAGNA_APPKEY}` },
        taskTimeout: 60 * 60 * 1000, // set timeout to 1 hour
        maxParallelTasks: 3,
    });

    executor.beforeEach(async (ctx) => {
        await ctx.uploadFile(
            "./worldcities.csv",
            "/golem/input/worldcities.csv"
        );
    });

    const names = ["Ogden", "Glenwood", "San", "New York", "London"];

    await executor.forEach(names, async (ctx, name) => {
        console.log(
            (
                await ctx.run(
                    `python3 similarities.py -w \"${name}\" -d /golem/input/worldcities.csv`
                )
            ).stdout
        );
    });

    executor.end();
})();
