
## What you'll build

##### Order management integration example

This example demonstrates how to integrate with the `OrderService` gRPC API to handle the lifecycle of an order in a retail system—from creation to retrieval and updates. This API facilitates seamless backend communication for e-commerce platforms, inventory systems, and similar applications.

<a href="{{base_path}}/assets/img/integrate/connectors/grpc-tool/highlevel-diagram.png"><img src="{{base_path}}/assets/img/integrate/connectors/grpc-tool/highlevel-diagram.png" alt="generated connector" width="80%" ></a>

## Prerequisites:
1. Download the sample order proto file [`order-service.proto`]({{base_path}}/assets/attachments/learn/grpc-tool/order-service.proto) file.
2. Download the **grpc-order-service.jar** file from [here]({{base_path}}/assets/attachments/jar/grpc-order-server-1.0.0.jar).
3. Execute the grpc-order-service.jar file using the command below.
   ```bash
   java -jar grpc-order-service.jar
   ```
   This will start the gRPC server on `localhost:9090`, which you can use to test the integration.

## Steps to follow

**Step 01:** Create a new integration project in WSO2 Micro Integrator for VS Code, see [Create an Integration Project]({{base_path}}/develop/create-integration-project).

**Step 02:** Create a new sequence or API artifact within your integration project, see [Create Sequence]({{base_path}}/reference/mediators/sequence-mediator).
         
<a href="{{base_path}}/assets/img/integrate/connectors/grpc-tool/1_seq_grpc.png"><img src="{{base_path}}/assets/img/integrate/connectors/grpc-tool/1_seq_grpc.png" alt="generated connector" width="20%" hight="40%" ></a>


**Step 03:** From the Mediator Palette, select the `orderservice` connector that was generated from the [`order-service.proto`]({{base_path}}/assets/attachments/learn/grpc-tool/order-service.proto) file using above one of options in [generate the gRPC connector]({{base_path}}/reference/connectors/connector-tools/grpc/grpc-connector-overview).

<a href="{{base_path}}/assets/img/integrate/connectors/grpc-tool/orderservice.png"><img src="{{base_path}}/assets/img/integrate/connectors/grpc-tool/orderservice.png" alt="generated connector" width="60%" ></a>

**Step 04:** Create a connection by filling in the form with the required authentication details.

| Property        | Value                | 
|-----------------|----------------------|
| Connection Name | orderConnection      |
| Server URL      | localhost            |
| Port            | 9090                 |
| Auth Type       | Basic Authentication |
| Username        | eve                  |
| Password        | eve@123              |

<a href="{{base_path}}/assets/img/integrate/connectors/grpc-tool/2_connection_form.png"><img src="{{base_path}}/assets/img/integrate/connectors/grpc-tool/2_connection_form.png" alt="Create Order" width="50%" height="60%" ></a>

**Step 05:** Add the `CreateOrder` operation to your sequence or API. Provide the necessary input as a JSON object that matches the input message defined in the `.proto` file. 

- Ensure the response is set to **overwrite the payload**.
- **Request message** for creating an order.
           ```proto
           message CreateOrderRequest {
              string customer_id = 1;
              string product_id = 2;
              int32 quantity = 3;
              float price = 4;
              }
           ```
- **JSON values** for the above message type
         ```json
         {
           "customer_id": "cust123",
           "product_id": "prod789",
           "quantity": 2,
           "price": 299.99
         }
         ```
   <a href="{{base_path}}/assets/img/integrate/connectors/grpc-tool/3_create_form.png"><img src="{{base_path}}/assets/img/integrate/connectors/grpc-tool/3_create_form.png" alt="generated connector" width="30%" height="40%" ></a>

**Step 06:** Similarly, you can use the `GetOrder` operation to retrieve order details by supplying the `order_id`. Again, make sure the response overwrites the payload. <image4>

   ```json
      {
        "order_id": "order456"
      }
   ```

**Step 07:** Optionally, add the `UpdateOrder` operation to modify existing orders by providing the order ID and updated details.
**Step 08:** Add any response handling logic needed to process the output from the gRPC calls at the end of your sequence or API.
<a href="{{base_path}}/assets/img/integrate/connectors/grpc-tool/simple-usecase.png"><img src="{{base_path}}/assets/img/integrate/connectors/grpc-tool/simple-usecase.png" alt="generated connector" width="40%" ></a>

---

##### Advanced data mapping example with order management integration

This example shows how to use the generated gRPC connector alongside the `Data Mapper` mediator in WSO2 Micro Integrator to perform advanced data mapping and transformation.

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
      - **Data Mapping**: Use the [`Data Mapper mediator`]({{base_path}}/reference/mediators/data-mapper-mediator) to map the complex JSON structure to the `CreateOrderRequest` message. The mapping can be done visually in the WSO2 Micro Integrator for VS Code.
      

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

        - **Final Sequence**: The final sequence will look like this, where the Data Mapper transforms the complex input into the expected gRPC request format.