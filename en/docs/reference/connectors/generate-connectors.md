# Generate a connector

## Generate a connector from an OpenAPI definition

This document explains how to generate a connector from an OpenAPI definition using WSO2 Integrator: MI for VSCode Extension. By using an OpenAPI definition, users can automatically create a connector that enables seamless integration with RESTful APIs. The connector will be added to your project and you can use it in your integration flows. When you share your Integration Project with others, the connector will be included in the project.

Follow the below steps to generate a connector using the WSO2 Integrator: MI for VS Code extension (MI for VS Code).

1. Launch Visual Studio Code with the MI for VS Code extension installed.

    !!! info
        Follow the [Install WSO2 Integrator: MI for VS Code]({{base_path}}/develop/mi-for-vscode/install-wso2-mi-for-vscode) documentation for a complete installation guide.

2. Create a new integration project.

    Click **Create New Project** on **WSO2 Integrator: MI Project Explorer**. For more options to create a new integration project, see [Create an Integration Project]({{base_path}}/develop/create-integration-project).

3. Navigate to the **Project Overview** page.

4. Click on **Add artifact**.

    <a href="{{base_path}}/assets/img/develop/create-artifacts/add-artifact-icon.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/add-artifact-icon.png" alt="add artifact" width="40%"></a>

5. Click **+ View More** under **Create an Integration**.

6. Select **Connections** under **Other Artifacts** to open the **Connector Store** form.

    <a href="{{base_path}}/assets/img/integrate/connectors/connections-artifact.png"><img src="{{base_path}}/assets/img/integrate/connectors/connections-artifact.png" alt="connections artifact" width="60%"></a>

7. Click **Import Connector**.

    <a href="{{base_path}}/assets/img/integrate/connectors/import-connector-openapi.png"><img src="{{base_path}}/assets/img/integrate/connectors/import-connector-openapi.png" alt="import connector" width="60%"></a>

