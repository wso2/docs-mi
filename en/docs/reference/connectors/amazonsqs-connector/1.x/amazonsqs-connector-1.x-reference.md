# Amazon SQS Connector Reference

The following operations allow you to work with the Amazon SQS Connector. Click an operation name to see parameter details and samples on how to use it.

---

## Initialize the connector

To use the Amazon SQS connector, add the <amazonsqs.init> element in your configuration before carrying out any other Amazon SQS operations. This uses the standard HTTP Authorization header to pass authentication information. Developers are issued an AWS access key ID and an AWS secret access key when they register. For request authentication, the secret access key and the access key ID elements will be used to compute the signature. The authentication uses the "HmacSHA256" signature method and the signature version "4". Click [here](http://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/RequestAuthenticationArticle.html) for further information on the authentication process. To use the HTTPS amazon AWS url, you need to import the certificate into the integration runtime's client keystore.

??? note "init"
    The init operation is used to initialize the connection to Amazon SQS.

    !!! note
        1. Either `secretAccessKey` and `accessKeyId` or `iamRole` is mandatory.
        2. When the server is running in an EC2 instance, you can use the [IAM role for authentication](https://docs.amazonaws.cn/en_us/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html). The `iamRole` parameter is available only with Amazon SQS connector v1.1.1 and above.

    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>secretAccessKey</td>
            <td>The secret access key (a 40-character sequence).</td>
            <td>No</td>
        </tr>
        <tr>
            <td>accessKeyId</td>
            <td>The access key ID that corresponds to the secret access key that you used to sign the request (a 20-character, alphanumeric sequence).</td>
            <td>No</td>
        </tr>
        <tr>
            <td>iamRole</td>
            <td>The IAM role associated with the EC2 instance.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>enableIMDSv1</td>
            <td>Whether to use IMDSv1 to access EC2 instance metadata. By default, IMDSv2 will be used.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>version</td>
            <td>The version of the API, which is "2012-11-05".</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>region</td>
            <td>The regional endpoint to make your requests (e.g., us-east-1).</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>enableSSL</td>
            <td>Whether the Amazon AWS URL should be HTTP or HTTPS. Set to true if you want the URL to be HTTPS.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>contentType</td>
            <td>The content type that is used to generate the signature.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>blocking</td>
            <td>Boolean type, this property helps the connector perform blocking invocations to Amazon SQS.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration using secretAccessKey and accessKeyId**

    ```xml
    <amazonsqs.init>
        <secretAccessKey>{${properties.secretAccessKey}}</secretAccessKey>
        <accessKeyId>{${properties.accessKeyId}}</accessKeyId>
        <version>{${properties.version}}</version>
        <region>{${properties.region}}</region>
        <enableSSL>{${properties.enableSSL}}</enableSSL>
        <contentType>{${properties.contentType}}</contentType>
        <blocking>{${properties.blocking}}</blocking>
    </amazonsqs.init>
    ```

    **Sample configuration using IAM role**

    ```xml
    <amazonsqs.init>
        <iamRole>{${properties.iamRole}}</iamRole>
        <version>{${properties.version}}</version>
        <region>{${properties.region}}</region>
        <enableSSL>{${properties.enableSSL}}</enableSSL>
        <contentType>{${properties.contentType}}</contentType>
        <blocking>{${properties.blocking}}</blocking>
    </amazonsqs.init>
    ```
    
---

### Messages

??? note "receiveMessage"
    This operation retrieves one or more messages, with a maximum limit of 10 messages, from the specified queue. The default behavior is short poll, where a weighted random set of machines is sampled. This means only the messages on the sampled machines are returned. If the number of messages in the queue is small (less than 1000), it is likely you will get fewer messages than you requested per call. If the number of messages in the queue is extremely small, you might not receive any messages in a particular response. In this case, you should repeat the request. See the [related API documentation](http://docs.aws.amazon.com/AWSSimpleQueueService/latest/APIReference/API_ReceiveMessage.html) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>maxNumberOfMessages</td>
            <td>The maximum number of messages to be returned. Values can be from 1 to 10. Default is 1.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>waitTimeSeconds</td>
            <td>The duration (in seconds) for which the call will wait for a message to arrive in the queue before returning. If a message is available, the call will return sooner than WaitTimeSeconds. Long poll support is enabled by using this parameter. For more information, see <a href="http://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-long-polling.html">Amazon SQS Long Poll</a>.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>messageAttributeNames</td>
            <td>The name of the message attribute. The message attribute name can contain the following characters: A-Z, a-z, 0-9, underscore (_), hyphen (-), and period (.). The name must not start or end with a period, and it should not have successive periods. The name is case sensitive and must be unique among all attribute names for the message. The name can be up to 256 characters long. The name cannot start with "AWS." or "Amazon." (including any case variations), because these prefixes are reserved for use by Amazon Web Services. When using the operation, you can send a list of attribute names to receive, or you can return all of the attributes by specifying "All" or ".*" in your request. You can also use "foo.*" to return all message attributes starting with the "foo" prefix.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>visibilityTimeout</td>
            <td>The duration (in seconds) in which the received messages are hidden from subsequent retrieve requests after being retrieved by the request.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>attributes</td>
            <td>A list of attributes that need to be returned along with each message.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>queueId</td>
            <td>The unique identifier of the queue.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>queueName</td>
            <td>The name of the queue.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <amazonsqs.receiveMessage>
        <maxNumberOfMessages>{${properties.maxNumberOfMessages}}</maxNumberOfMessages>
        <waitTimeSeconds>{${properties.waitTimeSeconds}}</waitTimeSeconds>
        <messageAttributeNames>{${properties.messageAttributeNames}}</messageAttributeNames>
        <visibilityTimeout>{${properties.visibilityTimeout}}</visibilityTimeout>
        <attributes>{${properties.attributes}}</attributes>
        <queueId>{${properties.queueId}}</queueId>
        <queueName>{${properties.queueName}}</queueName>
    </amazonsqs.receiveMessage>
    ```
    
    **Sample request**

    ```xml
    <amazonsqs.receiveMessage>
        <accessKeyId>AKIAJXHDKJWR2ZDDVPEBTQ</accessKeyId>
        <secretAccessKey>N9VT2P3MdfaL7Li1P3hJu1GTdtOO7Kd7NfPlyYG8f/6</secretAccessKey>
        <version>2009-02-01</version>
        <region>us-east-1</region>
        <queueId>899940420354</queueId>
        <queueName>Test</queueName>
        <maxNumberOfMessages>10</maxNumberOfMessages>
    </amazonsqs.receiveMessage>
    ```

??? note "sendMessage"
    This operation delivers a message to the specified queue. You can send payload messages up to 256 KB (262,144 bytes) in size. See the [related API documentation](http://docs.aws.amazon.com/AWSSimpleQueueService/latest/APIReference/API_SendMessage.html) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>queueId</td>
            <td>The unique identifier of the queue.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>queueName</td>
            <td>The name of the queue.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>messageBody</td>
            <td>The message to be sent, a String that is a maximum of 256 KB in size. For a list of allowed characters, see the preceding important note.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>delaySeconds</td>
            <td>The number of seconds (0 to 900, which is 15 minutes) to delay a specific message. Messages with a positive delaySeconds value become available for processing after the delay time is finished. If you do not specify a value, the default value for the queue applies.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>messageAttributes</td>
            <td>Each message attribute consists of a Name, Type, and Value. For more information, see <a href="http://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/SQSMessageAttributes.html#SQSMessageAttributesNTV">Message Attribute Items</a>.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>messageDeduplicationId</td>
            <td>The ID used for deduplication of sent messages. If a message with a particular messageDeduplicationId is sent successfully, any messages sent with the same messageDeduplicationId are accepted successfully but aren't delivered during the 5-minute deduplication interval, see <a href="http://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/FIFO-queue-recommendations.html#using-messagededuplicationid-property">Using the MessageDeduplicationId Property</a>.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>messageGroupId</td>
            <td>The ID that specifies that a message belongs to a specific message group. Messages that belong to the same message group are processed in a FIFO manner, see <a href="http://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/FIFO-queue-recommendations.html#using-messagegroupid-property">Using the MessageGroupId Property</a>.</td>
            <td>No</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <amazonsqs.sendMessage>
        <queueId>{${properties.queueId}}</queueId>
        <queueName>{${properties.queueName}}</queueName>
        <messageBody>{${properties.messageBody}}</messageBody>
        <delaySeconds>{${properties.delaySeconds}}</delaySeconds>
        <messageAttributes>{${properties.messageAttributes}}</messageAttributes>
        <messageDeduplicationId>{${properties.messageDeduplicationId}}</messageDeduplicationId>
        <messageGroupId>{${properties.messageGroupId}}</messageGroupId>  
    </amazonsqs.sendMessage> 
    ```
    
    **Sample request for sendMessage**

    ```xml
    <amazonsqs.sendMessage>
        <accessKeyId>AKIAJXHDKJWRDD2ZVPfghEBTQ</accessKeyId>
        <secretAccessKey>N9VT2P3MaL7LikjhyhJu1GTtOO7Kd7NfPlfghyYG8f/6</secretAccessKey>
        <version>2009-02-01</version>
        <region>us-east-1</region>
        <queueId>899940420354</queueId>
        <queueName>Test</queueName>
        <messageBody>Testing the operation</messageBody>
    </amazonsqs.sendMessage>
    ```

    **Sample request for sendMessage to FIFOQueue**

    ```xml
    <amazonsqs.sendMessage>
        <queueId>899940420354</queueId>
        <queueName>test.fifo</queueName>
        <messageGroupId>MyMessageGroupId1234567890</messageGroupId>
        <messageDeduplicationId>MyMessageDeduplicationId1234567890</messageDeduplicationId>
        <messageBody>Testing the operation</messageBody>
    </amazonsqs.sendMessageot>
    ```

??? note "sendMessageBatch"
    This operation delivers batch messages to the specified queue. You can send payload messages up to 256 KB (262,144 bytes) in size. See the [related API documentation](http://docs.aws.amazon.com/AWSSimpleQueueService/latest/APIReference/API_SendMessageBatch.html) for more information.

    > **Note**: The following list shows the characters (in Unicode) allowed in your message, according to the W3C XML specification. For more information, go to [http://www.w3.org/TR/REC-xml/#charsets](http://www.w3.org/TR/REC-xml/#charsets). If you send any characters not included in the list, your request will be rejected. #x9 | #xA | #xD | [#x20 to #xD7FF] | [#xE000 to #xFFFD] | [#x10000 to #x10FFFF]
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>queueId</td>
            <td>The unique identifier of the queue.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>queueName</td>
            <td>The name of the queue.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>delaySeconds</td>
            <td>The number of seconds (0 to 900, which is 15 minutes) to delay a specific message. Messages with a positive delaySeconds value become available for processing after the delay time is finished. If you do not specify a value, the default value for the queue applies.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>messageAttributes</td>
            <td>List of SendMessageBatchRequestEntry items.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <amazonsqs.sendMessageBatch>
        <queueId>{${properties.queueId}}</queueId>
        <queueName>{${properties.queueName}}</queueName>
        <delaySeconds>{${properties.delaySeconds}}</delaySeconds>
        <messageRequestEntry>{${properties.messageRequestEntry}}</messageRequestEntry>
    </amazonsqs.sendMessageBatch> 
    ```
    
    **Sample request**

    ```xml
    <amazonsqs.sendMessageBatch>
        <queueId>492228198692</queueId>
        <queueName>TestCo1n</queueName>      
        <messageRequestEntry>SendMessageBatchRequestEntry.1.Id=test_msg_001&amp;SendMessageBatchRequestEntry.1.MessageBody=test%20message%20body%201&amp;SendMessageBatchRequestEntry.2.Id=test_msg_002&amp;SendMessageBatchRequestEntry.2.MessageBody=test%20message%20body%202</messageRequestEntry>
    </amazonsqs.sendMessageBatch>
    ```

??? note "deleteMessage"
    This operation deletes the specified message from the specified queue. You specify the message by using the message's receipt handle and not the message ID you received when you sent the message. Even if the message is locked by another reader due to the visibility timeout setting, it is still deleted from the queue. If you leave a message in the queue for longer than the queue's configured retention period, Amazon SQS automatically deletes it. See the [related API documentation](http://docs.aws.amazon.com/AWSSimpleQueueService/latest/APIReference/API_DeleteMessage.html) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>queueId</td>
            <td>The unique identifier of the queue.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>queueName</td>
            <td>The name of the queue.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>receiptHandle</td>
            <td>The receipt handle associated with the message to be deleted.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <amazonsqs.deleteMessage>
        <queueId>{${properties.queueId}}</queueId>
        <queueName>{${properties.queueName}}</queueName>
        <receiptHandle>{${properties.receiptHandle}}</receiptHandle>
    </amazonsqs.deleteMessage> 
    ```
    
    **Sample request**

    ```xml
    <amazonsqs.deleteMessage>
        <queueId>899940420354</queueId>
        <queueName>Test</queueName>
        <receiptHandle>ib8MCWgVft0d03wCmmzGU9b41lxRVMYIHLnfckXhkh/6DmqOhu+qHcsuzXUik5HvhGLa/A3tnTUTOXydKJoTOTlP3KUjOSOrwVxKoOi+bhLyLJuYAtkhfRMY/ZF1Jh4CzGSk3tLfPSfzOo3bqgf7mWklwM18BnufuWjSl8HjJQYnegs5yDDypAZZqtBuMv6gT/1aMbQbL15Vo8b0Fr06hFjSZzPpA0vxbb9NpksToMq4yPf8X3jt/Njn1sPZSG0OKqdgACiavmi0mzAT/4QLi+waSFnyG0h+wN1z9OdHsr1+4=</receiptHandle>
    </amazonsqs.deleteMessage> 
    ```

??? note "deleteMessageBatch"
    This operation deletes multiple messages from the specified queue. See the [related API documentation](http://docs.aws.amazon.com/AWSSimpleQueueService/latest/APIReference/API_DeleteMessageBatch.html) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>queueId</td>
            <td>The unique identifier of the queue.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>queueName</td>
            <td>The name of the queue.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>messageRequestEntry</td>
            <td>A list of receipt handles for the messages to be deleted.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <amazonsqs.deleteMessageBatch>
        <messageRequestEntry>{${properties.messageRequestEntry}}</messageRequestEntry>
        <queueId>{${properties.queueId}}</queueId>
        <queueName>{${properties.queueName}}</queueName>
    </amazonsqs.deleteMessageBatch> 
    ```
    
    **Sample request**

    ```xml
    <amazonsqs.deleteMessageBatch>
        <queueId>899940420354</queueId>
        <queueName>Test</queueName>
        <messageRequestEntry>DeleteMessageBatchRequestEntry.1.Id=msg1
        &amp;DeleteMessageBatchRequestEntry.1.ReceiptHandle=gfk0T0R0waama4fVxIVNgeNP8ZEDcw7zZU1Zw%3D%3D&amp;DeleteMessageBatchRequestEntry.2.Id=msg2&amp;DeleteMessageBatchRequestEntry.2.ReceiptHandle=gfk0T0R0waama4fVFffkjKzmhMCymjQvfTFk2LxT33G4ms5subrE0deLKWSscPU1oD3J9zgeS4PQQ3U30qOumIE6AdAv3w%2F%2Fa1IXW6AqaWhGsEPaLm3Vf6IiWqdM8u5imB%2BNTwj3tQRzOWdTOePjOjPcTpRxBtXix%2BEvwJOZUma9wabv%2BSw6ZHjwmNcVDx8dZXJhVp16Bksiox%2FGrUvrVTCJRTWTLc59oHLLF8sEkKzRmGNzTDGTiV%2BYjHfQj60FD3rVaXmzTsoNxRhKJ72uIHVMGVQiAGgB%2BqAbSqfKHDQtVOmJJgkHug%3D%3D</messageRequestEntry>
    </amazonsqs.deleteMessageBatch>  
    ```

??? note "changeMessageVisibility"
    This operation changes the visibility timeout of a specified message in a queue to a new value. The maximum allowed timeout value you can set the value to is 12 hours. This means you can't extend the timeout of a message in an existing queue to more than a total visibility timeout of 12 hours. (For more information on visibility timeout, see [Visibility Timeout in the Amazon SQS Developer Guide](http://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/AboutVT.html)).
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>queueId</td>
            <td>The unique identifier of the queue.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>queueName</td>
            <td>The name of the queue.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>receiptHandle</td>
            <td>The receipt handle associated with the message whose visibility timeout you are changing.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>visibilityTimeout</td>
            <td>The new value (in seconds from 0 to 43200, which is 12 hours) for the message's visibility timeout.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <amazonsqs.changeMessageVisibility>       
        <receiptHandle>{${properties.receiptHandle}}</receiptHandle>       
        <queueId>{${properties.queueId}}</queueId>
        <queueName>{${properties.queueName}}</queueName>
        <visibilityTimeout>{${properties.visibilityTimeout}}</visibilityTimeout>
    </amazonsqs.changeMessageVisibility> 
    ```
    
    **Sample request**

    ```xml
    <amazonsqs.changeMessageVisibility>
        <queueId>899940420354</queueId>
        <queueName>Test</queueName>
        <receiptHandle>ib8MCWgVft3IGz2EvDZBjzlBHi0rmXxJUcKbqlvkuH9WO9LaWQNQ8isW3IX8iCZBHovl8NQeC/EbbsLCSS2bMDGMZ5mxQ9C+UudaXRNxwj+VeLP4DQoTOMXEnw3V3Pk7GoVJ62YwrbnfH9U6c7qd8xCptVK1FIn6Pu4zNYRRiQmO8ENP3Tt0S81gHCz8sGdunXuro1tymIhxxliq29uPX8plYmvmkeCc9Fezib1cccpPpUkFhIHY8PkCXxI04i6zSM/o1o/wag2d0iDBVS20hBR2g8e6h8il1z9OdHsr1+4=</receiptHandle>
        <visibilityTimeout>10</visibilityTimeout>
    </amazonsqs.changeMessageVisibility>  
    ```

??? note "changeMessageVisibilityBatch"
    This operation changes the visibility timeout of multiple messages. See the [related API documentation](http://docs.aws.amazon.com/AWSSimpleQueueService/latest/APIReference/API_ChangeMessageVisibilityBatch.html) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>queueId</td>
            <td>The unique identifier of the queue.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>queueName</td>
            <td>The name of the queue.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>messageRequestEntry</td>
            <td>A list of receipt handles of the messages for which the visibility timeout must be changed.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <amazonsqs.changeMessageVisibilityBatch>
        <messageRequestEntry>{${properties.messageRequestEntry}}</messageRequestEntry>
        <queueId>{${properties.queueId}}</queueId>
        <queueName>{${properties.queueName}}</queueName>
    </amazonsqs.changeMessageVisibilityBatch> 
    ```
    
    **Sample request**

    ```xml
    <amazonsqs.changeMessageVisibilityBatch>
        <queueId>899940420354</queueId>
        <queueName>Test</queueName>
        <messageRequestEntry>ChangeMessageVisibilityBatchRequestEntry.1.Id=change_visibility_msg_1&amp;ChangeMessageVisibilityBatchRequestEntry.1.ReceiptHandle=ib8MCWgVft3IGz2EvDZBjzlBHi0rmXxJUcKbqlvkuH9WO9LaWQNQ8isW3IX8iCZBHovl8NQeC/EbbsLCSS2b&amp;ChangeMessageVisibilityBatchRequestEntry.1.VisibilityTimeout=10&amp;ChangeMessageVisibilityBatchRequestEntry.2.Id=change_visibility_msg_2&amp;ChangeMessageVisibilityBatchRequestEntry.2.ReceiptHandle=ib8MCWgVft3IGz2EvDZBjzlBHi0rmXxJUcKbqlvkuH9WO9LaWQNQ8isW3IX8iCZBHovl8NQeC/EbbsLCSS2b
    </amazonsqs.changeMessageVisibilityBatch>  
    ```

---

### Permissions

??? note "addPermission"
    This operation adds a permission to a queue for a specific [principal](http://docs.aws.amazon.com/general/latest/gr/glos-chap.html#P), enabling you to share access to the queue. When you create a queue, you have full control access rights for the queue. Only you (as owner of the queue) can grant or deny permissions to the queue. For more information about these permissions, see [Shared Queues in the Amazon SQS Developer Guide](http://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/acp-overview.html). See the [related API documentation](http://docs.aws.amazon.com/AWSSimpleQueueService/latest/APIReference/API_ChangeMessageVisibilityBatch.html) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>awsAccountNumbers</td>
            <td>The AWS account number of the <a href="http://docs.aws.amazon.com/general/latest/gr/glos-chap.html#P">principal</a> who will be given permission. The principal must have an AWS account but does not need to be signed up for Amazon SQS. For information about locating the AWS account identification, see <a href="http://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/AWSCredentials.html">Your AWS Identifiers in the Amazon SQS Developer Guide</a>.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>actionName</td>
            <td>The action the client wants to allow for the specified principal. The following are valid values: * | SendMessage | ReceiveMessage | DeleteMessage | ChangeMessageVisibility | GetQueueAttributes | GetQueueUrl. For more information about these actions, see <a href="http://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/acp-overview.html#PermissionTypes">Understanding Permissions in the Amazon SQS Developer Guide</a>.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>label</td>
            <td>The unique identification of the permission you are setting (e.g., AliceSendMessage). Constraints: Maximum 80 characters; alphanumeric characters, hyphens (-), and underscores (_) are allowed.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>queueId</td>
            <td>The unique identifier of the queue.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>queueName</td>
            <td>The name of the queue.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <amazonsqs.addPermission>
        <awsAccountNumbers>{${properties.awsAccountNumbers}}</awsAccountNumbers>
        <actionNames>{${properties.actionNames}}</actionNames>
        <label>{${properties.label}}</label>
        <queueId>{${properties.queueId}}</queueId>
        <queueName>{${properties.queueName}}</queueName>
    </amazonsqs.addPermission>
    ```
    
    **Sample request**

    ```xml
    <amazonsqs.addPermission>
        <awsAccountNumbers>AWSAccountId.1=899940420354&amp;AWSAccountId.2=294598218081</awsAccountNumbers>
        <actionNames>ActionName.1=SendMessage&amp;ActionName.2=ReceiveMessage</actionNames>
        <label>qazwsx</label>
        <queueId>899940420354</queueId>
        <queueName>Test</queueName>
    </amazonsqs.addPermission>  
    ```


??? note "removePermission"
    This operation revokes any permissions in the queue policy that matches the specified label. This allows sharing access to the queue. See the [related API documentation](http://docs.aws.amazon.com/AWSSimpleQueueService/latest/APIReference/API_RemovePermission.html) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>queueId</td>
            <td>The unique identifier of the queue.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>queueName</td>
            <td>The name of the queue.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>label</td>
            <td>The identification of the permission to remove</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <amazonsqs.removePermission>
        <queueId>{${properties.queueId}}</queueId>
        <queueName>{${properties.queueName}}</queueName>
        <label>{${properties.label}}</label>
    </amazonsqs.removePermission>
    ```
    
    **Sample request**

    ```xml
    <amazonsqs.removePermission>
        <label>qazwsx</label>
        <queueId>899940420354</queueId>
        <queueName>Test</queueName>
    </amazonsqs.removePermission>
    ```
---

### Queue

??? note "createQueue"
    This operation creates a new standard or FIFO queue. See the [related API documentation](http://docs.aws.amazon.com/AWSSimpleQueueService/latest/APIReference/API_CreateQueue.html) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>queueName</td>
            <td>The name of the new queue.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>attributeEntries</td>
            <td>A map of attributes with their corresponding values.</td>
            <td>No</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <amazonsqs.createQueue>
        <queueName>{${properties.queueName}}</queueName>
        <attributeEntries>{${properties.attributeEntries}}</attributeEntries>
    </amazonsqs.createQueue>
    ```
    
    **Sample request**

    ```xml
    <amazonsqs.createQueue>
        <queueName>Queue</queueName>
        <attributeEntries>Attribute.1.Name=DelaySeconds&amp;Attribute.1.Value=45</attributeEntries>
    </amazonsqs.createQueue>
    ```
---

??? note "deleteQueue"
    This operation deletes the queue specified by `QueueUrl`. See the [related API documentation](http://docs.aws.amazon.com/AWSSimpleQueueService/latest/APIReference/API_DeleteQueue.html) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>queueId</td>
            <td>The unique identifier of the queue.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>queueName</td>
            <td>The name of the queue.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <amazonsqs.deleteQueue>
        <queueId>{${properties.queueId}}</queueId>
        <queueName>{${properties.queueName}}</queueName>
    </amazonsqs.deleteQueue>
    ```
    
    **Sample request**

    ```xml
    <amazonsqs.deleteQueue>
        <queueId>899940420354</queueId>
        <queueName>Test</queueName>
    </amazonsqs.deleteQueue>
    ```
---

??? note "setQueueAttributes"
    This operation sets the value of one or more queue attributes, like a policy. See the [related API documentation](http://docs.aws.amazon.com/AWSSimpleQueueService/latest/APIReference/API_SetQueueAttributes.html) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>queueId</td>
            <td>The unique identifier of the queue.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>queueName</td>
            <td>The name of the queue.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>attributeEntries</td>
            <td>A map of attributes with their corresponding values.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <amazonsqs.setQueueAttributes>
        <queueId>{${properties.queueId}}</queueId>
        <queueName>{${properties.queueName}}</queueName>
        <attributeEntries>{${properties.attributeEntries}}</attributeEntries>
    </amazonsqs.setQueueAttributes>
    ```
    
    **Sample request**

    ```xml
    <amazonsqs.setQueueAttributes>
        <queueId>899940420354</queueId>
        <queueName>Test</queueName>
        <attributeEntries>Attribute.Name=Policy&amp;Attribute.Value=%7B%22Version%22%3A%222012-10-17%22%2C%22Id%22%3A%22UseCase1%22%2C%22Statement%22%3A%5B%7B%22Sid%22%3A%22Queue1ReceiveMessage%22%2C%22Effect%22%3A%22Allow%22%2C%22Principal%22%3A%7B%22AWS%22%3A%22*%22%7D%2C%22Action%22%3A%22SQS%3AReceiveMessage%22%2C%22Resource%22%3A%22arn%3Aaws%3Asqs%3Aus-east-1%3A555555555555%3AMyQueue6%22%7D%5D%7D</attributeEntries>
    </amazonsqs.setQueueAttributes>
    ```
---

??? note "getQueueAttributes"
    This operation gets attributes for the specified queue. See the [related API documentation](http://docs.aws.amazon.com/AWSSimpleQueueService/latest/APIReference/API_GetQueueAttributes.html) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>queueId</td>
            <td>The unique identifier of the queue.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>queueName</td>
            <td>The name of the queue.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>attributes</td>
            <td>A list of attributes to retrieve information for.</td>
            <td>No</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <amazonsqs.getQueueAttributes>
        <queueId>{${properties.queueId}}</queueId>
        <queueName>{${properties.queueName}}</queueName>
        <attributes>{${properties.attributes}}</attributes>
    </amazonsqs.getQueueAttributes>
    ```
    
    **Sample request**

    ```xml
    <amazonsqs.getQueueAttributes>
        <queueId>899940420354</queueId>
        <queueName>Test</queueName>
    </amazonsqs.getQueueAttributes>
    ```
---

??? note "getQueueUrl"
    This operation returns the URL of an existing queue. See the [related API documentation](http://docs.aws.amazon.com/AWSSimpleQueueService/latest/APIReference/API_GetQueueUrl.html) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>queueName</td>
            <td>The name of the queue.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>accountId</td>
            <td>The AWS account ID without hyphens of the account that created the queue.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <amazonsqs.getQueueUrl>
        <queueName>{${properties.queueName}}</queueName>
        <accountId>{${properties.accountId}}</accountId>
    </amazonsqs.getQueueUrl>
    ```
    
    **Sample request**

    ```xml
    <amazonsqs.getQueueUrl>
        <accountId>899940420354</accountId>
        <queueName>Test</queueName>
    </amazonsqs.getQueueUrl>
    ```
---

??? note "listDeadLetterSourceQueues"
    This operation returns a list of the queues that have the `RedrivePolicy` queue attribute configured with a dead-letter queue. See the [related API documentation](http://docs.aws.amazon.com/AWSSimpleQueueService/latest/APIReference/API_ListDeadLetterSourceQueues.html) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>queueId</td>
            <td>The unique identifier of the queue.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>queueName</td>
            <td>The name of the queue.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <amazonsqs.listDeadLetterSourceQueues>
        <queueId>{${properties.queueId}}</queueId>
        <queueName>{${properties.queueName}}</queueName>
    </amazonsqs.listDeadLetterSourceQueues>
    ```
    
    **Sample request**

    ```xml
    <amazonsqs.listDeadLetterSourceQueues>
        <queueId>899940420354</queueId>
        <queueName>Test</queueName>
    </amazonsqs.listDeadLetterSourceQueues>
    ```
---

??? note "listQueues"
    This operation returns a list of the queues in the current region. See the [related API documentation](http://docs.aws.amazon.com/AWSSimpleQueueService/latest/APIReference/API_ListQueues.html) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>queueNamePrefix</td>
            <td>A string to use for filtering the list results.</td>
            <td>No</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <amazonsqs.listQueues>
        <queueNamePrefix>{${properties.queueNamePrefix}}</queueNamePrefix>
    </amazonsqs.listQueues>
    ```
    
    **Sample request**

    ```xml
    <amazonsqs.listQueues/>
    ```
---

??? note "purgeQueue"
    This operation deletes available messages in a queue specified by the QueueURL parameter. See the [related API documentation](http://docs.aws.amazon.com/AWSSimpleQueueService/latest/APIReference/API_DeleteQueue.html) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>queueId</td>
            <td>The unique identifier of the queue.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>queueName</td>
            <td>The name of the queue.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <amazonsqs.purgeQueue>
        <queueId>{${properties.queueId}}</queueId>
        <queueName>{${properties.queueName}}</queueName>
    </amazonsqs.purgeQueue>
    ```
    
    **Sample request**

    ```xml
    <amazonsqs.purgeQueue>
        <queueId>899940420354</queueId>
        <queueName>Test</queueName>
    </amazonsqs.purgeQueue>
    ```
---
