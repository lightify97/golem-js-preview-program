# Golem JS Preview Program Feedback Form

## Introduction

Thank you for taking the time to complete this Golem JS Preview Program task!

We appreciate your valuable feedback and suggestions on how to improve the Golem Network.
Please fill out the form below:

## Task #8 - Provider Selection

### Estimated completion time

| Task Step                                       | Completion Time (in minutes) |
| ----------------------------------------------- | ---------------------------- |
| Create a requestor script with specified demand | 10                           |
| Add custom ProposalFilter                       | 20                           |

List any additional steps that were necessary to resolve the task (other than the steps in the README.md):

> No additional work was required other then the steps mentioned in the instructions.

### Feedback

#### JS SDK Docs

Could you find the necessary information? If not what topics were difficult to find?

> Yes the required information was available in the docs with good examples that can be used as a starting point.

---

How would you change the structure/navigation of the docs? Recommend changes.

> No, I would not change anything about the structure/ navigation of the docs.

---

Are examples and tutorials useful? What was missing, and what was too detailed or unnecessary?

> For this task I found the examples very explanatory and elaborate. I would suggest adding one or two more examples based on different usage scenarios.

---

Have you noticed any errors? Please describe them or provide links to issues if you have already reported them.

> For this task I have not encountered any noticeable issues/ errors.

#### JS golem-js

Is JS SDK API intuitive and helps solve the tasks? If not, what would you change?

> The JS SDK API is very easy and intuitive to use. Especially the fine grained control over provider resources and the proposal agreement workflow is a very powerful feature with a very simple API.

---

Have you encountered any errors in the golem-js lib? Provide the link(s) to the issue(s) in `golem-js` [repository](https://github.com/golemfactory/golem-js/issues) which you had reported.

> No errors relating to JS SDK were encountered during this task.

---

What additional features would you add?

> Relating to this task I would suggest adding some helper functions to the SDK that calculate the CPU and duration cost separately and combined for proposals. For example we can have helper functions with usage like the following:

```js
const myFilter = (proposal) => {
    /*
        Function: cpuCostHelperFunction
        @param: duration for which the CPU cost is to be computed
        @return: cost of the cpu time depending on the provided duration
        */
    let cpuCost = cpuCostHelperFunction(60);
    /*
        Function: durationCostHelperFunction
        @param: duration for which the duration cost is to be computed
        @return: duration cost for the given time
        */
    let durationCost = durationCostHelperFunction(30);

    // rest of the decision logic
};

// **************************************************
// currently we have to do this

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
```

#### General feedback

What was your general experience with Golem Network? What was difficult/frustrating?
What was a nice surprise?

> Already provided in the previous tasks.

---

In what projects could you utilize Golem Network?

> There are many use cases. I have described this at length in previous tasks.

#### Preview Program

Were the tasks and instructions adequate and clear?

> The instructions for this task were adequate.

---

Is there anything you would improve about the JS Preview program?

> Feedback was already submitted in the previous tasks.

---

Thank you for your feedback and for contributing to the Golem Network!