8. Select **Import Using OpenAPI** method and click on **Select Location** to upload the OpenAPI definition file. After uploading the file, click **Import**.

    !!! Tip
        You can download a sample OpenAPI definition file from [here](https://raw.githubusercontent.com/swagger-api/swagger-petstore/refs/tags/swagger-petstore-v3-1.0.19/src/main/resources/openapi.yaml).

    <a href="{{base_path}}/assets/img/integrate/connectors/import-openapi-method.png"><img src="{{base_path}}/assets/img/integrate/connectors/import-openapi-method.png" alt="import connector form" width="60%"></a>

9. If the OpenAPI definition is valid, the connector will be generated and added to the project. You can view the generated connection type in the **Connections**.

    <a href="{{base_path}}/assets/img/integrate/connectors/generated-connector.png"><img src="{{base_path}}/assets/img/integrate/connectors/generated-connector.png" alt="generated connector" width="60%"></a>

10. To use the connector operations, you can create an integration artifact (such as API and sequence) and add it from the Mediator Palette.

    <a href="{{base_path}}/assets/img/integrate/connectors/use-connector.png"><img src="{{base_path}}/assets/img/integrate/connectors/use-connector.png" alt="use connector" width="60%"></a>


## Generate a gRPC connector from a Proto definition

This section explains how to generate a gRPC connector from a `.proto` file using the WSO2 Integrator:  MI Connector Generator tool. The gRPC connector enables seamless communication between services, facilitating integration with systems that expose gRPC APIs. By utilizing a `.proto` file, which defines the service and message structure, the connector is automatically generated, allowing you to implement a fully functional gRPC client in your integration.

### Prerequisites

Before you begin, ensure you have the following:

* **Java Development Kit (JDK) 8 or later**
* **Apache Maven 3.6.x or higher**

### Steps to generate the connector

There are two ways of generating a gRPC connector from a `.proto` file:

1. **Using the WSO2 Integrator: MI for VS Code extension**: This method allows you to generate a connector directly from the VS Code IDE.
2. **Using the WSO2 MI Connector Tooling**: This method involves using a command-line tool to generate the connector from a `.proto` file.

#### Option 01: Using the WSO2 Integrator: MI for VS Code extension

Follow the steps below to generate the gRPC connector:

1. **Launch Visual Studio Code** with the MI for VS Code extension installed.

    !!! info
        Follow the [Install WSO2 Integrator: MI for VS Code]({{base_path}}/develop/mi-for-vscode/install-wso2-mi-for-vscode) documentation for a complete installation guide.

2. **Create a new integration project**.

    Click **Create New Project** on **WSO2 Integrator: MI Project Explorer**. For more options to create a new integration project, see [Create an Integration Project]({{base_path}}/develop/create-integration-project).

3. **Navigate to the Project Overview page**.

4. Add a new artifact by clicking on **Add artifact**.

    <a href="{{base_path}}/assets/img/develop/create-artifacts/add-artifact-icon.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/add-artifact-icon.png" alt="add artifact" width="40%"></a>

5. Click on **+ View More** under **Create an Integration**.

6. Select **Connections** under **Other Artifacts** to open the **Connector Store** form.

      <a href="{{base_path}}/assets/img/integrate/connectors/connections-artifact.png"><img src="{{base_path}}/assets/img/integrate/connectors/connections-artifact.png" alt="connections artifact" width="60%"></a>

7. Click on the **For gRPC (Proto)**

      <a href="{{base_path}}/assets/img/integrate/connectors/grpc-tool/grpc-tool-6.png"><img src="{{base_path}}/assets/img/integrate/connectors/grpc-tool/grpc-tool-6.png" alt="connections artifact" width="60%"></a>

8. Then select a location for the .proto file and click the **import**

9. If the given proto file is valid, You can view the generated connection type in the **Connections**.

      <a href="{{base_path}}/assets/img/integrate/connectors/grpc-tool/grpc-tool-4.png"><img src="{{base_path}}/assets/img/integrate/connectors/grpc-tool/grpc-tool-4.png" alt="generated connector" width="60%" ></a>

10. To use the connector operations, you can create an integration artifact (such as API and sequence) and add it from the Mediator Palette.

      <a href="{{base_path}}/assets/img/integrate/connectors/grpc-tool/grpc-tool-5.png"><img src="{{base_path}}/assets/img/integrate/connectors/grpc-tool/grpc-tool-5.png" alt="generated connector" width="60%" ></a>

#### Option 02: Using the WSO2 MI Connector Tooling

Follow the steps below to generate the gRPC connector:

1. **Fork the MI connector tooling repository**

    * Fork the [esb-connector-tooling repository](https://github.com/wso2-extensions/esb-connector-tooling).

2. **Build the project using maven**

    * Navigate to your project directory (`<PROJECT_HOME>/`) and build the project using Maven:

    ```bash
    mvn clean install
    ```

3. **Locate the tool**

    * Once built, the tool will be packaged as a zip file: `mi-connector-generator-{version}.zip`.
    * You can find this file in the `<PROJECT_HOME>/target` directory.

4. **Extract the tool**

    * Extract the `mi-connector-generator-{version}.zip` file to your preferred location.

5. **Run the connector generator**

    * Navigate to the extracted folder and go to the `bin` directory.

    * **For macOS/Linux**: Use `generate.sh`:

      ```bash
      ./generator <proto-file> <output-directory> [miVersion]
      ```

    * **For Windows**: Use `generate.bat`:

      ```bash
      generator.bat <proto-file> <output-directory> [miVersion]
      ```

    * Replace:

        * `<proto-file>` with the path to your `.proto` file.
        * `<output-directory>` with the path where you want the connector to be generated.
        * `[miVersion]` with your specific WSO2 Integrator: MI version.

##### Example command

For macOS/Linux:

```bash
./generator /path/to/order-service.proto /path/to/output-directory 4.6.0
```

For Windows:

```bash
generator.bat C:\path\to\order-service.proto C:\path\to\output-directory 4.6.0
```

By following these steps, you can generate a fully functional gRPC connector from a `.proto` file, enabling seamless integration with gRPC-based services in WSO2 Integrator: MI.

##### Steps to import generated connector

1. Navigate to the **Mediator Palette** page
2. Select the **Add Module** under the Mediator Palette.

      <a href="{{base_path}}/assets/img/integrate/connectors/grpc-tool/grpc-tool-1.png"><img src="{{base_path}}/assets/img/integrate/connectors/grpc-tool/grpc-tool-1.png" alt="generated connector" width="60%" ></a>

3. Select **Import Module**

      <a href="{{base_path}}/assets/img/integrate/connectors/grpc-tool/grpc-tool-8.png"><img src="{{base_path}}/assets/img/integrate/connectors/grpc-tool/grpc-tool-8.png" alt="import connector" width="60%"></a>

4. Select Location to upload the generated connector. After providing the generated connector zip file, click **Import**

      <a href="{{base_path}}/assets/img/integrate/connectors/grpc-tool/grpc-tool-9.png"><img src="{{base_path}}/assets/img/integrate/connectors/grpc-tool/grpc-tool-9.png" alt="generated connector" width="60%"></a>

5. You can view the connector type in **the Connections**

      <a href="{{base_path}}/assets/img/integrate/connectors/grpc-tool/grpc-tool-4.png"><img src="{{base_path}}/assets/img/integrate/connectors/grpc-tool/grpc-tool-4.png" alt="generated connector" width="60%" ></a>

6. To use the connector operations, you can create an integration artifact (such as API and sequence) and add it from the Mediator Palette.

      <a href="{{base_path}}/assets/img/integrate/connectors/grpc-tool/grpc-tool-5.png"><img src="{{base_path}}/assets/img/integrate/connectors/grpc-tool/grpc-tool-5.png" alt="generated connector" width="60%" ></a>

### Examples of using the generated connector

##### Order management integration example

This example demonstrates how to integrate with the `OrderService` gRPC API to handle the lifecycle of an order in a retail system—from creation to retrieval and updates. This API facilitates seamless backend communication for e-commerce platforms, inventory systems, and similar applications.

<a href="{{base_path}}/assets/img/integrate/connectors/grpc-tool/highlevel-diagram.png"><img src="{{base_path}}/assets/img/integrate/connectors/grpc-tool/highlevel-diagram.png" alt="generated connector" width="80%" ></a>

1. Create a new integration project in WSO2 Integrator: MI for VS Code, see [Create an Integration Project]({{base_path}}/develop/create-integration-project).
2. Create a new sequence or API artifact within your integration project, see [Create Sequence]({{base_path}}/reference/mediators/sequence-mediator).
         
      <a href="{{base_path}}/assets/img/integrate/connectors/grpc-tool/1_seq_grpc.png"><img src="{{base_path}}/assets/img/integrate/connectors/grpc-tool/1_seq_grpc.png" alt="generated connector" width="20%" hight="40%" ></a>

3. From the Mediator Palette, select the `orderservice` connector that was generated from the [`order-service.proto`]({{base_path}}/assets/attachments/learn/grpc-tool/order-service.proto) file using above one of options.

     <a href="{{base_path}}/assets/img/integrate/connectors/grpc-tool/orderservice.png"><img src="{{base_path}}/assets/img/integrate/connectors/grpc-tool/orderservice.png" alt="generated connector" width="60%" ></a>

4. Create a connection by filling in the form with the required authentication details.

      <a href="{{base_path}}/assets/img/integrate/connectors/grpc-tool/2_connection_form.png"><img src="{{base_path}}/assets/img/integrate/connectors/grpc-tool/2_connection_form.png" alt="Create Order" width="50%" height="60%" ></a>

5. Add the `CreateOrder` operation to your sequence or API. Provide the necessary input as a JSON object that matches the input message defined in the `.proto` file. Ensure the response is set to overwrite the payload.
      - Request message for creating an order.
           ```proto
           message CreateOrderRequest {
              string customer_id = 1;
              string product_id = 2;
              int32 quantity = 3;
              float price = 4;
              }
           ```
      - JSON values for the above message type
         ```json
         {
           "customer_id": "cust123",
           "product_id": "prod789",
           "quantity": 2,
           "price": 299.99
         }
         ```
   <a href="{{base_path}}/assets/img/integrate/connectors/grpc-tool/3_create_form.png"><img src="{{base_path}}/assets/img/integrate/connectors/grpc-tool/3_create_form.png" alt="generated connector" width="30%" height="40%" ></a>

6. Similarly, you can use the `GetOrder` operation to retrieve order details by supplying the `order_id`. Again, make sure the response overwrites the payload. <image4>

      ```json
      {
        "order_id": "order456"
      }
      ```
      
7. Optionally, add the `UpdateOrder` operation to modify existing orders by providing the order ID and updated details.
8. Add any response handling logic needed to process the output from the gRPC calls at the end of your sequence or API.
<a href="{{base_path}}/assets/img/integrate/connectors/grpc-tool/simple-usecase.png"><img src="{{base_path}}/assets/img/integrate/connectors/grpc-tool/simple-usecase.png" alt="generated connector" width="40%" ></a>

---

##### Advanced data mapping example with order management integration

This example shows how to use the generated gRPC connector alongside the `Data Mapper` mediator in WSO2 Integrator: MI to perform advanced data mapping and transformation.

  - Follow steps 1–4 above to set up your integration project and connection.
    - Imagine a scenario where you have a complex JSON object with 30 fields from another data source, and you need to map it to the `CreateOrder` request message defined in the `order-service.proto` file. You can use the `Data Mapper` mediator to transform this complex structure into the expected input for your gRPC call.
      - **Input JSON Example**: This is the complex JSON object you might receive from another service or data source.

          ```json
              {
                       "customer_id": "cust123",
                       "product_id": "prod789",
                       "quantity": 2,
                       "price": 299.99,
                       "shipping_address": {
                       "street": "123 Main St",
                       "city": "Springfield",
                       "state": "IL",
                       "zip_code": "62701"
                       },
                       "billing_address": {
                       "street": "456 Elm St",
                       "city": "Springfield",
                       "state": "IL",
                       "zip_code": "62701"
                       }
                       // ... other fields
              }
            
          ```
      - **Data Mapping**: Use the [`Data Mapper mediator`]({{base_path}}/reference/mediators/data-mapper-mediator) to map the complex JSON structure to the `CreateOrderRequest` message. The mapping can be done visually in the WSO2 Integrator: MI for VS Code.
      

        <a href="{{base_path}}/assets/img/integrate/connectors/grpc-tool/6_datamapper.png"><img src="{{base_path}}/assets/img/integrate/connectors/grpc-tool/6_datamapper.png" alt="data mapper mediator" width="30%" height="40%" ></a>
             
     
        <a href="{{base_path}}/assets/img/integrate/connectors/grpc-tool/5_datamapper.png"><img src="{{base_path}}/assets/img/integrate/connectors/grpc-tool/5_datamapper.png" alt="data mapping" width="80%" ></a>
      
           - With the Data Mapper, you can add expression conditions to your mappings, allowing you to transform or filter data as needed. For example, you can set conditions to map certain fields only when specific criteria are met, or format data before sending it to the gRPC service.
        
        <a href="{{base_path}}/assets/img/integrate/connectors/grpc-tool/condition_mapping.gif"><img src="{{base_path}}/assets/img/integrate/connectors/grpc-tool/condition_mapping.gif" alt="data mapping with condition" width="80%" ></a>

        ??? note "Data Mapper sourcecode"
            ```
             import * as dmUtils from "./dm-utils";
    
                /*
                * title : "root",
                  * inputType : "JSON",
                    */
                    interface Root {
                    order: {
                    metadata: {
                    order_id: string
                    created_at: string
                    status: string
                    priority: string
                    }
                    customer_info: {
                    customer_id: string
                    name: string
                    email: string
                    phone: string
                    loyalty_points: number
                    }
                    shipping: {
                    address: {
                    line1: string
                    line2: string
                    city: string
                    state: string
                    zip_code: string
                    country: string
                    }
                    method: string
                    tracking_number: string
                    estimated_delivery: string
                    }
                    billing: {
                    payment_method: string
                    transaction_id: string
                    payment_status: string
                    billing_address_same_as_shipping: boolean
                    }
                    product: {
                    product_id: string
                    name: string
                    quantity: number
                    price: number
                    category: string
                    in_stock: boolean
                    }
                    summary: {
                    subtotal: number
                    discount: number
                    tax: number
                    shipping_fee: number
                    total: number
                    }
                    flags: {
                    is_gift: boolean
                    gift_message: string
                    requires_signature: boolean
                    }
                    custom_data: {
                    tags: string[]
                    comments: string
                    custom_reference: string
                    }
                    }
                    }
                
                
                /*
                * title : "Order",
                  * outputType : "JSON",
                    */
                    interface OutputOrder {
                    order_id?: string
                    customer_id: string
                    product_id: string
                    quantity: number
                    price: number
                    }
                
                interface Orders {
                orderId: string
                }
                
                
                /**
                * functionName : map_S_root_S_Order
                  * inputVariable : inputroot
                    */
                    export function mapFunction(input: Root): OutputOrder {
                    return {
                    customer_id: input.order.customer_info.customer_id,
                    product_id: input.order.product.product_id,
                    order_id: input.order.metadata.order_id,
                    quantity: (input.order.product.quantity == 0) ? 5 : input.order.product.quantity,
                    price: input.order.product.price * 300
                    }
                    }
                
            ```

        This approach makes it easy to work with large or differently structured input payloads, ensuring they conform to your gRPC request messages.

        <a href="{{base_path}}/assets/img/integrate/connectors/grpc-tool/4_grpc_full_sequence.png"><img src="{{base_path}}/assets/img/integrate/connectors/grpc-tool/4_grpc_full_sequence.png" alt="generated connector" ></a>

!!! Note
    The gRPC Connector Generator does **not** yet handle:

    - **Streaming RPCs** : server, client, or bidirectional streams
    - **Custom `.proto` options**:  e.g., `deadline`, multiple `package` imports, or any other non-standard option fields
    - **Specific data types**: `oneof` unions, `enum` values, `map` fields, and deeply nested complex structures
    
    > For the full list of features the tool *does* support, see the [gRPC generator tool specification guide](https://github.com/wso2-extensions/esb-connector-tooling/blob/master/docs/grpc-spec.md).
