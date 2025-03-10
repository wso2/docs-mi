# CI/CD for Integrations - Overview

Continuous integration(CI) and continuous deployment(CD) for Integration is a must for delivering changes more frequently and reliably.
Different organizations have different ways of addressing the problem.
This is a guide of a reference implementation that involves a minimum number of parties in an organization for Integration automation.
This guide contains three parts.

1. [VM based CI/CD - MI]({{base_path}}/install-and-setup/setup/deployment/mi-cicd-vm).

<!-- 2. [Kubernetes based CI/CD - MI]({{base_path}}/install-and-setup/setup/deployment/mi-cicd-k8s). -->

## Phases of SDLC

Let's consider a deployment that has three typical environments as follows:

*   Developers use the Dev environment to develop their code and execute developer testing.
*   Staging (Quality Assurance) uses the Test environment for functional testing.
*   Actual consumers use the production environment
