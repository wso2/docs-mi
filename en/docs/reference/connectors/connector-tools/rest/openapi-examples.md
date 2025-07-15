## What you'll build

## Integrate with a Pet Store API using OpenAPI Connector Generator

This example demonstrates how you can use the WSO2 Micro Integrator OpenAPI Connector Generator to easily integrate with an external PetStore REST API.

It covers generating the connector from an OpenAPI spec, importing into your integration project, and wiring it up to create and retrieve pets details.

<a href="{{base_path}}/assets/img/integrate/connectors/openapi-tool/openapi-diagram.png"><img src="{{base_path}}/assets/img/integrate/connectors/openapi-tool/openapi-diagram.png" alt="generated connector" width="80%" ></a>


## Prerequisites

1. Download the sample petStore openapi contract file [`petstore-service.yaml`](https://raw.githubusercontent.com/swagger-api/swagger-petstore/refs/tags/swagger-petstore-v3-1.0.19/src/main/resources/openapi.yaml) file.

## Steps to follow

**Step 01:** Create a new integration project in WSO2 Micro Integrator for VS Code, see [Create an Integration Project]({{base_path}}/develop/create-integration-project).

**Step 02:** Create a new sequence or API artifact within your integration project, see [Create Sequence]({{base_path}}/reference/mediators/sequence-mediator).

<a href="{{base_path}}/assets/img/integrate/connectors/openapi-tool/openapi-seq.png"><img src="{{base_path}}/assets/img/integrate/connectors/openapi-tool/openapi-seq.png" alt="generated connector" width="20%" hight="40%" ></a>


**Step 03:** Using `petstore-service.yaml` file, Generate the REST connector following the steps describe in under [the section Generate OpenAPI Connector]({{base_path}}/reference/connectors/connector-tools/rest/rest-connector-overview)

**Step 04:** From the Mediator Palette, select the `swagger_petstore` connector that was generated from the [`petstore-service.yaml`](https://raw.githubusercontent.com/swagger-api/swagger-petstore/refs/tags/swagger-petstore-v3-1.0.19/src/main/resources/openapi.yaml).

<a href="{{base_path}}/assets/img/integrate/connectors/openapi-tool/petstore-connection.png"><img src="{{base_path}}/assets/img/integrate/connectors/openapi-tool/petstore-connection.png" alt="generated connector" width="60%" ></a>

**Step 05:** Create a connection by filling in the form with the required authentication details.

| Property        | Value                          | 
|-----------------|--------------------------------|
| Connection Name | petStoreConnection             |
| Base URL        | https://petstore.swagger.io/v2 |

<a href="{{base_path}}/assets/img/integrate/connectors/openapi-tool/petstore-connection-2.png"><img src="{{base_path}}/assets/img/integrate/connectors/openapi-tool/petstore-connection-2.png" alt="Create Order" width="50%" height="60%" ></a>

**Step 06:** Add the `AddPet` operation to your sequence or API. Provide the necessary input for the form UI for the operation.
<a href="{{base_path}}/assets/img/integrate/connectors/openapi-tool/AddPet.png"><img src="{{base_path}}/assets/img/integrate/connectors/openapi-tool/addpet-operation.png" alt="generated connector" width="40%" hight="40%" ></a>

<a href="{{base_path}}/assets/img/integrate/connectors/openapi-tool/AddPet.png"><img src="{{base_path}}/assets/img/integrate/connectors/openapi-tool/AddPet.png" alt="generated connector" width="40%" hight="30%"></a>

**Step 07:** Similarly, you can use the `GetPetById` operation to retrieve order details by supplying the `pet id`. Again, make sure the response overwrites the payload.

**Step 08:** Add any response handling logic needed to process the output from the openAPI calls at the end of your sequence or API.

<a href="{{base_path}}/assets/img/integrate/connectors/openapi-tool/rest-sequance.png"><img src="{{base_path}}/assets/img/integrate/connectors/openapi-tool/rest-sequance.png" alt="generated connector" width="40%" ></a>

**Step 09:** Deploy, Run and Test the Integration

In order to deploy and run the project, refer the [build and run](https://mi.docs.wso2.com/en/latest/develop/deploy-artifacts/) guide or simply use the Run button in the Visual Studio Code extension to run the integration.
Once the pet details added to the petstore, you can see similar output below.

<a href="{{base_path}}/assets/img/integrate/connectors/openapi-tool/response.png"><img src="{{base_path}}/assets/img/integrate/connectors/openapi-tool/response.png" alt="generated connector" width="60%" ></a>


