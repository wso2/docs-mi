# Cache Mediator

When a message enters a message flow, the Cache mediator checks whether the incoming message is similar to a previous message that was received
within a specified duration. This is done by evaluating the hash value of the incoming message. 

<table>
<thead>
<tr class="header">
<th></th>
<th>If a similar message was received before</th>
<th>If a similar message was not received before</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><strong>If the <code>onCacheHit</code> sequence is configured</strong></td>
<td>The Cache mediator executes the <code>onCacheHit</code> sequence and fetches the cached response. The response will be sent if the <a href="{{base_path}}/reference/mediators/respond-mediator">respond mediator</a> is defined.</td>
<td>The message is passed on to the subsequent mediators.</td>
</tr>
<tr class="odd">
<td><strong>If the <code>onCacheHit</code> sequence is not configured</strong></td>
<td>The cached response is returned to the client and the message is not passed on.</td>
<td>The message is passed on to the subsequent mediators.</td>
</tr>
</tbody>
</table>

!!! Note
    The Cache mediator supports only local caching. It does not support distributed caching.

## Syntax

```xml
<cache [timeout="seconds"] [collector=(true | false)] [maxMessageSize="in-bytes"] >
   <onCacheHit [sequence="key"]>
    (mediator)+
   </onCacheHit>?
   <protocol type="http" >?
     <methods>string</methods>
     <headersToExcludeInHash>string</headersToExcludeInHash>
     <responseCodes>regular expression</responseCodes>
     <enableCacheControl>(true | false)</enableCacheControl>
     <includeAgeHeader>(true | false)</includeAgeHeader>
     <hashGenerator>class</hashGenerator>
   </protocol>    
   <implementation [maxSize="int"]/>
</cache>
```

