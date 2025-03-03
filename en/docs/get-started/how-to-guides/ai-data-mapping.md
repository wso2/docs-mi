# AI Data Mapping

Did you know that the WSO2 Micro Integrator component of WSO2 Integrator comes with built-in data mapping capabilities to streamline your integration workflows?
This data mapping solution brings you a powerful graphical interface, combined with AI-driven assistance to perform all sorts of data mappings in mere seconds.

In this guide, we are generating an API that processes weather data retrieved from the OpenWeather API for a mobile app. The app only requires a selected set of data from the API response and needs to modify some of the retrieved data to meet its requirements.

## Let's get started!

### Prerequisites

You need Visual Studio Code (VS Code) with the <a target="_blank" href="https://marketplace.visualstudio.com/items?itemName=WSO2.micro-integrator">Micro Integrator for VS Code</a> extension installed.

!!! Info
    See the [Install Micro Integrator for VS Code]({{base_path}}/develop/mi-for-vscode/install-wso2-mi-for-vscode) documentation to learn how to install Micro Integrator for VS Code.

### Step 1: Create an integration project

{!includes/create-new-project.md!}

4. In the **Project Creation Form**, enter `AIDataMappingDemo` as the **Project Name**.

5. Provide a location under the **Project Directory**.

    <a href="{{base_path}}/assets/img/get-started/how-to-guides/ai-data-mapping/ai-data-mapping-create-project.png"><img src="{{base_path}}/assets/img/get-started/how-to-guides/ai-data-mapping/ai-data-mapping-create-project.png" alt="create new project" width="80%"></a>

6. Click **Create**.

You will now see the projects listed in the **Project Explorer**.

### Step 3: Design the integration

#### Create a REST API

1. Go to **Project Settings** > **Add Artifact**.
2. Select **API** under **Create an Integration**.
3. Enter `Weather` as the API **Name**. The API **Context** field will be automatically populated with the same value.                                                         

    <a href="{{base_path}}/assets/img/get-started/how-to-guides/ai-data-mapping/ai-data-mapping-create-api.png"><img src="{{base_path}}/assets/img/get-started/how-to-guides/ai-data-mapping/ai-data-mapping-create-api.png" alt="create API artifact" width="80%"></a>

4. Click **Create**.

5. On the Service Designer, click on the three dots (**⋮**) and then **edit** to access the **Properties** of the default API resource.

    <a href="{{base_path}}/assets/img/get-started/how-to-guides/ai-data-mapping/ai-data-mapping-resource-edit.png"><img src="{{base_path}}/assets/img/get-started/how-to-guides/ai-data-mapping/ai-data-mapping-resource-edit.png" alt="edit API resource" width="70%"></a>

6. Click **+ Add Query Param**, provide `city` as the query parameter and click **Add**.

7. Click **Update**.

#### Define the mediation flow

You can now start configuring the API resource.

1. Navigate to **MI Project Explorer** > **APIs** > **Weather** > **/?city={city}** to open the **Resource View**.

2. Click on the **+** icon in the diagram to open the **Mediator Palette**. 

    <a href="{{base_path}}/assets/img/get-started/how-to-guides/ai-data-mapping/ai-data-mapping-first-mediator.png"><img src="{{base_path}}/assets/img/get-started/how-to-guides/ai-data-mapping/ai-data-mapping-first-mediator.png" alt="open palette" width="80%"></a>

3. Select **Variable** mediator under **Mediators**.

4. Specify the following values and click **Add**.

    !!! Info
        This parameter is used to store the API key required for OpenWeather. It is recommended to use secure vault to store credentials. For more information, refer to <a href="{{base_path}}/install-and-setup/setup/security/encrypting-plain-text/">Encrypting Secrets</a>.

    <table>
        <tr>
            <th>Parameter</th>
            <th>Value</th>
        </tr>
      <tr>
         <td>Name</td>
         <td><code>API_KEY</code></td>
      </tr>
      <tr>
         <td>Data Type</td>
         <td>Select <code>STRING</code>.</td>
      </tr>
      <tr>
         <td>Value</td>
         <td>
            Your OpenWeather API Key
         </td>
      </tr>
    </table>

    <a href="{{base_path}}/assets/img/get-started/how-to-guides/ai-data-mapping/ai-data-mapping-apikey-var.png"><img src="{{base_path}}/assets/img/get-started/how-to-guides/ai-data-mapping/ai-data-mapping-apikey-var.png" alt="API key variable" width="30%"></a>

