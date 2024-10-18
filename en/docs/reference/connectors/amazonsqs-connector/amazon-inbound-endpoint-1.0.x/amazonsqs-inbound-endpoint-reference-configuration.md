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
    <td><code>waitTime</code></td>
    <td>The time to wait when polling queues for messages. By default, there is no wait (short polling). Setting the waitTime up to 20 seconds (the maximum wait time) creates <a href="https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-short-and-long-polling.html#sqs-long-polling">long polling</a>.</td>
    <td>No</td>
    <td><code>0 - 20</code></td>
    <td><code>0</code></td>
  </tr>
  <tr>
    <td><code>destination</code></td>
    <td>URL of the Amazon SQS Queue from which you want to consume messages.</td>
    <td>Yes</td>
    <td>N/A	</td>
    <td>N/A</td>
  </tr>
  <tr>
    <td><code>secretKey</code></td>
    <td>The secret key used to sign requests (a 40-character sequence).</td>
    <td>Yes</td>
    <td>N/A</td>
    <td>N/A</td>
  </tr>
  <tr>
    <td><code>accessKey</code></td>
    <td>The access key that corresponds to the secret key that you used to sign the request (a 20-character sequence).</td>
    <td>Yes</td>
    <td>N/A</td>
    <td>N/A</td>
  </tr>
  <tr>
    <td><code>maxNoOfMessage</code></td>
    <td>Maximum number of messages to return. Amazon SQS never returns more messages than this value but might return fewer. Not necessarily all the messages in the queue are returned.</td>
    <td>No</td>
    <td><code>1-10</code></td>
    <td><code>1</code></td>
  </tr>
  <tr>
    <td><code>attributeNames</code></td>
    <td>A comma-separated list of attributes you want to return along with the received message.</td>
    <td>No</td>
    <td>N/A</td>
    <td>N/A</td>
  </tr> 
  <tr>
    <td><code>contentType</code></td>
    <td>Content type of the message</a></td>
    <td>No</td>
    <td><code>text/plain<br>
                        application/json<br>
                        application/xml</code></td>
    <td><code>text/plain</code></td>
  </tr>
  <tr>
    <td><code>autoRemoveMessage</code></td>
    <td>Check whether the message needs to be deleted from the queue. If you set this parameter to false, the message will remain in the queue until the message retention period expires.</td>
    <td>No</td>
    <td><code>true<br>
                        false</code></td>
    <td><code>true</code></td>
  </tr>  
</table>

    
**Rollback the messages**
 
In a failure scenario, the Amazon SQS message will roll back if the following property is set to true in the fault sequence.
 
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