import { TaskExecutor } from "@golem-sdk/golem-js";

const costFilter = async (proposal) => {
    let decision = false;
    let usageVector = proposal.properties["golem.com.usage.vector"];

    let timeUsageIdx = usageVector.indexOf("golem.usage.duration_sec");
    let cpuUsageIdx = usageVector.indexOf("golem.usage.cpu_sec");

    const totalTaskTime = 60 * 5; // 5 minutes
    const totalCpuTime = 60 * 4; // 4 minutes

    const proposalCost =
        proposal.properties["golem.com.pricing.model.linear.coeffs"];

    const timeCost = proposalCost[timeUsageIdx] * totalTaskTime;
    const cpuCost = proposalCost[cpuUsageIdx] * totalCpuTime;

    // get the fixed cost from the proposal
    let setupCostIndex = Object.keys(proposalCost).filter((key) => {
        let k = parseInt(key);
        if (k != timeUsageIdx && k != cpuUsageIdx) return k;
    })[0];

    const fixedCost = proposalCost[setupCostIndex];

    const totalCost = timeCost + cpuCost + fixedCost;

    if (totalCost <= 0.04) decision = true;

    // console.log(`Proposal ID: ${proposal.id}`);
    // console.log(`Total Cost: ${totalCost}`);

    return decision;
};

(async function main() {
    const executor = await TaskExecutor.create({
        package: "9a3b5d67b0b27746283cb5f287c13eab1beaa12d92a9f536b747c7ae",
        yagnaOptions: { apiKey: `${process.env.YAGNA_APPKEY}` },
        minMemGib: 4,
        proposalFilter: costFilter,
    });

    await executor.run(async (ctx) =>
        console.log((await ctx.run("echo 'Hello World'")).stdout)
    );
    await executor.end();
})();
