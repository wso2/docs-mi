# Kafka Consumer and Producer Sample

This sample demonstrates the Kafka integration capabilities of Micro Integrator.

This sample contains a REST API called `WeatherDataPublishAPI`, a Kafka inbound endpoint called `WeatherDataTransmitInboundEP` and two Sequences called `WeatherDataProcessSeq` and  `WeatherDataErrorSeq`.

The API receives the HTTP request with JSON payload. Then it publishes to the Kafka topic using the Kafka connector. A response payload is generated with certain information such as topic, partition, offset and send back to client.

Kafka inbound endpoint periodically polls JSON messages in the WeatherDataTopic. It receives available messages in the topic and injects into the sequence. The sequence logs the message.

## Deploying the sample

1.  Open the sample by clicking on the **Kafka Consumer and Producer** card.
2.  Give a folder location to save the sample.
3.  Start the kafka server. (tested with kafka_2.13-3.7.1)
4.  Create a topic named `WeatherDataTopic` in the Kafka server.

    in Windows

    ```bash
    bin\windows\kafka-topics.bat --create --bootstrap-server localhost:9092 --replication-factor 1 --partitions 1 --topic weatherdatatopic
    ```
    in Linux/MacOS

    ```bash
    bin/kafka-topics.sh --create --bootstrap-server localhost:9092 --replication-factor 1 --partitions 1 --topic weatherdatatopic
    ```
    
5. [Build and run]({{base_path}}/develop/deploy-artifacts#build-and-run) the sample in your Micro Integrator.

## Running the sample

1. Open a terminal and run the following command to invoke the API.

    ```bash
    curl --location 'http://localhost:8290/publishweatherdata' \
    --header 'Content-Type: application/json' \
    --data '{
        "coord":{
        "lon":-122.09,
        "lat":37.39
    },
    "sys":{
        "type":3,
        "id":168940,
        "message":0.0297,
        "country":"US",
        "sunrise":1427723751,
        "sunset":1427768967
    },
    "weather":[
        {
            "id":800,
            "main":"Clear",
            "description":"Sky is Clear",
            "icon":"01n"
        }
    ],
    "base":"stations",
    "main":{
        "temp":285.68,
        "humidity":74,
        "pressure":1016.8,
        "temp_min":284.82,
        "temp_max":286.48
    },
    "wind":{
        "speed":0.96,
        "deg":285.001
    },
    "clouds":{
      "all":0
    },
    "dt":1427700245,
    "id":0,
    "name":"Mountain View",
    "cod":200
    }'
    ```

2. You will get a console log like follows. 
    
    ```
    [2024-07-18 08:19:01,621]  INFO {LogMediator} - To: , MessageID: 68ee9d3a-d507-41dd-a005-b8261dd25487, Direction: request, Payload: {
    "coord":{
      "lon":-122.09,
      "lat":37.39
    },
    "sys":{
      "type":3,
      "id":168940,
      "message":0.0297,
      "country":"US",
      "sunrise":1427723751,
      "sunset":1427768967
    },
    "weather":[
      {
         "id":800,
         "main":"Clear",
         "description":"Sky is Clear",
         "icon":"01n"
      }
    ],
    "base":"stations",
    "main":{
      "temp":285.68,
      "humidity":74,
      "pressure":1016.8,
      "temp_min":284.82,
      "temp_max":286.48
    },
    "wind":{
      "speed":0.96,
      "deg":285.001
    },
    "clouds":{
      "all":0
    },
    "dt":1427700245,
    "id":0,
    "name":"Mountain View",
    "cod":200
    }
    ```