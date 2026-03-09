# HTTP Connector Reference

The following operations allow you to work with the HTTP. Click an operation name to see parameter details and samples on how to use it.

## Connections 

??? note "HTTP"
    The HTTP connection allows you to connect to an HTTP endpoint.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Display Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>connectionName</code></td>
            <td>Connection Name</td>
            <td>The name of the connection.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>baseUrl</code></td>
            <td>Base URL</td>
            <td>The base URL of the HTTP endpoint.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>authType</code></td>
            <td>Auth Type</td>
            <td>The type of authentication to be used. The available options are <code>None</code>, <code>Basic Auth</code>, and <code>OAuth</code>.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>username</code></td>
            <td>Username</td>
            <td>The username for the HTTP endpoint authentication.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>password</code></td>
            <td>Password</td>
            <td>The password for the HTTP endpoint authentication.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>oauthAuthorizationMode</code></td>
            <td>OAuth Authorization Mode</td>
            <td>The type of OAuth authorization mode. The available options are <code>Header</code>, and <code>Payload</code>.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>oauthGrantType</code></td>
            <td>OAuth Grant Type</td>
            <td>The type of OAuth grant type. The available options are <code>Authorization Code</code>, <code>Client Credentials</code>, and <code>Password</code>.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>oauthClientId</code></td>
            <td>Client ID</td>
            <td>The client ID for the OAuth authorization.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>oauthClientSecret</code></td>
            <td>Client Secret</td>
            <td>The client secret for the OAuth authorization.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>oauthTokenUrl</code></td>
            <td>Token URL</td>
            <td>The token URL for the OAuth authorization.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>oauthRefreshToken</code></td>
            <td>Refresh Token</td>
            <td>The refresh token for the OAuth authorization.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>oauthAdditionalProperties</code></td>
            <td>Additional Properties</td>
            <td>The additional properties for the OAuth authorization.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>timeoutDuration</code></td>
            <td>Time to wait for a response (in milliseconds)</td>
            <td>Connection timeout interval. If the remote endpoint does not respond at this time, it will be marked as "Timeout." This can be defined as a static value or as a dynamic value.Specify the value in milliseconds or an XPath expression. The default value is 60000 milliseconds.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>timeoutAction</code></td>
            <td>Action to perform upon response being timeout</td>
            <td>When a response comes to a timed-out request, this property specifies whether to discard it or invoke the fault handler. If you select "never", the endpoint remains in the "Active" state. This parameter is used to specify the action to perform once an endpoint has timed out. The available options are: "Never" the endpoint will never time out. This is the default setting, "Discard" if this is selected, the responses which arrive after the endpoint has timed out will be discarded, and "Fault" if this is selected, a fault sequence is triggered when the endpoint is timed out.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>retryErrorCodes</code></td>
            <td>Error codes which put the connection into timeout mode immediately</td>
            <td>A (comma-separated) list of error codes. If these error codes are received from the endpoint, the request will be subjected to a timeout. The defined error codes move the endpoint into the "Timeout" state, thereby marking it for suspension. After the number of defined <code>retriesBeforeSuspension</code> exceeds, the endpoint will be suspended. Default: 101504, 101505.</td>
            <td>No</td>
        </tr>   
        <tr>
            <td><code>retryCount</code></td>
            <td>Number of retry counts for a timeout connection before suspending</td>
            <td>The number of times the endpoint should be allowed to retry sending the response before it is marked for suspension. In the "Timeout" state, this number of requests minus one can be tried and failed before the endpoint is marked as "Suspended".</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>retryDelay</code></td>
            <td>Delay between retries for a timeout connection (in milliseconds)</td>
            <td>The time to wait between the last retry attempt and the next retry. Default: 0.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>suspendErrorCodes</code></td>
            <td>Error codes which immediately put the connection into suspend mode immediately</td>
            <td>Comma-separated list of error codes. This parameter allows you to select one or more error codes from the list of values. If any of the selected errors are received from the endpoint, the endpoint will be suspended.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>suspendInitialDuration</code></td>
            <td>Initial suspend duration when the connection is inactive (in milliseconds)</td>
            <td>The time duration (in milliseconds) for which the endpoint will be suspended when one or more suspend error codes are received from it for the first time. After an endpoint gets "Suspended", it will wait for this amount of time before trying to send the messages coming to it. All the messages coming during this time period will result in fault sequence activation.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>suspendProgressionFactor</code></td>
            <td>Suspend duration ratio to get the next suspend duration</td>
            <td>This value decides the suspend duration variance between subsequent suspensions. The endpoint will try to send the messages after the <code>initialDuration</code>. If it still fails, the next duration is calculated as:<code>Min(current suspension duration * progressionFactor, maximumDuration)</code>.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>suspendMaximumDuration</code></td>
            <td>Maximum suspend duration for the connection (in milliseconds)</td>
            <td>The maximum time duration (in milliseconds) for which the endpoint is suspended when the suspend error codes are received.</td>
            <td>No</td>
        </tr>
    </table>
    
    **Sample configuration**

    ```xml
    <http.init>
        <connectionType>http</connectionType>
        <baseUrl>http://localhost:9090</baseUrl>
        <authType>Basic Auth</authType>
        <basicCredentialsUsername>user</basicCredentialsUsername>
        <basicCredentialsPassword>1234</basicCredentialsPassword>
        <timeoutDuration>10</timeoutDuration>
        <timeoutAction>Never</timeoutAction>
        <retryErrorCodes>500</retryErrorCodes>
        <retryCount>1</retryCount>
        <retryDelay>5</retryDelay>
        <suspendErrorCodes>406</suspendErrorCodes>
        <suspendInitialDuration>-1</suspendInitialDuration>
        <suspendProgressionFactor>1</suspendProgressionFactor>
        <suspendMaximumDuration>5000</suspendMaximumDuration>
        <name>balSampleConn</name>
    </http.init>
    ```

