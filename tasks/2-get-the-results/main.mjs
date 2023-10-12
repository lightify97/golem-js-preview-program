import { TaskExecutor } from "@golem-sdk/golem-js";

(async function main() {
    const executor = await TaskExecutor.create({
        package: "0e24cd9c3c019143fba94debce69f37353d0157ac4329050870e9ae8",
        yagnaOptions: { apiKey: "a8840f21a44a4205bf05307b61018a53" },
    });
    await executor.run(async (ctx) => {
        await ctx.run(
            'espeak -w /golem/work/result.wav "Hello, from the Golem team. Hope you\'re having a great day!" && ffmpeg -i /golem/work/result.wav -f mp3 /golem/work/result.mp3'
        );

        await ctx.downloadFile("/golem/work/result.mp3", "output/result.mp3");
    });
    await executor.end();
})();
