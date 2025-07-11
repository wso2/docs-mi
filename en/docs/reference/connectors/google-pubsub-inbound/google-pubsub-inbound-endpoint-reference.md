# Google Pub/Sub Inbound Endpoint Reference

The following sections provide a detailed reference for the Google Pub/Sub Inbound Endpoint in WSO2 Micro
Integrator.

Below table shows the configuration for the polling consumer for an already exist subscription.

<table>
  <tr>
    <th>Parameter</th>
    <th>Description</th>
    <th>Required</th>
    <th>Default Value</th>
  </tr>
  <tr>
    <td>name</td>
    <td>The name of the inbound endpoint.</td>
    <td>Yes</td>
    <td>None</td>
  </tr>
  <tr>
    <td> Polling Interval</td>
    <td>The interval at which the inbound endpoint polls for new events from Google pub/sub.</td>
    <td>No</td>
    <td>100 </td>
  </tr>
  <tr>
        <td> Endpoint</td>
        <td>The endpoint details (host:port) of the Google server to connect to.</td>
        <td>Yes</td>
        <td>pubsub.googleapis.com:443</td>
 </tr>
 <tr>
  <tr>
    <td>Project Id</td>
    <td>The Google Cloud project identifier where the Pub/Sub resources (topics/subscriptions) are managed. </td>
    <td>Yes</td>
    <td>None</td>
  </tr>
  <tr>
    <td>Subscription Id</td>
    <td>The ID of the Pub/Sub subscription to which the consumer should connect to receive messages.</td>
    <td>Yes</td>
    <td>None</td>
  </tr>
  <tr>
    <td>Service Account Key File Path</td>
    <td>Absolute path to the service account JSON key file used to authenticate with Google Cloud Pub/Sub APIs. 
    If not specified, the client will attempt to load default credentials from the environment variable 
    <code>GOOGLE_APPLICATION_CREDENTIALS</code> (e.g., <code>export GOOGLE_APPLICATION_CREDENTIALS=/path/to/key.json</code>), or use the default service account when running on Google Cloud.</td>
    <td>No</td>
    <td>None</td>
  </tr>
    <tr>
        <td>Parallel Consumer Count</td>
        <td>The number of parallel pull consumers used to fetch messages from the subscription.
    Each consumer maintains its own stream connection to Pub/Sub. Increasing this can improve throughput but may increase resource usage.</td>
        <td>No</td>
        <td>1</td>
    </tr>
    <tr>
        <td>Thread Count Per Consumer</td>
        <td>Number of threads allocated for processing messages per consumer. 
    This controls how many messages can be processed concurrently by each pull worker.</td>
        <td>No</td>
        <td>5</td>
    </tr>
    <tr>
        <td>Max Outstanding Message Count</td>
        <td>The maximum number of unacknowledged messages allowed in memory before the client applies flow control and pauses message delivery.
    Helps limit memory usage and controls backpressure.</td>
        <td>No</td>
        <td>1000</td>
    </tr>
    <tr>
    <td> Max Outstanding Message Size</td>
        <td>The maximum total size (in MB) of unacknowledged messages buffered in memory. 
    Once this limit is reached, message delivery is paused until space is available.
    This prevents the subscriber from running out of memory due to high message volume.</td>
        <td>No</td>
        <td>100MB</td>
    </tr>
</table>

If you want MI to create/update the Google pub/sub subscription, you can configure the below parameters accordingly as described below.