??? note "HTTPS"
    The HTTPS connection allows you to connect to an HTTPS endpoint.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Display Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>connectionName</code></td>
            <td>Connection Name</td>
            <td>The name of the connection.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>baseUrl</code></td>
            <td>Base URL</td>
            <td>The base URL of the HTTP endpoint.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>authType</code></td>
            <td>Auth Type</td>
            <td>The type of authentication to be used. The available options are <code>None</code>, <code>Basic Auth</code>, and <code>OAuth</code>.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>username</code></td>
            <td>Username</td>
            <td>The username for the HTTP endpoint authentication.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>password</code></td>
            <td>Password</td>
            <td>The password for the HTTP endpoint authentication.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>oauthAuthorizationMode</code></td>
            <td>OAuth Authorization Mode</td>
            <td>The type of OAuth authorization mode. The available options are <code>Header</code>, and <code>Payload</code>.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>oauthGrantType</code></td>
            <td>OAuth Grant Type</td>
            <td>The type of OAuth grant type. The available options are <code>Authorization Code</code>, <code>Client Credentials</code>, and <code>Password</code>.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>oauthClientId</code></td>
            <td>Client ID</td>
            <td>The client ID for the OAuth authorization.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>oauthClientSecret</code></td>
            <td>Client Secret</td>
            <td>The client secret for the OAuth authorization.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>oauthTokenUrl</code></td>
            <td>Token URL</td>
            <td>The token URL for the OAuth authorization.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>oauthRefreshToken</code></td>
            <td>Refresh Token</td>
            <td>The refresh token for the OAuth authorization.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>oauthAdditionalProperties</code></td>
            <td>Additional Properties</td>
            <td>The additional properties for the OAuth authorization.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>timeoutDuration</code></td>
            <td>Time to wait for a response (in milliseconds)</td>
            <td>Connection timeout interval. If the remote endpoint does not respond at this time, it will be marked as "Timeout." This can be defined as a static value or as a dynamic value.Specify the value in milliseconds or an XPath expression. The default value is 60000 milliseconds.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>timeoutAction</code></td>
            <td>Action to perform upon response being timeout</td>
            <td>When a response comes to a timed-out request, this property specifies whether to discard it or invoke the fault handler. If you select "never", the endpoint remains in the "Active" state. This parameter is used to specify the action to perform once an endpoint has timed out. The available options are: "Never" the endpoint will never time out. This is the default setting, "Discard" if this is selected, the responses which arrive after the endpoint has timed out will be discarded, and "Fault" if this is selected, a fault sequence is triggered when the endpoint is timed out.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>retryErrorCodes</code></td>
            <td>Error codes which put the connection into timeout mode immediately</td>
            <td>A (comma-separated) list of error codes. If these error codes are received from the endpoint, the request will be subjected to a timeout. The defined error codes move the endpoint into the "Timeout" state, thereby marking it for suspension. After the number of defined <code>retriesBeforeSuspension</code> exceeds, the endpoint will be suspended. Default: 101504, 101505.</td>
            <td>No</td>
        </tr>   
        <tr>
            <td><code>retryCount</code></td>
            <td>Number of retry counts for a timeout connection before suspending</td>
            <td>The number of times the endpoint should be allowed to retry sending the response before it is marked for suspension. In the "Timeout" state, this number of requests minus one can be tried and failed before the endpoint is marked as "Suspended".</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>retryDelay</code></td>
            <td>Delay between retries for a timeout connection (in milliseconds)</td>
            <td>The time to wait between the last retry attempt and the next retry. Default: 0.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>suspendErrorCodes</code></td>
            <td>Error codes which immediately put the connection into suspend mode immediately</td>
            <td>Comma-separated list of error codes. This parameter allows you to select one or more error codes from the list of values. If any of the selected errors are received from the endpoint, the endpoint will be suspended.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>suspendInitialDuration</code></td>
            <td>Initial suspend duration when the connection is inactive (in milliseconds)</td>
            <td>The time duration (in milliseconds) for which the endpoint will be suspended when one or more suspend error codes are received from it for the first time. After an endpoint gets "Suspended", it will wait for this amount of time before trying to send the messages coming to it. All the messages coming during this time period will result in fault sequence activation.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>suspendProgressionFactor</code></td>
            <td>Suspend duration ratio to get the next suspend duration</td>
            <td>This value decides the suspend duration variance between subsequent suspensions. The endpoint will try to send the messages after the <code>initialDuration</code>. If it still fails, the next duration is calculated as:<code>Min(current suspension duration * progressionFactor, maximumDuration)</code>.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>suspendMaximumDuration</code></td>
            <td>Maximum suspend duration for the connection (in milliseconds)</td>
            <td>The maximum time duration (in milliseconds) for which the endpoint is suspended when the suspend error codes are received.</td>
            <td>No</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <https.init>
        <connectionType>http</connectionType>
        <baseUrl>http://localhost:9090</baseUrl>
        <certificateType>File</certificateType>
        <trustStoreCertificatePath>/Users/chathurangaj/Desktop/certificates/pets.crt</trustStoreCertificatePath>
        <authType>Basic Auth</authType>
        <basicCredentialsUsername>user</basicCredentialsUsername>
        <basicCredentialsPassword>1234</basicCredentialsPassword>
        <timeoutDuration>10</timeoutDuration>
        <timeoutAction>Never</timeoutAction>
        <retryErrorCodes>500</retryErrorCodes>
        <retryCount>1</retryCount>
        <retryDelay>5</retryDelay>
        <suspendErrorCodes>406</suspendErrorCodes>
        <suspendInitialDuration>-1</suspendInitialDuration>
        <suspendProgressionFactor>1</suspendProgressionFactor>
        <suspendMaximumDuration>5000</suspendMaximumDuration>
        <name>balSampleConn</name>
    </https.init>
    ```

## Operations

??? note "GET"
    The `GET` operation sends an HTTP GET request.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Display Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>relativePath</code></td>
            <td>Relative Path</td>
            <td>The relative path needed to be added to the end of the base URL. It allows path parameters and query parameters as well.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>headers</code></td>
            <td>Headers</td>
            <td>The key-value pairs of headers in 2D list format.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>forceScAccepted</code></td>
            <td>Force immediate 202 response</td>
            <td>When set to true, this property forces a 202 HTTP response to the client immediately after the WSO2 Integrator: MI receives the message so that the client stops waiting for a response.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>forceScAccepted</code></td>
            <td>Force immediate 202 response</td>
            <td>When set to true, this property forces a 202 HTTP response to the client immediately after the WSO2 Integrator: MI receives the message so that the client stops waiting for a response.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>disableChunking</code></td>
            <td>Disable Chunking</td>
            <td>When set to true, this property disables HTTP chunking for outgoing messages, calculating content length before sending them to the backend.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>forceHttp10</code></td>
            <td>Force HTTP 1.0</td>
            <td>When set to true, this property forces HTTP 1.0 for outgoing HTTP messages.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>noKeepAlive</code></td>
            <td>Disable HTTP Keep-Alive</td>
            <td>When set to true, this property disables HTTP keep-alive for outgoing requests.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>forcePostPutNobody</code></td>
            <td>Force nobody for POST/PUT methods</td>
            <td>When set to true, this property allows sending a request without a body for POST and PUT HTTP methods. Applicable only for HTTP PassThrough transport.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>forceHttpContentLength</code></td>
            <td>Force HTTP Content Length</td>
            <td>When set to true, this property sends the request with content length (no chunking) when 'Content-Length' is present in the client request.</td>
            <td>No</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <http.get configKey="QueryDoctorConn">
        <relativePath>/${params.uriParams.category}</relativePath>
        <headers>[[&quot;content-type&quot;,&quot;application/xml&quot;],]</headers>
        <forceScAccepted>false</forceScAccepted>
        <disableChunking>false</disableChunking>
        <forceHttp10>false</forceHttp10>
        <noKeepAlive>false</noKeepAlive>
        <forcePostPutNobody>false</forcePostPutNobody>
        <forceHttpContentLength>false</forceHttpContentLength>
    </http.get>
    ```

