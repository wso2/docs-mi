# Create a New Connector

You can write a new connector for a specific requirement that cannot be addressed via any of the existing connectors that can be downloaded from the [connector store](https://store.wso2.com/?page=1&product=MI+Connector).

Follow the steps given below to write a new connector to integrate with the [Google Books APIs](https://developers.google.com/books). You can then use the connector inside a mediation sequence to connect with Google Books and get information.

!!! Note
    If you have an OpenAPI definition file, you can generate a connector using the [WSO2 Integrator: MI for VS Code extension]({{base_path}}/develop/mi-for-vscode/mi-for-vscode-overview/). For more information, see [Generate a Connector]({{base_path}}/reference/connectors/generate-connectors/).

## Write a new connector

Follow the steps given below to write the new connector.

### Prerequisites

Download and install [Apache Maven](https://maven.apache.org/download.cgi). This tutorial has been tested with Maven 3.9.11.

### Step 1: Create the Maven project template

We will use the [maven archetype](https://github.com/wso2-extensions/archetypes/tree/master/esb-connector-archetype) to generate the Maven project template and sample connector code. 

1.  Open a terminal, navigate to the directory on your machine where you want the new connector to be created, and run the following command:

    === "Linux/MacOS"
        ```xml
        mvn org.apache.maven.plugins:maven-archetype-plugin:2.4:generate \
            -DarchetypeGroupId=org.wso2.carbon.extension.archetype \
            -DarchetypeArtifactId=org.wso2.carbon.extension.esb.connector-archetype \
            -DarchetypeVersion=2.0.21 \
            -DgroupId=org.wso2.integration.connector \
            -DartifactId=org.wso2.integration.connector.googlebooks \
            -Dversion=1.0.0 \
            -DarchetypeRepository=https://maven.wso2.org/nexus/content/repositories/wso2-public/
        ```
    === "Windows"
        ```xml
        mvn org.apache.maven.plugins:maven-archetype-plugin:2.4:generate `
          "-DarchetypeGroupId=org.wso2.carbon.extension.archetype" `
          "-DarchetypeArtifactId=org.wso2.carbon.extension.esb.connector-archetype" `
          "-DarchetypeVersion=2.0.21" `
          "-DgroupId=org.wso2.integration.connector" `
          "-DartifactId=org.wso2.integration.connector.googlebooks" `
          "-Dversion=1.0.0" `
          "-DarchetypeRepository=https://maven.wso2.org/nexus/content/repositories/wso2-public"
        ```

2.  When prompted, enter a name for the connector. For example, `googleBooks`.  
3.  When prompted for confirmation, enter `y`. 
    
The `org.wso2.integration.connector.googlebooks` directory is now created with a directory structure consisting of a `pom.xml` file, `src` tree, and `repository` tree.

### Step 2: Add the new connector resources

Now, let's configure files in the `org.wso2.integration.connector.googlebooks/src/main/resources` directory:

1. The `config` directory contains the connection configuration files. Update `config/init.xml` to request the base URL during connection creation.

    `config/init.xml`
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <template name="init" onError="fault" xmlns="http://ws.apache.org/ns/synapse">
        <parameter name="baseUrl" description="Base URL of the endpoint"/>
        <sequence>
            <property name="uri.var.baseUrl" expression="$func:baseUrl" />
        </sequence>
    </template>
    ```

2. The `functions` directory contains the operation definitions. The template provides a sample operation; update it to the `listVolume` operation. 

    `functions/component.xml`
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <component name="functions" type="synapse/template" >
        <subComponents> 
            <component name="listVolume" >
                    <file>listVolume.xml</file>
                    <displayName>List volumes</displayName>
                    <description>Lists volumes that satisfy the given query.</description>
            </component>			
        </subComponents>    
    </component>
    ```
    
    Rename `functions/sample_operation.xml` to `functions/listVolume.xml` and update its content as follows.
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <template xmlns="http://ws.apache.org/ns/synapse" name="listVolume">
        <parameter name="searchQuery" description="Full-text search query string." />
        <parameter name="responseVariable" description="The name of the variable to which the output should be stored."/>
        <parameter name="overwriteBody" description="Replace the Message Body in Message Context with the response of the operation."/>
        <sequence>
            <property name="uri.var.searchQuery" expression="$func:searchQuery" />
            <call>
                <endpoint>
                    <http method="get" uri-template="{uri.var.baseUrl}/books/v1/volumes?q={uri.var.searchQuery}" />
                </endpoint>
            </call>
        </sequence>
    </template>
    ```

3. Update the output schema located in the `outputSchema` directory. Rename `outputSchema/sample_operation.json` to `outputSchema/listVolume.json` and update its content as follows. If you know the structure of the response payload, you can define the properties of the payload object accordingly. Defining the full response structure is optional, but it can be useful for providing suggestions when accessing response properties.

    ```json
    {
      "$schema": "http://json-schema.org/draft-07/schema#",
      "type": "object",
      "title": "Output Schema for List Volume Operation",
      "description": "Output schema for the List Volume in the connector.",
      "properties": {
        "payload": {
          "type": "object",
          "description": "The main response payload from the list volume operation.", 
          "properties": {
            "kind": {
              "description": "The type of resource returned."
            },
            "totalItems": {
              "description": "The total number of volumes found."
            },
            "items": {
              "type": "array",
              "description": "A list of volumes.", 
              "items": {
                "type": "object",
                "properties": {
                  "kind": {
                    "description": "The type of resource for the item."
                  },
                  "id": {
                    "description": "The unique identifier for the volume."
                  },
                  "etag": {
                    "description": "The ETag of the volume."
                  },
                  "selfLink": {
                    "description": "A link to the volume resource."
                  },
                  "volumeInfo": {
                    "description": "Information about the volume." 
                  }
                }
              }
            }
          }
        }
      },
      "required": [
        "payload"
      ],
      "additionalProperties": false
    }
    ```

4. The `uischema` directory contains the UI schemas. The template provides UI schemas for the connection and the sample operation; update them as follows.

    `uischema/connection.json`
    ```json
    {
        "connectorName": "googleBooks",
        "connectionName": "googleBooks_Connection",
        "title": "googleBooks Connection",
        "help": "Configuration properties for googleBooks connection",
        "elements": [
            {
                "type": "attribute",
                "value": {
                    "name": "baseUrl",
                    "displayName": "Base URL",
                    "inputType": "string",
                    "defaultValue": "",
                    "required": "true",
                    "helpTip": "The base URL for the Google Books API."
                }
            }
        ]
    }
    ```
    
    Rename `uiSchema/sample_operation.json` to `uiSchema/listVolume.json` and update its content as follows.
    
    ```json
    {
      "connectorName": "googleBooks",
      "operationName": "listVolume",
      "title": "List Volume",
      "help": "Configuration properties for List Volume operation",
      "elements": [
        {
          "type": "attributeGroup",
          "value": {
            "groupName": "General",
            "elements": [
              {
                "type": "attribute",
                "value": {
                  "name": "configRef",
                  "displayName": "Connection",
                  "inputType": "connection",
                  "allowedConnectionTypes": [
                    "googleBooks_Connection"
                  ],
                  "defaultType": "connection.googleBooks_Connection",
                  "defaultValue": "",
                  "required": "true",
                  "helpTip": "The connection to use for the operation."
                }
              },
              {
                "type": "attributeGroup",
                "value": {
                  "groupName": "General",
                  "elements": [
                    {
                      "type": "attribute",
                      "value": {
                        "name": "searchQuery",
                        "displayName": "Search Query",
                        "inputType": "stringOrExpression",
                        "defaultValue": "",
                        "required": "true",
                        "helpTip": "An input parameter for the operation."
                      }
                    }
                  ]
                }
              },
              {
                "type": "attributeGroup",
                "value": {
                  "groupName": "Output",
                  "elements": [
                    {
                      "type": "attribute",
                      "value": {
                        "name": "responseVariable",
                        "displayName": "Output Variable Name",
                        "inputType": "string",
                        "deriveResponseVariable": "true",
                        "required": "true",
                        "helpTip": "Name of the variable to which the output of the operation should be assigned"
                      }
                    },
                    {
                      "type": "attribute",
                      "value": {
                        "name": "overwriteBody",
                        "displayName": "Overwrite Message Body",
                        "inputType": "checkbox",
                        "defaultValue": "false",
                        "helpTip": "Replace the Message Body in Message Context with the output of the operation (This will remove the payload from the above variable).",
                        "required": "false"
                      }
                    }
                  ]
                }
              }
            ]
          }
        }
      ]
    }
    ```

!!! Tip
    Create a folder named `icon` in the `/src/main/resources` directory to maintain icons.
    You can see a sample icon in the following location: [HTTP Connector Icon](https://github.com/wso2-extensions/mi-connector-http/blob/main/src/main/resources/icon/icon-small.png)

You are now ready to build the connector.

### Step 3: Build the connector

Open a terminal, navigate to the `org.wso2.integration.connector.googlebooks` directory, and execute the following Maven command:

```bash
mvn clean install
```

This builds the connector and generates a ZIP file named `googleBooks-connector-1.0.0.zip` in the `target` directory.

## Use the new connector

Now, let's look at how you can use the new connector in a mediation sequence.

### Step 1: Add the connector to your mediation sequence

1. [Set up WSO2 Integrator: MI Visual Studio Code extension]({{base_path}}/develop/mi-for-vscode/mi-for-vscode-overview/).
2. [Create an integration project]({{base_path}}/develop/create-integration-project) and add the connector ZIP file to the directory `/src/main/wso2mi/resources/connectors/` of your project.

    !!! Tip
        Be sure to select the new `googleBooks-connector-1.0.0.zip` file from your `org.wso2.integration.connector.googlebooks/target` directory.

3. Set up a connection for the `googleBooks` connector.

    1. Navigate to **Project Overview** and click on **Add Artifact**.    
    2. Select **Connections** under **Other Artifacts**.
    3. Select **googleBooks** connector.
    4. Enter the connection name as `googleBooksConn` and the base URL as `https://www.googleapis.com`. The created connection will be available as shown below.
    
        ```xml
        <?xml version="1.0" encoding="UTF-8"?>
        <localEntry key="googleBooksConn" xmlns="http://ws.apache.org/ns/synapse">
            <googleBooks.init>
                <connectionType>GOOGLEBOOKS_CONNECTION</connectionType>
                <baseUrl>https://www.googleapis.com</baseUrl>
                <name>googleBooksConn</name>
            </googleBooks.init>
        </localEntry>
        ```

4. [Create an API]({{base_path}}/develop/creating-artifacts/creating-an-api/) named `googlebooksAPI`. 

5. Click on the resource, then click on the **+** sign in the flow diagram. You will see that the new connector has been added to the tool palette under the **Mediators** section.  
    <img src="{{base_path}}/assets/img/integrate/create_artifacts/connector-view-pallet.png" width="500">

6. Now, update the API as shown below. You will be defining a mediation logic using the [Variable mediator]({{base_path}}/reference/mediators/variable-mediator/), the new **googleBooks** connector, and the [Respond mediator]({{base_path}}/reference/mediators/respond-mediator/).
```xml
<?xml version="1.0" encoding="UTF-8"?>
<api context="/googlebooksapi" name="googlebooksAPI" xmlns="http://ws.apache.org/ns/synapse">
    <resource methods="POST" uri-template="/">
        <inSequence>
            <variable name="searchQuery" type="JSON" expression="${payload.searchQuery}"/>
            <googleBooks.listVolume configKey="googleBooksConn">
                <searchQuery>{${vars.searchQuery}}</searchQuery>
                <responseVariable>googleBooks_listVolume_1</responseVariable>
                <overwriteBody>true</overwriteBody>
            </googleBooks.listVolume>
            <respond />
        </inSequence>
        <faultSequence>
        </faultSequence>
    </resource>
</api>
```

### Step 2: Build and deploy the artifacts

In order to build and deploy the artifacts, refer to the [build and run]({{base_path}}/develop/deploy-artifacts/#build-and-run) guide.

### Step 3: Test the connector

Post a request to the proxy service using cURL as shown below.

```bash
curl -X 'POST' \
  'http://localhost:8290/googlebooksapi' \
  -H 'Content-Type: application/json' \
  -d '{"searchQuery":"rabbit"}'
```

This performs a search and displays a list of volumes that meet the specified search criteria.  
