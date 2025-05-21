# Build a CI/CD Pipeline for Integrations (K8s deployment)

This document explains the Continuous Integration and Continuous Deployment (CI/CD) process for the WSO2 Micro Integrator (MI) integration project using Jenkins. The pipeline is designed to support both regular development builds and Maven release builds, along with Docker image tagging and Helm-based Kubernetes deployments.

!!! Note
    This pipeline setup is provided for demonstration purposes using Jenkins. In production environments, you may implement similar flows using other CI/CD platforms such as GitHub Actions, GitLab CI, Azure DevOps etc.

<a href="{{base_path}}/assets/img/setup-and-install/mi-cicd-K8s.png"><img src="{{base_path}}/assets/img/setup-and-install/mi-cicd-K8s.png" alt="CICD pipeline"></a>

## Integration Project Build Job

- You need to maintain one Jenkins job per integration project repository.
- The **build phase** compiles the integration project and optionally runs unit tests (if a unit test server is configured).
- The **release phase** builds a Docker image and pushes it to the configured Docker registry.

### Pipeline Steps

The integration project build pipeline conatins the following main 5 stages:

<a href="{{base_path}}/assets/img/setup-and-install/integration_pipeline.png"><img src="{{base_path}}/assets/img/setup-and-install/integration_pipeline.png" alt="Integration pipeline" width="70%"></a>

1. **Clone Integration Project**: Securely clones the integration project using a GitHub Personal Access Token (PAT).

2. **Build Integration Project**:

    If `PERFORM_RELEASE` is selected in **Build with Parameters**, a Maven release will be performed and the Docker image will be built. Otherwise, only the integration project will be built.

3. **Docker Login and Push**: Logs into the Docker registry and pushes the generated image.

4. **Clone the Deployment repository**: Securely clones the deployment repository using a GitHub PAT.

5. **Create PR**: Updates the `mi-config.json` file with the new image digest and opens a PR in the deployment repository.

## Deployment Descriptor Build Job

- You need to maintain one Jenkins job per environment.
- The job reads a descriptor file (`mi-config.json`) that contains Docker image details. Other deployment configurations should be maintained in the `mi-values.yaml` file of the MI Helm chart.

### Pipeline Steps

The deployment pipeline contains the following four three stages:

<a href="{{base_path}}/assets/img/setup-and-install/deployment_pipeline.png"><img src="{{base_path}}/assets/img/setup-and-install/deployment_pipeline.png" alt="Deployment pipeline" width="70%"></a>

1. **Trigger on PR Merge**:
    Monitors the `dev` branch of the deployment repository for changes.

    !!! note
        In this guide, the deployment job must be triggered manually after the PR with the updated image digest is merged.
        To automate this, configure webhook triggers or build listeners as appropriate for your CI/CD setup.

2. **Clone Deployment Repository**: Pulls the latest deployment repository content.

3. **Deploy to K8s**: Deploy the Helm chart to a local or remote Kubernetes cluster.

## Setting up the environment

### Prerequisites

To configure the CI/CD pipeline for deploying WSO2 Micro Integrator integrations using Jenkins and Helm, ensure the following prerequisites are met

#### Integration project

You should have an integration project created using the [Micro Integrator Extension for VS Code]({{base_path}}/develop/mi-for-vscode/mi-for-vscode-overview/).

**Update the `pom.xml` with SCM information**

Ensure the `pom.xml` of your integration project includes a valid <scm> block pointing to your GitHub repository:

```xml
<scm>
    <connection>scm:git:https://github.com/<user>/<repo>.git</connection>
    <developerConnection>scm:git:https://github.com/<user>/<repo>.git</developerConnection>
    <url>https://github.com/<user>/<repo></url>
</scm>
```

This is required for the Maven Release Plugin to tag and push versions correctly during the release process.

#### GitHub repository for integration project

- Host the integration project in a GitHub repository.
- The repository URL should match the one defined in the SCM configuration in the previous step.

#### GitHub repository for deployment configuration

Maintain a separate GitHub repository to store deployment configurations. This repository should include:

1. A clone of the <a target="_blank" href="https://github.com/wso2/helm-mi/tree/4.4.x">MI Helm Chart</a>.

2. An updated `mi-values.yaml` file to suit your environment. For configuration details, refer to the [Configure Helm charts for Micro Integrator]({{base_path}}/install-and-setup/setup/deployment/configuring-helm-charts/) guide.

3. A `mi-config.json` file inside the `mi/` directory with the following initial content:

    ```json
    {
        "image": "REPLACE_WITH_IMAGE_HASH"
    }
    ```

    This file that tracks the Docker image version used during deployment. This file will be automatically updated during the release pipeline and used by the deployment job to roll out changes in Kubernetes.

**Sample folder structure**

Make sure your deployment repository follows the folder structure below, as the Jenkins jobs are configured to work with this layout. If you change this structure, ensure the Jenkins pipeline scripts are updated accordingly.

