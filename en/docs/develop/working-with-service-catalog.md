# Publishing Integrations to the API Manager

A REST API artifact you create from the MI for VS Code extension is exposed to consumers when you run it on the Micro Integrator runtime. If you want to control and manage this API, and also expose it to an API marketplace where it becomes discoverable to a wider community of consumers, you need to publish this REST API to the API management layer (API-M runtime) of the product.

Follow the steps given below to publish REST APIs from the Micro Integrator to the API-M runtime.

!!! tip "Related Tutorials"
        To try out an end-to-end use case where an integration service is created and used as a managed API, see the tutorial on [Exposing an Integration Service as a Managed API]({{base_path}}/learn/integration-tutorials/service-catalog-tutorial/).

## Prerequisites

Develop a REST API artifact using the MI for VS Code extension. This is your integration service with the mediation logic that will run on the Micro Integrator.

## Step 1 - Configure the Micro Integrator server

The Micro Integrator contains a client for publishing integrations to the API-M runtime. To enable this client, update the following in the `deployment.toml` file of your Micro Integrator.

```toml
[[service_catalog]]
apim_host = "https://localhost:9443"
enable = true
username = "admin"
password = "admin"
```

See the descriptions of the [service catalog parameters]({{base_path}}/reference/config-catalog-mi/#service-catalog-client).

## Step 1 - Start the servers

Once you have created the integration service and deployed it in the Micro Integrator, you only need to start the two servers (API-M server and the Micro Integrator server). 

Note that the API-M server should be started before the Micro Integrator. The client in the Micro Integrator publishes the integration services to the API-M layer during server startup.

## What's Next?

Once the servers are started and the services are published, you can access the service from the API-M layer, and then proceed to **Create**, **Deploy**, and **Publish** the API as follows:

1. [Create and API ](https://apim.docs.wso2.com/en/4.3.0/design/create-api/create-an-api-using-a-service/) using the integration service.
2. [Deploy the API](https://apim.docs.wso2.com/en/4.3.0/deploy-and-publish/deploy-on-gateway/deploy-api/deploy-an-api/) in the API Gateway.
3. [Publish the API](https://apim.docs.wso2.com/en/4.3.0/deploy-and-publish/publish-on-dev-portal/publish-an-api/) to the Developer Portal.
