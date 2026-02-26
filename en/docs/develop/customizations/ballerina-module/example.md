## Introduction

The **Ballerina Module** feature in WSO2 Micro Integrator allows developers to integrate custom data transformation logic into integration flows using the [Ballerina](https://ballerina.io/) programming language. By leveraging this capability, you can encapsulate complex business logic, data mappings, and type-specific operations as reusable modules and invoke them directly within your integration sequences.

This document demonstrates how to use Ballerina code inside MI projects using the **WSO2 MI's Ballerina Module**, with practical examples that showcase JSON-to-JSON mapping, XML total calculation, and dynamic type-based transformations.

#### Example 1: Patient Mapping

This example demonstrates the transformation of a JSON payload representing patient data into a new format. The Ballerina module mapPatient processes the input data, extracts relevant details such as name, gender, and address, and maps them into a structured response.

<img src="{{base_path}}/assets/img/develop/ballerina-module/patient-mapping.png" title="Patient Mapping Flow" width="800" alt="Patient Mapping Flow"/>

#### Example 2: Price Calculation
This example illustrates the use of a Ballerina module to calculate the total price of items in an XML payload. The module calculates the total price by summing up the prices of individual items and returns the result as a JSON response.

<img src="{{base_path}}/assets/img/develop/ballerina-module/price-calculation.png" title="Price Calculation Flow" width="800" alt="Price Calculation Flow"/>

#### Example 3: Dynamic Type-Based Transformation
This example handles various data types like string, integer, boolean, float, and decimal. Based on the input type, the corresponding Ballerina module performs operations such as doubling a string, inverting a boolean, or calculating a reciprocal of a float. The result is returned in a standardized format.

<img src="{{base_path}}/assets/img/develop/ballerina-module/dynamic-type-transformation.png" title="Dynamic Type-Based Transformation Flow" width="800" alt="Dynamic Type-Based Transformation Flow"/>

If you do not want to configure this yourself, you can simply [get the project](#get-the-project) and run it.

## Setup the Integration Project

1. **Install the WSO2 Micro Integrator VS Code Extension**
   To begin, install the [WSO2 Micro Integrator VS Code extension](https://mi.docs.wso2.com/en/latest/develop/mi-for-vscode/install-wso2-mi-for-vscode/) from the Visual Studio Code marketplace. This extension enables you to create, manage, and deploy integration projects with ease.

2. **Create or Open an Integration Project**
   Use the extension to [Create a new integration project](https://mi.docs.wso2.com/en/latest/develop/create-integration-project/) given the name `ballerina-module-example` or open an existing integration project. This project will serve as the workspace for your Ballerina module development.
   <img src="{{base_path}}/assets/img/develop/ballerina-module/createNewProject.png" title="Create Integration Project" width="800" alt="Create Integration Project"/>


## Create the Ballerina Module

1. Expand the artifact types in the **Add artifact** view and select **Ballerina Module**.

    <img src="{{base_path}}/assets/img/develop/ballerina-module/addModule.png" title="Select Ballerina Module" width="800" alt="Select Ballerina Module"/>

2. In the `Create Ballerina Module` form, enter a **name** and a **version** for the module and click **Create**.

    <img src="{{base_path}}/assets/img/develop/ballerina-module/example-add-bal.png" title="Create Ballerina Module Form" width="800" alt="Create Ballerina Module Form"/>

3. Update the generated sample Ballerina code with following transformation logic and save the file.
    
    ??? note "Ballerina Implementation for All Three Examples"

            import wso2/mi;

            // Patient Mapping Logic

            type Patient record {
                string patientType;
                string patientId;
                string version;
                string lastUpdatedOn;
                string originSource;
                Description description;
                Identifier[] identifiers;
                string firstName;
                string lastName;
                string gender;
                LocationDetail[] locationDetail;
            };

            type Identifier record {
                IdType id_type;
                string id_value;
            };

            type IdType record {
                Code[] codes;
            };

            type Code record {
                string system_source;
                string identifier_code;
            };

            type Description record {
                string status;
                string details?;
            };

            type LocationDetail record {
                string nation?;
                string town?;
                string region?;
                string zipCode?;
                string identifier?;
                string province?;
            };

            @mi:Operation
            public function mapPatient(json payload) returns json {
                Patient|error patient = payload.cloneWithType();
            if patient is error {
                return {
                    "error": "Could not convert payload to Patient record"
                };
                
            }

                return {
                    name: [
                        {
                            given: [patient.firstName],
                            family: patient.lastName
                        }
                    ],
                    meta: {
                        versionId: patient.version,
                        lastUpdated: patient.lastUpdatedOn,
            "source": patient.originSource
                    },
                    text: {
                        div: patient.description.details ?: "",
                        status: patient.description.status
                    },
                    gender: patient.gender,
                    identifier: [
                        {
                            system: patient.identifiers[0].id_type.codes[0].system_source,
                            value: patient.identifiers[0].id_value
                        }
                    ],
                    address: from var {nation, town, region, province, zipCode, identifier} in patient.locationDetail
                        select {
                            country: nation,
                            city: town,
                            district: region,
                            state: province,
                            postalCode: zipCode,
                            id: identifier
                        },
                    id: patient.patientId
                };
            }

            // Price Calculation Logic

            @mi:Operation
            public function calculateTotal(xml invoice) returns xml {
                xml<xml:Element> prices = invoice/**/<price>;

                int total = from xml:Element element in prices
                    let int|error price = int:fromString(element.data())
                    where price is int
                    collect sum(price);

                return xml `<total>${total}</total>`;
            }

            // Type Processing Logic

            @mi:Operation
            public function invertBoolean(boolean b) returns boolean => !b;

            @mi:Operation
            public function doubleInt(int n) returns int => n * 2;

            @mi:Operation
            public function reciprocalFloat(float f) returns float {
                if f == 0.0 {
                    return 1;
                }
                return 1.0 / f;
            }

            @mi:Operation
            public function addConstantToDecimal(decimal d) returns decimal => d + 10;

            @mi:Operation
            public function doubleString(string s) returns string => s + s;

            @mi:Operation
            public function getJsonNameProperty(json j) returns json {
                json jsn = j;
                if jsn is string {
                    json|error je = jsn.fromJsonString();
                    if je is error {
                        return {err: je.message()};
                    }
                    jsn = je;
                }
                json|error val = jsn.name;
                if val is error {
                    return {err: val.message()};
                }
                return {val};
            }

            @mi:Operation
            public function getXmlNameElement(xml x) returns xml {
                xml y = x/<name>;

                return xml `<result>${y}</result>`;
            }

4. Click the **Build Ballerina Module** icon.

    <img src="{{base_path}}/assets/img/develop/ballerina-module/example-bal-code.png" title="Ballerina Module Code" width="800" alt="Ballerina Module Code"/>

5. Once the Ballerina module is successfully built, it will appear in the `Mediator palette`.

    <img src="{{base_path}}/assets/img/develop/ballerina-module/built-module.png" title="Mediator Palette View" width="800" alt="Mediator Palette View"/>

## Create the Integration Logic

1. Lets build the three APIs that will use the above Ballerina module. Go the **Project Overview** and click on the **+** button. and select **API**.

    <img src="{{base_path}}/assets/img/develop/ballerina-module/example-add-api.png" title="Adding a Rest API" width="800" alt="Adding a Rest API"/>

2. Provide the name of the API as `/patientmap` and click **Create**.<br/>

    <img src="{{base_path}}/assets/img/develop/ballerina-module/example-add-api-name.png" title="Adding a Rest API Name" width="600" alt="Adding a Rest API Name"/>

    Following the above steps, you can create the other two APIs (`/pricecal` and `/typeprocess`) as well.
3. By default, the API will be created with a get method. Click on the **pateintmap** API and click on **Edit**.

    <img src="{{base_path}}/assets/img/develop/ballerina-module/example-edit-api.png" title="Edit API" width="800" alt="Edit API"/>

4. Select the **POST** method and click on **Update**.

    <img src="{{base_path}}/assets/img/develop/ballerina-module/example-edit-api-method.png" title="Edit API Method" width="400" alt="Edit API Method"/>

    Repeat the above steps for the other two APIs as well.

5. Now, click on the **patientmap** API and click on **+** to add a new mediator then select *MapPatient* operation in **Ballerina Module**.

    <img src="{{base_path}}/assets/img/develop/ballerina-module/example-add-ballerina-mediator.png" title="Add Mediator" width="800" alt="Add Mediator"/>

6. Click the **Ex** button and select the **payload** as the input and click **OK**.<br/>

    <img src="{{base_path}}/assets/img/develop/ballerina-module/example-add-ballerina-mediator-input.png" title="Add Mediator Input" width="600" alt="Add Mediator Input"/>

7. Now click on the **+** button again and add a **payload mediator**.

    <img src="{{base_path}}/assets/img/develop/ballerina-module/example-add-payload-factory-mediator.png" title="Add Payload Mediator" width="800" alt="Add Payload Mediator"/>

8. As payload, click the **fx** button and select **variables>ballerina_functions_mapPatient1>payload** and click **OK**.<br/>

    <img src="{{base_path}}/assets/img/develop/ballerina-module/example-add-payload-factory-mediator-payload.png" title="Add Payload" width="600" alt="Add Payload"/>

9. Click on the **+** button again and add a **Response** mediator.

    <img src="{{base_path}}/assets/img/develop/ballerina-module/example-add-response-mediator.png" title="Add Response Mediator" width="800" alt="Add Response Mediator"/>

11. We need to build the other two APIs as well for that following Synaps codes can be used. Open the `pricecal` and `typeprocess` APIs and go to the **Code View** and replace the code with the following.

    <img src="{{base_path}}/assets/img/develop/ballerina-module/example-code-view.png" title="Code View" width="800" alt="Code View"/>

??? note "Synapse Code for Price Calculation API"
        <api xmlns="http://ws.apache.org/ns/synapse" name="pricecal" context="/pricecal">
            <resource methods="POST" uri-template="/">
                <inSequence>
                    <ballerina-functions.calculateTotal>
                        <responseVariable>ballerina-functions_calculateTotal_1</responseVariable>
                        <overwriteBody>false</overwriteBody>
                        <invoice>{$body/*}</invoice>
                    </ballerina-functions.calculateTotal>
                    <payloadFactory media-type="xml" template-type="default">
                        <format>
                            ${vars.ballerina-functions_calculateTotal_1.payload}
                        </format>
                    </payloadFactory>
                    <respond />
                </inSequence>
                <faultSequence>
                </faultSequence>
            </resource>
        </api>
??? note "Synapse Code for Type Processing API"
        <api xmlns="http://ws.apache.org/ns/synapse" name="typeprocess" context="/typeprocess">
            <resource methods="POST" uri-template="/">
                <inSequence>
                    <switch source="${payload.type}">
                        <case regex="string">
                            <ballerina-functions.doubleString>
                                <responseVariable>bal_response</responseVariable>
                                <overwriteBody>false</overwriteBody>
                                <s>{${payload.val}}</s>
                            </ballerina-functions.doubleString>
                        </case>
                        <case regex="integer">
                            <ballerina-functions.doubleInt>
                                <responseVariable>bal_response</responseVariable>
                                <overwriteBody>false</overwriteBody>
                                <n>{${payload.val}}</n>
                            </ballerina-functions.doubleInt>
                        </case>
                        <case regex="boolean">
                            <ballerina-functions.invertBoolean>
                                <responseVariable>bal_response</responseVariable>
                                <overwriteBody>false</overwriteBody>
                                <b>{${payload.val}}</b>
                            </ballerina-functions.invertBoolean>
                        </case>
                        <case regex="float">
                            <ballerina-functions.reciprocalFloat>
                                <responseVariable>bal_response</responseVariable>
                                <overwriteBody>false</overwriteBody>
                                <f>{${payload.val}}</f>
                            </ballerina-functions.reciprocalFloat>
                        </case>
                        <case regex="decimal">
                            <ballerina-functions.addConstantToDecimal>
                                <responseVariable>bal_response</responseVariable>
                                <overwriteBody>false</overwriteBody>
                                <d>{${payload.val}}</d>
                            </ballerina-functions.addConstantToDecimal>
                        </case>
                        <case regex="json">
                            <ballerina-functions.getJsonNameProperty>
                                <responseVariable>bal_response</responseVariable>
                                <overwriteBody>false</overwriteBody>
                                <j>{${payload.val}}</j>
                            </ballerina-functions.getJsonNameProperty>
                        </case>
                        <default>
                            <variable name="bal_response" type="JSON"
                                value="{
        &quot;payload&quot;: &quot;Unknown message type&quot;
        }" />
                        </default>
                    </switch>
                    <payloadFactory media-type="json" template-type="default">
                        <format>{ "Result" : ${vars.bal_response.payload} }</format>
                    </payloadFactory>
                    <respond />
                </inSequence>
                <faultSequence />
    </resource>
        </api>

## Get the project

You can download the ZIP file and extract the contents to get the project code.

<a href="{{base_path}}/assets/attachments/reference/ballerina-module-example.zip">
    <img src="{{base_path}}/assets/img/integrate/connectors/download-zip.png" width="200" alt="Download ZIP">
</a>


## Run the Project and Test the APIs
1. Click on the **Run** icon to run the integration project.

    <img src="{{base_path}}/assets/img/develop/ballerina-module/example-run-integration-project.png" title="Run Integration Project" width="800" alt="Run Integration Project"/>

2. Open the integrated **Try it** feature or use a tool like Postman to test the APIs.

    <img src="{{base_path}}/assets/img/develop/ballerina-module/example-try-it.png" title="Try It Feature" width="800" alt="Try It Feature"/>
    
3. For the **Patient Mapping API**, use the following JSON payload:

    ```json
    {
    "patientType": "Patient",
    "patientId": "123456",
    "version": "1",
    "lastUpdatedOn": "2020-02-01T05:30:41.785+00:00",
    "originSource": "#hYoipn8902",
    "status": "generated",
    "identifiers": [
        {
            "id_type": {
            "codes": [
                {
                "system_source": "http://hl7.org/fhir/v2/0203",
                "identifier_code": "MR"
                }
            ]
            },
            "id_value": "1213I7-bhjasb-80232-82032-shab9201212"
        }
    ],
    "firstName": "Andrew",
    "lastName": "Simons",
    "description": {
        "status": "generated"
    },
    "gender": "male",
    "locationDetail": [
        {
            "nation": "US",
            "town": "Seattle",
            "region": "WA",
            "zipCode": "98101",
            "identifier": "5648223",
            "province": "WA"
        }
    ]
    }
    ```

    You will get a response similar to the following:

    <img src="{{base_path}}/assets/img/develop/ballerina-module/example-patient-response.png" title="Patient Mapping API Response" width="800" alt="Patient Mapping API Response"/>

4. For the **Price Calculation API**, use the following XML payload:

    ```xml
        <items>
        <item>
            <name>book</name>
            <price>180</price>
        </item>
        <item>
            <name>pen</name>
            <price>25</price>
        </item>
        <item>
            <name>pencil</name>
            <price>12</price>
        </item>
    </items>
    ```

    You will get a response similar to the following:

    <img src="{{base_path}}/assets/img/develop/ballerina-module/example-price-response.png" title="Price Calculation API Response" width="800" alt="Price Calculation API Response"/>

5. For the **Type Processing API**, use the following JSON payload:

    ```json
    {
    "type": "decimal",
    "val": 5.3
    }
    ```
    You will get a response similar to the following:

    <img src="{{base_path}}/assets/img/develop/ballerina-module/example-type-response.png" title="Type Processing API Response" width="800" alt="Type Processing API Response"/>