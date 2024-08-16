# Message Router

This page explains how you can implement a sample scenario of Message Router using WSO2 Micro Integrator.

## Introduction to Message Router

The Message Router EIP reads the content of a message and routes it to a specific recipient based on its content. When the implementation of a specific logical function is distributed across multiple physical systems, an incoming request needs to be passed on to the correct service based on the content of the request. A Message Router is useful in handling such scenarios.

The Message Router performs a logical function (such as an inventory check). It receives a request message (new order), reads it, and routes the request to one of the two recipients according to the content of the message. The router is also defined as a special type of filter.

!!! info
    For more information, see the [Message Router](https://www.enterpriseintegrationpatterns.com/patterns/messaging/MessageRouter.html) documentation.  

## Sample scenario

The sample scenario depicts a client sending an appointment reservation request to the Micro Integrator. The message payload of the request contains the name of the hospital where the appointment needs to be confirmed. Based on the hospital name sent in the request message, the Micro Integrator should route the appointment reservation to the relevant hospital's back-end service.

* If the request is made to Grand Oak Community Hospital, it is routed to `GrandOakEP`.
* If the request is made to Pine Valley Community Hospital, it is routed to `PineValleyEP`.
* If the request is made to Clemency Medical Center, it is routed to `ClemencyEP`.

!!! note
    The Switch and Call mediators of the WSO2 MI simulate the Message Router EIP. The Switch Mediator depicts the Router and observes the content of the message, while the Call Mediator sends the message to a selected recipient.

    Each case defined in the Switch mediator is used to decide the routing of the message to the appropriate service, `GrandOakEP`, `ClemencyEP`, and `PineValleyEP` as three separate services.

## Synapse configuration

When you unzip the ZIP file you download below in Step 4 when simulating the sample scenario, you can find the below configurations in the `<UNZIPPED_FILE>/src/main/wso2mi/artifacts` directory. For more information about these artifacts, go to [Develop Integration Solutions]({{base_path}}/develop/intro-integration-development/).

=== "Proxy Service"
     ```
     <?xml version="1.0" encoding="UTF-8"?>
     <proxy name="message-router-proxy" startOnLoad="true" transports="http https"
         xmlns="http://ws.apache.org/ns/synapse">
         <target>
             <inSequence>
                 <sequence key="MessageRoute" />
                 <respond />
             </inSequence>
             <faultSequence />
         </target>
     </proxy>
     ```
=== "Sequence"
     ```
     <?xml version="1.0" encoding="UTF-8"?>
     <sequence name="MessageRoute" trace="disable" xmlns="http://ws.apache.org/ns/synapse">
         <property name="Hospital" scope="default" type="STRING" expression="json-eval($.hospital)" />
         <switch source="get-property('Hospital')">
             <case regex="grand oak community hospital">
                 <call>
                     <endpoint key="GrandOaksEP" />
                 </call>
             </case>
             <case regex="clemency medical center">
                 <call>
                     <endpoint key="ClemencyEP" />
                 </call>
             </case>
             <case regex="pine valley community hospital">
                 <call>
                     <endpoint key="PineValleyEP" />
                 </call>
             </case>
             <default>
                 <log category="INFO" level="custom">
                     <property name="fault value"
                         expression="fn:concat('Invalid hospital - ', get-property('Hospital'))" />
                 </log>
             </default>
         </switch>
     </sequence>
     ```
=== "GrandOakEP"
     ```xml
     <endpoint name="GrandOaksEP" xmlns="http://ws.apache.org/ns/synapse">
         <http method="post" uri-template="http://localhost:9090/grandoaks/categories/surgery/reserve"/>
     </endpoint>
     ```
=== "PineValleyEP"
     ```xml
     <endpoint name="PineValleyEP" xmlns="http://ws.apache.org/ns/synapse">
         <http method="post" uri-template="http://localhost:9090/pinevalley/categories/surgery/reserve"/>
     </endpoint>
     ```
=== "ClemencyEP"
     ```xml
     <endpoint name="ClemencyEP" xmlns="http://ws.apache.org/ns/synapse">
         <http method="post" uri-template="http://localhost:9090/clemency/categories/surgery/reserve"/>
     </endpoint>
     ```

## Set up the sample scenario

Follow the below instructions to simulate this sample scenario.

{!includes/eip-set-up.md!}

3. Start the back-end service
    1. Download the JAR file of the back-end service from [here](https://github.com/wso2-docs/WSO2_EI/blob/master/Back-End-Service/Hospital-Service-JDK11-2.0.0.jar).
    2. Open a terminal, and navigate to the location where you saved the back-end service.
    3. Execute the following command to start the service:

        ```bash
        java -jar Hospital-Service-JDK11-2.0.0.jar
        ```

4. Download the artifacts of the sample

    <a href="{{base_path}}/assets/attachments/learn/enterprise-integration-patterns/MessageRouter.zip">
    <img src="{{base_path}}/assets/img/integrate/connectors/download-zip.png" width="200" alt="Download ZIP"></a>

6. Import the artifacts to WSO2 MI.

    Click **File** -> **Open Folder** -> Select the extracted ZIP file to import the downloaded ZIP file.

7. Start the project in the WSO2 MI server.

    For instructions, go to [Build and Run]({{base_path}}/develop/deploy-artifacts/#build-and-run) Documentation.

## Execute the sample.

Send the following request to the Micro Integrator.

```
POST /services/message-router-proxy HTTP/1.1
Host: localhost:8290
Content-Type: application/json

{
    "patient": {
        "name": "John Doe",
        "dob": "1940-03-19",
        "ssn": "234-23-525",
        "address": "California",
        "phone": "8770586755",
        "email": "johndoe@gmail.com"
    },
    "doctor": "thomas collins",
    "hospital_id": "grandoaks",
    "hospital": "grand oak community hospital",
    "appointment_date": "2025-04-02"
}
```

## Analyze the output

When you execute the request, the proxy service will receive the message and then route it to the relevant backend based on the content. The following response will be received by the client application.

```json
{
    "appointmentNumber": 1,
    "doctor": {
        "name": "thomas collins",
        "hospital": "grand oak community hospital",
        "category": "surgery",
        "availability": "9.00 a.m - 11.00 a.m",
        "fee": 7000.0
    },
    "patient": {
        "name": "John Doe",
        "dob": "1940-03-19",
        "ssn": "234-23-525",
        "address": "California",
        "phone": "8770586755",
        "email": "johndoe@gmail.com"
    },
    "fee": 7000.0,
    "confirmed": false
}
```