```
    helm-repo/
     ├── icp/
    │   └── icp-values.yaml
     ├── mi/
    │    ├── confs/
    │   │   └── log4j2.properties        # Optional: Custom logging config
    │    ├── mi-values.yaml                     # Helm values for MI
    │   └── mi-config.json                      # Updated with image during release
     ├── README.md
```

#### GitHub Personal Access Token (PAT)

Generate a GitHub <a target="_blank" href="https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens">Personal Access Token</a> with the following permissions:

- repo: Full access to the integration and deployment repositories (for pushing tags and PRs)

You will use this token when configuring Jenkins credentials to access GitHub in the pipeline.

#### Kubernetes cluster

1. Set up a Kubernetes cluster. For this guide, we use Rancher Desktop, but you may use any Kubernetes distribution of your choice.

2. Create the namespace for the target environment (e.g., staging).

    ```
    kubectl create namespace staging
    ```

3. Configure Docker registry access for your cluster. For local Kubernetes clusters, you can create a Kubernetes secret with your Docker Hub credentials as shown below. This secret will be used to authenticate image pulls.

    ```
    kubectl create secret docker-registry regcred \
    --docker-server=https://index.docker.io/v1/ \
    --docker-username=<USERNAME> \
    --docker-password=<PASSWORD> \
    --namespace=staging
    ```

4. In your `mi-values.yaml`, reference this secret under `wso2.deployment.imagePullSecrets`.

    ```yaml
    wso2:
        deployment:
            imagePullSecrets: regcred
    ```

### Set up Jenkins Server

1. Download the <a href="{{base_path}}/assets/attachments/install-and-setup/docker-k8s-artifacts.zip">docker-k8s-artifacts.zip</a> and extract the contents.

    This directory includes the necessary files to configure and run the Jenkins server using Docker.

    - `jenkins_casc.yaml`: Jenkins Configuration as Code (CASC) file that defines the server setup.
    - `pipeline.groovy`: Jenkins pipeline for building the integration project.
    - `pipeline-deployment.groovy`: Jenkins pipeline for deploying to Kubernetes.
    - `jenkins.env`: Environment variables and configuration parameters. Update this file with your repository and credential values before proceeding.

    !!! Note
        - In this guide, the deployment pipeline is configured to deploy the `staging` branch of the deployment repository to the `staging` environment in the Kubernetes cluster. You can configure additional pipelines to deploy to other environments (e.g., dev, prod) as needed.

        - The Dockerfile for Jenkins includes the following line
        ```dockerfile
            COPY kubeconfig.rancher /root/.kube/config
        ```
        This configuration is intended for deploying the integration to a **local Rancher-managed Kubernetes cluster**. You can use `kubectl config view --minify --flatten > kubeconfig.rancher` to generate the `kubeconfig.rancher`.
        If you plan to deploy to a **production Kubernetes cluster**, make sure to **update the pipeline to use the appropriate `kubeconfig` file** for your target environment.
        You can either:
            - Replace `kubeconfig.rancher` with the production `kubeconfig` file during the Jenkins image build process, **or**
            - Modify the pipeline scripts to dynamically reference the correct `kubeconfig` file depending on the environment.
    
3. Start the Jenkins server.

    After updating the `jenkins.env` file with the required values, run the following command to start Jenkins using Docker Compose:

    ```
    docker-compose up -d --build
    ```

    This command will start:

    - The Jenkins server.
    - A Docker-in-Docker (dind) container, which enables Jenkins to build and push Docker images.
     
4. Once the Jenkins server is up and running, you can access the Jenkins UI at <a target="_blank" href="http://localhost:8080">http://localhost:8080</a>. By default, the login credentials are:
    
    **Username**: `admin`

    **Password**: `admin`

    You can customize these values by updating the `JENKINS_ADMIN_ID` and `JENKINS_ADMIN_PASSWORD` fields in the `jenkins.env` file before starting the server.

    !!! Note
        It is not recommended to store sensitive credentials like passwords in environment files for production deployments. However, for simplicity and demonstration purposes, this guide uses environment variables to configure the Jenkins admin credentials.

## Build and deploy the integration

1. Commit your changes to the GitHub source repository which contains the integration project.

2. In the Jenkins server, navigate to the **integration-pipeline** job and trigger a build. To perform a Maven release and push the Docker image, ensure that `PERFORM_RELEASE` is selected under **Build with Parameters**.

3. After the release build completes, verify the following:
    - The Docker image is available in your container registry
    - A pull request (PR) has been automatically created in the deployment repository with the updated image digest.

4. Merge the PR in the deployment repository to apply the new image digest.

5. Navigate to the **deployment-pipeline** job in the Jenkins server and trigger the build.

    !!! Tip
        If you have configured webhook triggers or build listeners as part of your CI/CD setup, the deployment pipeline may be triggered automatically when the PR is merged.

6. Once the deployment pipeline has completed successfully, verify that the Kubernetes deployment has been updated with the new Docker image.