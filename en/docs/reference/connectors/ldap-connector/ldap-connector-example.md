# LDAP Connector Example

Given below is a sample scenario that demonstrates how to perform CRUD operations on LDAP entries using LDAP Connector.

## What you'll build

This example demonstrates on how to use the LDAP connector to create and read LDAP entries on a student directory. 
    ![image]({{base_path}}/assets/img/integrate/connectors/ldap_connector/ldap_connector_usecase.png)

This will have 2 API resources, `create`, `search`.

* `/create`: This will create a new LDAP entry in the LDAP server.

* `/search`: This will perform a search for one or more LDAP entities with the specified search keys.

If you do not want to configure this yourself, you can simply [get the project](#get-the-project) and run it.

## Set up the integration project

Before you begin, see [Setting up LDAP]({{base_path}}/reference/connectors/ldap-connector/setting-up-ldap/) if you need to set up an LDAP and try this out. 

Follow the steps in the [create integration project]({{base_path}}/develop/create-integration-project/) guide to set up the Integration Project.

## Create the integration logic

1. Hover over **APIs** and click the **+** icon that appears to open the **API Form**.
   <a href="{{base_path}}/assets/img/integrate/connectors/ldap_connector/create-api.png"><img src="{{base_path}}/assets/img/integrate/connectors/ldap_connector/create-api.png" alt="add property" width="80%"></a>

2. Provide the API name as `college_student_api` and the API context as `/student` and Click **Create**. You can go to the source view of the xml configuration file of the API and copy the following configuration and save. 
   <a href="{{base_path}}/assets/img/integrate/connectors/ldap_connector/source-view.png"><img src="{{base_path}}/assets/img/integrate/connectors/ldap_connector/source-view.png" alt="add property" width="80%"></a>

    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <api context="/student" name="college_student_api" xmlns="http://ws.apache.org/ns/synapse">
        <resource methods="POST" url-mapping="/create">
            <inSequence>
                <sequence key="init_sequence"/>
                <sequence key="add_student_sequence"/>
            </inSequence>
        </resource>
        <resource methods="POST" url-mapping="/search">
            <inSequence>
                <sequence key="init_sequence"/>
                <sequence key="search_student_sequence"/>
            </inSequence>
        </resource>
    </api>
    ```
   
3. Hover over **Sequence** and click the **+** icon that appears to open the **Sequence Form**.
   
4. Provide Sequence name as `init_sequence`.
   
5. Click the created sequence form **MI Overview**.
   <a href="{{base_path}}/assets/img/integrate/connectors/ldap_connector/sequence-create.png"><img src="{{base_path}}/assets/img/integrate/connectors/ldap_connector/sequence-create.png" alt="add property" width="80%"></a>

6. Click the **+** icon to add the first mediator to the sequence.
   
7. Search `ldap` in **Connector** panel and Click **Ldap** Connector
    <a href="{{base_path}}/assets/img/integrate/connectors/ldap_connector/ldap-connector.png"><img src="{{base_path}}/assets/img/integrate/connectors/ldap_connector/ldap-connector.png" alt="add property" width="80%"></a>
   
8. Click **Init** operation. Then click **Submit**.
   
    !!! Info 
        `<ldap.init>` element authenticates with the LDAP server to gain access to perform various LDAP operations.

9.  You can go to the source view of the xml configuration file of the Sequence and copy the following configuration.   
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <sequence name="init_sequence" trace="disable" xmlns="http://ws.apache.org/ns/synapse">
        <property expression="json-eval($.secureConnection)" name="secureConnection" scope="default" type="STRING"/>
        <property expression="json-eval($.disableSSLCertificateChecking)" name="disableSSLCertificateChecking" scope="default" type="STRING"/>
        <property expression="json-eval($.providerUrl)" name="providerUrl" scope="default" type="STRING"/>
        <property expression="json-eval($.securityPrincipal)" name="securityPrincipal" scope="default" type="STRING"/>
        <property expression="json-eval($.securityCredentials)" name="securityCredentials" scope="default" type="STRING"/>
        <ldap.init>
            <providerUrl>{$ctx:providerUrl}</providerUrl>
            <securityPrincipal>{$ctx:securityPrincipal}</securityPrincipal>
            <securityCredentials>{$ctx:securityCredentials}</securityCredentials>
            <secureConnection>{$ctx:secureConnection}</secureConnection>
            <disableSSLCertificateChecking>{$ctx:disableSSLCertificateChecking}</disableSSLCertificateChecking>
        </ldap.init>
    </sequence>
    ```

10. Create another sequence named `add_student_sequence`. You can go to the source view of the xml configuration file of the Sequence and copy the following configuration.  
    
    !!! Info
        `<ldap.addEntry>` element creates a new LDAP entry in the LDAP server
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <sequence name="add_student_sequence" trace="disable" xmlns="http://ws.apache.org/ns/synapse">
        <property expression="json-eval($.content.objectClass)" name="objectClass" scope="default" type="STRING"/>
        <property expression="json-eval($.content.attributes)" name="attributes" scope="default" type="STRING"/>
        <property expression="json-eval($.content.dn)" name="dn" scope="default" type="STRING"/>
        <ldap.addEntry>
            <objectClass>{$ctx:objectClass}</objectClass>
            <attributes>{$ctx:attributes}</attributes>
            <dn>{$ctx:dn}</dn>
        </ldap.addEntry>
        <respond/>
    </sequence>
    ```
      
11. Create another sequence named `search_student_sequence`. You can go to the source view of the xml configuration file of the Sequence and copy the following configuration.  
    
    !!! Info
        `<ldap.searchEntry>` element searches for one or more LDAP entities based on the specified search keys.
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <sequence name="search_student_sequence" trace="disable" xmlns="http://ws.apache.org/ns/synapse">
        <property expression="json-eval($.content.objectClass)" name="objectClass" scope="default" type="STRING"/>
        <property expression="json-eval($.content.filters)" name="filters" scope="default" type="STRING"/>
        <property expression="json-eval($.content.attributes)" name="attributes" scope="default" type="STRING"/>
        <property expression="json-eval($.content.dn)" name="dn" scope="default" type="STRING"/>
        <ldap.searchEntry>
            <objectClass>{$ctx:objectClass}</objectClass>
            <limit>1000</limit>
            <filters>{$ctx:filters}</filters>
            <dn>{$ctx:dn}</dn>
            <attributes>{$ctx:attributes}</attributes>
        </ldap.searchEntry>
        <respond/>
    </sequence>
    ```

## Get the project

You can download the ZIP file and extract the contents to get the project code.

<a href="{{base_path}}/assets/attachments/connectors/ldap_connector_project.zip">
    <img src="{{base_path}}/assets/img/integrate/connectors/download-zip.png" width="200" alt="Download ZIP">
</a>

## Deployment
To deploy and run the project, refer to the [Build and Run]({{base_path}}/develop/deploy-artifacts/#build-and-run) guide.

You can further refer to the application deployed through the CLI tool. See the instructions on [managing integrations from the CLI]({{base_path}}/observe-and-manage/managing-integrations-with-micli).

## Testing

### Create an entry in ldap server

1. Create a file named student_data.json with the following sample payload.
    ```json
        { 
          "providerUrl":"ldap://localhost:10389/",
          "securityPrincipal":"uid=admin,ou=system",
          "securityCredentials":"admin",
          "secureConnection":"false",
          "disableSSLCertificateChecking":"false",
          "content":{ 
             "objectClass":"inetOrgPerson",
             "dn":"uid=triss.merigold,ou=Users,dc=wso2,dc=org",
             "attributes":{ 
                "mail":"triss@wso2.com",
                "userPassword":"geralt&triss",
                "sn":"dim",
                "cn":"dim",
                "manager":"cn=geralt,ou=Groups,dc=example,dc=com"
             }
          }
        }
    ```

2. Invoke the API as shown below using the curl command. Curl Application can be downloaded from [here](https://curl.haxx.se/download.html).
    ```
    curl -H "Content-Type: application/json" -X POST --data @student_data.json http://localhost:8290/student/create
    ```

**Expected Response**: 
1. You should get a 'Success' response. 
2. Open Apache Directory Studio and category DIT (Directory Information Tree) shows the hierarchical content of the 
directory. Expand, and collapse the tree and you will see the new entries. Select the entry and you will see its attributes 
and values on Entry Editor.
    ![image]({{base_path}}/assets/img/integrate/connectors/ldap_connector/ldap-connector-directory-studio-view.png)

### Search ldap entries

1. Create a file named search_student.json with following sample payload
    ```json
        {
            "providerUrl": "ldap://localhost:10389/",
            "securityPrincipal": "uid=admin,ou=system",
            "securityCredentials": "admin",
            "secureConnection": "false",
            "disableSSLCertificateChecking": "false",
            "application": "ldap",
            "operation": "searchEntity",
            "content": {
                "objectClass": "inetOrgPerson",
                "filters": {
                    "manager": "cn=geralt,ou=Groups,dc=example,dc=com"
                },
                "dn": "ou=Users,dc=wso2,dc=org",
                "attributes": "mail,uid"
            }
        }
    ```

2. Invoke the API as shown below using the curl command. 
    ```
    curl -H "Content-Type: application/json" -X POST --data @search_student.json http://localhost:8290/student/search
    ```

**Expected Response**: 
You should get all entries that match with the provided filter. A sample response is as follows.
```json
    {
        "result": {
            "entry": [
                {
                    "dn": "uid=triss.merigold,ou=Users,dc=WSO2,dc=ORG",
                    "mail": "triss@wso2.com",
                    "uid": "triss.merigold"
                },
                {
                    "dn": "uid=yennefer.of.vengerberg,ou=Users,dc=WSO2,dc=ORG",
                    "mail": "yenna@wso2.com",
                    "uid": "yennefer.of.vengerberg"
                }
            ]
        }
    }
```
## What's Next

* To customize this example for your own scenario, see [LDAP Connector Configuration]({{base_path}}/reference/connectors/ldap-connector/ldap-server-configuration/) documentation for all operation details of the connector.
