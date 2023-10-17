import { TaskExecutor } from "@golem-sdk/golem-js";

(async function main() {
    const executor = await TaskExecutor.create({
        package: "1e65223a888bd7a4521e06ba7f3f3ba648e8a09ffd18f3658efba336",
        yagnaOptions: { apiKey: `${process.env.YAGNA_APPKEY}` },
    });

    const task = async (ctx) => (await ctx.run("/usr/games/fortune -l")).stdout;

    const taskResult = await executor.run(task);

    await executor.end();
    console.log(taskResult);
})();