??? note "DELETE"
    The `DELETE` operation sends an HTTP DELETE request.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Display Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>relativePath</code></td>
            <td>Relative Path</td>
            <td>The relative path needed to be added to the end of the base URL. It allows path parameters and query parameters as well.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>headers</code></td>
            <td>Headers</td>
            <td>The key-value pairs of headers in 2D list format.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>forceScAccepted</code></td>
            <td>Force immediate 202 response</td>
            <td>When set to true, this property forces a 202 HTTP response to the client immediately after the WSO2 Integrator: MI receives the message so that the client stops waiting for a response.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>forceScAccepted</code></td>
            <td>Force immediate 202 response</td>
            <td>When set to true, this property forces a 202 HTTP response to the client immediately after the WSO2 Integrator: MI receives the message so that the client stops waiting for a response.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>disableChunking</code></td>
            <td>Disable Chunking</td>
            <td>When set to true, this property disables HTTP chunking for outgoing messages, calculating content length before sending them to the backend.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>forceHttp10</code></td>
            <td>Force HTTP 1.0</td>
            <td>When set to true, this property forces HTTP 1.0 for outgoing HTTP messages.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>noKeepAlive</code></td>
            <td>Disable HTTP Keep-Alive</td>
            <td>When set to true, this property disables HTTP keep-alive for outgoing requests.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>forcePostPutNobody</code></td>
            <td>Force nobody for POST/PUT methods</td>
            <td>When set to true, this property allows sending a request without a body for POST and PUT HTTP methods. Applicable only for HTTP PassThrough transport.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>forceHttpContentLength</code></td>
            <td>Force HTTP Content Length</td>
            <td>When set to true, this property sends the request with content length (no chunking) when 'Content-Length' is present in the client request.</td>
            <td>No</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <http.delete configKey="QueryDoctorConn">
        <relativePath>/${params.uriParams.category}</relativePath>
        <headers>[[&quot;content-type&quot;,&quot;application/xml&quot;],]</headers>
        <forceScAccepted>false</forceScAccepted>
        <disableChunking>false</disableChunking>
        <forceHttp10>false</forceHttp10>
        <noKeepAlive>false</noKeepAlive>
        <forcePostPutNobody>false</forcePostPutNobody>
        <forceHttpContentLength>false</forceHttpContentLength>
    </http.delete>
    ```

??? note "POST"
    The `POST` operation sends an HTTP POST request.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Display Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>relativePath</code></td>
            <td>Relative Path</td>
            <td>The relative path needed to be added to the end of the base URL. It allows path parameters and query parameters as well.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>headers</code></td>
            <td>Headers</td>
            <td>The key-value pairs of headers in 2D list format.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>requestBodyType</code></td>
            <td>Content Type</td>
            <td>This property specifies the content type of the request body. The available options are <code>JSON</code>, <code>XML</code>, and <code>TEXT</code>.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>requestBodyJson</code></td>
            <td>Request Body</td>
            <td>This property sets the request body when the content type is <code>JSON</code>. The default value is <code>${payload}</code>.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>requestBodyXml</code></td>
            <td>Request Body</td>
            <td>This property sets the request body when the content type is <code>XML</code>. The default value is <code>${xpath('$body/node()')}</code>.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>requestBodyText</code></td>
            <td>Request Body</td>
            <td>This property sets the request body when the content type is <code>TEXT</code>. The default value is <code>${xpath('$body/node()')}</code>.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>forceScAccepted</code></td>
            <td>Force immediate 202 response</td>
            <td>When set to true, this property forces a 202 HTTP response to the client immediately after the WSO2 Integrator: MI receives the message so that the client stops waiting for a response.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>forceScAccepted</code></td>
            <td>Force immediate 202 response</td>
            <td>When set to true, this property forces a 202 HTTP response to the client immediately after the WSO2 Integrator: MI receives the message so that the client stops waiting for a response.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>disableChunking</code></td>
            <td>Disable Chunking</td>
            <td>When set to true, this property disables HTTP chunking for outgoing messages, calculating content length before sending them to the backend.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>forceHttp10</code></td>
            <td>Force HTTP 1.0</td>
            <td>When set to true, this property forces HTTP 1.0 for outgoing HTTP messages.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>noKeepAlive</code></td>
            <td>Disable HTTP Keep-Alive</td>
            <td>When set to true, this property disables HTTP keep-alive for outgoing requests.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>forcePostPutNobody</code></td>
            <td>Force nobody for POST/PUT methods</td>
            <td>When set to true, this property allows sending a request without a body for POST and PUT HTTP methods. Applicable only for HTTP PassThrough transport.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>forceHttpContentLength</code></td>
            <td>Force HTTP Content Length</td>
            <td>When set to true, this property sends the request with content length (no chunking) when 'Content-Length' is present in the client request.</td>
            <td>No</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <http.post configKey="SimpleStockQuoteService">
        <relativePath></relativePath>
        <headers>[]</headers>
        <requestBodyType>XML</requestBodyType>
        <requestBodyXml>{${xpath('$body/node()')}}</requestBodyXml>
        <forceScAccepted>false</forceScAccepted>
        <disableChunking>false</disableChunking>
        <forceHttp10>false</forceHttp10>
        <noKeepAlive>false</noKeepAlive>
        <forcePostPutNobody>false</forcePostPutNobody>
        <forceHttpContentLength>false</forceHttpContentLength>
    </http.post>
    ```

