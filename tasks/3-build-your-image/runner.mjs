import { TaskExecutor } from "@golem-sdk/golem-js";

(async function main() {
    const executor = await TaskExecutor.create({
        package: "167e08b373da209463feb01fa151eb6b53161cb245523f39b2489eac",
        yagnaOptions: { apiKey: "a8840f21a44a4205bf05307b61018a53" },
    });
    await executor.run(async (ctx) => {
        console.log((await ctx.run("node generator.mjs --sample=10")).stdout);
    });
    await executor.end();
})();