5. Click on the **+** icon and search for `get` in the **Mediator Palette** to add the HTTP GET operation to get the coordinates of a location.

    <a href="{{base_path}}/assets/img/get-started/how-to-guides/ai-data-mapping/ai-data-mapping-http-get.png"><img src="{{base_path}}/assets/img/get-started/how-to-guides/ai-data-mapping/ai-data-mapping-http-get.png" alt="search get in palette" width="80%"></a>

6. Click **+ Add new connection** to create a new connection.

    <a href="{{base_path}}/assets/img/get-started/how-to-guides/ai-data-mapping/ai-data-mapping-new-http-conn.png"><img src="{{base_path}}/assets/img/get-started/how-to-guides/ai-data-mapping/ai-data-mapping-new-http-conn.png" alt="add new connection" width="80%"></a>

7. Select `HTTPS` and fill the following details to create a connection to OpenWeather API. Finally, click **Add** in the **Add New Connection** form to create the connection.

    <a href="{{base_path}}/assets/img/get-started/how-to-guides/ai-data-mapping/ai-data-mapping-connection.png"><img src="{{base_path}}/assets/img/get-started/how-to-guides/ai-data-mapping/ai-data-mapping-connection.png" alt="create connection" width="80%"></a>

8. Provide `/geo/1.0/direct` as the **Relative Path** and click **+ Add Query Param** to add the following query parameters.

    !!! Note
        To add an expression as the query parameter value, make sure the **EX** button is checked as follows,

        <a href="{{base_path}}/assets/img/get-started/how-to-guides/ai-data-mapping/ai-data-mapping-query-expression.png"><img src="{{base_path}}/assets/img/get-started/how-to-guides/ai-data-mapping/ai-data-mapping-query-expression.png" alt="query expression editor" width="30%"></a>

    <table>
        <tr>
            <th>Query Parameter Name</th>
            <th>Is Expression</th>
            <th>Value</th>
        </tr>
      <tr>
         <td>q</td>
         <td>true</td>
         <td><code>params.queryParams.city</code></td>
      </tr>
      <tr>
         <td>limit</td>
         <td>false</td>
         <td><code>1</code></td>
      </tr>
      <tr>
         <td>appid</td>
         <td>true</td>
         <td><code>vars.API_KEY</code></td>
      </tr>
    </table>

9. Click **Submit** to add the operation to the integration flow.

    <a href="{{base_path}}/assets/img/get-started/how-to-guides/ai-data-mapping/ai-data-mapping-geo-request.png"><img src="{{base_path}}/assets/img/get-started/how-to-guides/ai-data-mapping/ai-data-mapping-geo-request.png" alt="geo http request" width="30%"></a>

10. Next, click on the **+** icon in the diagram and search for `get` in the **Mediator Palette** to add the HTTP GET operation to get the weather details using the coordinates.

11. Select the connection created in Step 6, provide `/data/2.5/weather` as the **Relative Path** and click **+ Add Query Param** to add the following query parameters. Finally, click **Submit** to add the operation to the integration flow.

    <table>
        <tr>
            <th>Query Parameter Name</th>
            <th>Is Expression</th>
            <th>Value</th>
        </tr>
      <tr>
         <td>lat</td>
         <td>true</td>
         <td><code>payload[0].lat</code></td>
      </tr>
      <tr>
         <td>lon</td>
         <td>true</td>
         <td><code>payload[0].lon</code></td>
      </tr>
      <tr>
         <td>appid</td>
         <td>true</td>
         <td><code>vars.API_KEY</code></td>
      </tr>
    </table>

    <a href="{{base_path}}/assets/img/get-started/how-to-guides/ai-data-mapping/ai-data-mapping-weather-request.png"><img src="{{base_path}}/assets/img/get-started/how-to-guides/ai-data-mapping/ai-data-mapping-weather-request.png" alt="weather http request" width="30%"></a>

12. Click on the **+** icon in the diagram and search for for the **Datamapper** mediator in the **Mediator Palette**.

    <a href="{{base_path}}/assets/img/get-started/how-to-guides/ai-data-mapping/ai-data-mapping-data-mapper.png"><img src="{{base_path}}/assets/img/get-started/how-to-guides/ai-data-mapping/ai-data-mapping-data-mapper.png" alt="search data mapper" width="80%"></a>

