# Amazon SQS Connector Reference

The following operations allow you to work with the Amazon SQS Connector. Click an operation name to see parameter details and samples on how to use it.

---

## Initialize the connector

To use the Amazon SQS connector, first create the connection with your configuration. When calling an Amazon SQS operation, ensure the connection is referenced using the `configKey` attribute.

??? note "init"  
    The init operation is used to initialize the connection to Amazon SQS.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>name</td>
            <td>Unique name to identify the connection by.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>region</td>
            <td>The regional endpoint to make your requests (e.g., us-east-1).</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>accessKeyId</td>
            <td>The access key ID associated with your AWS account.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>secretAccessKey</td>
            <td>The secret access key associated with your AWS access key.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>connectionMaxIdleTime</td>
            <td>The maximum amount of time(in seconds) that a connection should be allowed to remain open while idle.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>connectionTimeout</td>
            <td>The amount of time(in seconds) to wait when initially establishing a connection before giving up and timing out.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>connectionTimeToLive</td>
            <td>The maximum amount of time(in seconds) that a connection should be allowed to remain open, regardless of usage frequency.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>connectionAcquisitionTimeout</td>
            <td>The amount of time(in seconds) to wait when acquiring a connection from the pool before giving up and timing out.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>socketTimeout</td>
            <td>The amount of time(in seconds) to wait for data to be transferred over an established, open connection before the connection is timed out.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>apiCallTimeout</td>
            <td>The amount of time(in seconds) to allow the client to complete the execution of an API call.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>apiCallAttemptTimeout</td>
            <td>The amount of time(in seconds) to wait for the http request to complete before giving up and timing out.</td>
            <td>No</td>
        </tr>
    </table>

    !!! note
        If you want to define any timeout configuration in milliseconds, use the decimal format in seconds. For example, 350 milliseconds can be expressed as 0.35 seconds. 

    !!! note
        You can either pass credentials within init configuration or set the `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` as environment variables. The AWS SDK uses provider chains to look for AWS credentials in system/user environment variables.
        To set these environment variables follow the below steps based on your operating system: 
    
        === "Linux, macOS, or Unix"
            ```    
            export AWS_ACCESS_KEY_ID=AKIXXXXXXXXXXA
            export AWS_SECRET_ACCESS_KEY=qHZXXXXXXQc4oMQMnAOj+340XXxO2s
            ```  
    
        === "Windows"
            ```    
            set AWS_ACCESS_KEY_ID=AKIXXXXXXXXXXA
            set AWS_SECRET_ACCESS_KEY=qHZXXXXXXQc4oMQMnAOj+340XXxO2s
            ```
    
    !!! note 
        If the application is running in an EC2 instance and credentials are not defined in the init configuration, the credentials will be obtained from the [IAM role](https://docs.amazonaws.cn/en_us/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html) assigned for the Amazon EC2 instance. This option is available only with Amazon SQS connector v2.0.0 and above.

    **Sample configuration**
    ```xml
        <amazonsqs.init>
            <awsAccessKeyId>{$ctx:awsAccessKeyId}</awsAccessKeyId>
            <awsSecretAccessKey>{$ctx:awsSecretAccessKey}</awsSecretAccessKey>
            <name>{$ctx:connectionName}</name>
            <region>{$ctx:region}</region>
        </amazonsqs.init>
    ```
    
    **Sample request**
    ```xml
        <amazonsqs.init>
            <awsAccessKeyId>qwwewrerrtfdfd</awsAccessKeyId>
            <awsSecretAccessKey>assdsfdgdgrer</awsSecretAccessKey>
            <name>AMAZON_SQS_CONNECTION</name>
            <region>us-east-1</region>
        </amazonsqs.init>
    ```
---

### Messages

??? note "receiveMessage"
    This operation retrieves one or more messages, with a maximum limit of 10 messages, from the specified queue. See the [related API documentation](http://docs.aws.amazon.com/AWSSimpleQueueService/latest/APIReference/API_ReceiveMessage.html) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>queueUrl</td>
            <td>The URL of the queue to which a message is sent.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>messageSystemAttributeNames</td>
            <td>A list of attributes that need to be returned along with each message. The attribute should be separated by ','. `Eg:  'SenderId, SentTimestamp'`.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>maxNumberOfMessages</td>
            <td>The maximum number of messages to return.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>messageAttributeNames</td>
            <td>The names of the message attributes. The attributes should be separated by ','. `Eg:  'attributeName1, attributeName2'`</td>
            <td>No</td>
        </tr>
        <tr>
            <td>visibilityTimeout</td>
            <td>The duration (in seconds) that the received messages are hidden from subsequent retrieve requests after being retrieved by a ReceiveMessage request.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>waitTimeSeconds</td>
            <td>The duration (in seconds) for which the call will wait for a message to arrive in the queue before returning.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>apiCallTimeout</td>
            <td>The amount of time(in seconds) to allow the client to complete the execution of an API call.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>apiCallAttemptTimeout</td>
            <td>The amount of time(in seconds) to wait for the http request to complete before giving up and timing out.</td>
            <td>No</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <amazonsqs.receiveMessage configKey="CONNECTION_NAME">
        <queueUrl>{$ctx:queueUrl}</queueUrl>
        <maxNumberOfMessages>{$ctx:maxNumberOfMessages}</maxNumberOfMessages>
        <waitTimeSeconds>{$ctx:waitTimeSeconds}</waitTimeSeconds>
        <messageAttributeNames>{$ctx:messageAttributeNames}</messageAttributeNames>
        <messageSystemAttributeNames>{$ctx:messageSystemAttributeNames}</messageSystemAttributeNames>
        <visibilityTimeout>{$ctx:visibilityTimeout}</visibilityTimeout>
        <attributes>{$ctx:attributes}</attributes>
        <apiCallTimeout>{$ctx:apiCallTimeout}</apiCallTimeout>
        <apiCallAttemptTimeout>{$ctx:apiCallAttemptTimeout}</apiCallAttemptTimeout>
    </amazonsqs.receiveMessage>
    ```
    
    **Sample request**

    ```xml
    <amazonsqs.receiveMessage configKey="AMAZON_SQS_CONNECTION">
        <queueUrl>https://sqs.us-west-2.amazonaws.com/844234390511/Queue</queueUrl>
        <maxNumberOfMessages>5</maxNumberOfMessages>
        <waitTimeSeconds>5</waitTimeSeconds>
        <messageAttributeNames>attributeName1, attributeName2</messageAttributeNames>
        <messageSystemAttributeNames>SenderId, SentTimestamp</messageSystemAttributeNames>
    </amazonsqs.receiveMessage>
    ```
---

??? note "sendMessage"
    This operation delivers a message to the specified queue. You can send payload messages up to 256 KB (262,144 bytes) in size. See the [related API documentation](http://docs.aws.amazon.com/AWSSimpleQueueService/latest/APIReference/API_SendMessage.html) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>queueUrl</td>
            <td>The URL of the queue to which a message is sent.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>messageBody</td>
            <td>The message to be sent, a String that is a maximum of 256 KB in size.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>delaySeconds</td>
            <td>The number of seconds (0 to 900, which is 15 minutes) to delay a specific message.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>messageAttributes</td>
            <td>The message attributes to send. The value should be a string in JSON format.` Eg: { 'attributeName' : { 'DataType': 'value', 'StringValue': 'value' }}`"</td>
            <td>No</td>
        </tr>
        <tr>
            <td>messageDeduplicationId</td>
            <td>The ID of the message deduplication. This parameter applies only to FIFO (first-in-first-out) queues</td>
            <td>No</td>
        </tr>
        <tr>
            <td>messageGroupId</td>
            <td>The ID of the message group. This parameter applies only to FIFO (first-in-first-out) queues</td>
            <td>No</td>
        </tr>
        <tr>
            <td>messageSystemAttributes</td>
            <td>The message system attributes to send. The value should be a string in JSON format.`Eg:{ 'systemAttributeName' :{ 'DataType': 'value', 'StringValue': 'value' } }`</td>
            <td>No</td>
        </tr>
        <tr>
            <td>apiCallTimeout</td>
            <td>The amount of time(in seconds) to allow the client to complete the execution of an API call.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>apiCallAttemptTimeout</td>
            <td>The amount of time(in seconds) to wait for the http request to complete before giving up and timing out.</td>
            <td>No</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <amazonsqs.sendMessage configKey="CONNECTION_NAME">
        <queueUrl>{$ctx:queueUrl}</queueUrl>
        <messageBody>{$ctx:messageBody}</messageBody>
        <delaySeconds>{$ctx:delaySeconds}</delaySeconds>
        <messageAttributes>{$ctx:messageAttributes}</messageAttributes>
        <messageSystemAttributes>{$ctx:messageSystemAttributes}</messageSystemAttributes>
        <messageDeduplicationId>{$ctx:messageDeduplicationId}</messageDeduplicationId>
        <messageGroupId>{$ctx:messageGroupId}</messageGroupId>  
        <apiCallTimeout>{$ctx:apiCallTimeout}</apiCallTimeout>
        <apiCallAttemptTimeout>{$ctx:apiCallAttemptTimeout}</apiCallAttemptTimeout>
    </amazonsqs.sendMessage> 
    ```
    
    **Sample request for sendMessage**

    ```xml
    <amazonsqs.sendMessage>
        <queueUrl>https://sqs.us-west-2.amazonaws.com/882234390511/Queue</queueUrl>
        <messageBody>Hi</messageBody>
        <delaySeconds>5</delaySeconds>
        <messageAttributes>"{ 'attributeName' : { 'DataType': 'value', 'StringValue': 'value' }}"</messageAttributes>
        <messageSystemAttributes>"{ 'systemAttributeName' :{ 'DataType': 'value', 'StringValue': 'value' } }"</messageSystemAttributes>
    </amazonsqs.sendMessage>
    ```
---

??? note "sendMessageBatch"
    This operation delivers batch messages to the specified queue. You can send payload messages up to 256 KB (262,144 bytes) in size. See the [related API documentation](http://docs.aws.amazon.com/AWSSimpleQueueService/latest/APIReference/API_SendMessageBatch.html) for more information.
    <table>
        <tr>
            <td>queueUrl</td>
            <td>The URL of the queue to which a message is sent.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>messageRequestEntries</td>
            <td>The list of messages to be sent, a String that is a maximum of 256 KB in size. `Eg: [{'delaySeconds': 0, 'id': 'id1', 'messageBody': 'hi', 'messageAttributes': {'my_attribute_name_1': {'DataType': 'String','StringValue': 'my_attribute_value_1'}}, messageSystemAttributes: {'AWSTraceHeader': {'DataType': 'String','StringValue': 'AWS X-Ray'}}}]`</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>apiCallTimeout</td>
            <td>The amount of time(in seconds) to allow the client to complete the execution of an API call.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>apiCallAttemptTimeout</td>
            <td>The amount of time(in seconds) to wait for the http request to complete before giving up and timing out.</td>
            <td>No</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <amazonsqs.sendMessageBatch configKey="CONNECTION_NAME">
        <queueUrl>{$ctx:queueUrl}</queueUrl>
        <messageRequestEntries>{$ctx:messageRequestEntries}</messageRequestEntries>
        <apiCallTimeout>{$ctx:apiCallTimeout}</apiCallTimeout>
        <apiCallAttemptTimeout>{$ctx:apiCallAttemptTimeout}</apiCallAttemptTimeout>
    </amazonsqs.sendMessageBatch> 
    ```
    
    **Sample request**

    ```xml
    <amazonsqs.sendMessageBatch configKey="AMAZON_SQS_CONNECTION">
        <queueUrl>https://sqs.us-west-2.amazonaws.com/882234390511/Queue</queueUrl>
        <messageRequestEntries>[{delaySeconds: 0, id: id1, messageBody: hi, messageAttributes: {"my_attribute_name_1": {"DataType": "String","StringValue": "my_attribute_value_1"}}, messageSystemAttributes: {"AWSTraceHeader": {"DataType": "String","StringValue": "AWS X-Ray"}}}]</messageRequestEntries>
    </amazonsqs.sendMessageBatch>
    ```
---

??? note "deleteMessage"
    This operation deletes the specified message from the specified queue. You specify the message by using the message's receipt handle and not the message ID you received when you sent the message. Even if the message is locked by another reader due to the visibility timeout setting, it is still deleted from the queue. If you leave a message in the queue for longer than the queue's configured retention period, Amazon SQS automatically deletes it. See the [related API documentation](http://docs.aws.amazon.com/AWSSimpleQueueService/latest/APIReference/API_DeleteMessage.html) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>queueUrl</td>
            <td>The URL of the queue from which messages are deleted.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>receiptHandle</td>
            <td>The receipt handle associated with the message to be deleted.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>apiCallTimeout</td>
            <td>The amount of time(in seconds) to allow the client to complete the execution of an API call.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>apiCallAttemptTimeout</td>
            <td>The amount of time(in seconds) to wait for the http request to complete before giving up and timing out.</td>
            <td>No</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <amazonsqs.deleteMessage configKey="CONNECTION_NAME">
        <queueUrl>{$ctx:queueUrl}</queueUrl>
        <receiptHandle>{$ctx:receiptHandle}</receiptHandle>
        <apiCallTimeout>{$ctx:apiCallTimeout}</apiCallTimeout>
        <apiCallAttemptTimeout>{$ctx:apiCallAttemptTimeout}</apiCallAttemptTimeout>
    </amazonsqs.deleteMessage> 
    ```
    
    **Sample request**

    ```xml
    <amazonsqs.deleteMessage configKey="AMAZON_SQS_CONNECTION">
        <queueUrl>https://sqs.us-west-2.amazonaws.com/882234390511/Queue</queueUrl>
        <receiptHandle>2432435435645654656567</receiptHandle>
    </amazonsqs.deleteMessage> 
    ```
---
??? note "deleteMessageBatch"
    This operation deletes multiple messages from the specified queue. See the [related API documentation](http://docs.aws.amazon.com/AWSSimpleQueueService/latest/APIReference/API_DeleteMessageBatch.html) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>queueUrl</td>
            <td>The URL of the queue from which messages are deleted.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>messageRequestEntries</td>
            <td>A list of receipt handles for the messages to be deleted.`Eg: [{'receiptHandle': '122324343', 'id': 'id1' }]`</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>apiCallTimeout</td>
            <td>The amount of time(in seconds) to allow the client to complete the execution of an API call.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>apiCallAttemptTimeout</td>
            <td>The amount of time(in seconds) to wait for the http request to complete before giving up and timing out.</td>
            <td>No</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <amazonsqs.deleteMessageBatch configKey="CONNECTION_NAME">
        <queueUrl>{$ctx:queueUrl}</queueUrl>
        <messageRequestEntries>{$ctx:messageRequestEntries}</messageRequestEntries>
        <apiCallTimeout>{$ctx:apiCallTimeout}</apiCallTimeout>
        <apiCallAttemptTimeout>{$ctx:apiCallAttemptTimeout}</apiCallAttemptTimeout>
    </amazonsqs.deleteMessageBatch> 
    ```
    
    **Sample request**

    ```xml
    <amazonsqs.deleteMessageBatch configKey="AMAZON_SQS_CONNECTION">
        <queueUrl>https://sqs.us-west-2.amazonaws.com/882234390511/Queue</queueUrl>
        <messageRequestEntries>{$ctx:messageRequestEntries}</messageRequestEntries>
    </amazonsqs.deleteMessageBatch>   
    ```
---

??? note "changeMessageVisibility"
    This operation changes the visibility timeout of a specified message in a queue to a new value. See the [Visibility Timeout in the Amazon SQS Developer Guide](http://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/AboutVT.html)).
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>queueUrl</td>
            <td>The URL of the queue whose message's visibility is changed</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>receiptHandle</td>
            <td>The receipt handle associated with the message, whose visibility timeout is changed.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>visibilityTimeout</td>
            <td>The new value (in seconds - from 0 to 43200 - maximum 12 hours) for the message's visibility timeout.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>apiCallTimeout</td>
            <td>The amount of time(in seconds) to allow the client to complete the execution of an API call.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>apiCallAttemptTimeout</td>
            <td>The amount of time(in seconds) to wait for the http request to complete before giving up and timing out.</td>
            <td>No</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <amazonsqs.changeMessageVisibility configKey="CONNECTION_NAME">  
        <queueUrl>{$ctx:queueUrl}</queueUrl>
        <receiptHandle>{$ctx:receiptHandle}</receiptHandle>
        <visibilityTimeout>{$ctx:visibilityTimeout}</visibilityTimeout>
        <apiCallTimeout>{$ctx:apiCallTimeout}</apiCallTimeout>
        <apiCallAttemptTimeout>{$ctx:apiCallAttemptTimeout}</apiCallAttemptTimeout>
    </amazonsqs.changeMessageVisibility> 
    ```
    
    **Sample request**

    ```xml
    <amazonsqs.changeMessageVisibility configKey="AMAZON_SQS_CONNECTION">  
        <queueUrl>https://sqs.us-west-2.amazonaws.com/882234390511/Queue</queueUrl>
        <receiptHandle>21321423453543556</receiptHandle>
        <visibilityTimeout>15</visibilityTimeout>
    </amazonsqs.changeMessageVisibility>   
    ```
---

??? note "changeMessageVisibilityBatch"
    This operation changes the visibility timeout of multiple messages. See the [related API documentation](http://docs.aws.amazon.com/AWSSimpleQueueService/latest/APIReference/API_ChangeMessageVisibilityBatch.html) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>queueUrl</td>
            <td>The URL of the queue whose messages' visibility is changed</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>messageRequestEntries</td>
            <td>A list of receipt handles of the messages for which the visibility timeout must be changed. `Eg: [{'receiptHandle': '123234343434454', 'id': 'id1'', 'VisibilityTimeout': 5}]`</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>apiCallTimeout</td>
            <td>The amount of time(in seconds) to allow the client to complete the execution of an API call.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>apiCallAttemptTimeout</td>
            <td>The amount of time(in seconds) to wait for the http request to complete before giving up and timing out.</td>
            <td>No</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <amazonsqs.changeMessageVisibilityBatch configKey="CONNECTION_NAME">
        <queueUrl>{$ctx:queueUrl}</queueUrl>
        <messageRequestEntries>{$ctx:messageRequestEntries}</messageRequestEntries>
        <apiCallTimeout>{$ctx:apiCallTimeout}</apiCallTimeout>
        <apiCallAttemptTimeout>{$ctx:apiCallAttemptTimeout}</apiCallAttemptTimeout>
    </amazonsqs.changeMessageVisibilityBatch> 
    ```
    
    **Sample request**

    ```xml
    <amazonsqs.changeMessageVisibilityBatch configKey="AMAZON_SQS_CONNECTION">
        <queueUrl>https://sqs.us-west-2.amazonaws.com/882234390511/Queue</queueUrl>
        <messageRequestEntries>[{'receiptHandle': '122324343', 'id': 'id1', 'VisibilityTimeout': 5 }]</messageRequestEntries>
    </amazonsqs.changeMessageVisibilityBatch> 
    ```
---

### Permissions

??? note "addPermission"
    This operation adds a permission to a queue for a specific principal. This allows sharing access to the queue. See the [related API documentation](http://docs.aws.amazon.com/AWSSimpleQueueService/latest/APIReference/API_AddPermission.html) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>queueUrl</td>
            <td>The URL of the queue to which permissions are added.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>awsAccountNumbers</td>
            <td>The AWS account numbers of the principal who will be given permission. The account ids should be separated by ','. `Eg: 111111111234, 111111111111`</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>actionNames</td>
            <td>The actions the client wants to allow for the specified principal. The actions should be separated by ','. `Eg: SendMessage, DeleteMessage`</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>label</td>
            <td>The unique identification of the permission you're setting.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>apiCallTimeout</td>
            <td>The amount of time(in seconds) to allow the client to complete the execution of an API call.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>apiCallAttemptTimeout</td>
            <td>The amount of time(in seconds) to wait for the http request to complete before giving up and timing out.</td>
            <td>No</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <amazonsqs.addPermission configKey="CONNECTION_NAME">
        <queueUrl>{$ctx:queueUrl}</queueUrl>
        <awsAccountNumbers>{$ctx:awsAccountNumbers}</awsAccountNumbers>
        <actionNames>{$ctx:actionNames}</actionNames>
        <label>{$ctx:label}</label>
        <apiCallTimeout>{$ctx:apiCallTimeout}</apiCallTimeout>
        <apiCallAttemptTimeout>{$ctx:apiCallAttemptTimeout}</apiCallAttemptTimeout>
    </amazonsqs.addPermission>
    ```
    
    **Sample request**

    ```xml
    <amazonsqs.addPermission configKey="AMAZON_SQS_CONNECTION">
        <queueUrl>https://sqs.us-west-2.amazonaws.com/882234390511/Queue</queueUrl>
        <awsAccountNumbers>844783390511, 111111111111</awsAccountNumbers>
        <actionNames>SendMessage, DeleteMessage</actionNames>
        <label>test</label>
    </amazonsqs.addPermission>
    ```
---

??? note "removePermission"
    This operation revokes any permissions in the queue policy that matches the specified label. This allows sharing access to the queue. See the [related API documentation](http://docs.aws.amazon.com/AWSSimpleQueueService/latest/APIReference/API_RemovePermission.html) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>queueUrl</td>
            <td>The URL of the queue from which permissions are removed.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>label</td>
            <td>The identification of the permission to remove</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>apiCallTimeout</td>
            <td>The amount of time(in seconds) to allow the client to complete the execution of an API call.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>apiCallAttemptTimeout</td>
            <td>The amount of time(in seconds) to wait for the http request to complete before giving up and timing out.</td>
            <td>No</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <amazonsqs.removePermission configKey="CONNECTION_NAME">
        <queueUrl>{$ctx:queueUrl}</queueUrl>
        <label>{$ctx:label}</label>
        <apiCallTimeout>{$ctx:apiCallTimeout}</apiCallTimeout>
        <apiCallAttemptTimeout>{$ctx:apiCallAttemptTimeout}</apiCallAttemptTimeout>
    </amazonsqs.removePermission>
    ```
    
    **Sample request**

    ```xml
    <amazonsqs.removePermission configKey="AMAZON_SQS_CONNECTION">
        <queueUrl>https://sqs.us-west-2.amazonaws.com/882234390511/Queue</queueUrl>
        <label>test</label>
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
            <td>A map of attributes with their corresponding values. The value should be a string in JSON format. `Eg: {'my_attribute_name_1': {'DataType': 'String','StringValue': 'my_attribute_value_1' }}`</td>
            <td>No</td>
        </tr>
        <tr>
            <td>tags</td>
            <td>The cost allocation tags to the specified Amazon SQS queue. `Eg: {QueueType: Testing}`</td>
            <td>No</td>
        </tr>
        <tr>
            <td>apiCallTimeout</td>
            <td>The amount of time(in seconds) to allow the client to complete the execution of an API call.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>apiCallAttemptTimeout</td>
            <td>The amount of time(in seconds) to wait for the http request to complete before giving up and timing out.</td>
            <td>No</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <amazonsqs.createQueue configKey="CONNECTION_NAME">
        <queueName>{$ctx:queueName}</queueName>
        <attributeEntries>{$ctx:attributeEntries}</attributeEntries>
        <tags>{$ctx:tags}</tags>
        <apiCallTimeout>{$ctx:apiCallTimeout}</apiCallTimeout>
        <apiCallAttemptTimeout>{$ctx:apiCallAttemptTimeout}</apiCallAttemptTimeout>
    </amazonsqs.createQueue>
    ```
    
    **Sample request**

    ```xml
    <amazonsqs.createQueue configKey="AMAZON_SQS_CONNECTION">
        <queueName>Queue</queueName>
        <attributeEntries>"{'my_attribute_name_1': {'DataType': 'String','StringValue': 'my_attribute_value_1' }}"</attributeEntries>
        <tags>"{QueueType: Testing}"</tags>
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
            <td>queueUrl</td>
            <td>The URL of the queue to delete.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>apiCallTimeout</td>
            <td>The amount of time(in seconds) to allow the client to complete the execution of an API call.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>apiCallAttemptTimeout</td>
            <td>The amount of time(in seconds) to wait for the http request to complete before giving up and timing out.</td>
            <td>No</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <amazonsqs.deleteQueue configKey="CONNECTION_NAME">
        <queueUrl>{$ctx:queueUrl}</queueUrl>
        <apiCallTimeout>{$ctx:apiCallTimeout}</apiCallTimeout>
        <apiCallAttemptTimeout>{$ctx:apiCallAttemptTimeout}</apiCallAttemptTimeout>
    </amazonsqs.deleteQueue>
    ```
    
    **Sample request**

    ```xml
    <amazonsqs.deleteQueue configKey="AMAZON_SQS_CONNECTION">
        <queueUrl>https://sqs.us-west-2.amazonaws.com/882234390511/Queue</queueUrl>
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
            <td>queueUrl</td>
            <td>The URL of the queue whose attributes are set.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>attributeEntries</td>
            <td>A map of attributes with their corresponding values. The value should be a string in JSON format. `Eg: {'RedrivePolicy': {'deadLetterTargetArn': 'arn:aws:sqs:us-east-1:884783870511:TestQueue', 'maxReceiveCount': 10}}`</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>apiCallTimeout</td>
            <td>The amount of time(in seconds) to allow the client to complete the execution of an API call.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>apiCallAttemptTimeout</td>
            <td>The amount of time(in seconds) to wait for the http request to complete before giving up and timing out.</td>
            <td>No</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <amazonsqs.setQueueAttributes configKey="CONNECTION_NAME">
        <queueUrl>{$ctx:queueUrl}</queueUrl>
        <attributeEntries>{$ctx:queueUrl}</attributeEntries>
        <apiCallTimeout>{$ctx:apiCallTimeout}</apiCallTimeout>
        <apiCallAttemptTimeout>{$ctx:apiCallAttemptTimeout}</apiCallAttemptTimeout>
    </amazonsqs.setQueueAttributes>
    ```
    
    **Sample request**

    ```xml
    <amazonsqs.setQueueAttributes configKey="AMAZON_SQS_CONNECTION">
        <queueUrl>https://sqs.us-west-2.amazonaws.com/882234390511/Queue</queueUrl>
        <attributeEntries>"{'RedrivePolicy': {'deadLetterTargetArn': 'arn:aws:sqs:us-east-1:884783870511:TestQueue', 'maxReceiveCount': 10}}"</attributeEntries>
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
            <td>queueUrl</td>
            <td>The URL of the queue whose attribute information is retrieved.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>attributes</td>
            <td>A list of attributes to retrieve information for. Default value is `All`. Each attribute must be listed in the string in a comma-separated format. `Eg: 'Policy', 'DelaySeconds'`</td>
            <td>No</td>
        </tr>
        <tr>
            <td>apiCallTimeout</td>
            <td>The amount of time(in seconds) to allow the client to complete the execution of an API call.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>apiCallAttemptTimeout</td>
            <td>The amount of time(in seconds) to wait for the http request to complete before giving up and timing out.</td>
            <td>No</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <amazonsqs.getQueueAttributes configKey="CONNECTION_NAME">
        <queueUrl>{$ctx:queueUrl}</queueUrl>
        <attributes>{$ctx:attributes}</attributes>
        <apiCallTimeout>{$ctx:apiCallTimeout}</apiCallTimeout>
        <apiCallAttemptTimeout>{$ctx:apiCallAttemptTimeout}</apiCallAttemptTimeout>
    </amazonsqs.getQueueAttributes>
    ```
    
    **Sample request**

    ```xml
    <amazonsqs.getQueueAttributes configKey="AMAZON_SQS_CONNECTION">
        <queueUrl>https://sqs.us-west-2.amazonaws.com/882234390511/Queue</queueUrl>
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
        <tr>
            <td>apiCallTimeout</td>
            <td>The amount of time(in seconds) to allow the client to complete the execution of an API call.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>apiCallAttemptTimeout</td>
            <td>The amount of time(in seconds) to wait for the http request to complete before giving up and timing out.</td>
            <td>No</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <amazonsqs.getQueueUrl configKey="CONNECTION_NAME">
        <queueName>{$ctx:queueName}</queueName>
        <accountId>{$ctx:accountId}</accountId>
        <apiCallTimeout>{$ctx:apiCallTimeout}</apiCallTimeout>
        <apiCallAttemptTimeout>{$ctx:apiCallAttemptTimeout}</apiCallAttemptTimeout>
    </amazonsqs.getQueueUrl>
    ```
    
    **Sample request**

    ```xml
    <amazonsqs.getQueueUrl configKey="AMAZON_SQS_CONNECTION">
        <queueName>Queue</queueName>
        <accountId>882234390511</accountId>
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
            <td>queueUrl</td>
            <td>The URL of a dead-letter queue.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>maxResults</td>
            <td>Maximum number of results to include in the response.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>nextToken</td>
            <td>Pagination token to request the next set of results.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>apiCallTimeout</td>
            <td>The amount of time(in seconds) to allow the client to complete the execution of an API call.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>apiCallAttemptTimeout</td>
            <td>The amount of time(in seconds) to wait for the http request to complete before giving up and timing out.</td>
            <td>No</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <amazonsqs.listDeadLetterSourceQueues configKey="CONNECTION_NAME">
        <queueUrl>{$ctx:queueUrl}</queueUrl>
        <maxResults>{$ctx:maxResults}</maxResults>
        <nextToken>{$ctx:nextToken}</nextToken>
        <apiCallTimeout>{$ctx:apiCallTimeout}</apiCallTimeout>
        <apiCallAttemptTimeout>{$ctx:apiCallAttemptTimeout}</apiCallAttemptTimeout>
    </amazonsqs.listDeadLetterSourceQueues>
    ```
    
    **Sample request**

    ```xml
    <amazonsqs.listDeadLetterSourceQueues configKey="AMAZON_SQS_CONNECTION">
        <queueUrl>https://sqs.us-west-2.amazonaws.com/882234390511/TestQueue</queueUrl>
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
        <tr>
            <td>maxResults</td>
            <td>Maximum number of results to include in the response.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>nextToken</td>
            <td>Pagination token to request the next set of results.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>apiCallTimeout</td>
            <td>The amount of time(in seconds) to allow the client to complete the execution of an API call.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>apiCallAttemptTimeout</td>
            <td>The amount of time(in seconds) to wait for the http request to complete before giving up and timing out.</td>
            <td>No</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <amazonsqs.listQueues configKey="CONNECTION_NAME">
        <queueNamePrefix>{$ctx:queueNamePrefix}</queueNamePrefix>
        <maxResults>{$ctx:maxResults}</maxResults>
        <nextToken>{$ctx:nextToken}</nextToken>
        <apiCallTimeout>{$ctx:apiCallTimeout}</apiCallTimeout>
        <apiCallAttemptTimeout>{$ctx:apiCallAttemptTimeout}</apiCallAttemptTimeout>
    </amazonsqs.listQueues>
    ```
    
    **Sample request**

    ```xml
    <amazonsqs.listQueues configKey="AMAZON_SQS_CONNECTION"/>
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
            <td>queueUrl</td>
            <td>The URL of the queue from which the PurgeQueue action deletes messages.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>apiCallTimeout</td>
            <td>The amount of time(in seconds) to allow the client to complete the execution of an API call.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>apiCallAttemptTimeout</td>
            <td>The amount of time(in seconds) to wait for the http request to complete before giving up and timing out.</td>
            <td>No</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <amazonsqs.purgeQueue configKey="CONNECTION_NAME">
        <queueUrl>{$ctx:queueUrl}</queueUrl>
        <apiCallTimeout>{$ctx:apiCallTimeout}</apiCallTimeout>
        <apiCallAttemptTimeout>{$ctx:apiCallAttemptTimeout}</apiCallAttemptTimeout>
    </amazonsqs.purgeQueue>
    ```
    
    **Sample request**

    ```xml
    <amazonsqs.purgeQueue configKey="AMAZON_SQS_CONNECTION">
        <queueUrl>https://sqs.us-west-2.amazonaws.com/882234390511/Queue</queueUrl>
    </amazonsqs.purgeQueue>
    ```
---

## Handle errors 

The connector may encounter errors during operation execution. When an error occurs, the `ERROR_DETAIL` property will contain detailed information about the error. You can handle these errors using a `Fault Sequence` in your integration. For more information, refer to [Using Fault Sequences]({{base_path}}/learn/examples/sequence-examples/using-fault-sequences/).

??? note "Error Details"

    | Error code | Error message |
    | -------- | ------- |
    | 700901 | AWS_SQS:CLIENT_SDK_ERROR |
    | 700902 | AWS_SQS:INVALID_CONFIGURATION |
    | 700903 | AWS_SQS:GENERAL_ERROR |
