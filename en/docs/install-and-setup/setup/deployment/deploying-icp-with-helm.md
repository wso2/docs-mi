# Deploy the Integration Control Plane (ICP) on Kubernetes using Helm resources

Follow the instructions below to deploy the ICP on Kubernetes (K8s) using Helm resources.

## Before you begin
    
- Ensure you have an active [WSO2 Subscription](https://wso2.com/subscription). If you don't have a subscription, sign up for a [WSO2 Free Trial Subscription](https://wso2.com/free-trial-subscription).

    !!! Note
        You need an active subscription to use the updated Docker images of the ICP with your Helm resources. Otherwise, you can use the community version of the Docker images, which do not include product updates.
    
- Install [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git), [Helm](https://helm.sh/docs/intro/install/), and the [Kubernetes client](https://kubernetes.io/docs/tasks/tools/install-kubectl/).
    
- Set up a [Kubernetes cluster](https://kubernetes.io/docs/setup/#learning-environment).
    
- Install the [NGINX Ingress Controller](https://kubernetes.github.io/ingress-nginx/deploy/). 

    !!! Note
        Helm resources for WSO2 product deployment patterns are compatible with the ingress-nginx [`controller-v1.11.2`](https://github.com/kubernetes/ingress-nginx/releases/tag/controller-v1.11.2) release.

## Step 1 - Get the Helm resources

Check out the Helm resources for the WSO2 Micro Integrator Git repository.

1. Open a terminal and navigate to the location where you want to save the local copy.
2. Clone the Micro Integrator Git repository with Helm resources:

    ```bash
    git clone https://github.com/wso2/helm-mi.git
    ```

This creates a local copy of the [`wso2/helm-mi`](https://github.com/wso2/helm-mi/) repository, which includes all the Helm resources for WSO2 Micro Integrator.

Let's refer to the root folder of the local copy as `<HELM_HOME>`.

## Step 2 - Update the deployment configurations 

Follow the steps below to configure your Micro Integrator deployment.

1. Open the `values.yaml` file in the `<HELM_HOME>/icp` folder of your local copy.

2. Use the following guidelines to update the deployment configurations:

    - **Update the WSO2 subscription details**
    
        You can update the username and password in the following section. If you don't have an active WSO2 subscription, leave these parameters empty.
    
        ```yaml
        wso2:
            subscription:
                username: "<username>"
                password: "<password>"
        ```

        Alternatively, you can skip this step and pass your subscription details during deployment (see the next step for details).

    - **Update the ICP Docker images**

        By default, the `values.yaml` file uses the base ICP image to set up the deployment.

        ```yaml
        containerRegistry: "docker.wso2.com"
        wso2:
            deployment:
                image: 
                    repository: "wso2-integration-control-plane"
                    tag: "1.0.0"
        ```

    - You can update [other configurations](https://github.com/wso2/helm-mi/blob/main/mi/EXAMPLES.md) as needed.

3. Save the `values.yaml` file.

## Step 3 - Deploy the ICP

Once you have configured your Helm resources locally, follow the instructions below to deploy the ICP.

1. Open a terminal and navigate to the `<HELM_HOME>/icp` folder.
2. Run the command appropriate for your Helm version.

    !!! Tip
       - Be sure to replace `<NAMESPACE>` with the Kubernetes namespace where your Micro Integrator pods are deployed.
       - Give a release name of your preference as `<RELEASE_NAME>`.

    - Using **Helm v3**:
        
        ```bash
        helm install <RELEASE_NAME> ./ -f values.yaml -n <NAMESPACE> --create-namespace
        ```

!!! Note
    For a pre-configured, easy setup for a local deployment, use the `values_local.yaml` file.
        
#### Update configurations during deployment

If needed, you can set deployment configurations at the time of deployment instead of specifying them in the `values.yaml` file. See the examples below.

- Set the subscription username and password:

    ```bash
    --set wso2.subscription.username=<SUBSCRIPTION_USERNAME>
    --set wso2.subscription.password=<SUBSCRIPTION_PASSWORD>
    ```

- Set the custom Micro Integrator Docker image:

    ```bash
    --set containerRegistry=<CUSTOM_IMAGE_REGISTRY>
    --set wso2.deployment.image.repository=<CUSTOM_IMAGE_REPOSITORY>
    --set wso2.deployment.image.tag=<CUSTOM_IMAGE_TAG>
    ```

- Use the following parameter only if your custom Docker image is stored in a private Docker registry:

    ```bash
    --set wso2.deployment.imagePullSecrets=<IMAGE_PULL_SECRET>
    ```

Your ICP Kubernetes deployment should now be created.

## Step 4 - Access the ICP

To access the ICP dashboard, follow these steps from your terminal:

1. Get the external IP (`EXTERNAL-IP`) of the Ingress resources by listing the Kubernetes ingresses.

    ```bash
    kubectl get ing -n <NAMESPACE>
    ```

    Example:

    ```log
    NAME            CLASS   HOSTS         ADDRESS        PORTS     AGE
    cloud-<RELEASE_NAME>   nginx   icp.wso2.com   <EXTERNAL-IP>   80, 443   27m
    ```

2. Add the above host information to your `/etc/hosts` file:

    ```bash
    <EXTERNAL-IP>   icp.wso2.com 
    ```

3. Now you can login to ICP at `https://icp.wso2.com/login`.