13. Click **+ Add new**, provide `weatherDataMapper` as the name and click **Create** in the **Create New Datamapper** form.

    <a href="{{base_path}}/assets/img/get-started/how-to-guides/ai-data-mapping/ai-data-mapping-data-mapper-new.png"><img src="{{base_path}}/assets/img/get-started/how-to-guides/ai-data-mapping/ai-data-mapping-data-mapper-new.png" alt="create new mapping" width="30%"></a>

14. Click **Add** to add the data mapper to the integration flow.

15. Click on the name of the newly added Data Mapper mediator to open the input and output mapping window.

    <a href="{{base_path}}/assets/img/get-started/how-to-guides/ai-data-mapping/ai-data-mapping-data-mapper-open-src.png"><img src="{{base_path}}/assets/img/get-started/how-to-guides/ai-data-mapping/ai-data-mapping-data-mapper-open-src.png" alt="open mapping file" width="80%"></a>

16. To import the input schema, click on the **Import input schema**. Since this scenario involves JSON to JSON mapping, you can choose to either import from JSON sample or a JSON schema. In this guide, we will be using the **Import from JSON** option.

    <a href="{{base_path}}/assets/img/get-started/how-to-guides/ai-data-mapping/ai-data-mapping-import-json.png"><img src="{{base_path}}/assets/img/get-started/how-to-guides/ai-data-mapping/ai-data-mapping-import-json.png" alt="input output mapping" width="80%"></a>

    ??? "Sample Input JSON"
        Here’s a sample response received from the OpenWeatherMap API. You can copy paste this as your input schema in this scenario.

        ```json
        {
            "coord": {
                "lon": 79.8478,
                "lat": 6.9319
            },
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ],
            "base": "stations",
            "main": {
                "temp": 296.91,
                "feels_like": 297.61,
                "temp_min": 296.91,
                "temp_max": 296.91,
                "pressure": 1011,
                "humidity": 87,
                "sea_level": 1011,
                "grnd_level": 1010
            },
            "visibility": 10000,
            "wind": {
                "speed": 3.87,
                "deg": 39,
                "gust": 3.99
            },
            "clouds": {
                "all": 0
            },
            "dt": 1736385682,
            "sys": {
                "country": "LK",
                "sunrise": 1736384109,
                "sunset": 1736426384
            },
            "timezone": 19800,
            "id": 1248991,
            "name": "Colombo",
            "cod": 200
        }
        ```