<table>
<tr>
    <th>Parameter</th>
    <th>Description</th>
    <th>Required</th>
    <th>Default Value</th>
  </tr>
    <tr>
        <td>Create Subscription on Connect</td>
        <td>Specifies whether WSO2 MI should automatically create the Pub/Sub subscription if it does not already exist.</td>
        <td>No</td>
        <td>false</td>
    </tr>
    <tr>
        <td>Update Subscription If Exists</td>
        <td>Determines whether WSO2 MI should update the subscription if it already exists (e.g., to modify settings such as acknowledgment deadline or message retention). Topic, Message Ordering and Filter for a given subscription cannot be updated. In a scenario you have enabled this parameter and client identifies a mistmatch in message ordering and filtering configuration , the existing subscription will be deleted and a new subscription will be created.</td>
        <td>No</td>
        <td>false</td>
    </tr>
    <tr>
        <td>Topic Id</td>
        <td>The ID of the Pub/Sub topic to subscribe to. Required only if subscription creation or update is enabled.</td>
        <td>No</td>
        <td>None</td>
    </tr>
    <tr>
        <td>Enable Message Ordering</td>
        <td>When enabled, the subscriber receives messages that share the same ordering key in the exact order they were published. This guarantees per-key message ordering, assuming the topic also has message ordering enabled and publishers specify an ordering key. This is particularly useful when processing messages that must maintain a specific sequence, such as transaction logs or user session events</td>
        <td>No</td>
        <td>None</td>
    </tr>
    <tr>
        <td>Message Filter</td>
        <td>A Pub/Sub filter expression to control which messages are delivered to the subscription. Messages that do not match are discarded. Choose valid filter configuration according to <a href="https://cloud.google.com/pubsub/docs/subscription-message-filter#filtering_syntax" target="_blank">Pub/Sub Documentation - Filter messages from a subscription</a></td>
        <td>No</td>
        <td>None</td>
    </tr>
    <tr>
        <td>Acknowledgement Deadline (seconds)</td>
        <td>The maximum time the subscriber has to acknowledge each message. If not acknowledged within this period (between 10 and 600 seconds), the message will be redelivered. If you have set <code>sequential=true</code>, make sure to tune the Ack deadline according to the max processing time the mediation could spend.</td>
        <td>No</td>
        <td>10</td>
    </tr>
        <tr>
        <td>Message Retention Duration (minutes)</td>
        <td>How long unacknowledged messages are retained in the subscription. If "Retain Acked Messages" is enabled, acknowledged messages are also retained for the same duration. Allowed range: 10 minutes to 31 days.</td>
        <td>No</td>
        <td>10080</td>
    </tr>
<tr>
        <td>Retain Acked Messages</td>
        <td>When enabled, acknowledged messages will be retained in the subscription's backlog for the configured retention duration.</td>
        <td>No</td>
        <td>false</td>
    </tr>
    <tr>
        <td>Enable Exactly Once Delivery</td>
        <td>Ensures that each message is delivered exactly once without duplicates, as long as messages are acknowledged before the deadline.</td>
        <td>No</td>
        <td>false</td>
    </tr>
    <tr>
        <td>Dead Letter Topic</td>
        <td>The topic to which messages that exceed the maximum delivery attempts are sent (dead letter policy).</td>
        <td>No</td>
        <td>None</td>
    </tr>
    <tr>
        <td>Max Delivery Attempts</td>
        <td>Maximum number of delivery attempts for a message before it is sent to the dead letter topic.</td>
        <td>No</td>
        <td>5</td>
    </tr>
        <tr>
        <td>Min BackOff Duration (seconds)</td>
        <td>The minimum delay before the first redelivery attempt of a failed message.</td>
        <td>No</td>
        <td>10</td>
    </tr>
    <tr>
        <td>Max BackOff Duration (seconds)</td>
        <td>The maximum delay for redelivery retries. Pub/Sub will not delay redelivery longer than this value.</td>
        <td>No</td>
        <td>600</td>
    </tr>
    <tr>
        <td>Labels</td>
        <td>Key-value pairs used to label the subscription. Format: <code>key1=value1,key2=value2</code></td>
        <td>No</td>
        <td>None</td>
    </tr>
</table>

!!! Note 
    When message ordering is enabled for the subscription, to ensure the messages are consumed and processed in the same order as they were published the below recommendations needs to be followed.
    
    ***Recommendation:***

     1. Inbound endpoint should be configured setting <code>sequential=true</code>
     2. A synchronous mediation flow should be used 
     3. Max Outstanding Message Count for the subscriber should be set to 1

    Enabling message ordering may increase **latency** due to strict sequencing constraints.  
    
    There is **no restriction** on increasing the `Parallel Consumer Count`, as messages with a single ordering key are always processed by a single subscriber stream.