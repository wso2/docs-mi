# Configure Kubernetes Deployment

## Before you begin

1. Install Kubernetes.
2. Start your Kubernetes cluster.
3. Install kubectl.
4. Configure your cluster context.

## Configure Kubernetes Deployment

We can use the Micro Integrator VS Code Extension to generate the basic Kubernetes deployment configuration for an integration solution.

1. Make sure a Kubernetes host is configured in your machine.
2. Open the Overview page and select the **Configure Kubernetes Deployment** option from the **Deployment Options** section and then click on **Configure**.

    <img src="{{base_path}}/assets/img/develop/select-configure-k8.png" alt="select configure kubernetes" width="700">
   
3. Fill the relevant details accordingly in the **Kubernetes Configuration Form** and click on **Create**.

    <img src="{{base_path}}/assets/img/develop/configure-k8.png" alt="configure kubernetes" width="700">
   
4. Open a terminal in the `deployment/kubernetes` directory of the project, as this is where the relevant configuration files are generated.
5. If you have added environment variables, apply them first by executing the below command.

    ```
    kubectl apply -f integration_data.yaml
    ```
   
6. Apply the deployment configuration by executing the below command .

    ```
    kubectl apply -f integration_k8s.yaml
    ```
   
7. Verify that the pods are running.