17. Follow the same steps to import the following output schema.

    ??? "Sample Output JSON"
        The data mapper will map the above input schema to the below output schema. You can copy paste this as your output schema in this scenario.

        ```json
        {
            "weather": {
                "main": "Clear",
                "description": "clear sky",
                "icon": "01d",
                "daylight_hours": 11.74
            },
            "temp": {
                "temp": 23.76,
                "temp_description": "23.76 Feels like 24.46"
            },
            "wind": {
                "speed": 3.87,
                "deg": 39
            },
            "pressure": 1011,
            "humidity": "87%",
            "visibility": 10
        }
        ```

    !!! Tip
        Micro Integrator allows you to do data mappings between different data types like XML and CSV. Check out more on this in our [documentation]({{base_path}}/reference/mediators/data-mapper-mediator/#input-and-output-files).

    Now that all our schemas are in place, how does the actual mapping happen?

    You could always fall back on the age-old approach of manually mapping each field. But why go through all that hassle?

18. Click on the **Map** button. 

    <a href="{{base_path}}/assets/img/get-started/how-to-guides/ai-data-mapping/ai-data-mapping-map-btn.png"><img src="{{base_path}}/assets/img/get-started/how-to-guides/ai-data-mapping/ai-data-mapping-map-btn.png" alt="map schemas" width="80%"></a>

    The Micro Integrator Data Mapper leverages AI to generate various types of mappings. With a simple button click, you'll find that all of your mappings have been automatically completed.

    <a href="{{base_path}}/assets/img/get-started/how-to-guides/ai-data-mapping/ai-data-mapping-map.png"><img src="{{base_path}}/assets/img/get-started/how-to-guides/ai-data-mapping/ai-data-mapping-map.png" alt="mapped schemas" width="80%"></a>

    The AI Data Mapper is capable of handling complex mapping scenarios as well.

    For instance,

    - In our output schema, `daylight_hours` is calculated from the formula `(sunset - sunrise) / 3600` based on the input data. 

    <a href="{{base_path}}/assets/img/get-started/how-to-guides/ai-data-mapping/ai-data-mapping-daylight.png"><img src="{{base_path}}/assets/img/get-started/how-to-guides/ai-data-mapping/ai-data-mapping-daylight.png" alt="daylight mapping" width="80%"></a>

    - The `humidity` field in the input data is a percentage value and needs to be accurately reflected when displayed to the user. 

    The AI Data Mapper is fully capable of recognizing and managing these types of use cases effectively.

19. If you need to apply additional operations to define mappings between the input and output data, try using the Expression Editor. Explore the following scenarios to gain insight into how you can utilize the Expression Editor effectively.

    - Display the weather description in upper-case letters

    <a href="{{base_path}}/assets/img/get-started/how-to-guides/ai-data-mapping/ai-data-mapping-uppercase.gif"><img src="{{base_path}}/assets/img/get-started/how-to-guides/ai-data-mapping/ai-data-mapping-uppercase.gif" alt="convert to uppercase" width="80%"></a>

    !!! Tip
        You can learn further about the Expression Editor and other features from our [documentation]({{base_path}}/reference/mediators/data-mapper-mediator/#expression-editor).

20. Click on the **+** icon in the diagram, select the **Respond** mediator in the **Mediator Palette** and click **Add** to add it to the integration flow.

    You may refer to the following API, HTTP connection and Data Mapper configurations for reference,

    ??? "Weather API"
        ```yaml
        <?xml version="1.0" encoding="UTF-8"?>
        <api context="/weather" name="Weather"
            xmlns="http://ws.apache.org/ns/synapse">
            <resource methods="GET" uri-template="/?city={city}">
                <inSequence>
                    <variable name="API_KEY" type="STRING" value="REPLACE_API_KEY"/>
                    <http.get configKey="OpenWeather">
                        <relativePath>/geo/1.0/direct?q=${params.queryParams.city}&amp;limit=1&amp;appid=${vars.API_KEY}</relativePath>
                        <headers>[]</headers>
                        <forceScAccepted>false</forceScAccepted>
                        <disableChunking>false</disableChunking>
                        <forceHttp10>false</forceHttp10>
                        <noKeepAlive>false</noKeepAlive>
                        <responseVariable>http_get_1</responseVariable>
                        <overwriteBody>true</overwriteBody>
                    </http.get>
                    <http.get configKey="OpenWeather">
                        <relativePath>/data/2.5/weather?lat=${payload[0].lat}&amp;lon=${payload[0].lon}&amp;appid=${vars.API_KEY}</relativePath>
                        <headers>[]</headers>
                        <forceScAccepted>false</forceScAccepted>
                        <disableChunking>false</disableChunking>
                        <forceHttp10>false</forceHttp10>
                        <noKeepAlive>false</noKeepAlive>
                        <responseVariable>http_get_2</responseVariable>
                        <overwriteBody>true</overwriteBody>
                    </http.get>
                    <datamapper config="resources:datamapper/weatherDataMapper/weatherDataMapper.dmc" inputSchema="resources:datamapper/weatherDataMapper/weatherDataMapper_inputSchema.json" outputSchema="resources:datamapper/weatherDataMapper/weatherDataMapper_outputSchema.json"/>
                    <respond/>
                </inSequence>
                <faultSequence></faultSequence>
            </resource>
        </api>
        ```

    ??? "HTTP Connection"
        === "Design View"
            <a href="{{base_path}}/assets/img/get-started/how-to-guides/ai-data-mapping/ai-data-mapping-http-connection.png"><img src="{{base_path}}/assets/img/get-started/how-to-guides/ai-data-mapping/ai-data-mapping-http-connection.png" alt="http connection config" width="40%"></a>
		    
        === "Source View"
		    ```yaml
            <?xml version="1.0" encoding="UTF-8"?>
            <localEntry key="OpenWeather" xmlns="http://ws.apache.org/ns/synapse">
                <http.init>
                    <connectionType>HTTPS</connectionType>
                    <baseUrl>https://api.openweathermap.org/</baseUrl>
                    <authType>None</authType>
                    <timeoutAction>Never</timeoutAction>
                    <retryCount>0</retryCount>
                    <retryDelay>0</retryDelay>
                    <suspendInitialDuration>-1</suspendInitialDuration>
                    <suspendProgressionFactor>1</suspendProgressionFactor>
                    <name>OpenWeather</name>
                </http.init>
            </localEntry>
            ```

    ??? "DataMapper Configuration"
        ```js
        import * as dmUtils from "./dm-utils";
        /*
        * title : "root",
        * inputType : "JSON",
        */
        interface Root {
            coord: {
                lon: number
                lat: number
            }
            weather: {
                id: number
                main: string
                description: string
                icon: string
            }[]
            base: string
            main: {
                temp: number
                feels_like: number
                temp_min: number
                temp_max: number
                pressure: number
                humidity: number
                sea_level: number
                grnd_level: number
            }
            visibility: number
            wind: {
                speed: number
                deg: number
                gust: number
            }
            clouds: {
                all: number
            }
            dt: number
            sys: {
                country: string
                sunrise: number
                sunset: number
            }
            timezone: number
            id: number
            name: string
            cod: number
        }

        /*
        * title : "root",
        * outputType : "JSON",
        */
        interface OutputRoot {
            weather: {
                main: string
                description: string
                icon: string
                daylight_hours: number
            }
            temp: {
                temp: number
                temp_description: string
            }
            wind: {
                speed: number
                deg: number
            }
            pressure: number
            humidity: string
            visibility: number
        }

        /**
        * functionName : map_S_root_S_root
        * inputVariable : inputroot
        */
        export function mapFunction(input: Root): OutputRoot {
            return {
                weather: {
                    main: input.weather[0].main,
                    description: input.weather[0].description.toLocaleUpperCase(),
                    icon: input.weather[0].icon,
                    daylight_hours: (input.sys.sunset - input.sys.sunrise) / 3600,
                },
                temp: {
                    temp: input.main.temp - 273.15,
                    temp_description: input.main.temp > 30 ? "Hot" : input.main.temp < 15 ? "Cold" : "Moderate",
                },
                wind: {
                    speed: input.wind.speed,
                    deg: input.wind.deg,
                },
                pressure: input.main.pressure,
                humidity: `${input.main.humidity}%`,
                visibility: input.visibility,
            };
        }
        ```

### Step 4: Build and Run

1. Click on the **Build and Run** button to build and deploy the integration.

    <a href="{{base_path}}/assets/img/get-started/how-to-guides/ai-data-mapping/ai-data-mapping-build.png"><img src="{{base_path}}/assets/img/get-started/how-to-guides/ai-data-mapping/ai-data-mapping-build.png" alt="build and run" width="80%"></a>

2. **Runtime Services** will open after the server is up and running and from that panel select the API that you need to try out using the **Try It** button.

    <a href="{{base_path}}/assets/img/get-started/how-to-guides/ai-data-mapping/ai-data-mapping-tryit.png"><img src="{{base_path}}/assets/img/get-started/how-to-guides/ai-data-mapping/ai-data-mapping-tryit.png" alt="try it out" width="80%"></a>

3. Click on the **Try it Out** button to provide the required query parameters.

    <a href="{{base_path}}/assets/img/get-started/how-to-guides/ai-data-mapping/ai-data-mapping-operation-tryit.png"><img src="{{base_path}}/assets/img/get-started/how-to-guides/ai-data-mapping/ai-data-mapping-operation-tryit.png" alt="try it out operation" width="80%"></a>

4. Provide the required parameters and click on the **Execute** button to invoke the API.

    <a href="{{base_path}}/assets/img/get-started/how-to-guides/ai-data-mapping/ai-data-mapping-request.png"><img src="{{base_path}}/assets/img/get-started/how-to-guides/ai-data-mapping/ai-data-mapping-request.png" alt="execute request" width="80%"></a>

5. Check the response received from the server and confirm that the weather details for the specified city have been mapped to the output data schema you provided.

    <a href="{{base_path}}/assets/img/get-started/how-to-guides/ai-data-mapping/ai-data-mapping-response.png"><img src="{{base_path}}/assets/img/get-started/how-to-guides/ai-data-mapping/ai-data-mapping-response.png" alt="response" width="80%"></a>

Data mapping in seconds. Try out this and our other cool AI features, and see for yourself how much easier integration development can be.