# Sample Kubernetes Deployment for WSO2 Integrator: MI and Integration Control Plane (ICP)

This guide walks you through setting up a basic deployment of WSO2 Integrator:  MI and Integration Control Plane (ICP) on a local Kubernetes cluster. The deployment includes:

- Two MI replicas for high availability.
- One ICP pod to monitor and manage your integration services.
- Instructions on how to provide configurable values through Helm.

While this guide uses a local Kubernetes setup (e.g., Minikube or Kind) for simplicity, you can also deploy the same configuration on any cloud platform (such as AWS, GCP, or Azure) by adjusting the relevant settings.

## Before you begin

- Ensure you have an active [WSO2 Subscription](https://wso2.com/subscription). If you don't have a subscription, sign up for a [WSO2 Free Trial Subscription](https://wso2.com/free-trial-subscription).

    !!! Note
        You need an active subscription to use the updated Docker images of the WSO2 Integrator: MI with your Helm resources. Otherwise, you can use the community version of the Docker images, which do not include product updates.
    
- Install [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git), [Docker](https://www.docker.com), [Helm](https://helm.sh/docs/intro/install/), and the [Kubernetes client](https://kubernetes.io/docs/tasks/tools/install-kubectl/).
    
- Set up a Kubernetes cluster. You can also try deploying WSO2 Integrator: MI locally with a [local Kubernetes cluster](https://kubernetes.io/docs/tasks/tools/).
    
- Install the [Kubernetes Gateway API](https://gateway-api.sigs.k8s.io/) CRDs and [Envoy Gateway](https://gateway.envoyproxy.io/). This guide uses the Gateway API as the default approach for managing ingress traffic.

    1. Install the Gateway API CRDs:

        ```bash
        kubectl apply -f https://github.com/kubernetes-sigs/gateway-api/releases/download/v1.2.1/standard-install.yaml
        ```

    2. Install Envoy Gateway:

        ```bash
        helm install eg oci://docker.io/envoyproxy/gateway-helm \
          --version v1.7.0 \
          -n envoy-gateway-system \
          --create-namespace
        ```

    3. Apply the WSO2 GatewayClass:

        ```bash
        kubectl apply -f https://raw.githubusercontent.com/wso2/helm-mi/460-release/envoy-gatewayClass.yaml
        ```

        Wait until the GatewayClass is accepted:

        ```bash
        kubectl get gatewayclass wso2-gateway-class
        ```

        The `ACCEPTED` column should show `True`.

    !!! note "Using NGINX Ingress instead"
        If you prefer a traditional Ingress controller (such as NGINX), install it instead of the above. When configuring the values files in Step 3, set `wso2.gatewayAPI.enabled: false` and `wso2.ingress.enabled: true`, and update `ingressClassName` and `annotations` accordingly.

## Step 1 - Get the Helm resources

You can find the official WSO2 Integrator: MI Helm charts repository at: <a target="_blank" href="https://github.com/wso2/helm-mi">https://github.com/wso2/helm-mi</a>

1. Open a terminal and navigate to the location where you want to save the local copy.

2. Clone the WSO2 Integrator: MI Git repository that contains the Helm resources:

    ```bash
    git clone https://github.com/wso2/helm-mi.git
    cd helm-mi
    git checkout 4.6.x
    ```

    !!! note
        The `4.6.x` branch includes Helm resources that are compatible with WSO2 Integrator: MI version 4.6.0.

    !!! note
        WSO2 subscription holders can use the enterprise repository (`https://github.com/wso2-enterprise/helm-mi.git`) for access to updated Docker images and additional enterprise features.

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

    !!! info
        For the ICP deployment, the official WSO2 ICP Docker image will be used.

## Step 3 - Configure MI and ICP

In this step, you will deploy both the WSO2 Integrator: MI and the Integration Control Plane (ICP) using Helm. The deployment will be configured using two values files:

- `mi-values.yaml` – Contains the deployment-specific configurations for the WSO2 Integrator: MI.
- `icp-values.yaml` – Contains the configurations for the Integration Control Plane.

You may expand each file section below to review the configuration content and understand the purpose of each setting.

??? Note "mi-values.yaml"
    ```yaml linenums="1"
    # -- Container registry (When running on a local Kubernetes cluster using local image, make this empty)
    containerRegistry: ""

    wso2:
        ingress:
            # -- Enable Ingress for MI
            enabled: false
        gatewayAPI:
            # -- Enable Gateway API resources
            enabled: true
            # -- Create a Gateway resource (set to false if using a shared/external Gateway)
            createGateway: false
            # -- GatewayClass name (must exist in cluster)
            gatewayClassName: "envoy"
            # -- Name of the Gateway resource
            gatewayName: "wso2-gateway"
            # -- Namespace of the Gateway resource
            gatewayNamespace: "default"

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
        deployment:
            securityContext:
                # -- Enable/Disable AppArmor (https://kubernetes.io/docs/tutorials/security/apparmor/)
                apparmor: false
                # -- Enable/Disable seccomp profile (https://kubernetes.io/docs/tutorials/security/seccomp/)
                seccompProfile:
                    enabled: false
                # -- The UID to run the entrypoint of the container process
                runAsUser: "10802"
            # -- Hostname of the WSO2 Integrator: MI deployment
            hostname: "mi.wso2.com"
            # -- Build version of the WSO2 Integrator: MI
            BuildVersion: "4.6.0"
            BuildVersion: "4.6.0"
            image:
                # -- Container image repository name
                repository: "currencyconverter"
                # -- Container image tag
                tag: "1.0.0"
            # -- Number of deployment replicas
            replicas: 2
            # -- (list) Environment variables for the WSO2 Integrator: MI deployment
            envs:
                currency_service_url: "https://dev-tools.wso2.com/gs/helpers/v1.0"
    ```

    **Line 6** – Traditional Ingress is disabled in this sample. The `gatewayAPI` block below is used instead.

    !!! Note
        To use a traditional ingress controller such as NGINX, set `ingress.enabled: true` and `gatewayAPI.enabled: false`, and update `ingressClassName` and `annotations` accordingly.

    **Line 10** – Enables [Kubernetes Gateway API](https://gateway-api.sigs.k8s.io/) resources. This is the recommended approach for managing ingress traffic and replaces the traditional Ingress resource.

    **Line 12** – Setting `createGateway: false` instructs MI **not** to create its own Gateway resource. Instead, MI's HTTPRoute will attach to an existing Gateway — in this guide, the one created by the ICP deployment. This shared-gateway approach is the recommended setup, especially on local Kubernetes environments where only a single LoadBalancer IP is available. If you want MI to manage its own independent Gateway (for example, in a multi-team environment where ICP and MI are deployed separately), set this to `true` and provide a unique `gatewayName`.

    **Line 14** – Sets the GatewayClass to `envoy`, which corresponds to the Envoy Gateway controller installed in the prerequisites step. If you are using a different Gateway API controller, update this value to match the installed GatewayClass name.

    **Line 16** - Name of the shared gateway which will be created through ICP deployment under 'default' namespace.

    **Line 49** – In this guide, AppArmor and seccomp are disabled because we are using a local Kubernetes cluster where these security features may not be fully supported or configured. For production environments, it is strongly recommended to enable and configure both AppArmor and seccomp to enforce container-level security and minimize the attack surface. For more details, refer to the <a target="_blank" href="https://kubernetes.io/docs/tutorials/security/apparmor/">Kubernetes AppArmor documentation</a> and <a target="_blank" href="https://kubernetes.io/docs/tutorials/security/seccomp/">Seccomp documentation</a>.

    **Line 54** – Specifies the user ID (UID) that the container process runs as. This UID should match the one used when creating the Docker image. By default, the MI Docker image uses `10802`.

    **Line 59** – This section configures the Docker image used for the MI deployment. The image version is specified using the `tag`. Alternatively, you can specify the image using its digest via the `digest` parameter under `image`.

    **Line 68** – Use the `env` section to pass environment variables required by your integration. These environment variables should match the configurables declared in your integration artifacts. For example, the `currency_service_url` variable is used by the API in this tutorial to dynamically resolve the backend service URL.

    For a complete list of available configuration options and usage examples, refer to the [MI Helm Chart Configuration Guide](https://github.com/wso2/helm-mi/blob/4.6.x/mi/CONFIG.md).

??? Note "icp-values.yaml"
    ```yaml linenums="1"
    containerRegistry: "wso2"
    wso2:
        subscription:
            # -- WSO2 subscription username
            username: "<username>"
            # -- WSO2 subscription password
            password: "<password>"
        ingress:
            # -- Enable Ingress for ICP
            enabled: false
        gatewayAPI:
            # -- Enable Gateway API resources
            enabled: true
            # -- Create a Gateway resource
            createGateway: true
            # -- GatewayClass name
            gatewayClassName: "envoy"
            # -- Name of the Gateway resource
            gatewayName: "wso2-gateway"
            # -- Namespace of the Gateway resource
            gatewayNamespace: "default"
            # -- K8s TLS secret for configured hostname
            tlsSecret: ""
        config:
            miUserstore:
                # -- The user name for signing in to the WSO2 Integrator: MI runtimes
                username: "admin"
                # -- The user password for signing in to the WSO2 Integrator: MI runtimes.
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
            # -- Frontend JWT HMAC secret (at least 32 characters for HS256)
            frontendJwtHMACSecret: "sample-frontend-jwt-hmac-secret-key-which-is-at-least-32-chars"    
        deployment:
            securityContext:
                # -- Enable/Disable AppArmor (https://kubernetes.io/docs/tutorials/security/apparmor/)
                apparmor: false
                # -- Enable/Disable seccomp profile (https://kubernetes.io/docs/tutorials/security/seccomp/)
                seccompProfile:
                    enabled: false
                # -- The UID to run the entrypoint of the container process
                runAsUser: "802"
            # -- Hostname of the ICP deployment
            hostname: "icp.wso2.com"
            # -- Build version of the ICP
            BuildVersion: "2.0.0"
            image:
                # -- Container image repository name
                repository: "wso2-integration-control-plane"
                # -- Container image tag
                tag: "2.0.0"
    ```

    **Line 1** – Since the WSO2 official ICP Docker image is used, the `containerRegistry` is set to `wso2`.

    **Line 10** – Traditional Ingress is disabled. Gateway API is used instead, mirroring the MI configuration. To use a traditional ingress controller, set `ingress.enabled: true` and `gatewayAPI.enabled: false`.

    **Line 18** – Enables [Kubernetes Gateway API](https://gateway-api.sigs.k8s.io/) resources. This is the recommended approach for managing ingress traffic and replaces the traditional Ingress resource.

    **Line 20** – Setting `createGateway: true` instructs ICP to create a shared gateway under 'default' namespace. Same gateway will be used in MI deployment. If you want you cane create gateway in a desired namespace but should configure **gatewayNamespace** value in both ICP and MI Values files.

    **Line 32** – This defines the user credentials the ICP uses to connect to MI nodes. In this example, the default super admin credentials are used.

    **Line 40** – The `frontendJwtHMACSecret` is used to sign the JWT tokens issued by the ICP frontend. This must be a strong, randomly generated secret of at least 32 characters. Replace the sample value with a secure secret before deploying to any non-local environment.

    **Line 47** – In this guide, AppArmor and seccomp are disabled for local cluster compatibility. Enable both in production environments.

    **Line 52** – Specifies the user ID (UID) for running the container entry point. Ensure this value matches the UID used when building the Docker image. By default, the ICP Docker image uses UID `802`.

    **Line 57** – This section configures the Docker image for the ICP deployment. The image version is specified using the `tag`. Alternatively, you can specify the image using the `digest` parameter under `image`.

    For a complete list of configuration options and their usage, refer to the [ICP Helm Chart Configuration Guide](https://github.com/wso2/helm-mi/blob/4.6.x/icp/CONFIG.md).

## Step 4 - Deploy ICP

!!! tip "Why deploy ICP first?"
        MI registers itself with ICP at startup. If ICP is enabled and then ICP is not yet available, MI's first registration attempt fails. While MI retries automatically, deploying ICP first ensures a clean startup and avoids connection errors in the MI logs.

1. Download the configuration file: <a href="{{base_path}}/assets/attachments/install-and-setup/icp-values.yaml">icp-values.yaml</a>.
2. Copy the `icp-values.yaml` file to the `<HELM_HOME>/icp` directory.
3. Navigate to the `<HELM_HOME>/icp` directory and execute the following Helm command:

    === "Command"
        ```bash 
        helm install <RELEASE_NAME> . -f icp-values.yaml -n <NAMESPACE> --create-namespace
        ```
    === "Example"     
        ```bash 
        helm install icp . -f icp-values.yaml -n dev --create-namespace
        ```

    Wait for the ICP pod to be ready before proceeding:

    ```bash
    kubectl get pods -n dev -w
    ```

    Wait until you see the ICP pod status as `Running`:

    ```
    NAME                         READY   STATUS    RESTARTS   AGE
    cloud-icp-d5575fb-x6gnw      1/1     Running   0          90s
    ```
4. Get the external IP of the Gateway.

    Run the following command to list the Gateway resources in the `default` namespace.

    ```bash
    kubectl get gateway -n default
    ```

    You should see output similar to:
  
    ``` 
    NAME                       CLASS   ADDRESS        PROGRAMMED   AGE
    wso2-gateway    envoy   192.168.127.2   True         145m
    ```

5. Add host entries to `/etc/hosts`.

    To access the deployed services using domain names (`mi.wso2.com` and `icp.wso2.com`), you need to add entries to your local `/etc/hosts` file. This maps the domain names to the external IP address of your Gateway.

    For example, current shared Gateway address is 192.168.127.2 and  `wso2.deployment.hostname : "icp.wso2.com"` then add the following lines. For convinience let's add the MI host entry as well.

    ```
    192.168.127.2    icp.wso2.com
    192.168.127.2    mi.wso2.com
    ```

## Step 5 - Deploy MI

#### Configure ICP Connectivity

1. Access the Integration Control Plane:

    Open <a target="_blank" href="https://icp.wso2.com/login">https://icp.wso2.com/login</a> in your browser and sign in using `admin` for both the username and password.

    <a href="{{base_path}}/assets/img/setup-and-install/icp_login.png" class="glightbox"><img src="{{base_path}}/assets/img/setup-and-install/icp_login.png" alt="ICP Login page" width="80%"></a>

2. Then click `Add Runtime`. This will create a new runtime under `dev` environment by default.

    <a href="{{base_path}}/assets/img/setup-and-install/icp_add_runtime.png" class="glightbox"><img src="{{base_path}}/assets/img/setup-and-install/icp_add_runtime.png" alt="ICP Add Runtime" width="80%"></a>

3. Next click `Generate Secret` on the dialog box.

    <a href="{{base_path}}/assets/img/setup-and-install/icp_generate_secret.png" class="glightbox"><img src="{{base_path}}/assets/img/setup-and-install/icp_generate_secret.png" alt="ICP Generate Secret" width="80%"></a>

4. Then go to `MI` tab and copy the generated secret.

    <a href="{{base_path}}/assets/img/setup-and-install/icp_copy_secret.png" class="glightbox"><img src="{{base_path}}/assets/img/setup-and-install/icp_copy_secret.png" alt="ICP MI Secret" width="80%"></a>

5. Let's configure ICP connectivity in mi-values.yaml.

    ```yaml
    wso2:
      config:
        icp:
          # -- Enable ICP connectivity
          enabled: true
          # -- Runtime ID (If not defined Pod UID will be used as runtime ID)
          runtime: ""
          # -- Environment name
          environment: "dev"
          # -- Project name
          project: "MI-Project"
          # -- Integration name
          integration: "currency-converter"
          # -- Secret key (obtained from ICP)
          secret: "xxxxx-xxxxx-xxxxx-xxxxx"
          # -- ICP server URL
          icpUrl: "https://cloud-icp:9445"
          # -- Set to false for local dev with self-signed ICP certificate. Never use in production.
          sslVerify: false
    ```   

!!! important
    - **`runtime`** – An optional identifier for this MI instance within ICP. If left empty, ICP will use the pod's UID as the runtime ID. You can set a meaningful name (e.g., `currency-runtime`) to make it easier to identify the node in the ICP dashboard.
    - **`environment`** – This must match the environment name configured in ICP when the secret was generated. It is determined by ICP, not freely chosen here.
    - **`project`** and **`integration`** – These are logical grouping values you define. Set them to any name that reflect your deployment structure (e.g., `project: mi-project`, `integration: currency-converter`). They are used to organise MI nodes in the ICP dashboard under `All Projects > <project>  > <integration>`.
    - **`secret`** – This value is generated by ICP and must be copied from the ICP dashboard after clicking **Generate Secret**.
    - **`icpUrl`** – The internal Kubernetes service URL of the ICP instance. MI pods use this URL to register with ICP at startup. See [ICP service URL](#icp-service-url) for details on how to derive this value.

!!! warning "Security note"
    Using `sslVerify: false` disables certificate validation for the MI to ICP connection. This is acceptable for local development but must **never** be used in production environments. Use `caCertSecretName` to configure a Kubernetes secret containing the ICP CA certificate, enabling MI to trust ICP's TLS certificate without disabling validation:

    ```yaml
    wso2:
      config:
        icp:
          enabled: true
          serviceUrl: https://cloud-icp:9445
          caCertSecretName: icp-ca-cert
    ```

    Check [Configuring SSL trust for MI→ICP communication](#configuring-ssl-trust-for-miicp-communication) for more details.

6. Deploy MI. Navigate to the `<HELM_HOME>/mi` directory and execute the following Helm command:

    === "Command"
        ```bash 
        helm install <RELEASE_NAME> . -f mi-values.yaml -n <NAMESPACE>
        ```
    === "Example"     
        ```bash 
        helm install currency-integration . -f mi-values.yaml -n dev
        ```

    The above command will deploy the WSO2 Integrator: MI with the release name `currency-integration` in the `dev` namespace.

## Step 6 - Verify and test the deployment

Once the deployment is successful, the following resources will be created in your Kubernetes cluster. You can use the commands below to verify them.

!!! note
    - It may take around 1 minute for all the pods to be fully up and running.
    - The following commands use the namespace `dev` and reflect the release names and chart configurations used in the previous steps. If you have modified these values, update the commands accordingly.

1. Verify that the WSO2 Integrator: MI and Integration Control Plane (ICP) pods are running successfully:

    ```bash
    kubectl get pods -n dev
    ```

    You should see output similar to:
  
    ``` 
    NAME                                         READY   STATUS    RESTARTS   AGE
    cloud-currency-integration-688569d7b-hcc27   1/1     Running   0          74s
    cloud-currency-integration-688569d7b-tdvs2   1/1     Running   0          74s
    cloud-icp-6d5749767-qdqfc                    1/1     Running   0          69m
    ```

    Ensure the status of the pods is `Ready` before proceeding to the next step. If you encounter any issues, refer to the [Troubleshooting](#troubleshooting) section for guidance.

2. Verify that the HTTPRoute resources were created and bound to the Gateway, run:
        
    ```bash
    kubectl get httproute -n dev    
    ```
    You should see output similar to:
  
    ``` 
    NAME                                      HOSTNAMES          AGE
    cloud-currency-integration-mi-httproute   ["mi.wso2.com"]    105s
    cloud-icp-icp-httproute                   ["icp.wso2.com"]   69m
    ```

    Also if you can inspect individual routes for more details using following command:

    ```
    kubectl describe httproute <route-name> -n dev
    ```

### Invoke Currency Converter Integration

Follow these steps from your terminal to invoke the currency converter integration.

!!! Note
    After deploying your integrations in the Kubernetes cluster, you can also test them without using a gateway by forwarding a service port. This is useful for quick testing and debugging. See the [Invoke without Gateway](#invoke-without-gateway) section for more details.

To Invoke the currency converter integration, Run the following command.

    ```
    curl -X POST https://mi.wso2.com/currencyapi -d '{"fromCurrency": "AUD", "toCurrency": "USD"}' -H "Content-Type: application/json" -k
    ```

    You should see a response like:

    ```json
    {"fromCurrency":"AUD", "toCurrency":"USD", "rate":0.67}
    ```

### Verify MI nodes in ICP

1. Access the Integration Control Plane.

    Open <a target="_blank" href="https://icp.wso2.com/login">https://icp.wso2.com/login</a> in your browser and sign in using `admin` for both the username and password.

     <a href="{{base_path}}/assets/img/setup-and-install/icp_login.png" class="glightbox"><img src="{{base_path}}/assets/img/setup-and-install/icp_login.png" alt="ICP Login page" width="80%"></a>

2. Verify MI Runtimes and Deployed integrations.

    Navigate to `All Projects > mi-project > currency-integration`, Then under `dev` section you should see all deployed Integrations and their Supporting Artifacts.

    <a href="{{base_path}}/assets/img/setup-and-install/icp_entry_points.png" class="glightbox"><img src="{{base_path}}/assets/img/setup-and-install/icp_entry_points.png" alt="Entry Points" width="80%"></a>

    <a href="{{base_path}}/assets/img/setup-and-install/icp_supporting artifacts.png" class="glightbox"><img src="{{base_path}}/assets/img/setup-and-install/icp_supporting artifacts.png" alt="Supporting Artifacts" width="80%"></a>

## References

### ICP service URL

The `icpUrl` value in `mi-values.yaml` must point to a URL that the MI pod can reach at runtime. How you set this depends on where ICP is deployed relative to MI.

**ICP and MI in the same cluster**

Use the Kubernetes service DNS name — do **not** use the external Gateway hostname. The ICP service name follows the pattern `<cloudName>-<releaseName>`, where `cloudName` is the value of `wso2.config.cloudName` in `icp-values.yaml` (default: `cloud`) and `releaseName` is the Helm release name passed to `helm install`.

| `cloudName` | ICP release name | Resulting service name | `icpUrl` |
|---|---|---|---|
| `cloud` (default) | `icp` | `cloud-icp` | `https://cloud-icp:9445` |
| `cloud` (default) | `my-icp` | `cloud-my-icp` | `https://cloud-my-icp:9445` |
| `prod` | `icp` | `prod-icp` | `https://prod-icp:9445` |

If ICP is in a **different namespace** from MI, append the namespace to the DNS name:

```
https://cloud-icp.<namespace>.svc.cluster.local:9445
```

For example, if ICP is in the `platform` namespace:

```
https://cloud-icp.platform.svc.cluster.local:9445
```

**ICP deployed externally or outside the cluster**

Provide the full reachable URL — this could be the Gateway hostname or an external load balancer address:

```
https://icp.wso2.com:9445
```

Ensure that the MI pods have network access to this address and that TLS trust is configured accordingly (see [Configuring SSL trust for MI→ICP communication](#configuring-ssl-trust-for-micp-communication)).

### Configuring SSL trust for MI→ICP communication

When MI connects to ICP internally over HTTPS, it validates ICP's TLS certificate. The required configuration depends on the type of certificate used:

| ICP Certificate Type | Required MI Configuration |
|---|---|
| Certificate from a publicly trusted CA (e.g., Let's Encrypt, AWS ACM) | Nothing — MI trusts it automatically |
| Self-signed or private CA certificate | Set `caCertSecretName` (see below) |
| Local dev / quick start | Set `sslVerify: false` (not for production) |

**For self-signed or private CA certificates (production-safe):**

1. Extract the CA certificate from the ICP TLS secret:

    ```bash
    kubectl get secret icp-tls -n dev -o jsonpath='{.data.ca\.crt}' | base64 --decode > icp-ca.crt
    ```

    !!! note
        If the ICP TLS secret does not contain a `ca.crt` key, extract the issuer from the certificate chain directly:
        ```bash
        kubectl get secret icp-tls -n dev -o jsonpath='{.data.tls\.crt}' | base64 --decode \
          | openssl x509 -noout -issuer
        ```

2. Create a Kubernetes secret with the CA certificate:

    ```bash
    kubectl create secret generic icp-ca-cert \
      --from-file=ca.crt=icp-ca.crt \
      -n dev
    ```

3. Reference the secret in `mi-values.yaml`:

    ```yaml
    wso2:
      config:
        icp:
          enabled: true
          serviceUrl: https://cloud-icp:9445
          caCertSecretName: icp-ca-cert    # Secret must contain a key named "ca.crt"
    ```

    Omit `sslVerify: false` when using `caCertSecretName`.

### Single-gateway workaround for local Kubernetes

Some local Kubernetes distributions (such as Rancher Desktop and Minikube) provide only a single LoadBalancer IP. If both MI and ICP deploy their own Gateways, the second Gateway will remain in `<pending>` state and show `PROGRAMMED: False`.

**Option 1 — Use a shared Gateway (recommended for local dev):**

ICP creates the Gateway. Configure MI to reuse it instead of creating its own by setting the following in `mi-values.yaml`:

```yaml
wso2:
  gatewayAPI:
    enabled: true
    createGateway: false             # Do not create a new Gateway
    gatewayName: wso2-gateway        # Reuse ICP's gateway name
    gatewayNamespace: default        # Namespace where ICP's gateway was created
    hostname: mi.wso2.com
```

With this setup, both MI and ICP share the same LoadBalancer IP. Add both hostnames to your hosts file pointing to that single IP.

**Option 2 — Use NodePort (no LoadBalancer needed):**

Find the NodePort assigned to the MI service:

```bash
kubectl get svc -n dev
```

Then invoke directly using the NodePort:

```bash
curl -X POST https://localhost:<NODE_PORT>/currencyapi \
  -d '{"fromCurrency": "AUD", "toCurrency": "USD"}' \
  -H "Content-Type: application/json" -k
```

#### Invoke without Gateway

You can access the deployed WSO2 Integrator: MI and Integration Control Plane (ICP) without using a gateway by forwarding service ports locally. This is useful for testing or when ingress is not set up.

!!! note
    Port-forwarding connects directly to the Kubernetes service, bypassing both the NGINX Ingress controller and the Kubernetes Gateway API. This method works regardless of which ingress approach you chose.

1. Port-forward the WSO2 Integrator: MI service:

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

**1. Pods are not starting / stuck in `Pending` or `CrashLoopBackOff`**

Run `kubectl describe pod <pod-name> -n <namespace>` and check the `Events` section for details. Common causes include image pull failures (check credentials in `icp-values.yaml`), resource constraints, or misconfigured security context values.

---

**2. Gateway is `PROGRAMMED: False`**

```bash
kubectl describe gateway wso2-gateway -n default
```

If you see a `PROGRAMMED: False` condition, it usually means a second Gateway is competing for the same LoadBalancer IP. On local Kubernetes distributions (Rancher Desktop, Minikube), only one LoadBalancer IP is available. Ensure MI is configured with `createGateway: false` and `gatewayName: wso2-gateway` to reuse the ICP Gateway. See [Single-gateway workaround for local Kubernetes](#single-gateway-workaround-for-local-kubernetes).

---

**3. HTTPRoute shows no hostnames or returns 404 / connection refused**

Verify the HTTPRoute was created and bound:

```bash
kubectl get httproute -n <namespace>
kubectl describe httproute <route-name> -n <namespace>
```

Check the `Parents` section in the describe output — it should show the Gateway with `Accepted: True` and `ResolvedRefs: True`. If not, ensure:

- The `gatewayName` and `gatewayNamespace` in `mi-values.yaml` match the actual Gateway resource.
- The hostname in your values file matches the entry in `/etc/hosts`.
- The Gateway's external IP is assigned (`kubectl get gateway -n default`).

---

**4. MI nodes do not appear in the ICP dashboard**

First verify MI pods are running and check the logs for registration errors:

```bash
kubectl logs <mi-pod-name> -n <namespace> | grep -i "icp\|registration\|ssl\|certificate"
```

Common causes:

- **Wrong `icpUrl`**: Ensure the URL uses the Kubernetes service DNS name (e.g., `https://cloud-icp:9445`), not the external Gateway hostname. See [ICP service URL](#icp-service-url).
- **SSL verification failure**: If you see certificate errors in the logs, either set `sslVerify: false` (local dev only) or configure `caCertSecretName` with the ICP CA cert. See [Configuring SSL trust for MI→ICP communication](#configuring-ssl-trust-for-micp-communication).
- **Wrong secret or environment**: The `secret` and `environment` values in `mi-values.yaml` must match exactly what was generated in the ICP dashboard. Re-generate the secret in ICP and update `mi-values.yaml`, then restart MI pods:
    ```bash
    kubectl rollout restart deployment <mi-deployment-name> -n <namespace>
    ```
- **ICP not ready when MI started**: If MI pods started before ICP was fully running, the initial registration may have failed. MI retries automatically, but you can force a retry by restarting the MI pods.

---

**5. `ImagePullBackOff` for ICP image**

The ICP image (`wso2/wso2-integration-control-plane`) is only available to WSO2 subscription holders. Ensure your subscription credentials are correctly set in `icp-values.yaml` under `wso2.subscription.username` and `wso2.subscription.password`.

---

**6. `/etc/hosts` changes not taking effect**

After editing `/etc/hosts`, flush your DNS cache:

- **macOS**: `sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder`
- **Linux**: `sudo systemd-resolve --flush-caches`
- **Windows**: `ipconfig /flushdns`

---

**7. Helm install fails with "release already exists"**

If a previous install attempt failed partway through, run:

```bash
helm uninstall <release-name> -n <namespace>
```

Then re-run the `helm install` command.