??? note "PUT"
    The `PUT` operation sends an HTTP PUT request.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Display Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>relativePath</code></td>
            <td>Relative Path</td>
            <td>The relative path needed to be added to the end of the base URL. It allows path parameters and query parameters as well.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>headers</code></td>
            <td>Headers</td>
            <td>The key-value pairs of headers in 2D list format.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>requestBodyType</code></td>
            <td>Content Type</td>
            <td>This property specifies the content type of the request body. The available options are <code>JSON</code>, <code>XML</code>, and <code>TEXT</code>.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>requestBodyJson</code></td>
            <td>Request Body</td>
            <td>This property sets the request body when the content type is <code>JSON</code>. The default value is <code>${payload}</code>.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>requestBodyXml</code></td>
            <td>Request Body</td>
            <td>This property sets the request body when the content type is <code>XML</code>. The default value is <code>${xpath('$body/node()')}</code>.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>requestBodyText</code></td>
            <td>Request Body</td>
            <td>This property sets the request body when the content type is <code>TEXT</code>. The default value is <code>${xpath('$body/node()')}</code>.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>forceScAccepted</code></td>
            <td>Force immediate 202 response</td>
            <td>When set to true, this property forces a 202 HTTP response to the client immediately after the WSO2 Integrator: MI receives the message so that the client stops waiting for a response.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>forceScAccepted</code></td>
            <td>Force immediate 202 response</td>
            <td>When set to true, this property forces a 202 HTTP response to the client immediately after the WSO2 Integrator: MI receives the message so that the client stops waiting for a response.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>disableChunking</code></td>
            <td>Disable Chunking</td>
            <td>When set to true, this property disables HTTP chunking for outgoing messages, calculating content length before sending them to the backend.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>forceHttp10</code></td>
            <td>Force HTTP 1.0</td>
            <td>When set to true, this property forces HTTP 1.0 for outgoing HTTP messages.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>noKeepAlive</code></td>
            <td>Disable HTTP Keep-Alive</td>
            <td>When set to true, this property disables HTTP keep-alive for outgoing requests.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>forcePostPutNobody</code></td>
            <td>Force nobody for POST/PUT methods</td>
            <td>When set to true, this property allows sending a request without a body for POST and PUT HTTP methods. Applicable only for HTTP PassThrough transport.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>forceHttpContentLength</code></td>
            <td>Force HTTP Content Length</td>
            <td>When set to true, this property sends the request with content length (no chunking) when 'Content-Length' is present in the client request.</td>
            <td>No</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <http.put configKey="SimpleStockQuoteService">
        <relativePath></relativePath>
        <headers>[]</headers>
        <requestBodyType>XML</requestBodyType>
        <requestBodyXml>{${xpath('$body/node()')}}</requestBodyXml>
        <forceScAccepted>false</forceScAccepted>
        <disableChunking>false</disableChunking>
        <forceHttp10>false</forceHttp10>
        <noKeepAlive>false</noKeepAlive>
        <forcePostPutNobody>false</forcePostPutNobody>
        <forceHttpContentLength>false</forceHttpContentLength>
    </http.put>
    ```

??? note "PATCH"
    The `PATCH` operation sends an HTTP PATCH request.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Display Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>relativePath</code></td>
            <td>Relative Path</td>
            <td>The relative path needed to be added to the end of the base URL. It allows path parameters and query parameters as well.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>headers</code></td>
            <td>Headers</td>
            <td>The key-value pairs of headers in 2D list format.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>requestBodyType</code></td>
            <td>Content Type</td>
            <td>This property specifies the content type of the request body. The available options are <code>JSON</code>, <code>XML</code>, and <code>TEXT</code>.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>requestBodyJson</code></td>
            <td>Request Body</td>
            <td>This property sets the request body when the content type is <code>JSON</code>. The default value is <code>${payload}</code>.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>requestBodyXml</code></td>
            <td>Request Body</td>
            <td>This property sets the request body when the content type is <code>XML</code>. The default value is <code>${xpath('$body/node()')}</code>.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>requestBodyText</code></td>
            <td>Request Body</td>
            <td>This property sets the request body when the content type is <code>TEXT</code>. The default value is <code>${xpath('$body/node()')}</code>.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>forceScAccepted</code></td>
            <td>Force immediate 202 response</td>
            <td>When set to true, this property forces a 202 HTTP response to the client immediately after the WSO2 Integrator: MI receives the message so that the client stops waiting for a response.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>forceScAccepted</code></td>
            <td>Force immediate 202 response</td>
            <td>When set to true, this property forces a 202 HTTP response to the client immediately after the WSO2 Integrator: MI receives the message so that the client stops waiting for a response.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>disableChunking</code></td>
            <td>Disable Chunking</td>
            <td>When set to true, this property disables HTTP chunking for outgoing messages, calculating content length before sending them to the backend.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>forceHttp10</code></td>
            <td>Force HTTP 1.0</td>
            <td>When set to true, this property forces HTTP 1.0 for outgoing HTTP messages.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>noKeepAlive</code></td>
            <td>Disable HTTP Keep-Alive</td>
            <td>When set to true, this property disables HTTP keep-alive for outgoing requests.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>forcePostPutNobody</code></td>
            <td>Force nobody for POST/PUT methods</td>
            <td>When set to true, this property allows sending a request without a body for POST and PUT HTTP methods. Applicable only for HTTP PassThrough transport.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>forceHttpContentLength</code></td>
            <td>Force HTTP Content Length</td>
            <td>When set to true, this property sends the request with content length (no chunking) when 'Content-Length' is present in the client request.</td>
            <td>No</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <http.patch configKey="SimpleStockQuoteService">
        <relativePath></relativePath>
        <headers>[]</headers>
        <requestBodyType>XML</requestBodyType>
        <requestBodyXml>{${xpath('$body/node()')}}</requestBodyXml>
        <forceScAccepted>false</forceScAccepted>
        <disableChunking>false</disableChunking>
        <forceHttp10>false</forceHttp10>
        <noKeepAlive>false</noKeepAlive>
        <forcePostPutNobody>false</forcePostPutNobody>
        <forceHttpContentLength>false</forceHttpContentLength>
    </http.patch>
    ```

