# Connectors Overview

Integration Connectors are extensions to the integration runtime of WSO2. They allow you to interact with SaaS applications on the cloud, databases, and popular B2B protocols. 

Connectors are hosted in a [connector store](https://store.wso2.com/?page=1&product=MI+Connector) and can be added to integration flows in [Micro Integrator for VS Code](https://marketplace.visualstudio.com/items?itemName=WSO2.micro-integrator). Once added, the operations of the connector can be dragged onto your canvas and added to your sequences.

Each connector provides a set of operations you call from your proxy services, sequences, and APIs to interact with the specific third-party service.

This documentation provides an example of how to use each connector and a reference of its operations and properties.

## Categories of connectors

The available connectors can be classified into following categories.

**Cloud Connectors**: These connectors enable you to integrate with the APIs of external cloud systems (SaaS Applications) such as Salesforce, ServiceNow, Gmail, Amazon S3, etc.

**Technology Connectors**: You can send and receive information over standard protocols using connectors like File Connector, ISO8583 Connector, etc.

**Database Connectors**: You can integrate with databases and perform actions using connector operations. 

## Inbound and outbound connectors

Most connectors available in the connector store are outbound connectors that illustrate connections and operations going out from the integration runtime to third-party applications and systems. However, some connectors also enable inbound connectivity from popular third-party applications.

<img src="{{base_path}}/assets/img/integrate/connectors/inbound-outbound.png" title="Inbound and Outbound Connectors" width="700" alt="Inbound and Outbound Connectors"/>

Some examples for inbound connectors are as follows.

* Salesforce
* Amazon SQS
* DB Event Listener

## Advantages of connectors

Using connectors provides the following advantages:

<table>
    <tr>
        <th>Advantage</th>
        <th>Description</th>
    </tr>
    <tr>
        <td><b>Integrate fast</b></td>
        <td>Let's say you need to get some data from Salesforce and return some of it back to users. If you want to do it, first you need to find and analyze the available APIs from Salesforce. Then you need to code to interfaces or use an SDK provided to communicate with the third party. Designing such a module from the ground up takes a lot of time. Connectors make this process simple as you can easily add the connector via the MI VS Code extension. Search and select your connector’s operations onto the canvas and use them to design your integration flow with the help of our detailed documentation.</td>
    </tr>
    <tr>
        <td><b>Easy to use</b></td>
        <td>Connector operations are designed to hide complexities in communication and expose what is required for the users for integration. Connectors are fully supported by the MI VS Code extension so you can just search and select operations and configure the integration flow. There is less code complexity when using connectors as most of the intricacy has already been dealt with. It is also very easy to authenticate with external systems as you only need to configure credentials and access URLs in most cases.</td>
    </tr>
    <tr>
        <td><b>150+ available connectors</b></td>
        <td>There are numerous connectors available in the store. This provides multiple options on SAAS providers and popular APIs for you to build your integration use cases as required.</td>
    </tr>
    <tr>
        <td><b>Less domain knowledge required</b></td>
        <td>When integrating with different APIs, the Connector documentation provides detailed information. Less domain knowledge is required when integrating with systems since all the information about operations is available to you and you do not need to know elaborate details of the system you are integrating with. You can spend less time studying the APIs and focus more on business use cases.</td>
    </tr>
    <tr>
        <td><b>Dynamically added to the runtime</b></td>
        <td>Connectors and most of the extensions can be directly added to and removed from the runtime. It is not required to restart the servers for deployments.</td>
    </tr>
    <tr>
        <td><b>Easy maintenance</b></td>
        <td>Connectors act as a bridge between the main integration logic and the third-party application. Even if the application needs to be updated to support new features, the main integration logic of the API version does not need to be changed.</td>
    </tr>
</table>

## How to use connectors

When configuring the integration logic, you need to use Micro Integrator for VS Code. When ready, you can export the project along with dependency connectors to the integration runtime. See [documentation on adding connectors]({{base_path}}/develop/creating-artifacts/adding-connectors/) for more information.

<!-- TODO: Update with new video for VS Code Extension -->
<!-- See the following video for a quick look at how to use connectors.

<iframe width="560" height="315" src="https://www.youtube.com/embed/O2rAFdL8lZQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> -->

> **Note**: You can also access the connectors directly from the [connector store](https://store.wso2.com/?page=1&product=MI+Connector) if required. 

### Connectors in MI VS Code Extension

You can search and import the required connectors to your integration project in the MI VS Code extension. Once imported, the supported operations are displayed on the design palette.

### Initialize connector

You can search for the desired connector in the MI VS Code extension and select the required operation. This action will insert the selected operation at the appropriate point in the message flow. Ensure that the relevant configurations are provided before adding the operation to the flow.

### Operations

An operation of a particular connector represents a function that can be executed using that connector. The input parameters of an operation can be hard-coded or fed into the connector programmatically using Properties. You can use any property (custom or internal) set to the message flow before the connector operation is used. Sometimes, the payload in the message context is considered by the connector for its operation as the payload to be sent over the connector. You can manipulate this payload using mediators like enrich, payloadfactory, etc. After the connector operation is used in the message flow, the response received by invoking that operation will be available in the message context for the next mediator to be used. 

### Input sources

As described above, input for the connector operations would be:

* Hard-coded values
* Values of properties set to the message flow before the connector operation is used 
* Payload that is in message context (message flow) at the place where the connector operation is used

### Inbound endpoints

Inbound endpoints are used to listen or poll for messages from external systems like Kafka and NATS. These are also used to trigger events in your integration runtime and start a message flow upon changes made to external systems (i.e., RDBMS Database). 

The configurations are made using the MI VS Code extension for inbound endpoints as well. When configuring, you need to define it as an inbound endpoint of type “custom”. The parameter “class” has the fully qualified name for the Java class implementing message pooling functionality. 

You need to download the required libraries from the connector store and import them to the integration runtime. Usually, the inbound endpoint is co-hosted with the associated outbound connector. 

### Exporting to runtime

Once the integration logic is done, you can export it along with the dependency connectors as a CApp. CApp is the deployable unit of your integration logic. However, when you are using inbound endpoints, you need to place corresponding libraries in the integration runtime. 

## Example scenarios and operations

Within this documentation, each connector has an example scenario associated with it that illustrates how a simple use case can be done using the connector. It also has a detailed reference guide that lists the operations and the respective properties of each of these operations, highlighting sample values, required configurations, and even sample requests and responses.

!!! Info
    For more details on connectors not mentioned in this documentation, you can refer to the [WSO2 ESB Connectors documentation](https://docs.wso2.com/display/ESBCONNECTORS/WSO2+ESB+Connectors+Documentation) or in the [GitHub repository of the connector](https://github.com/wso2-extensions) you are looking for.

## Empowering the developer

We have to be honest; we would really like to encourage developers who want to solve integration problems. If you have a use case that requires you to customize one of our connectors, we encourage you to go ahead and make the changes you need. 

### Report an issue

You can report issues for any connector under the [Micro Integrator repository](https://github.com/wso2/micro-integrator/issues/new). Once you have reported the issue, do the following:

* Add the label `Connector`. 
* Add to the project `WSO2 Connectors`.

For an example, please refer to [this issue](https://github.com/wso2/micro-integrator/issues/1358). 

### Contribute to the connector project

1. Search for the connector you want to customize in the [WSO2 Extensions GitHub repository](https://github.com/wso2-extensions) and clone it.

2. Use the following command to build the connector.

    ```
    mvn clean install
    ```

3. Make the changes you need and send in a pull request.

### Write your own custom connector

There may be instances where the product you want to integrate with does not have a connector as yet. In this case, you can build your own connector. Please refer to the document [here]({{base_path}}/develop/customizations/creating-new-connector) for detailed instructions. The following are the types of custom connectors that you can write.

* Custom connector 
* Custom inbound endpoint  
