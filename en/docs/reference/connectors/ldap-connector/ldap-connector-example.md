---
search:
  boost: 2
---
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

## Create a connection

1. In the Design View, click the **+** button and select **Connection**.
2. In the search bar, type `ldap` and select the `Ldap Connector` from the list.
3. In the connection configuration pane, set the **Connection Name** to `ServiceNowConnection` and fill in the required details:
    - **Provider URL**: The URL of the LDAP server. For example, `ldap://localhost:10389/`.
    - **Username**: The username of the ldap account.
    - **Password**: The password of the ldap account.

<img src="{{base_path}}/assets/img/integrate/connectors/ldap_connector/add-new-connection.png" title="Adding new connection" height="100" width="500" alt="Adding new connection"/>

## Create an API

1. In the Design View, click the **+** button and select **API** in create an integration project pane.

2. Enter the API Name as `college_student_api` and the Context as `/student`, then click **Create**.

3. To add the Ldap connector:
    - In the **Design View**, click the **+** button.
    - In the **Mediator** section, search for `ldap`.
    - Select the **Ldap** connector and click **Download**.

## Implement the API
1. Go to the **Source View** of the API by clicking on the **<>** icon in the top right corner of the **Design View**.
2. Copy and paste the following code in the **Source View** of the API.

??? note "Source view of the implemented resource"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <api context="/student" name="college_student_api" xmlns="http://ws.apache.org/ns/synapse">
        <resource methods="POST" url-mapping="/create">
            <inSequence>
                <ldap.addEntry configKey="LDAP_Connection">
                    <objectClass>inetOrgPerson</objectClass>
                    <attributes>'{
                    "mail": "triss@wso2.com",
                    "userPassword": "geralt&amp;triss",
                    "sn": "dim",
                    "cn": "dim",
                    "manager": "cn=geralt,ou=Groups,dc=example,dc=com"
                    }'</attributes>
                    <dn>{${payload.dn}}</dn>
                    <responseVariable>ldap_addEntry_1</responseVariable>
                    <overwriteBody>true</overwriteBody>
                </ldap.addEntry>
                <respond/>
            </inSequence>
            <faultSequence>
            </faultSequence>
        </resource>
        <resource methods="POST" url-mapping="/search">
            <inSequence>
                <ldap.searchEntry configKey="LDAP_Connection">
                    <onlyOneReference>false</onlyOneReference>
                    <objectClass>inetOrgPerson</objectClass>
                    <limit>10</limit>
                    <scope></scope>
                    <filters>'{
                    "manager": "cn=geralt,ou=Groups,dc=example,dc=com"
                    }'</filters>
                    <dn>{${payload.dn}}</dn>
                    <attributes>mail,uid</attributes>
                    <allowEmptySearchResult>true</allowEmptySearchResult>
                    <responseVariable>ldap_searchEntry_1</responseVariable>
                    <overwriteBody>true</overwriteBody>
                </ldap.searchEntry>
                <respond/>
            </inSequence>
            <faultSequence>
            </faultSequence>
        </resource>
    </api>
    ```

## Get the project

You can download the ZIP file and extract the contents to get the project code.

<a href="{{base_path}}/assets/attachments/connectors/ldap_connector_project.zip">
    <img src="{{base_path}}/assets/img/integrate/connectors/download-zip.png" width="200" alt="Download ZIP">
</a>

## Deployment

To deploy and run the project, refer to the [Build and Run]({{base_path}}/develop/deploy-artifacts/#build-and-run) guide.

## Testing

Invoke the API as shown below using the MI VSCode Extension.

<img src="{{base_path}}/assets/img/integrate/connectors/common/runtime-services.png" title="Runtime services" width="600" alt="Runtime services"/>

### Create ldap entry

**Sample request**:


- Content-Type: `application/json`
- Request body:
    ```json
      {
          "dn": "ou=people,dc=mycompany,dc=com"
      }
    ```

**Expected Response** :
1. You should get a 'Success' response.
   ```json
   {
       "result": {
         "message": "Success"
       }
   }
   ```
2. Open Apache Directory Studio and category DIT (Directory Information Tree) shows the hierarchical content of the
   directory. Expand, and collapse the tree and you will see the new entries. Select the entry and you will see its attributes
   and values on Entry Editor.
   ![image]({{base_path}}/assets/img/integrate/connectors/ldap_connector/directory-studio-view.png)


### Search ldap entries

**Expected Response**:

**Sample request**:

- Content-Type: `application/json`
- Request body:
    ```json
    {
        "dn": "ou=people,dc=mycompany,dc=com"
    } 
    ```

**Expected Response** :

You should get all entries that match with the provided filter. A sample response is as follows.
```json
{
  "result": {
    "entry": {
      "dn": "ou=people,dc=mycompany,dc=com",
      "mail": "triss@wso2.com"
    }
  }
}
```
## What's Next

* To customize this example for your own scenario, see [LDAP Connector Configuration]({{base_path}}/reference/connectors/ldap-connector/ldap-server-configuration/) documentation for all operation details of the connector.
