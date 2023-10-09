# Task #8 - Provider Selection

## Why

Golem users can define criteria to select providers that match their particular needs. 

In this challenge, you will learn how to define specific requirements in the demand and how to filter providers' proposals to select the ones that best suit your needs.

## Task description

Create a requestor script that will demand only providers with at least 4GB RAM, and from the ones that fulfill that requirement, engage only those whose price for a 5-minute task (including 4 min of CPU time) will not exceed 0.04 tGLM.

### Steps

Please observe how long it takes to complete the technical part of the tasks. We will ask you for such information in the feedback form.

1. Create a requestor script that will specify that the minimal amount of RAM is 4GB.

2. Add custom ProposalFilter, to select providers within the desired price range.

3. Add changes in the `select-providers` directory.

4. [Fill out the feedback form](./FEEDBACK.md) and publish changes in your repository fork.
## Helpful resources

- Golem JS demand options and custom ProposalFilters are demonstrated in [examples](https://docs.golem.network/docs/creators/javascript/examples/selecting-providers).

- The pricing model is documented [here](https://github.com/golemfactory/golem-architecture/blob/master/standards/3-commercial/com/pricing/model.md).

- You can always ask on the [Discord](https://chat.golem.network/) `#js-discussion` channel in the SDK section.
