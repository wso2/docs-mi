# Create a New Connector

You can write a new connector for a specific requirement that cannot be addressed via any of the existing connectors that can be downloaded from the [connector store](https://store.wso2.com/?page=1&product=MI+Connector).

Follow the steps given below to write a new connector to integrate with the **Google Books** service. You can then use the connector inside a mediation sequence to connect with Google Books and get information.

!!! Note
    If you have an OpenAPI definition file, you can generate a connector using the [WSO2 Micro Integrator for VS Code extension]({{base_path}}/develop/mi-for-vscode/mi-for-vscode-overview/). For more information, see [Generate a Connector]({{base_path}}/reference/connectors/generate-connectors/).

## Write a new connector

Follow the steps given below to write the new connector.

### Prerequisites

Download and install Apache Maven.

### Step 1: Create the Maven project template

We will use the [maven archetype](https://github.com/wso2-extensions/archetypes/tree/master/esb-connector-archetype) to generate the Maven project template and sample connector code. 

1.  Open a terminal, navigate to the directory on your machine where you want the new connector to be created, and run the following command:

    ```xml
    mvn org.apache.maven.plugins:maven-archetype-plugin:2.4:generate -DarchetypeGroupId=org.wso2.carbon.extension.archetype -DarchetypeArtifactId=org.wso2.carbon.extension.esb.connector-archetype -DarchetypeVersion=2.0.4 -DgroupId=org.wso2.carbon.esb.connector -DartifactId=org.wso2.carbon.esb.connector.googlebooks -Dversion=1.0.0 -DarchetypeRepository=http://maven.wso2.org/nexus/content/repositories/wso2-public/
    ```
2.  When prompted, enter a name for the connector. For example, `googleBooks`.  
3.  When prompted for confirmation, enter `y`. 
    
The `org.wso2.carbon.esb.connector.googlebooks` directory is now created with a directory structure consisting of a `pom.xml` file, `src` tree, and `repository` tree.

### Step 2: Add the new connector resources

Now, let's configure files in the `org.wso2.carbon.esb.connector.googlebooks/src/main/resources` directory:

1.  Create a directory named `googlebooks_volume` in the `/src/main/resources` directory.
2.  Create a file named `listVolume.xml` with the following content in the `googlebooks_volume` directory:
    ```xml
    <template name="listVolume" xmlns="http://ws.apache.org/ns/synapse">
    <parameter name="searchQuery" description="Full-text search query string." />
        <sequence>
          <property name="uri.var.searchQuery" expression="$func:searchQuery" />
            <call>
                <endpoint>
                    <http method="get" uri-template="https://www.googleapis.com/books/v1/volumes?q={uri.var.searchQuery}" />
                </endpoint>
            </call>
        </sequence>
    </template>
    ```

3.  Create a file named `component.xml` in the `googlebooks_volume` directory and add the following content:
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <component name="googlebooks_volume" type="synapse/template">
        <subComponents>
            <component name="listVolume">
                <file>listVolume.xml</file>
                <description>Lists volumes that satisfy the given query.</description>
            </component>
        </subComponents>
    </component>
    ```

4.  Edit the `connector.xml` file in the `src/main/resources` directory and replace the contents with the following dependency:
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <connector>
        <component name="googleBooks" package="org.wso2.carbon.connector" >
          <dependency component="googlebooks_volume"/>
            <description>wso2 sample connector library</description>
        </component>
    </connector>
    ```

5. Create a folder named `icon` in the `/src/main/resources` directory and add two icons.

    !!! Tip
        You can see a sample icon in the following location: [icons](https://github.com/wso2-extensions/mi-connector-http/blob/main/src/main/resources/icon/icon-small.png)

You are now ready to build the connector.

### Step 3: Build the connector

Open a terminal, navigate to the `org.wso2.carbon.esb.connector.googlebooks` directory and execute the following maven command:

```bash
mvn clean install
```

This builds the connector and generates a ZIP file named `googleBooks-connector-1.0.0.zip` in the `target` directory.

## Use the new connector

Now, let's look at how you can use the new connector in a mediation sequence.

### Step 1: Add the connector to your mediation sequence

1. [Set up WSO2 Micro Integrator Visual Studio Code extension]({{base_path}}/develop/mi-for-vscode/mi-for-vscode-overview/).
2. [Create an integration project]({{base_path}}/develop/create-integration-project) and add the connector ZIP file to the directory `/src/main/wso2mi/resources/connectors/` of your project.

    !!! Tip
        Be sure to select the new `googleBooks-connector-1.0.0.zip` file from your `org.wso2.carbon.esb.connector.googlebooks/target` directory.

3. [Create an API]({{base_path}}/develop/creating-artifacts/creating-an-api/) named `googlebooks_listVolume`. 

4. Click on the resource, then click on the + sign in the flow diagram, you will see that the new connector has been added to the tool palette under the **Mediators** section.  
    <img src="{{base_path}}/assets/img/integrate/create_artifacts/connector-view-pallet.png" width="500">

5. Now, update the API as shown below. You will be defining a mediation logic using the [Variable mediator]({{base_path}}/reference/mediators/variable-mediator/), the new **googleBooks** connector, and the [Respond mediator]({{base_path}}/reference/mediators/respond-mediator/).:
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <api context="/googlebooks_listvolume" name="googlebooks_listVolume" xmlns="http://ws.apache.org/ns/synapse">
        <resource methods="POST" uri-template="/">
            <inSequence>
                <variable name="searchQuery" type="JSON" expression="${payload.searchQuery}"/>
                <googleBooks.listVolume>
                    <searchQuery>${vars.searchQuery}</searchQuery>
                </googleBooks.listVolume>
            <respond description="respond" /></inSequence>
            <faultSequence>
            </faultSequence>
        </resource>
    </api>
    ```

### Step 2: Build and deploy the artifacts

In order to build and deploy the artifacts, refer the [build and run]({{base_path}}/develop/deploy-artifacts/#build-and-run) guide.

### Step 3: Test the connector

Post a request to the proxy service using Curl as shown below.

```bash
curl -X 'POST' \
  'http://localhost:8290/googlebooks_listvolume/' \
  -H 'Content-Type: application/json' \
  -d '{"searchQuery":"rabbit"}'
```

This performs a search and displays a list of volumes that meet the specified search criteria.  