!!! Info
    In a message flow, you can use the cache mediator as a **finder** (in the incoming path to check the request) or as a **collector** (in the outgoing path to cache the response). It is not possible to have more than one cache mediator in the same message flow because mediation is terminated after the finder on a cache hit, and the response is not passed on to the next finder after a cache hit. See the [Example 1](#example-1) given below.

!!! Note
    The message needs to be explicitly marked as *RESPONSE* using the following property when collecting the cached 
    response in the same sequence after using the call mediator. This will not be required if the back end is 
    called via send mediator. See the [Example 1](#example-1) given below.
    ```xml
    <property name="RESPONSE" value="true" scope="default" type="STRING"/>
    ```
    
## Configuration

The **Cache type** specifies whether the Cache mediator should be in the incoming path (to check the request) or the outgoing path (to cache the response). Possible values are as follows:

- **Finder** : If this is selected, the Cache mediator is used to search for the request hash of incoming messages.
- **Collector** : If this is selected, the Cache mediator is used to collect response messages in the cache.

If the finder is selected as the cache type following parameters can be configured.

### Cache Mediator as a Finder

<table>
<thead>
<tr class="header">
<th>Parameter Name</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="even">
<td><strong>Cache Timeout (Seconds)</strong></td>
<td>The time duration that the cache should be retained specified in seconds. The cache expires once this time duration elapses. The default value is 5000 seconds.</td>
</tr>
<tr class="odd">
<td><strong>Maximum Message Size</strong></td>
<td>The maximum size of the message to be cached. This should be specified in bytes.</td>
</tr>
<tr class="even">
<td><strong>Protocol Type</strong></td>
<td>The protocol type to be cached in the message flow. In the current implementation, HTTP is the only value you can select. Although the only configuration supported for other protocols is the <code>HashGenerator</code>, you can specify the protocol type to be anything and specify a <code>HashGenerator</code> you prefer.</td>
</tr>
<tr class="odd">
<td><strong>HTTP Methods</strong></td>
<td>A comma-separated list of HTTP methods that should be cached for the HTTP protocol. The default value is <code>*</code>, where it caches all HTTP methods.</td>
</tr>
<tr class="even">
<td><strong>Headers to Exclude in Hash</strong></td>
<td>A comma-separated list of headers to ignore when hashing an incoming message. If you want to exclude all headers when hashing an incoming message, specify <code>*</code>.</td>
</tr>
<tr class="odd">
<td><strong>Response Codes</strong></td>
<td>Specify the response codes to be cached as a regular expression. If the http status code of a response matches the regular expression, the response should be cached. The default setting is to cache any response code.</td>
</tr>
<tr class="even">
<td><strong>Hash Generator</strong></td>
<td><div class="content-wrapper">
<p>This parameter is used to define the logic used by the Cache mediator to evaluate the hash values of incoming messages. The value specified here should be a class that implements the <code>org.separated.carbon.mediator.cache.digest.DigestGenerator</code> class interface. The default hash generator is <code>org.wso2.carbon.mediator.cache.digest.HttpRequestHashGenerator</code>. If the generated hash value is found in the cache, then the Cache mediator executes the <code>onCacheHit</code> sequence, which can be specified inline or referenced.</p>
<div class="admonition note">
    <p class="admonition-title">Note</p>
    <p>The default hash generator is specific to the HTTP protocol.</p>
    <p>If you are using any other protocol, you need to write a custom hash generator or use one of the following deprecated hash generator classes:</p>
        <ul>
        <li><code>org.wso2.carbon.mediator.cache.digest.DOMHASHGenerator</code></li>
        <li><code>org.wso2.carbon.mediator.cache.digest.REQUESTHASHGenerator</code></li>
        </ul>
</div>

</div></td>
</tr>
<tr class="odd">
<td><strong>Enable Cache Control Headers</strong></td>
<td><p>Whether the Cache mediator should honor the Cache-Control header (no-cache, no-store, max-age headers). If you set this to <code>false</code> which is the default value, the Cache mediator will not consider the Cache-Control headers when caching the response or returning the cached response.</p>
<div>
<br />

</div></td>
</tr>
<tr class="even">
<td><strong>Include Age Header</strong></td>
<td>Whether an Age header needs to be included when returning the cached response.</td>
</tr>
<tr class="odd">
<td><strong>Maximum Size</strong></td>
<td>The maximum number of elements to be cached. The default size is 1000.</td>
</tr>
<tr class="even">
<td><strong>Sequence Type</strong></td>
<td>
<ul>
<li><strong>Anonymous</strong> : If this option is selected, an anonymous sequence is executed in a cache hit.</li>
<li><strong>Registry reference</strong> : If this option is selected, the reference to the <code>onCacheHit</code> sequence has to be configured in the <strong>Sequence Key</strong> field. The sequence should be created in the registry to be specified in this field.</li>
</ul>
</td>
</tr>
</tbody>
</table>

## Examples

Following are examples of how you can use the Cache mediator.

### Example 1

Following is an example where the expected response from the last cache hit is not received because the response is sent once the request comes
to the first finder:

=== "Proxy Service"
    ``` xml
    <?xml version="1.0" encoding="UTF-8"?>
    <proxy xmlns="http://ws.apache.org/ns/synapse" name="cache115" transports="http https" startOnLoad="true">
       <description />
       <target>
          <inSequence>
             <cache collector="false" timeout="60">
                <protocol type="HTTP">
                   <methods>POST</methods>
                   <headersToExcludeInHash />
                   <responseCodes>.*</responseCodes>
                   <enableCacheControl>false</enableCacheControl>
                   <includeAgeHeader>false</includeAgeHeader>
                   <hashGenerator>org.wso2.carbon.mediator.cache.digest.HttpRequestHashGenerator</hashGenerator>
                </protocol>
             </cache>
             <call>
                <endpoint key="SomeServiceEndpoint"/>
             </call>
             <property name="RESPONSE" value="true" scope="default" type="STRING" />
             <log level="full" />
             <cache collector="true" />
             <property name="RESPONSE" value="false" scope="default" type="STRING" />
             <cache collector="false" timeout="60">
                <protocol type="HTTP">
                   <methods>POST</methods>
                   <headersToExcludeInHash />
                   <responseCodes>.*</responseCodes>
                   <hashGenerator>org.wso2.carbon.mediator.cache.digest.HttpRequestHashGenerator</hashGenerator>
                </protocol>
             </cache>
             <call>
                <endpoint key="HelloServiceEndpoint"/>
             </call>
             <property name="RESPONSE" value="true" scope="default" type="STRING" />
             <log level="full" />
             <cache collector="true" />
             <respond />
          </inSequence>
       </target>
    </proxy>          
    ```
=== "Endpoint 1"
    ``` xml
    <endpoint xmlns="http://ws.apache.org/ns/synapse" name="SomeServiceEndpoint">
        <address uri="http://demo0585968.mockable.io/some"/>
    </endpoint>
    ```
=== "Endpoint 2"
    ``` xml
    <endpoint xmlns="http://ws.apache.org/ns/synapse" name="HelloServiceEndpoint">
        <address uri="http://demo0585968.mockable.io/hello"/>
    </endpoint>
    ```

### Example 2

In this example configuration, when the first message is sent to the endpoint, the cache is not hit because it is the initial request and the cache is empty. 
The Cache mediator, configured in the inSequence, caches the response to this message. 
When a similar message is sent to the endpoint for the second time, the response is directly fetched from the cache and sent to the requester. This caching behavior by the onCacheHit element defined within the Cache mediator configuration. 
The onCacheHit element specifies that a cached response should be immediately returned if a cache hit occurs, without forwarding the request to the backend service again. This mechanism significantly improves the performance for repeated requests with the same cache key.

=== "Sequence"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <sequence name="cacheSequence" trace="disable" xmlns="http://ws.apache.org/ns/synapse">
        <cache id="simpleCache" scope="per-host" collector="false" hashGenerator="org.wso2.carbon.mediator.cache.digest.DOMHASHGenerator" timeout="20" maxMessageSize="10000">
            <implementation type="memory" maxSize="100"/>
            <onCacheHit>
                <respond/>
            </onCacheHit>
            <protocol type="HTTP">
                <methods>POST</methods>
                <headersToExcludeInHash/>
                <responseCodes>2[0-9][0-9]</responseCodes>
                <enableCacheControl>false</enableCacheControl>
                <includeAgeHeader>false</includeAgeHeader>
            </protocol>
        </cache>
        <call>
            <endpoint key="SimpleStockQuoteEndpoint"/>
        </call>
        <respond/>
    </sequence>
    ```
=== "Endpoint"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <endpoint xmlns="http://ws.apache.org/ns/synapse" name="SimpleStockQuoteEndpoint">
        <address uri="http://localhost:9000/services/SimpleStockQuoteService"/>
    </endpoint>
    ```

### Example 3

According to this example configuration, if you define a cache collector
using the cache mediator in the in sequence, you need to add the
`         RESPONSE        ` property to consider the message as a
response message.

=== "API"
    ``` xml
    <?xml version="1.0" encoding="UTF-8"?>
    <api context="/cache" name="cacheAPI" xmlns="http://ws.apache.org/ns/synapse">
        <resource methods="GET POST" uri-template="/headerapi/*">
            <inSequence>
                <cache collector="false" maxMessageSize="2000" timeout="5000">
                    <onCacheHit></onCacheHit>
                    <protocol type="HTTP">
                        <methods>GET,POST</methods>
                        <headersToExcludeInHash>*</headersToExcludeInHash>
                        <headersToIncludeInHash/>
                        <responseCodes>.*</responseCodes>
                        <enableCacheControl>false</enableCacheControl>
                        <includeAgeHeader>false</includeAgeHeader>
                        <hashGenerator>org.wso2.carbon.mediator.cache.digest.HttpRequestHashGenerator</hashGenerator>
                    </protocol>
                    <implementation maxSize="1000"/>
                </cache>
                <call>
                    <endpoint key="stockQuoteServiceEP"/>
                </call>
                <property name="RESPONSE" scope="default" type="STRING" value="true"/>
                <enrich>
                <source type="inline" clone="true">
                    <ax21:newvalue
                        xmlns:ax21="http://services.samples/xsd">testsamplevalue
                        </ax21:newvalue>
                    </source>
                    <target xmlns:ax21="http://services.samples/xsd" xmlns:ns="http://services.samples" action="sibling" xpath="//ns:getQuoteResponse/ns:return/ax21:volume"/>
                </enrich>
                <cache collector="true"/>
                <respond/>
            </inSequence>
            <faultSequence>
            </faultSequence>
        </resource>
    </api>
    ```
=== "Endpoint"
    ``` xml
    <?xml version="1.0" encoding="UTF-8"?>
    <endpoint xmlns="http://ws.apache.org/ns/synapse" name="stockQuoteServiceEP">
        <address uri="http://localhost:9000/services/SimpleStockQuoteService"/>
    </endpoint>
    ```

### Invalidate cached responses remotely

You can invalidate all cached response remotely by using any [JMX monitoring tool such as Jconsole]({{base_path}}/observe-and-manage/classic-observability-metrics/jmx-monitoring) via the exposed MBeans. You can use the `         invalidateTheWholeCache()        ` operation of the `         org.wso2.carbon.mediation        ` MBean for this as shown below.

![]({{base_path}}/assets/img/integrate/jmx/jmx_monitoring_cache_mediator.png)
