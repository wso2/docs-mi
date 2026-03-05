# Deploy WSO2 Integrator: MI and Integration Control Plane (ICP) on OpenShift Using Helm

This guide walks you through deploying WSO2 Integrator:  MI and the Integration Control Plane (ICP) as containerized applications on an OpenShift cluster using the official WSO2 Helm charts.

## Before you begin

- Ensure you have an active [WSO2 Subscription](https://wso2.com/subscription). If you don't have a subscription, sign up for a [WSO2 Free Trial Subscription](https://wso2.com/free-trial-subscription).

    !!! Note
        You need an active subscription to use the updated Docker images of the WSO2 Integrator: MI with your Helm resources. Otherwise, you can use the community version of the Docker images, which do not include product updates.
    
- Install [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git), [Docker](https://www.docker.com), [Helm](https://helm.sh/docs/intro/install/), and the [OpenShift CLI (oc)](https://docs.redhat.com/en/documentation/openshift_container_platform/4.18/html/cli_tools/openshift-cli-oc).
    
- Set up an OpenShift cluster.

- Deploy an [Ingress-NGINX Controller](https://www.redhat.com/en/blog/using-nginx-ingress-controller-red-hat-openshift) on the cluster to manage external access to services.

## Step 1 - Get the Helm resources

You can find the official WSO2 Integrator: MI Helm charts repository at: <a target="_blank" href="https://github.com/wso2/helm-mi">https://github.com/wso2/helm-mi</a>

1. Open a terminal and navigate to the location where you want to save the local copy.

2. Clone the WSO2 Integrator: MI Git repository that contains the Helm resources:

    ```bash
    git clone https://github.com/wso2-enterprise/helm-mi.git
    cd helm-mi
    git checkout 4.5.x
    ```

    !!! note
        The `4.6.x` branch includes Helm resources that are compatible with WSO2 Integrator: MI version 4.6.0.

Let's refer to the root folder of the cloned repository as `<HELM_HOME>` throughout this guide.

## Step 2 - Build an OpenShift-Compatible Docker Image

OpenShift enforces security by disallowing containers from running as the `root` user. Instead, it assigns a random, non-root user that belongs to the root group (GID 0) at runtime. As a result, the default [WSO2 Integrator: MI image](https://hub.docker.com/r/wso2/wso2mi) may not function correctly because the random user may lack the necessary permissions to access critical files and directories.

To resolve this, you need to build a custom Docker image that ensures:

- File and folder ownership is set to the `root` group.
- Group permissions are correctly configured to allow access by any user within the `root` group.

This custom image ensures compatibility with OpenShift's security model while maintaining the functionality of WSO2 Integrator: MI.

!!! Note "WSO2 Integrator: MI Image"

    You can use the [MI for VS Code Extension]({{base_path}}/install-and-setup/setup/deployment/configuring-helm-charts/#use-the-mi-for-vs-code-extension) to update the Dockerfile of your integration project when building the image.

    Below is a sample `Dockerfile` for building an OpenShift-compatible WSO2 Integrator: MI image:

    ```Docker
    FROM wso2/wso2mi:4.6.0-alpine

    USER root
    RUN chgrp -R root "$WSO2_SERVER_HOME" && chmod -R g+rwX "$WSO2_SERVER_HOME"
    USER ${USER_ID}
    ```

!!! Note "Integration Control Plane Image"

    Similarly, for the Integration Control Plane, you can use the following base `Dockerfile`:

    ```Docker
    FROM wso2/wso2-integration-control-plane:1.2.0-alpine

    USER root
    RUN chgrp -R root "$WSO2_SERVER_HOME" && chmod -R g+rwX "$WSO2_SERVER_HOME"
    USER ${USER_ID}
    ```

## Step 3 - Deploy MI and ICP

To deploy WSO2 Integrator:  MI and Integration Control Plane (ICP) on OpenShift, you must override specific Helm chart parameters to align with OpenShift’s security model.

### Required Helm Parameters

```
--set wso2.deployment.apparmor.enabled="false" \
--set wso2.deployment.securityContext.enableRunAsUser="false" \
--set wso2.deployment.securityContext.enableRunAsGroup="false" \
--set wso2.deployment.configMaps.entryPoint.defaultMode=0457
```

- `enableRunAsUser: false` allows OpenShift to assign a random UID for the container.
- `enableRunAsGroup: false` allows OpenShift to assign a random non-root GID for the container.
- `apparmor.enabled: false` disables AppArmor, which is not typically required in OpenShift.
- `configMaps.entryPoint.defaultMode: 0457` ensures the runtime user has execute permission on mounted ConfigMaps.

### Deployment Steps

Following are example commands to deploy MI and ICP:

1. Create the OpenShift namespace.

    Ensure the namespace exists or create it using the following command.

    ```bash
    oc get namespace <NAMESPACE> || oc create namespace <NAMESPACE>
    ```

2. Deploy the WSO2 Integrator: MI

    Navigate to the `<HELM_HOME>/mi` directory and run:

    ```bash 
    helm install <RELEASE_NAME> -n <NAMESPACE> . \
    --set wso2.deployment.image.registry="<DOCKER_REGISTRY>" \
    --set wso2.deployment.image.repository="<DOCKER_REPO>" \
    --set wso2.deployment.image.tag="<DOCKER_IMAGE_TAG>" \
    --set wso2.deployment.apparmor.enabled="false" \
    --set wso2.deployment.securityContext.enableRunAsUser="false" \
    --set wso2.deployment.securityContext.enableRunAsGroup="false" \
    --set wso2.deployment.configMaps.entryPoint.defaultMode=0457
    ```

3. Deploy the Integration Control Plane (ICP)

    Navigate to the `<HELM_HOME>/icp` directory and run:

    ```bash 
    helm install <RELEASE_NAME> -n <NAMESPACE> . \
    --set wso2.deployment.image.registry="<DOCKER_REGISTRY>" \
    --set wso2.deployment.image.repository="<DOCKER_REPO>" \
    --set wso2.deployment.image.tag="<DOCKER_IMAGE_TAG>" \
    --set wso2.deployment.apparmor.enabled="false" \
    --set wso2.deployment.securityContext.enableRunAsUser="false" \
    --set wso2.deployment.configMaps.entryPoint.defaultMode=0457
    ```

!!! Tip
    - You can use an image digest instead of a tag:
        ```
        --set wso2.deployment.image.digest=<digest> 
        ```
    - The parameters shown above are specific to OpenShift compatibility. For a full list of configurable options, see the [Configure Helm charts for WSO2 Integrator: MI]({{base_path}}/install-and-setup/setup/deployment/configuring-helm-charts/) guide.

## Step 4 - Verify and test the deployment

Once the deployment is successful, the following resources will be created in your OpenShift cluster. Use the commands below to verify the deployment status.

!!! note
    - It may take up to 1 minute for all pods to be fully initialized and reach the `Running` state.

1. Run the following command to check whether the WSO2 Integrator: MI and Integration Control Plane (ICP) pods are running:

    ```bash
    oc get pods -n <NAMESPACE>
    ```

    You should see output similar to the following:
  
    ``` 
    NAME                                                                READY   STATUS    RESTARTS       AGE
    cloud-icp-d5575fb-x6gnw                         1/1     Running             0                 5m32s
    cloud-apis-intg-7486b48657-tdcww    1/1     Running             0                 108s
    cloud-apis-intg-7486b48657-2gf5c       1/1     Running             0                 108s
    ```

### Access the Integrations and Integration Control Plane

Follow the steps below to invoke the deployed integration services and access the Integration Control Plane (ICP).

1. Run the following command to retrieve the external IP and hostnames exposed via Ingress.

    ```bash
    oc get ingress -n <NAMESPACE>
    ```

    Example output:
  
    ``` 
    NAME                            CLASS   HOSTS                 ADDRESS        PORTS     AGE
    cloud-apis-intg         nginx   mi.wso2.com    192.168.5.15   80, 443   145m
    cloud-icp                     nginx   icp.wso2.com   192.168.5.15   80, 443   145m
    ```

2. Add host entries.

    To use the domain names exposed via Ingress (`mi.wso2.com` and `icp.wso2.com`), map them to the external IP in your `/etc/hosts` file.

    For example, if your ingress IP is 192.168.5.15, add the following lines.

    ```
    192.168.5.15    mi.wso2.com
    192.168.5.15    icp.wso2.com
    ```

3. Invoke the integration.

    Once the host mapping is in place, you can invoke the deployed integration APIs using:

    ```curl
    curl https://mi.wso2.com/<API_CONTEXT>/<RESOURCE>
    ```

4. Access the Integration Control Plane.

    Open <a target="_blank" href="https://icp.wso2.com/login">https://icp.wso2.com/login</a> in your browser and sign in using the credentials.

     <a href="{{base_path}}/assets/img/setup-and-install/icp_login.png"><img src="{{base_path}}/assets/img/setup-and-install/icp_login.png" alt="ICP Login page" width="80%"></a>
