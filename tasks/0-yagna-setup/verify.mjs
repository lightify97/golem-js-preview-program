import { TaskExecutor } from "@golem-sdk/golem-js";
import { writeFileSync } from "fs";

(async function main() {
  const executor = await TaskExecutor.create({
    package: "9a3b5d67b0b27746283cb5f287c13eab1beaa12d92a9f536b747c7ae",
    yagnaOptions: { apiKey: "a8840f21a44a4205bf05307b61018a53" },
  });

  await executor.run(async (ctx) => {
    writeFileSync(
      "result.json",
      JSON.stringify(
        {
          ts: Date.now(),
          data: (
            await ctx.run(
              `echo '${JSON.stringify({
                provider: ctx.provider,
                activity: {
                  id: ctx.activity.agreementId,
                  ts: Date.now(),
                  options: ctx.activity.options.yagnaOptions,
                },
              })}'`,
            )
          ).stdout,
        },
        null,
        2,
      ),
    );
  });
  await executor.end();
})();