??? note "HEAD"
    The `HEAD` operation sends an HTTP HEAD request.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Display Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>relativePath</code></td>
            <td>Relative Path</td>
            <td>The relative path needed to be added to the end of the base URL. It allows path parameters and query parameters as well.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>headers</code></td>
            <td>Headers</td>
            <td>The key-value pairs of headers in 2D list format.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>requestBodyType</code></td>
            <td>Content Type</td>
            <td>This property specifies the content type of the request body. The available options are <code>JSON</code>, <code>XML</code>, and <code>TEXT</code>.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>requestBodyJson</code></td>
            <td>Request Body</td>
            <td>This property sets the request body when the content type is <code>JSON</code>. The default value is <code>${payload}</code>.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>requestBodyXml</code></td>
            <td>Request Body</td>
            <td>This property sets the request body when the content type is <code>XML</code>. The default value is <code>${xpath('$body/node()')}</code>.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>requestBodyText</code></td>
            <td>Request Body</td>
            <td>This property sets the request body when the content type is <code>TEXT</code>. The default value is <code>${xpath('$body/node()')}</code>.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>forceScAccepted</code></td>
            <td>Force immediate 202 response</td>
            <td>When set to true, this property forces a 202 HTTP response to the client immediately after the WSO2 Integrator: MI receives the message so that the client stops waiting for a response.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>forceScAccepted</code></td>
            <td>Force immediate 202 response</td>
            <td>When set to true, this property forces a 202 HTTP response to the client immediately after the WSO2 Integrator: MI receives the message so that the client stops waiting for a response.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>disableChunking</code></td>
            <td>Disable Chunking</td>
            <td>When set to true, this property disables HTTP chunking for outgoing messages, calculating content length before sending them to the backend.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>forceHttp10</code></td>
            <td>Force HTTP 1.0</td>
            <td>When set to true, this property forces HTTP 1.0 for outgoing HTTP messages.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>noKeepAlive</code></td>
            <td>Disable HTTP Keep-Alive</td>
            <td>When set to true, this property disables HTTP keep-alive for outgoing requests.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>forcePostPutNobody</code></td>
            <td>Force nobody for POST/PUT methods</td>
            <td>When set to true, this property allows sending a request without a body for POST and PUT HTTP methods. Applicable only for HTTP PassThrough transport.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>forceHttpContentLength</code></td>
            <td>Force HTTP Content Length</td>
            <td>When set to true, this property sends the request with content length (no chunking) when 'Content-Length' is present in the client request.</td>
            <td>No</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <http.head configKey="SimpleStockQuoteService">
        <relativePath></relativePath>
        <headers>[]</headers>
        <requestBodyType>XML</requestBodyType>
        <requestBodyXml>{${xpath('$body/node()')}}</requestBodyXml>
        <forceScAccepted>false</forceScAccepted>
        <disableChunking>false</disableChunking>
        <forceHttp10>false</forceHttp10>
        <noKeepAlive>false</noKeepAlive>
        <forcePostPutNobody>false</forcePostPutNobody>
        <forceHttpContentLength>false</forceHttpContentLength>
    </http.head>
    ```

??? note "HEAD"
    The `HEAD` operation sends an HTTP HEAD request.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Display Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>relativePath</code></td>
            <td>Relative Path</td>
            <td>The relative path needed to be added to the end of the base URL. It allows path parameters and query parameters as well.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>headers</code></td>
            <td>Headers</td>
            <td>The key-value pairs of headers in 2D list format.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>requestBodyType</code></td>
            <td>Content Type</td>
            <td>This property specifies the content type of the request body. The available options are <code>JSON</code>, <code>XML</code>, and <code>TEXT</code>.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>requestBodyJson</code></td>
            <td>Request Body</td>
            <td>This property sets the request body when the content type is <code>JSON</code>. The default value is <code>${payload}</code>.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>requestBodyXml</code></td>
            <td>Request Body</td>
            <td>This property sets the request body when the content type is <code>XML</code>. The default value is <code>${xpath('$body/node()')}</code>.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>requestBodyText</code></td>
            <td>Request Body</td>
            <td>This property sets the request body when the content type is <code>TEXT</code>. The default value is <code>${xpath('$body/node()')}</code>.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>forceScAccepted</code></td>
            <td>Force immediate 202 response</td>
            <td>When set to true, this property forces a 202 HTTP response to the client immediately after the WSO2 Integrator: MI receives the message so that the client stops waiting for a response.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>forceScAccepted</code></td>
            <td>Force immediate 202 response</td>
            <td>When set to true, this property forces a 202 HTTP response to the client immediately after the WSO2 Integrator: MI receives the message so that the client stops waiting for a response.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>disableChunking</code></td>
            <td>Disable Chunking</td>
            <td>When set to true, this property disables HTTP chunking for outgoing messages, calculating content length before sending them to the backend.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>forceHttp10</code></td>
            <td>Force HTTP 1.0</td>
            <td>When set to true, this property forces HTTP 1.0 for outgoing HTTP messages.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>noKeepAlive</code></td>
            <td>Disable HTTP Keep-Alive</td>
            <td>When set to true, this property disables HTTP keep-alive for outgoing requests.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>forcePostPutNobody</code></td>
            <td>Force nobody for POST/PUT methods</td>
            <td>When set to true, this property allows sending a request without a body for POST and PUT HTTP methods. Applicable only for HTTP PassThrough transport.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>forceHttpContentLength</code></td>
            <td>Force HTTP Content Length</td>
            <td>When set to true, this property sends the request with content length (no chunking) when 'Content-Length' is present in the client request.</td>
            <td>No</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <http.options configKey="SimpleStockQuoteService">
        <relativePath></relativePath>
        <headers>[]</headers>
        <requestBodyType>JSON</requestBodyType>
        <requestBodyXml>{${payload}}</requestBodyXml>
        <forceScAccepted>false</forceScAccepted>
        <disableChunking>false</disableChunking>
        <forceHttp10>false</forceHttp10>
        <noKeepAlive>false</noKeepAlive>
        <forcePostPutNobody>false</forcePostPutNobody>
        <forceHttpContentLength>false</forceHttpContentLength>
    </http.options>
    ```
