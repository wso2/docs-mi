# Sample Kubernetes Deployment for WSO2 Micro Integrator and Integration Control Plane (ICP)

This guide walks you through setting up a basic deployment of WSO2 Micro Integrator (MI) and Integration Control Plane (ICP) on a local Kubernetes cluster. The deployment includes:

- Two MI replicas for high availability.
- One ICP pod to monitor and manage your integration services.
- Instructions on how to provide configurable values through Helm.

While this guide uses a local Kubernetes setup (e.g., Minikube or Kind) for simplicity, you can also deploy the same configuration on any cloud platform (such as AWS, GCP, or Azure) by adjusting the relevant settings.

## Before you begin

- Ensure you have an active [WSO2 Subscription](https://wso2.com/subscription). If you don't have a subscription, sign up for a [WSO2 Free Trial Subscription](https://wso2.com/free-trial-subscription).

    !!! Note
        You need an active subscription to use the updated Docker images of the Micro Integrator with your Helm resources. Otherwise, you can use the community version of the Docker images, which do not include product updates.
    
- Install [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git), [Docker](https://www.docker.com), [Helm](https://helm.sh/docs/intro/install/), and the [Kubernetes client](https://kubernetes.io/docs/tasks/tools/install-kubectl/).
    
- Set up a Kubernetes cluster. You can also try deploying Micro Integrator locally with a [local Kubernetes cluster](https://kubernetes.io/docs/tasks/tools/).
    
- Install the [NGINX Ingress Controller](https://kubernetes.github.io/ingress-nginx/deploy/). 

    !!! Note
        Helm resources for WSO2 product deployment patterns are compatible with the ingress-nginx [controller-v1.12.0](https://github.com/kubernetes/ingress-nginx/releases/tag/controller-v1.12.0) release.

## Step 1 - Get the Helm resources

You can find the official Micro Integrator Helm charts repository at: <a target="_blank" href="https://github.com/wso2/helm-mi">https://github.com/wso2/helm-mi</a>

1. Open a terminal and navigate to the location where you want to save the local copy.

2. Clone the Micro Integrator Git repository that contains the Helm resources:

    ```bash
    git clone https://github.com/wso2-enterprise/helm-mi.git
    cd helm-mi
    git checkout 4.4.x
    ```

    !!! note
        The `4.4.x` branch includes Helm resources that are compatible with WSO2 Micro Integrator version 4.4.0.

Let's refer to the root folder of the cloned repository as `<HELM_HOME>` throughout this guide.

## Step 2 - Build the Docker Image

For the MI deployment, you will use a pre-developed integration project that includes the following artifacts:

- An API that calls a backend service to retrieve the currency rate.
- A configurable to externalize the backend URL, whose value will be injected as an environment variable in later steps.
---
1. Download the <a href="{{base_path}}/assets/attachments/install-and-setup/currencyconverter.zip">Currency converter project</a> and extract the contents. We'll refer to the root directory of the project as `<PROJECT_HOME>`.

2. Run the following command inside the `<PROJECT_HOME>` directory to build the project and create the Docker image:

    ```bash
    mvn clean install -Pdocker
    ```

    !!! note
        - This command runs the `docker` Maven profile defined in the integration project. It builds the Docker image and stores it in your local Docker daemon.  
        - If you need to deploy the image from a remote registry (e.g., in a cloud environment), use the `docker push` command to push the image to your container registry.
        - By default, the resulting Docker image name will be in the format `<project_artifactId>:<project_version>`. For this project, the image will be named `currencyconverter:1.0.0`.
        - You can customize the image name and other settings via the VS Code MI project settings or by editing the `pom.xml` file located at `<PROJECT_HOME>/pom.xml`.
        - You can also use the **MI for VS Code** extension to build the Docker image. For more details, see [Build Docker Image]({{base_path}}/develop/deploy-artifacts/#build-docker-image).

For the ICP deployment, the official WSO2 ICP Docker image will be used.

## Step 3 - Deploy MI and ICP

In this step, you will deploy both the Micro Integrator (MI) and the Integration Control Plane (ICP) using Helm. The deployment will be configured using two values files:

- `mi-values.yaml` – Contains the deployment-specific configurations for the Micro Integrator.
- `icp-values.yaml` – Contains the configurations for the Integration Control Plane.

You may expand each file section below to review the configuration content and understand the purpose of each setting.

??? Note "mi-values.yaml"
    ```yaml linenums="1"
    # -- Container registry (When running on a local Kubernetes cluster using local image, make this empty)
    containerRegistry: ""

    wso2:
        ingress:
            enabled: true
            ingressClassName: "nginx"
            annotations:
                nginx.ingress.kubernetes.io/backend-protocol: "HTTPS"
        config:
            keyStore:
                primary:
                    # -- Primary keystore file name
                    fileName: "wso2carbon.jks"
                    # -- Primary keystore alias
                    alias: "wso2carbon"
                    # -- Primary keystore password
                    password: "wso2carbon"
                    # -- Primary keystore key password
                    keyPassword: "wso2carbon"
                internal:
                    # -- Internal keystore file name
                    fileName: "wso2carbon.jks"
                    # -- Internal keystore alias
                    alias: "wso2carbon"
                    # -- Internal keystore password
                    password: "wso2carbon"
                    # -- Internal keystore key password
                    keyPassword: "wso2carbon"
            trustStore:
                primary:
                    # -- Primary truststore file name
                    fileName: "client-truststore.jks"
                    # -- Primary truststore password
                    password: "wso2carbon"
            icp:
                # -- ICP URL
                url: "https://cloud-icp:9743/dashboard/api/"
        deployment:
            securityContext:
                # -- Enable/Disable AppArmor (https://kubernetes.io/docs/tutorials/security/apparmor/)
                apparmor: false
                # -- Enable/Disable seccomp profile (https://kubernetes.io/docs/tutorials/security/seccomp/)
                seccompProfile: false
                runAsUser: "10802"
            # -- Hostname of the Micro Integrator deployment
            hostname: "mi.wso2.com"
            # -- Build version of the Micro Integrator
            BuildVersion: "4.4.0"
            image:
                # -- Container image repository name
                repository: "currencyconverter"
                # -- Container image tag
                tag: "1.0.0"
            # -- Number of deployment replicas
            replicas: 2
            # -- (list) Environment variables for the Micro integrator deployment
            envs:
                currency_service_url: "https://dev-tools.wso2.com/gs/helpers/v1.0"
    ```

    **Line 7** – This configuration uses the [NGINX Ingress Controller](https://kubernetes.github.io/ingress-nginx/deploy/) for ingress traffic. If you're using a different ingress controller, update the `ingressClassName` and relevant `annotations` accordingly.

    **Line 36** – This defines the URL for the Integration Control Plane (ICP) so that MI can communicate with it. Since both MI and ICP are deployed in the same Kubernetes cluster, the internal service name of the ICP is used. By default:
    
    - **Group ID** is set to the Helm release name.
    - **Node ID** is derived from the MI pod name.
    
    You can override these values using the `groupId` and `nodeId` parameters as needed.

    **Line 40** – In this guide, AppArmor and seccomp are disabled (`apparmor: false`, `seccompProfile: false`) because we are using a local Kubernetes cluster where these security features may not be fully supported or configured. For production environments, it is strongly recommended to enable and configure both AppArmor and seccomp to enforce container-level security and minimize the attack surface. For more details, refer to the <a target="_blank" href="https://kubernetes.io/docs/tutorials/security/apparmor/">Kubernetes AppArmor documentation</a> and <a target="_blank" href="https://kubernetes.io/docs/tutorials/security/seccomp/">Seccomp documentation</a>.

    **Line 45** – Specifies the user ID (UID) that the container process runs as. This UID should match the one used when creating the Docker image. By default, the MI Docker image uses `10802`.

    **Line 50** – This section configures the Docker image used for the MI deployment. The image version is specified using the `tag`. Alternatively, you can specify the image using its digest via the `digest` parameter under `image`.

    **Line 58** – Use the `env` section to pass environment variables required by your integration. These environment variables should match the configurables declared in your integration artifacts. For example, the `currency_service_url` variable is used by the API in this tutorial to dynamically resolve the backend service URL.

    For a complete list of available configuration options and usage examples, refer to the [MI Helm Chart Configuration Guide](https://github.com/wso2/helm-mi/blob/4.4.x/mi/CONFIG.md).

??? Note "icp-values.yaml"
    ```yaml linenums="1"
    containerRegistry: "wso2"
    wso2:
    ingress:
        # -- Enable Ingress for ICP
        enabled: true
        # -- Ingress class name
        ingressClassName: "nginx"
        # -- (list) Ingress annotations
        annotations:
            nginx.ingress.kubernetes.io/backend-protocol: "HTTPS"
    config:
        miUserstore:
            # -- The user name for signing in to the Micro Integrator runtimes
            username: "admin"
            # -- The user password for signing in to the Micro Integrator runtimes.
            password: "admin"
        keyStore:
            #  -- The keystore file name
            fileName: "dashboard.jks"
            # -- The keystore alias
            alias: "wso2carbon"
            # -- The keystore password
            password: "wso2carbon"
            # -- The keystore key password
            keyPassword: "wso2carbon"
    deployment:
        securityContext:
            # -- Enable/Disable AppArmor (https://kubernetes.io/docs/tutorials/security/apparmor/)
            apparmor: false
            # -- Enable/Disable seccomp profile (https://kubernetes.io/docs/tutorials/security/seccomp/)
            seccompProfile: false
            # -- The UID to run the entrypoint of the container process
            runAsUser: "802"
        # -- Hostname of the ICP deployment
        hostname: "icp.wso2.com"
        # -- Build version of the ICP
        BuildVersion: "1.0.0"
        image:
            # -- Container image repository name
            repository: "wso2-integration-control-plane"
            # -- Container image tag
            tag: "1.0.0"
    ```

    **Line 1** – Since the WSO2 official ICP Docker image is used, the `containerRegistry` is set to `wso2`.

    **Line 17** – This defines the user credentials the ICP uses to connect to MI nodes. In this example, the default super admin credentials are used.

    **Line 33** – Specifies the user ID (UID) for running the container entry point. Ensure this value matches the UID used when building the Docker image. By default, the ICP Docker image uses UID `802`.

    **Line 38** – This section configures the Docker image for the ICP deployment. The image version is specified using the `tag`. Alternatively, you can specify the image using the `digest` parameter under `image`.

    For a complete list of configuration options and their usage, refer to the [ICP Helm Chart Configuration Guide](https://github.com/wso2/helm-mi/blob/4.4.x/icp/CONFIG.md).

1. Download the configuration files: <a href="{{base_path}}/assets/attachments/install-and-setup/mi-values.yaml">mi-values.yaml</a> and <a href="{{base_path}}/assets/attachments/install-and-setup/icp-values.yaml">icp-values.yaml</a>.
2. Copy the `mi-values.yaml` file to the `<HELM_HOME>/mi` directory.
3. Copy the `icp-values.yaml` file to the `<HELM_HOME>/icp` directory.
4. Navigate to the `<HELM_HOME>/mi` directory and execute the following Helm command:

    === "Command"
        ```bash 
        helm install <RELEASE_NAME> . -f mi-values.yaml -n <NAMESPACE> --create-namespace
        ```
    === "Example"     
        ```bash 
        helm install apis-intg . -f mi-values.yaml -n dev --create-namespace
        ```

    The above command will create a Kubernetes namespace called `dev` and deploy the Micro Integrator with the release name `apis-intg`. Next, you will deploy the Integration Control Plane (ICP).

5. Navigate to the `<HELM_HOME>/icp` directory and execute the following Helm command:

    === "Command"
        ```bash 
        helm install <RELEASE_NAME> . -f icp-values.yaml -n <NAMESPACE>
        ```
    === "Example"     
        ```bash 
        helm install icp . -f icp-values.yaml -n dev
        ```

    The above command will deploy the Integration Control Plane (ICP) with the release name `icp` in the `dev` namespace.

## Step 4 - Verify and test the deployment

Once the deployment is successful, the following resources will be created in your Kubernetes cluster. You can use the commands below to verify them.

!!! note
    - It may take around 1 minute for all the pods to be fully up and running.
    - The following commands use the namespace `dev` and reflect the release names and chart configurations used in the previous steps. If you have modified these values, update the commands accordingly.

1. Verify that the Micro Integrator (MI) and Integration Control Plane (ICP) pods are running successfully:

    ```bash
    kubectl get pods -n dev
    ```

    You should see output similar to:
  
    ``` 
    NAME                                                                READY   STATUS    RESTARTS       AGE
    cloud-icp-d5575fb-x6gnw                         1/1     Running             0                 5m32s
    cloud-apis-intg-7486b48657-tdcww    1/1     Running             0                 108s
    cloud-apis-intg-7486b48657-2gf5c       1/1     Running             0                108s
    ```

    Ensure the status of the pods is `Ready` before proceeding to the next step. If you encounter any issues, refer to the [Troubleshooting](#troubleshooting) section for guidance.

### Access the Integrations and Integration Control Plane

Follow these steps from your terminal to invoke the integration and access the Integration Control Plane (ICP).

!!! Note
    After deploying your integrations in the Kubernetes cluster, you can also test them without using the Ingress controller by forwarding a service port. This is useful for quick testing and debugging. See the [Invoke without Ingress Controller](#invoke-without-ingress-controller) section for more details.

1. Get the external IP of the Ingress resources.

    Run the following command to list the Ingress resources in the `dev` namespace.

    ```bash
    kubectl get ingress -n dev
    ```

    You should see output similar to:
  
    ``` 
    NAME                            CLASS   HOSTS                 ADDRESS        PORTS     AGE
    cloud-apis-intg         nginx   mi.wso2.com    192.168.5.15   80, 443   145m
    cloud-icp                     nginx   icp.wso2.com   192.168.5.15   80, 443   145m
    ```

2. Add host entries to `/etc/hosts`.

    To access the deployed services using domain names (`mi.wso2.com` and `icp.wso2.com`), you need to add entries to your local `/etc/hosts` file. This maps the domain names to the external IP of your Kubernetes Ingress.

    For example, if your ingress IP is 192.168.5.15, add the following lines.

    ```
    192.168.5.15    mi.wso2.com
    192.168.5.15    icp.wso2.com
    ```

3. Invoke the integration.

    Run the following command to invoke the sample integration.

    ```curl
    curl -X POST https://mi.wso2.com/currencyapi -d '{"fromCurrency": "AUD", "toCurrency": "USD"}' -H "Content-Type: application/json" -k
    ```

    You should see a response like:

    ```json
    {"fromCurrency":"AUD", "toCurrency":"USD", "rate":0.67}
    ```

4. Access the Integration Control Plane.

    Open <a target="_blank" href="https://icp.wso2.com/login">https://icp.wso2.com/login</a> in your browser and sign in using `admin` for both the username and password.

     <a href="{{base_path}}/assets/img/setup-and-install/icp_login.png"><img src="{{base_path}}/assets/img/setup-and-install/icp_login.png" alt="ICP Login page" width="80%"></a>

5. Verify MI nodes.

    In the Nodes view of the Integration Control Plane (ICP), you should see both MI pods grouped under the configured release name, each identified by its respective pod name.

    <a href="{{base_path}}/assets/img/setup-and-install/icp_mi_nodes.png"><img src="{{base_path}}/assets/img/setup-and-install/icp_mi_nodes.png" alt="MI Nodes" width="80%"></a>

#### Invoke without Ingress controller

You can access the deployed Micro Integrator and Integration Control Plane (ICP) without using an Ingress controller by forwarding service ports locally. This is useful for testing or when Ingress is not set up.

1. Port-forward the Micro Integrator service:

    ```
    kubectl port-forward service/cloud-apis-intg -n dev 8253:8253
    ```

2. Invoke the deployed API:

    ```
    curl -X POST https://localhost:8253/currencyapi -d '{"fromCurrency": "AUD", "toCurrency": "USD"}' -H "Content-Type: application/json" -k
    ```

    You should see a response like:

    ```json
    {"fromCurrency":"AUD", "toCurrency":"USD", "rate":0.67}
    ```

3. Port-forward the Integration Control Plane service:

    ```
    kubectl port-forward service/cloud-icp -n dev 9743:9743
    ```

4. Access the Integration Control Plane by opening <a target="_blank" href="https://localhost:9743/login">https://localhost:9743/login</a> in your browser.

## Troubleshooting

If you face issues during or after the deployment, here are some common troubleshooting tips:

**1. Pods are stuck in `Pending` or `CrashLoopBackOff` state.**

- Run `kubectl describe pod <POD_NAME> -n dev` to view detailed logs and events.

- Check if your Kubernetes cluster has sufficient CPU and memory resources.

- Ensure that the Docker image and tag are correctly defined

**2. Ingress IP is `<pending>`.**

Verify that the NGINX Ingress Controller is installed and running:

```bash
kubectl get pods -n ingress-nginx
```

**3.Unable to invoke API or access ICP.**

- Make sure `/etc/hosts` entries (`mi.wso2.com`, `icp.wso2.com`) point to the correct ingress IP.

- Check that the relevant services and ingresses are correctly created:

    ```bash
    kubectl get svc,ingress -n dev
    ```

**4. Check pod logs to verify runtime or product-level issues.**

- Use the following command to inspect logs for the MI or ICP pods:

    ```bash
    kubectl logs <POD_NAME> -n dev
    ```

- Look for any configuration errors, port binding issues, or missing dependencies in the startup logs.

- For container crashes, check if the log contains stack traces or error messages related to deployment or connectivity.

**5. MI nodes not visible in Integration Control Plane (ICP).**

- Confirm that `group_id` and `node_id` are correctly configured in the MI `deployment.toml`.
- Ensure the `dashboard_url` is properly set to point to ICP.