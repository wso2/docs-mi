# AmazonSQS Inbound Endpoint Reference

The following configurations allow you to configure AmazonSQS Inbound Endpoint for your scenario. 

!!! note
    If your server is running on an EC2 instance, you can use [IAM role for authentication](https://docs.amazonaws.cn/en_us/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html) with Amazon SQS Inbound Endpoint v1.1.0 and above. Please note that both the `secretKey` and `accessKey` parameters should be excluded when using IAM Role authentication.

<style type="text/css">
.tg  {border-collapse:collapse;border-spacing:0;}
.tg td{font-family:Arial, sans-serif;font-size:14px;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:black;}
.tg th{font-family:Arial, sans-serif;font-size:20px;font-weight:normal;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:black;}
.tg .tg-0pky{border-color:inherit;text-align:left;vertical-align:top}
</style>
<table class="tg">
  <tr>
    <th class="tg-0pky">Parameter</th>
    <th class="tg-0pky">Description</th>
    <th class="tg-0pky">Required</th>
    <th class="tg-0pky">Possible Values</th>
    <th class="tg-0pky">Default Value</th>
  </tr>
  <tr>
    <td class="tg-0pky">waitTime</td>
    <td class="tg-0pky">The time to wait when polling queues for messages. By default, there is no wait (short polling). Setting the waitTime up to 20 seconds (the maximum wait time) creates <a href="https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-short-and-long-polling.html#sqs-long-polling">long polling</a>.</td>
    <td class="tg-0pky">No</td>
    <td class="tg-0pky">0 - 20</td>
    <td class="tg-0pky">0</td>
  </tr>
  <tr>
    <td class="tg-0pky">destination</td>
    <td class="tg-0pky">URL of the Amazon SQS Queue from which you want to consume messages.</td>
    <td class="tg-0pky">Yes</td>
    <td class="tg-0pky">N/A	</td>
    <td class="tg-0pky">N/A</td>
  </tr>
  <tr>
    <td class="tg-0pky">secretKey</td>
    <td class="tg-0pky">The secret key used to sign requests (a 40-character sequence).</td>
    <td class="tg-0pky">Yes, if IAM Role authentication is not used.</td>
    <td class="tg-0pky">N/A</td>
    <td class="tg-0pky">N/A</td>
  </tr>
  <tr>
    <td class="tg-0pky">accessKey</td>
    <td class="tg-0pky">The access key that corresponds to the secret key that you used to sign the request (a 20-character sequence).</td>
    <td class="tg-0pky">Yes, if IAM Role authentication is not used.</td>
    <td class="tg-0pky">N/A</td>
    <td class="tg-0pky">N/A</td>
  </tr>
  <tr>
    <td class="tg-0pky">maxNoOfMessage</td>
    <td class="tg-0pky">Maximum number of messages to return. Amazon SQS never returns more messages than this value but might return fewer. Not necessarily all the messages in the queue are returned.</td>
    <td class="tg-0pky">No</td>
    <td class="tg-0pky">1-10</td>
    <td class="tg-0pky">1</td>
  </tr>
  <tr>
    <td class="tg-0pky">attributeNames</td>
    <td class="tg-0pky">A comma-separated list of attributes you want to return along with the received message.</td>
    <td class="tg-0pky">No</td>
    <td class="tg-0pky">N/A</td>
    <td class="tg-0pky">N/A</td>
  </tr> 
  <tr>
    <td class="tg-0pky">contentType</td>
    <td class="tg-0pky">Content type of the message</a></td>
    <td class="tg-0pky">No</td>
    <td class="tg-0pky">text/plain<br>
                        application/json<br>
                        application/xml</td>
    <td class="tg-0pky">text/plain</td>
  </tr>
  <tr>
    <td class="tg-0pky">autoRemoveMessage</td>
    <td class="tg-0pky">Check whether the message needs to be deleted from the queue. If you set this parameter to false, the message will remain in the queue until the message retention period expires.</td>
    <td class="tg-0pky">No</td>
    <td class="tg-0pky">true<br>
                        false</td>
    <td class="tg-0pky">true</td>
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