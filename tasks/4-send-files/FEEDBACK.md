# Golem JS Preview Program Feedback Form

## Introduction

Thank you for taking the time to complete this Golem JS Preview Program task!

We appreciate your valuable feedback and suggestions on how to improve the Golem Network.
Please fill out the form below:

## Task: #4 - Send files

### Estimated completion time

| Task Step                   | Completion Time (in minutes) |
| --------------------------- | ---------------------------- |
| Create custom image         | 15                           |
| Create the requestor script | 10                           |

List any additional steps that were necessary to resolve the task (other than the steps in the README.md):

_No additional steps were required for this task. Everything was quite self explanatory._

### Feedback

#### JS SDK Docs

Could you find the necessary information? If not what topics were difficult to find?

> Yes the necessary information was readily avaialable in the docs and very nicely explaind. I did not have any issues finding the information I needed.

---

How would you change the structure/navigation of the docs? Recommend changes.

> For this task I found the documentation very self explanatory. I would also recommend that a section about common issues that might arise be added to the docs. For example I had an issue with the docker network settings while building the image (this is not directly related to golem network but still a valid and commonly arising issue in this scenario). I had to do some digging to find out that I had to use the docker's host network (I'm running Ubuntu on WSL) for the image to download install libraries. I think this is a common issue that might arise. Another issue is how can I retrieve the hash of my image in case I lost it. I haven't found out how to do that yet. I think it would be useful to have a section about common issues and how to resolve them.

---

Are examples and tutorials useful? What was missing, and what was too detailed or unnecessary?

> Yes the examples and tutorials are very useful. I think the level of detail is just right. I think the tutorials could be more interactive. For example I think it would be useful to have a tutorial that guides the user through the process of creating a custom image and running a task on it. I think this would be a good way to introduce the user to the process and the tools.

---

Have you noticed any errors? Please describe them or provide links to issues if you have already reported them.

> I have not noticed any errors.

#### JS golem-js

Is JS SDK API intuitive and helps solve the tasks? If not, what would you change?

> This task was mostly related to building images. However using the data transfer API felt very intuitive. The `uploadFile` and `downloadFile` funcations are a no brainer and very self explanatory.

---

Have you encountered any errors in the golem-js lib? Provide the link(s) to the issue(s) in `golem-js` [repository](https://github.com/golemfactory/golem-js/issues) which you had reported.

> No I have not encountered any errors.

---

What additional features would you add?

> I thint it would be very convenient to have `gvmkit-build` keep a log of builds with hashes and other information. This would make it easier to retrieve the hash of an image and other necessary info in case it is lost.

#### General feedback

What was your general experience with Golem Network? What was difficult/frustrating?
What was a nice surprise?

> Golem Network is a very interesting project in a lot of ways. The distributed computing aspect is very interesting and I think it has a lot of potential. It is very well documented and developer friendly. Hoping to see some interesting use cases in the future.

---

In what projects could you utilize Golem Network?

> The applications are immense. However one question that bothers me is how can providers scale with the demand. Every provider has a certain amount of resources that they can provide. I'm talking about heavy atomic workloads that can't be distributed. If the tasks I'm running require huge amounts of resources how that's gonna work is a question for me.

#### Preview Program

Were the tasks and instructions adequate and clear?

> Yes the tasks and instructions were very clear and easy to follow.

---

Is there anything you would improve about the JS Preview program?

> I don't think so. I think the program is very well structured and easy to follow.

---

Thank you for your feedback and for contributing to the Golem Network!
