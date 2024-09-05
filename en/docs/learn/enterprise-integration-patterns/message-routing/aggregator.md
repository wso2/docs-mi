# Aggregator

This page explains how you can implement a sample scenario of Aggregator using WSO2 Micro Integrator. 

## Introduction to Aggregator

The Aggregator EIP combines the results of individual, related messages so that they can be processed as a whole. It works as a stateful filter, collecting and storing individual messages until a complete set of related messages has been received. It then publishes a single message distilled from the individual messages. 

!!! info
    For more information, see the [Aggregator](http://www.eaipatterns.com/Aggregator.html) documentation.

![Aggregator]({{base_path}}/assets/img/learn/enterprise-integration-patterns/message-routing/aggregator.gif)

## Sample scenario

This sample scenario demonstrates how WSO2 MI can be used to send multiple requests and merge the responses. Assume the sender wants to get responses from multiple servers, and it sends a message to the WSO2 MI. The WSO2 MI will duplicate the request to two different instances of a sample Axis2 server using the Clone Mediator. The Aggregate mediator will merge the responses received from each of the server instances and send the response back to the client.

The diagram below depicts how to simulate the sample scenario using the WSO2 MI.

![Aggregator sample scenario]({{base_path}}/assets/img/learn/enterprise-integration-patterns/message-routing/aggregator-sample-scenario.png)

Before digging into implementation details, let's take a look at the relationship between the sample scenario and the Aggregator EIP by comparing their core components.

| Aggregator EIP            | Aggregator Sample Scenario            |
|---------------------------|---------------------------------------|
| Doctors                   | HealthCare Endpoint Response          |
| Aggregator                | Aggregate Mediator                    |
| Doctors                   | WSO2 MI Response                      |

## Synapse configuration of the artifacts

=== "API"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <api name="hospital" context="/" xmlns="http://ws.apache.org/ns/synapse">
      <resource methods="GET" uri-template="/getPhysicians">
         <inSequence>
            <clone>
               <target>
                  <sequence>
                     <call>
                        <endpoint key="GrandOakEndpoint" />
                     </call>
                  </sequence>
               </target>
               <target>
                  <sequence>
                     <payloadFactory media-type="json" template-type="default">
                        <format>{
                        "doctorType": "Physician" } </format>
                        <args>
                     </args>
                     </payloadFactory>
                     <call>
                        <endpoint key="PineValleyEndpoint" />
                     </call>
                  </sequence>
               </target>
            </clone>
            <aggregate>
               <completeCondition>
                  <messageCount max="-1" min="-1" />
               </completeCondition>
               <onComplete aggregateElementType="root" expression="json-eval($.doctors.doctor)">
                  <respond />
               </onComplete>
            </aggregate>
         </inSequence>
         <faultSequence>
            </faultSequence>
      </resource>
    </api>
    ```
=== "GrandOakEndpoint"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <endpoint name="GrandOakEndpoint" xmlns="http://ws.apache.org/ns/synapse">
       <http method="get" uri-template="http://localhost:9090/grandOak/doctors/Physician"/>
    </endpoint>
    ```
=== "PineValleyEndpoint"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <endpoint name="PineValleyEndpoint" xmlns="http://ws.apache.org/ns/synapse">
       <http method="post" uri-template="http://localhost:9091/pineValley/doctors"/>
    </endpoint>
    ```

Let's investigate the elements of the synapse configuration in detail. 

- The Clone mediator is similar to the Splitter EIP. It clones the incoming request and passes the requests in parallel to several endpoints.   
- The aggregate mediator aggregates response messages for requests made by the Iterate or Clone mediators. The completion condition specifies a minimum or maximum number of messages to be collected. When all messages have been aggregated, the sequence inside onComplete will be run.

## Set up the sample scenario

{!includes/eip-set-up.md!}

3. Set up the back-end service:

    1. Download the [`DoctorInfo-JDK11.jar` file]({{base_path}}/assets/attachments/quick-start-guide/doctorinfo-jdk11.jar). This contains two healthcare services.
 
    2. Open a terminal, navigate to the location of the downloaded `DoctorInfo-JDK11.jar` file, and execute the following command to start the services:

      ```bash
      java -jar DoctorInfo-JDK11.jar
      ```

5. Download the artifacts of the sample.

    <a href="{{base_path}}/assets/attachments/learn/enterprise-integration-patterns/Aggregator.zip">
    <img src="{{base_path}}/assets/img/integrate/connectors/download-zip.png" width="200" alt="Download ZIP"></a>

6. Import the artifacts to WSO2 MI.

    Click **File** -> **Open Folder** -> Select the extracted ZIP file to import the downloaded ZIP file.

7. Start the project in the WSO2 MI server.

    For instructions, go to [Build and Run]({{base_path}}/develop/deploy-artifacts/#build-and-run) Documentation.

## Execute the sample

Send the following request to the Micro Integrator.

   ```
   GET /getPhysicians HTTP/1.1
   Host: localhost:8290
   accept: */*
   ```
   
## Analyze the output

The user will be able to see the merged response of the available doctors from the two hospitals.

   ```json
   [
      [
         {
               "name": "Shane Martin",
               "time": "07:30 AM",
               "hospital": "Grand Oak"
         },
         {
               "name": "Geln Ivan",
               "time": "08:30 AM",
               "hospital": "Grand Oak"
         }
      ],
      [
         {
               "name": "Geln Ivan",
               "time": "05:30 PM",
               "hospital": "pineValley"
         },
         {
               "name": "Daniel Lewis",
               "time": "05:30 PM",
               "hospital": "pineValley"
         }
      ]
   ]
   ```
