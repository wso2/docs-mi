#WSO2 Integrator: MI Deployment Patterns on Kubernetes

These are the deployment patterns you can use when deploying your WSO2 Integrator: MI-based integration solutions in a Kubernetes environment.

When you deploy your integrations, the main concern is to ensure high availability and scalability of your system. Therefore, you need to decide upon the number of **worker nodes** and the number of **replicas** that are required for the purposes of scaling the deployment and ensuring high availability.

## Single Replica

The following diagram depicts a single worker node deployment, which contains a single pod (single replica).

<img src="{{base_path}}/assets/img/integrate/k8s_deployment/k8s-single-pod.png" width="300">

A single worker node will reduce your management overheads when you build an on-premise cluster (does not apply to cloud instances). Also, there will be lower costs and resource requirements when compared to a multiple node cluster.

### Load balancing

The single replica deployment is not recommended if you expect a high amount of traffic to your deployment. Because there is only one replica, it is not possible to balance a high workload across multiple instances.

### High availability

The failure of this single worker node will take down the entire WSO2 Integrator: MI deployment (because we don't have an additional node to take over the workload). Also, if there is a failure in the single pod, there will be a downtime before a new pod is spawned again. This downtime can vary depending on the server_startup_time + artifact_deployment_time, which could lead to a significant downtime in your cluster. If this downtime is acceptable and does not negatively impact your requirements, this approach may be the easiest way for you to get started. Otherwise, to achieve high availability, you require more than one worker node (which avoids single point of failure) and multiple replicas of the pod (which avoids pod downtime).

## Multiple Replicas

The following diagram depicts a Kubernetes cluster with multiple replicas of an integration deployment, which is scaled across multiple worker nodes. 

!!! Note
	In this example, one node only carries one replica of a pod. However, depending on the capacity of your worker node, you can maintain multiple pod replicas in a single worker node.

<img src="{{base_path}}/assets/img/integrate/k8s_deployment/k8s-muliple-workers-single-pod.png" width="700">

When you have multiple instances of an application, you need a way to distribute the traffic to all of them. Therefore, the cluster should be fronted by an <b>Ingress</b> or an <b>external load balancer service</b> (given that your Kubernetes environment supports external load balancers) that will distribute network traffic to all pods of the exposed deployment.

### Load balancing

This deployment pattern is suitable for handling high incoming traffic because the workload is shared by multiple instances (replicas) of the deployment. The ingress or external load balancer that fronts the deployment distributes the workload across replicas.

### High availability

This approach ensures high availability in your cluster. If one worker node fails, the traffic will be routed to another worker node. Similarly, if one pod replica fails, the traffic will be routed to another replica that runs concurrently at a given point of time. The pods will not experience any downtime because new pods don't need to be spawned every time one pod fails.

### Rolling updates

Because there are multiple replicas (i.e., multiple instances of the same deployment) running, you can apply rolling updates with zero downtime.

## Multiple Replicas (with Coordination)

Most of the integration solutions that you develop can be deployed using a single WSO2 Integrator: MI container. That is, as explained in the previous deployment pattern, you can have multiple replicas of a single pod. Because most of these integration flows are stateless (does not need to persist status) the multiple instances (replicas) are not required to coordinate with one other.

However, the following integration artifacts are **stateful** and require coordination when deployed across multiple WSO2 Integrator: MI instances.

-   Scheduled triggers
-   Message Processors
-   Polling Inbound Endpoints
    -   File Inbound Endpoint
    -   JMS Inbound Endpoint
    -   Kafka Inbound Endpoint
-   Event-based Inbound Endpoints
    -   MQTT Inbound Endpoint
    -   RabbitMQ Inbound Endpoint

You can still deploy these stateful artifacts in multiple replicas as long as coordination is properly configured. WSO2 Integrator: MI supports clustering via a coordination database, which ensures that only one instance actively executes a given task. This prevents duplicate executions and maintains consistency across the cluster.

!!! Tip
    - See [Coordination configurations]({{base_path}}/install-and-setup/setup/deployment/configuring-helm-charts/#coordination-configurations) for instructions on configuring coordination across multiple WSO2 Integrator: MI instances using the Helm charts.
    - If you dynamically change the state of a Message Processor, Inbound Endpoint, or Scheduled trigger (Task) using the Management API or Integration Control Plane, you must share the registry across WSO2 Integrator: MI instances to persist the state when new nodes join the cluster. Refer to the [Registry synchronization](#registry-synchronization) for Kubernetes-specific instructions. Registry synchronization is an optional setup and is not required for basic coordination. See [Registry synchronization]({{base_path}}/install-and-setup/setup/deployment/deploying-wso2-mi/#registry-synchronization-sharing) for more information.

<img src="{{base_path}}/assets/img/integrate/k8s_deployment/k8s_coordination.png">

!!! Note
    As long as you maintain a single artifact deployment for each of these artifacts, coordination is not required. You can arrange your cluster in the following manner to ensure that the same task is not deployed in multiple containers/pods in the cluster.

    <img src="{{base_path}}/assets/img/integrate/k8s_deployment/k8s-muliple-workers.png" width="80%">

### High availability

When stateful artifacts are deployed with coordination enabled across multiple WSO2 Integrator: MI replicas, each artifact such as Scheduled triggers or message processors is executed by only one MI instance at a time. By default, these artifacts are automatically assigned to available nodes in the cluster, ensuring consistent and conflict free execution.

If the MI instance currently executing a particular artifact becomes unavailable, another node will seamlessly take over its execution. This ensures high availability and avoids service interruptions by enabling automatic failover of stateful tasks.

### Registry synchronization

Registry sharing is required if you dynamically change the state of a Message Processor, Inbound Endpoint, or Scheduled trigger (Task) using the Management API or Integration Control Plane, or if any other artifact state or data needs to be consistent across all nodes in the cluster.

In a Kubernetes deployment, since pods are ephemeral and do not share a local file system by default, the `<MI_HOME>/registry` directory must be backed by a shared, persistent volume that is accessible by all replicas simultaneously.

1.  Ensure your Kubernetes environment has a `StorageClass` that supports the `ReadWriteMany` (RWX) access mode, so that multiple pods can mount the same volume concurrently. Follow your Kubernetes provider's documentation to provision RWX-capable storage in your environment.
2.  Create a `PersistentVolumeClaim` (PVC) that requests this shared volume.

    ```yaml
    apiVersion: v1
    kind: PersistentVolumeClaim
    metadata:
      name: mi-shared-registry-pvc
    spec:
      accessModes:
        - ReadWriteMany
      storageClassName: "<RWX_STORAGE_CLASS_NAME>"
      resources:
        requests:
          storage: 1Gi
    ```

    Replace `<RWX_STORAGE_CLASS_NAME>` with a StorageClass in your Kubernetes environment that supports `ReadWriteMany` access.

3.  Mount the PVC at the `<MI_HOME>/registry` path in the WSO2 Integrator: MI container specification, using the same PVC across all replicas in the Deployment or StatefulSet.

    ```yaml
    spec:
      template:
        spec:
          containers:
            - name: mi
              volumeMounts:
                - name: shared-registry
                  mountPath: "<MI_HOME>/registry"
          volumes:
            - name: shared-registry
              persistentVolumeClaim:
                claimName: mi-shared-registry-pvc
    ```
