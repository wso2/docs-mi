# Guaranteed Delivery Sample

This sample demonstrates the `Guaranteed Delivery` or the `Fail Safe Delivery` concept.

This sample consists of a REST API called `UserRegistrationAPI`, an Endpoint called `UserRegistrationEP`, a Message processor called `UserRegistrationMP`, a Message store called `UserRegistrationMS` and two Sequences called `UserRegistrationErrorSeq` and `UserRegistrationResponseSeq`.

Also, it contains another REST API called `MockAPI` to mimic the backend.

`UserRegistrationAPI` receives the requests and stores them in the massage store. The message processor periodically polls from the message store and forwards the messages to the specified endpoint. The response return from the endpoint is injected to the response sequence. This payload will be logged and dropped at the end.

## Deploying the sample

1. Open the sample by clicking on the **Guaranteed Delivery** card.
2. Give a folder location to save the sample.
3. Open the `UserRegistrationMS` Message Store artifact and edit its `RabbitMQ credentials` accordingly.
4. Start the RabbitMQ broker.
5. [Build and run]({{base_path}}/develop/deploy-artifacts#build-and-run) the sample in your Micro Integrator.

## Running the sample

1. Once the sample is running you will get a runtime services view with the API swagger definition. You can test the API using the swagger editor or follow step 2 for manual invocation.

2. Open a terminal and run the following command to invoke the API.

    ```bash
    curl --location --request POST 'http://localhost:8290/registeruserapi' --header 'Content-Type: application/json' \
    --data-raw '{
      "id": 1,
      "name": "Leanne Graham",
      "username": "Bret",
      "email": "Sincere@april.biz",
      "address": {
        "street": "Kulas Light",
        "suite": "Apt. 556",
        "city": "Gwenborough",
        "zipcode": "92998-3874",
        "geo": {
          "lat": "-37.3159",
          "lng": "81.1496"
        }
      },
      "phone": "1-770-736-8031 x56442",
      "website": "hildegard.org",
      "company": {
        "name": "Romaguera-Crona",
        "catchPhrase": "Multi-layered client-server neural-net",
        "bs": "harness real-time e-markets"
      }
    }'
    ```
