# AmazonSQS Inbound Endpoint Reference

The following configurations allow you to configure AmazonSQS Inbound Endpoint for your scenario. 

<table>
  <tr>
    <th>Parameter</th>
    <th>Description</th>
    <th>Required</th>
    <th>Possible Values</th>
    <th>Default Value</th>
  </tr>
  <tr>
    <td>waitTime</td>
    <td>The time to wait when polling queues for messages. By default, there is no wait (short polling). Setting the waitTime up to 20 seconds (the maximum wait time) creates <a href="https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-short-and-long-polling.html#sqs-long-polling">long polling</a>.</td>
    <td>No</td>
    <td>0 - 20</td>
    <td>0</td>
  </tr>
  <tr>
    <td>destination</td>
    <td>URL of the Amazon SQS Queue from which you want to consume messages.</td>
    <td>Yes</td>
    <td>N/A	</td>
    <td>N/A</td>
  </tr>
  <tr>
    <td>secretKey</td>
    <td>The secret key used to sign requests (a 40-character sequence).</td>
    <td>Yes</td>
    <td>N/A</td>
    <td>N/A</td>
  </tr>
  <tr>
    <td>accessKey</td>
    <td>The access key that corresponds to the secret key that you used to sign the request (a 20-character sequence).</td>
    <td>Yes</td>
    <td>N/A</td>
    <td>N/A</td>
  </tr>
  <tr>
    <td>maxNoOfMessage</td>
    <td>Maximum number of messages to return. Amazon SQS never returns more messages than this value but might return fewer. Not necessarily all the messages in the queue are returned.</td>
    <td>No</td>
    <td>1-10</td>
    <td>1</td>
  </tr>
  <tr>
    <td>attributeNames</td>
    <td>A comma-separated list of attributes you want to return along with the received message.</td>
    <td>No</td>
    <td>N/A</td>
    <td>N/A</td>
  </tr> 
  <tr>
    <td>contentType</td>
    <td>Content type of the message</a></td>
    <td>No</td>
    <td>text/plain<br>
                        application/json<br>
                        application/xml</td>
    <td>text/plain</td>
  </tr>
  <tr>
    <td>autoRemoveMessage</td>
    <td>Check whether the message need to be deleted or not from the queue. If you set this parameter as false, in any cases the message will be in the queue until message retention period of time.</td>
    <td>No</td>
    <td>true<br>
                        false</td>
    <td>true</td>
  </tr> 
  <tr>
    <td>SET_ROLLBACK_ONLY</td>
    <td> In the failure scenario, the mediation flow is going to the fault sequence which is specified in the configuration. If a failure occurs, the fault sequence if you have set "SET_ROLLBACK_ONLY" property as "true" the message will roll back to the Amazon SQS queue.<br>
    <td>No</td>
    <td>property name="SET_ROLLBACK_ONLY" value="true"</td>
    <td>-</td>
  </tr>   
</table>

    
**SET_ROLLBACK_ONLY Property**
 
If a failure occurs, the Amazon SQS message will roll back. In the following property is set to true in the fault handler, in order to roll back the Amazon SQS queue messages when a failure occurs.
 
```
<property name="SET_ROLLBACK_ONLY" value="true"/>
```
    
??? note "Sample fault sequence"
    ```
    <?xml version="1.0" encoding="UTF-8"?>
    <sequence name="fault" xmlns="http://ws.apache.org/ns/synapse">
        <property name="SET_ROLLBACK_ONLY" value="true"/>
        <log level="custom">
            <property name="Transaction Action" value="Rollbacked"/>
        </log>
        <log level="full">
            <property name="MESSAGE" value="Executing default 'fault' sequence"/>
            <property expression="get-property('ERROR_CODE')"
                name="ERROR_CODE" xmlns:ns="http://org.apache.synapse/xsd"/>
            <property expression="get-property('ERROR_MESSAGE')"
                name="ERROR_MESSAGE" xmlns:ns="http://org.apache.synapse/xsd"/>
        </log>
        <drop/>
    </sequence>
    ```