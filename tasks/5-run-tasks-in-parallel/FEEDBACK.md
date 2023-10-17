# Golem JS Preview Program Feedback Form

## Introduction

Thank you for taking the time to complete this Golem JS Preview Program task!

We appreciate your valuable feedback and suggestions on how to improve the Golem Network.
Please fill out the form below:

## Task: #5 - Running tasks in parallel

### Estimated completion time

| Task Step                   | Completion Time (in minutes) |
| --------------------------- | ---------------------------- |
| Create the requestor script | 35                           |

List any additional steps that were necessary to resolve the task (other than the steps in the README.md):

> I had to read about `realesrgan-ncnn-vulkan` to get the idea of what it is doing. Moreover when I was trying to run the parallel tasks using `map` function, there was an error (posted it in the discrod channel). Alternatively I had to use `forEach` function on the executor which worked just fine. A lot of debugging was required to get the task done.

### Feedback

#### JS SDK Docs

Could you find the necessary information? If not what topics were difficult to find?

> I was able to find the necessary information quickly. I would just like to comment on the API documentation. When running the tasks in parallel, there were several timeouts due to image processing taking too long. I searched the docs and couldn't find what the default value for the task timeout was. I had to go to the source code to find it. I think it would be nice to have the default values for the parameters in the API documentation. Moreover, pertaining to this task, it would be nice to have a section that outlines the differences between using the `map` and `forEach` functions on the executor. I think this would be useful for the user to understand the differences between the two and when to use which.

---

How would you change the structure/navigation of the docs? Recommend changes.

> The docs are very well structured and ordered nicely so everything is easy to find.

---

Are examples and tutorials useful? What was missing, and what was too detailed or unnecessary?

> Yes the examples and tutorials for this task were useful and adequate. I think the level of detail is just right.

---

Have you noticed any errors? Please describe them or provide links to issues if you have already reported them.

> No I did not notice any errors in the docs.

#### JS golem-js

Is JS SDK API intuitive and helps solve the tasks? If not, what would you change?

> Yes the API is very simple and intuitive. I think it is very easy to use and understand.

---

Have you encountered any errors in the golem-js lib? Provide the link(s) to the issue(s) in `golem-js` [repository](https://github.com/golemfactory/golem-js/issues) which you had reported.

> Yes I did experience an issue when using the `map` function on the executor. I have posted the issue in the discord channel (<https://discord.com/channels/684703559954333727/1105479512264818739/1162691424383418368>).

---

What additional features would you add?

> Since different providers have different resourses therefore there can be an option to set different timeout depending on the provider. For example, if the provider has a lot of resources then the timeout can be set to a lower value. While for low resource providers, the timeout can be set to a higher value.

#### General feedback

What was your general experience with Golem Network? What was difficult/frustrating?
What was a nice surprise?

> Very pleasant and easy to use. I think the documentation is very well written and easy to follow. I think the only frustrating part was the issue I faced when using the `map` function on the executor.

---

In what projects could you utilize Golem Network?

> Already answered in the previous feedback form.

#### Preview Program

Were the tasks and instructions adequate and clear?

> Yes the tasks and instructions were very clear and easy to follow.

---

Is there anything you would improve about the JS Preview program?

> I think the program is very well structured and easy to follow.

---

Thank you for your feedback and for contributing to the Golem Network!
