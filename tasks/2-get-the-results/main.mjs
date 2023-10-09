import { TaskExecutor } from "@golem-sdk/golem-js";

(async function main() {
  const executor = await TaskExecutor.create({
    package: "<image_hash>",
    yagnaOptions: { apiKey: "try_golem" },
  });
  await executor.run(async (ctx) => {
    // TODO execute espeak and ffmpeg commands
  });
  await executor.end();
})();
