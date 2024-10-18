# Redis Connector Example

The Redis connector allows you to access the Redis commands from an integration sequence. 

## What you'll build

Given below is a sample scenario that demonstrates how to work with the WSO2 Redis Connector and access the Redis server, using Redis commands.

The user sends the request to invoke an API to get stock details. This REST call will get converted into a SOAP message and is sent to the back-end service. While the response from the backend service is converted back to JSON and sent back to the API caller, the integration runtime will extract stock volume details from the response and store it into a configured Redis server.
When users need to retrieve stock volumes collected, they can invoke the `getstockvolumedetails` resource. This example also demonstrates how users can manipulate stock volume details by removing unwanted items from the Redis server.

> **Note**: In this scenario you need to set up the Redis Server in your local machine. Please refer to the [Setting up the Redis Connector]({{base_path}}/reference/connectors/redis-connector/redis-connector-configuration/) documentation. Follow the steps listed under `Setting up the Redis server` section to setup the Redis server and `Set up the back-end service` section to setup the Stockquote service. 
This example demonstrates how to use Redis connector to:

1. Retrieve stock volume details from the Stockquote back-end service. This is done while extracting the stock volume, creating a Redis hash map, and adding stock volume details to the Redis server. (In this example, Redis hashes are used to store different companies' stock volume details. Since the “symbol” that is sent in the request is “WSO2”, the request is routed to the WSO2 endpoint. Once the response from the WSO2 endpoint is received, it is transformed according to the specified template and sent to the client. Then create a hash map and insert extracted details into the Redis hashmap).
2. Retrieve all stock volume details from the Redis server.
3. Remove stock volume details from the Redis server.

All three operations are exposed via a `StockQuoteAPI` API. The API with the context `/stockquote` has three resources:  

* `/getstockquote/{symbol}`: This is used to get stock volume details while extracting and sending details to the Redis hash map.
* `/getstockvolumedetails` : Retrieve information about the inserted stock volume details.
* `/deletestockvolumedetails` : Remove unwanted stock volume details.

The following diagram shows the overall solution. The user creates a hash map, stores WSO2 stock volume details into the list, and then receives it back and removes unwanted hash map items. To invoke each operation, the user uses the same API.

<img src="{{base_path}}/assets/img/integrate/connectors/redis-connector-example-updated.png" title="Redis connector example" width="800" alt="Redis connector example"/>

If you do not want to configure this yourself, you can simply [get the project](#get-the-project) and run it.

## Setup the Integration Project

{!includes/build-and-run.md!}

## Add integration logic

### Create the Endpoint

1. Navigate to **MI Project Explorer** > **Endpoints** and click on the **+** icon next to **Endpoints**.

3. Select **Address Endpoint**.

4. In **Endpoint Artifact** interface that appears, specify the following values and click **Create**.

    <table>
      <tr>
         <th>Parameter</th>
         <th>Value</th>
      </tr>
      <tr>
        <td>Endpoint Name</td>
        <td><code>StockQuoteEP</code></td>
      </tr>
      <tr>
        <td>URI Template</td>
        <td><code>http://localhost:9000/services/SimpleStockQuoteService</code></td>
      </tr>
      <tr>
        <td>Format</td>
        <td><code>SOAP 1.1</code></td>
      </tr>
    </table>

    <img src="{{base_path}}/assets/img/integrate/connectors/redis/create-endpoint.png" title="Create Endpoint" width="600" alt="Create Endpoint"/> 

### Create the REST API

1. Navigate to **MI Project Explorer** > **APIs** and click on the **+** sign next to APIs to open the **Synapse API Artifact** creation form. 

2. Specify the API name as `SampleRedisAPI` and the API context as `/stockquote` and click **Create**.

    <img src="{{base_path}}/assets/img/integrate/connectors/redis/create-api.png" title="Create API" width="700" alt="Create API"/>

    After creating the API artifact, the Service Designer pane will be displayed with the default API resource.

4. Click on the **options** icon and select **edit** to edit the resource.

    Specify values for the required resource properties:

    <table>
      <tr>
         <th>Parameter</th>
         <th>Value</th>
      </tr>
      <tr>
        <td>Url Style</td>
        <td><code>URL_TEMPLATE</code></td>
      </tr>
      <tr>
        <td>Uri Template</td>
        <td>
          <code>/getstockquote/{symbol}</code>
        </td>
      </tr>
      <tr>
        <td>Methods</td>
        <td><code>GET</code></td>
      </tr>
    </table> 
   
    <img src="{{base_path}}/assets/img/integrate/connectors/redis/edit-resource-option.png" title="Edit API resource" width="500" alt="Edit API resource"/>

    <img src="{{base_path}}/assets/img/integrate/connectors/redis/edit-api-resource.png" title="Edit API resource" width="500" alt="Edit API resource"/>

5. To create the other two resources, click on the **+ Resource** button on the **Service Designer** and configure the following values.

      <table>
         <tr>
            <th>Parameter</th>
            <th>resource 2</th>
            <th>resource 3</th>
         </tr>
         <tr>
           <td>Url Style</td>
           <td><code>URL_TEMPLATE</code></td>
           <td><code>URL_TEMPLATE</code></td>
         </tr>
         <tr>
           <td>Uri Template</td>
           <td>
             <code>/getstockvolumedetails</code>
           </td>
           <td>
             <code>/deletestockvolumedetails</code>
           </td>
         </tr>
         <tr>
           <td>Methods</td>
           <td><code>GET</code></td>
           <td><code>POST</code></td>
         </tr>
       </table> 

    <img src="{{base_path}}/assets/img/integrate/connectors/redis/add-resource.png" title="Add Resource" width="600" alt="Add Resource"/>

    <img src="{{base_path}}/assets/img/integrate/connectors/redis/resource-overview.png" title="List of Resources" width="600" alt="List of Resources"/>

### Create the mediation logic

#### Configure a resource for the getstockquote operation

Configure a resource that sets up a Redis hash map and sets a specific field in a hash to a specified value. In this sample, the user sends the request to invoke the created API to get WSO2 stock volume details. To achieve this, follow the steps below.

1. Click on the `GET getstockquote` API resource under available resources on the **Service Designer**.

    You will now see the graphical view of the `SampleRedisAPI`.

2. Click on the **+** icon under **start** to add a mediator.

3. Add a payload factory mediator from the mediator palette to extract the selected stock details. In this sample, we attempt to get WSO2 stock details from the `SimpleStockQuoteService`.
    <table>
      <tr>
         <th>Parameter</th>
         <th>Value</th>
      </tr>
      <tr>
        <td>Payload Format</td>
        <td><code>Inline</code></td>
      </tr>
      <tr>
        <td>Media Type</td>
        <td>
          <code>xml</code>
        </td>
      </tr>
      <tr>
        <td>Template Type</td>
        <td><code>default</code></td>
      </tr>
      <tr>
        <td>Payload</td>
        <td>
         ```
         <m0:getQuote xmlns:m0="http://services.samples">
         <m0:request>
         <m0:symbol>$1</m0:symbol>
         </m0:request>
         </m0:getQuote>
         ```
        </td>
      </tr>
    </table>

    Add parameter:
    <table>
      <tr>
         <td>Argument value (Expression)</td>
         <td><code>get-property('uri.var.symbol')</code></td>
      </tr>
      <tr>
         <td>Evaluator</td>
         <td><code>xml</code></td>
      </tr>
    </table>

    <img src="{{base_path}}/assets/img/integrate/connectors/redis/add-payload-factory.png" title="Add payloadfactory to extract WSO2 details" width="600" alt="Add payloadfactory to extract WSO2 details"/> 

4. Add a header to get a quote from the `SimpleStockQuoteService`.

    <table>
         <tr>
            <th>Parameter</th>
            <th>Value</th>
         </tr>
         <tr>
           <td>Header Name</td>
           <td><code>Action</code></td>
         </tr>
         <tr>
           <td>Header Action</td>
           <td>
             <code>set</code>
           </td>
         </tr>
         <tr>
           <td>Scope</td>
           <td><code>default</code></td>
         </tr>
         <tr>
           <td>Header Value Type</td>
           <td><code>LITERAL</code></td>
         </tr>
         <tr>
           <td>Header Value Literal</td>
           <td><code>urn:getQuote</code></td>
         </tr>
       </table> 

    <img src="{{base_path}}/assets/img/integrate/connectors/redis/redis-header.png" title="Add Header to get Quote" width="600" alt="Add Header to get Quote"/>

6. Add an address endpoint using the call mediator to access `SimpleStockQuoteService`. Select the previously created `StockQuoteEP` from the dropdown.

    <img src="{{base_path}}/assets/img/integrate/connectors/redis/call-mediator.png" title="Call mediator" width="600" alt="Call mediator"/>  

8. In this example, we copy the original payload to a property using the Enrich mediator.
   
    <img src="{{base_path}}/assets/img/integrate/connectors/redis/enrich-mediator-1.png" title="Add enrich mediator" width="600" alt="Add enrich mediator"/> 

9. To get the input values into the `hSet`, we can use the [property mediator]({{base_path}}/reference/mediators/property-mediator). Navigate into the Mediator Palette and select the `Property` mediators.

   1. Add the property mediator to capture the `symbol` value from the response of `SimpleStockQuoteService`. The 'symbol' contains the company name of the stock quote.

       <table>
         <tr>
           <td>Property Name</td>
           <td><code>symbol</code></td>
         </tr>
         <tr>
           <td>Property Value (Expression)</td>
           <td>
             <code>$body/soapenv:Envelope/soapenv:Body/ns:getQuoteResponse/ax21:symbol</code>
           </td>
         </tr>
       </table> 
      <img src="{{base_path}}/assets/img/integrate/connectors/redis/property-symbol.png" title="Add property mediators to get symbol" width="600" alt="Add property mediators to get symbol"/>

   2. Add the property mediator to capture the `volume` values. The 'volume' contains the stock quote volume of the selected company.

      <table>
         <tr>
           <td>Property Name</td>
           <td><code>volume</code></td>
         </tr>
         <tr>
           <td>Property Value (Expression)</td>
           <td>
             <code>$body/soapenv:Envelope/soapenv:Body/ns:getQuoteResponse/ax21:volume</code>
           </td>
         </tr>
       </table> 
       <img src="{{base_path}}/assets/img/integrate/connectors/redis/property-volume.png" title="Add property mediators to get volume" width="600" alt="Add property mediators to get volume"/>  

10. Add Redis connector operation.
    
     1. Click **+** icon under the property mediator.
     2. Select the **Redis** connector from the **Connectors** section.
    
        <img src="{{base_path}}/assets/img/integrate/connectors/redis/redis-mediator.png" title="Redis mediator" width="400" alt="Redis mediator"/>
        
     3. Select **hSet** from the connector operations.
     4. Next, you have to create a Redis connection. Click the **Add new connection**.
     5. Configure the values as shown below and click **Add**. 
    
        <table>
          <tr>
            <td>redisHost</td>
            <td><code>The Redis hostname (default: localhost)</code></td>
          </tr>
          <tr>
            <td>redisPort</td>
            <td><code>The port on which the Redis server is running (default: 6379)</code></td>
          </tr>
        </table> 
    
        <img src="{{base_path}}/assets/img/integrate/connectors/redis/add-redis-connection.png" title="Add redis connection" width="400" alt="Add redis connection"/>
    
     6. Navigate to the **Add hSet** form and select the created `redis` connection from the **Connection Type** dropdown.
     7. In this operation we are going to set a hash map to the Redis server. The hSet operation sets a specific field in a hash to a specified value.

        - **redisKey** : The name of the key where the hash is stored.
        - **redisField** : The field for which you want to set a value.
        - **redisValue** : The value that you want to set for the field.
        
        Configure the following values and click **submit**
         <table>
         <tr>
           <td>redisKey</td>
           <td><code>StockVolume</code></td>
         </tr>
         <tr>
           <td>redisField</td>
           <td><code>$ctx:symbol</code></td>
         </tr>
         <tr>
           <td>redisValue</td>
           <td><code>$ctx:volume</code></td>
         </tr>
       </table> 
    
        In this example, the `redisKey` value is configured as **StockVolume**. While invoking the API, the above `redisField`, `redisValue` parameter values are extracted from the response of the SimpleStockQuoteService. Then they are populated as an input value for the Redis `hSet` operation.

        <img src="{{base_path}}/assets/img/integrate/connectors/redis/hset-operation.png" title="Configure hSet operation" width="400" alt="Configure hSet operation"/>

12. Then, to get the original payload, we replace the message body with the property value using the Enrich mediator as follows.

    <img src="{{base_path}}/assets/img/integrate/connectors/redis/enrich-mediator-2.png" title="Add enrich mediator" width="500" alt="Add enrich mediator"/> 

13. Forward the backend response to the API caller.
    
     When you are invoking the created resource, the request of the message is going through the `/getstockquote` resource. Finally, it is passed to the [Respond mediator]({{base_path}}/reference/mediators/respond-mediator/). The Respond Mediator stops the processing of the current message and sends the message back to the client as a response.            
    
     1. Add the **respond mediator** to the **Resource view**. 

     2. Once you have setup the resource, you can see the `getstockquote` resource as shown below.
    
          <img src="{{base_path}}/assets/img/integrate/connectors/redis/getStockQuote-resource.png" title="getStockQuote resource" width="400" alt="getStockQuote resource"/>

#### Configure a resource for the getstockvolumedetails operation
    
1. Navigate to the **Service Designer** view of the API and select the `getstockvolumedetails` resource.

2. Click **+** under **start** and select the **Redis** connector from the **Connectors** section.

3. Select **hGetAll** from the connector operations.
4. Select `REDIS_CONNECTION_1` from the connection dropdown.
5. You only need to send redisKey as a parameter. In this example `redisKey` value is configured as **StockVolume**

    <img src="{{base_path}}/assets/img/integrate/connectors/redis/hGetAll-operation.png" title="hGetAll operation" width="600" alt="hGetAll operation"/>

6. To forward the backend response to the API caller add the **Respond** Mediator.
#### Configure a resource for the deletestockvolumedetails operation


1. Navigate to the **Service Designer** view of the API and select the `deletestockvolumedetails` resource.

2. Click the **+** under the **start** and select the **Redis** connector from the **Connectors** section.

3. Select **hDel** from the connector operations. This operation deletes one or more hash fields
4. Select `REDIS_CONNECTION_1` from the connection dropdown.
5. Configure the values.

    <table>
      <tr>
         <td>redisKey</td>
         <td><code>StockVolume</code></td>
      </tr>
      <tr>
         <td>redisFields</td>
         <td><code>$ctx:redisFields</code></td>
      </tr>
    </table>

    <img src="{{base_path}}/assets/img/integrate/connectors/redis/hDel-operation.png" title="hDel operation" width="600" alt="hDel operation"/>

8. To forward the backend response to the API caller add the **Respond** Mediator.


Now you can switch to the Source view and check the XML configuration files of the created API and endpoint. 
    
**StockQuoteAPI.xml**

```
<?xml version="1.0" encoding="UTF-8" ?>
    <api context="/stockquote" name="StockQuoteAPI" xmlns="http://ws.apache.org/ns/synapse">
        <resource methods="GET" uri-template="/getstockquote/{symbol}">
            <inSequence>
            <payloadFactory media-type="xml" template-type="default">
                <format>
                    <m0:getQuote xmlns:m0="http://services.samples">
                        <m0:request>
                            <m0:symbol>$1</m0:symbol>
						</m0:request>
					</m0:getQuote>
				</format>
                <args>
					<arg evaluator="xml" expression="get-property('uri.var.symbol')"/>
				</args>
			</payloadFactory>
			<header name="Action" action="set" scope="default" value="urn:getQuote"/>
            <call>
				<endpoint key="StockQuoteEP"/>
			</call>
            <enrich description="">
				<source clone="true" type="body"/>
				<target action="replace" type="property" property="ORIGINAL_PAYLOAD"/>
			</enrich>
			<property name="symbol" scope="default" type="STRING" expression="$body/soapenv:Envelope/soapenv:Body/ns:getQuoteResponse/ax21:symbol" xmlns:ax21="http://services.samples/xsd" xmlns:ns="http://services.samples" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"/>
			<property name="volume" scope="default" type="STRING" expression="$body/soapenv:Envelope/soapenv:Body/ns:getQuoteResponse/ax21:volume" xmlns:ax21="http://services.samples/xsd" xmlns:ns="http://services.samples" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"/>
            <redis.hSet configKey="REDIS_CONNECTION_1">
                <redisKey>StockVolume</redisKey>
                <redisField>{$ctx:symbol}</redisField>
                <redisValue>{$ctx:volume}</redisValue>
			</redis.hSet>
            <enrich description="">
				<source clone="true" property="ORIGINAL_PAYLOAD" type="property"/>
				<target action="replace" type="body"/>
			</enrich>
			<log category="INFO" level="simple"/>
			<respond/>
		</inSequence>
            <faultSequence>
		</faultSequence>
        </resource>
        <resource methods="GET" uri-template="/getstockvolumedetails">
            <inSequence>
                <redis.hGetAll configKey="REDIS_CONNECTION_1">
                    <redisKey>StockVolume</redisKey>
                </redis.hGetAll>
                <respond/>
            </inSequence>
            <faultSequence/>
        </resource>
        <resource methods="POST" uri-template="/deletestockvolumedetails">
            <inSequence>
                <property expression="json-eval($.redisFields)" name="redisFields" scope="default" type="STRING"/>
            <redis.hDel configKey="REDIS_CONNECTION_1">
                <redisKey>StockVolume</redisKey>
                <redisFields>{$ctx:redisFields}</redisFields>
            </redis.hDel>
                <respond/>
            </inSequence>
            <faultSequence/>
        </resource>
    </api>
```

**StockQuoteEP Endpoint**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<endpoint name="StockQuoteEP" xmlns="http://ws.apache.org/ns/synapse">
    <address format="soap11"    uri="http://localhost:9000/services/SimpleStockQuoteService">
        <suspendOnFailure>
            <initialDuration>-1</initialDuration>
            <progressionFactor>1</progressionFactor>
        </suspendOnFailure>
        <markForSuspension>
            <retriesBeforeSuspension>0</retriesBeforeSuspension>
        </markForSuspension>
    </address>
</endpoint>
```

**REDIS_CONNECTION_1**

The created Redis connection will be saved as a local entry.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<localEntry key="REDIS_CONNECTION_1" xmlns="http://ws.apache.org/ns/synapse">
   <redis.init>
      <connectionType>REDIS</connectionType>
      <name>REDIS_CONNECTION_1</name>
      <redisHost>127.0.0.1</redisHost>
      <redisPort>6379</redisPort>
   </redis.init>
</localEntry>
```
## Get the project

You can download the ZIP file and extract the contents to get the project code.

<a href="{{base_path}}/assets/attachments/connectors/redis-example.zip">
    <img src="{{base_path}}/assets/img/integrate/connectors/download-zip.png" width="200" alt="Download ZIP">
</a>

## Deployment

Follow these steps to deploy the exported Carbon Application (CApp) in the integration runtime. 

**Deploying on Micro Integrator**

You can copy the composite application to the `<PRODUCT-HOME>/repository/deployment/server/carbonapps` folder and start the server. Micro Integrator will be started and the composite application will be deployed.

You can further refer the application deployed through the CLI tool. See the instructions on [managing integrations from the CLI]({{base_path}}/observe-and-manage/managing-integrations-with-micli).

??? note "Click here for instructions on deploying on WSO2 Enterprise Integrator 6"
    1. You can copy the composite application to the `<PRODUCT-HOME>/repository/deployment/server/carbonapps` folder and start the server.

    2. WSO2 EI server starts and you can login to the Management Console https://localhost:9443/carbon/ URL. Provide login credentials. The default credentials will be admin/admin. 

    3. You can see that the API is deployed under the API section.    

## Testing

Deploy the backend service `SimpleStockQuoteService`.

 1. Download the ZIP file of the back-end service from [here](https://github.com/wso2-docs/WSO2_EI/blob/master/Back-End-Service/axis2Server.zip).
 2. Extract the downloaded zip file.
 3. Open a terminal and navigate to the `axis2Server/bin/` directory inside the extracted folder.
 4. Execute the following command to start the axis2server with the SimpleStockQuote back-end service:

    === "On MacOS/Linux"   
        ```bash
        sh axis2server.sh
        ```
    === "On Windows"              
        ```bash
        axis2server.bat
        ```

Invoke the API as shown below using the curl command. Curl Application can be downloaded from [here](https://curl.haxx.se/download.html).

### 1. Retrieve stock volume details from the Stockquote back-end service.
 
   **Sample request 1**
    ```
     curl -v GET "http://localhost:8290/stockquote/getstockquote/WSO2" -H "Content-Type:application/json"    
    ```

   **Expected Response**
     ```json
     {
         "Envelope": {
             "Body": {
                 "getQuoteResponse": {
                     "change": -2.86843917118114,
                     "earnings": -8.540305401672558,
                     "high": -176.67958828498735,
                     "last": 177.66987465262923,
                     "low": -176.30898912339075,
                     "marketCap": 56495579.98178506,
                     "name": "WSO2 Company",
                     "open": 185.62740369461244,
                     "peRatio": 24.341353665128693,
                     "percentageChange": -1.4930577008849097,
                     "prevClose": 192.11844053187397,
                     "symbol": "WSO2",
                     "volume": 7791
                 }
             }
         }
     }
     ```
     
   **Sample request 2** 
     ```
      curl -v GET "http://localhost:8290/stockquote/getstockquote/IBM" -H "Content-Type:application/json"    
     ```
     
   **Expected Response** 
     ```json
     {
         "Envelope": {
             "Body": {
                 "getQuoteResponse": {
                     "change": -2.86843917118114,
                     "earnings": -8.540305401672558,
                     "high": -176.67958828498735,
                     "last": 177.66987465262923,
                     "low": -176.30898912339075,
                     "marketCap": 56495579.98178506,
                     "name": "IBM Company",
                     "open": 185.62740369461244,
                     "peRatio": 24.341353665128693,
                     "percentageChange": -1.4930577008849097,
                     "prevClose": 192.11844053187397,
                     "symbol": "IBM",
                     "volume": 7791
                 }
             }
         }
     }      
        
     ```
**Inserted hash map can check using `redis-cli`**  
   
Log in to the `redis-cli` and execute `HGETALL StockVolume` command to retrieve inserted hash map details.
     ```
     127.0.0.1:6379> HGETALL StockVolume
     1) "IBM"
     2) "7791"
     3) "WSO2"
     4) "7791"
     127.0.0.1:6379>
     ```
     
### 2. Retrieve all stock volume details from the Redis server.
 
   **Sample request**
    ```
     curl -v GET "http://localhost:8290/stockquote/getstockvolumedetails" -H "Content-Type:application/json"    
    ```

   **Expected Response**
     ```json
     {
         "output": "{IBM=7791, WSO2=7791}"
     }
     ```
### 3. Remove stock volume details.
 
   **Sample request 1**
    ```
     curl -v POST -d {"redisFields":"WSO2"}  "http://localhost:8290/stockquote/deletestockvolumedetails" -H "Content-Type:application/json"    
    ```

   **Expected Response**
     ```json
     {
         "output": 1
     }
     ```
     
   **Sample request 2 : Check the remaining stock volume details**
    
   **Sample request**
     ```
       curl -v GET "http://localhost:8290/stockquote/getstockvolumedetails" -H "Content-Type:application/json"    
     ```
   
   **Expected Response**
     ```json
     {
          "output": "{IBM=7791}"
     }
     ``` 
      
**Inserted list can retrieve using `redis-cli`**

Log in to the `redis-cli` and execute `HGETALL StockVolume` command to retrieve the list length.
     ```
     127.0.0.1:6379> HGETALL StockVolume
     1) "IBM"
     2) "7791"
     127.0.0.1:6379>
     ```     
