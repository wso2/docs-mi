# LDAP Connector Reference

## Connection configuration

The connection is used to establish a connection to the LDAP instance. The LDAP API requires all requests to be authenticated as a user.

??? note "LDAP Connection"
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>providerUrl</td>
            <td>The URL of the LDAP server. Instead of just one URL, you can also specify a space-separated list of URLs. In this case, the LDAP connector will attempt to use each URL in turn until it is able to create a successful connection.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>securityPrincipal</td>
            <td>The Distinguished Name (DN) of the admin of the LDAP Server.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>securityCredentials</td>
            <td>The password of the LDAP admin.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>secureConnection</td>
            <td>Specifies whether to enable a secure connection. By default, this is set to `false`.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>disableSSLCertificateChecking</td>
            <td>Indicates whether the certificate is enabled (true) or disabled (false).By default, this is set to `false`.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>timeout</td>
            <td>Specifies the timeout duration for the LDAP request. The default value is `30000ms`.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>connectionPoolingEnabled</td>
            <td>Specifies whether connection pooling is enabled (true) or disabled (false). The default value is `false`.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>connectionPoolingProtocol</td>
            <td>Specifies a space-separated list of protocol types for connections that can be pooled. Valid values are `plain` and `ssl`</td>
            <td>No</td>
        </tr>
        <tr>
            <td>connectionPoolingInitSize</td>
            <td>The number of connections per connection identity to create when initially creating a connection for the identity.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>connectionPoolingMaxSize</td>
            <td>The maximum number of connections per connection identity that can be maintained concurrently.</td>
            <td>No</td>
        </tr>
    </table>

    **Sample configuration**
    ```xml
    <ldap.init>
        <providerUrl>{${properties.providerUrl}}</providerUrl>
        <securityPrincipal>{${properties.securityPrincipal}}</securityPrincipal>
        <securityCredentials>{${properties.securityCredentials}}</securityCredentials>
    </ldap.init>
    ```

    **Sample request**
    ```json
    {
        "providerUrl":"ldap://localhost:389/", 
        "securityPrincipal":"uid=admin,ou=system",
        "securityCredentials":"adminpassword"
    }
    ```

You can follow the steps below to import your LDAP certificate into the WSO2 Integrator: MI client’s keystore as follows:

1. To encrypt the connections, you need to configure a certificate authority and use it to sign the keys for the LDAP server. See the [How To Encrypt OpenLDAP Connections Using STARTTLS](https://www.digitalocean.com/community/tutorials/how-to-encrypt-openldap-connections-using-starttls) documentation for more info.
2. Use the following command to import the certificate into the integration server's client keystore. 
   ```bash
   keytool -importcert -file <certificate file> -keystore <PRODUCT_HOME>/repository/resources/security/client-truststore.jks -alias "LDAP"
   ```
3. Restart the server and deploy the LDAP configuration.

**Ensuring secure data**

Secure Vault is supported for encrypting passwords. See, 
[Working with Secrets]({{base_path}}/install-and-setup/setup/security/encrypting-plain-text) on integrating 
and using Secure Vault.

---

### User authentication

??? note "ldap.authenticate"
    LDAP authentication is a major requirement in most LDAP based applications. The  authenticate operation simplifies the LDAP authentication mechanism. This operation authenticates the provided Distinguished Name(DN) and password against the LDAP server, and returns either a success or failure response depending on whether the authentication was successful or not.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>dn</td>
            <td>The distinguished name of the user.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>password</td>
            <td>The password of the user.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <ldap.authenticate>
        <dn>{${properties.dn}}</dn>
        <password>{${properties.password}}</password>
    </ldap.authenticate>
    ```
    
    **Sample request**

    ```json
    {
        "dn":"uid=testDim20,ou=staff,dc=wso2,dc=com",
        "password":"12345"
    }
    ```

## Entry Management

??? note "add"
    The add operation creates a new LDAP entry in the LDAP server.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>objectClass</td>
            <td>The object class of the new entry.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>dn</td>
            <td>The distinguished name of the new entry. This should be a unique DN that does not already exist in the LDAP server.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>attributes</td>
            <td>The other attributes of the entry other than the DN. These attributes should be specified as comma separated key-value pairs.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <ldap.addEntry>
        <objectClass>{${properties.objectClass}}</objectClass>
        <dn>{${properties.dn}}</dn>
        <attributes>{${properties.attributes}}</attributes>
    </ldap.addEntry>
    ```
    
    **Sample request**

    ```json
    {
        "objectClass":"inetOrgPerson",
        "dn":"uid=testDim20,ou=staff,dc=wso2,dc=com",
        "attributes":'{ 
            "mail":"testDim1s22c@wso2.com",
            "userPassword":"12345",
            "sn":"dim",
            "cn":"dim",
            "manager":"cn=dimuthuu,ou=Groups,dc=example,dc=com"
        }
    }
    ```

??? note "search"
    The search operation performs a search for one or more LDAP entities based on the specified search keys.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>dn</td>
            <td>The distinguished name of the entry you need to search.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>filters</td>
            <td>The keywords to use in the search. The parameters should be in JSON format as follow: { "uid":"john", "mail":"testDim2@gmail.com"}</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>objectClass</td>
            <td>The object class of the new entry.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>attributes</td>
            <td>The attributes of the LDAP entry that should be included in the search result.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>onlyOneReference</td>
            <td>Boolean value whether to guarantee or not only one reference.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>limit</td>
            <td>This allows you to set a limit on the number of search results. If this property is not defined the maximum no of search results will be returned.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>allowEmptySearchResult</td>
            <td>Boolean value to allow an empty search result or throw an exception. If this property is not defined, an exception will be thrown and a fault sequence is executed if the search result is empty.</td>
            <td>No</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <ldap.searchEntry>
        <objectClass>{${properties.objectClass}}</objectClass>
        <dn>{${properties.dn}}</dn>
        <filters>{${properties.filters}}</filters>
        <attributes>{${properties.attributes}}</attributes>
    </ldap.searchEntry>
    ```
    
    **Sample request**

    ```json
    {
        "dn":"ou=sales,dc=example,dc=com",
        "objectClass":"inetOrgPerson",
        "attributes":"mail,uid,givenName,manager,objectGUID",
        "filters":{
            "manager":"cn=sales-group,ou=sales,dc=example,dc=com","uid":"rajjaz","createTimestamp >":"20210412000000.0Z"},
        "onlyOneReference":"false"
    }
    ```

??? note "update"
    The update operation updates an existing LDAP entry in the LDAP server based on the specified changes.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>dn</td>
            <td>The distinguished name of the entry.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>mode</td>
            <td>The mode of the update operation. Possible values are as follows:
                <ul>
                    <li>replace : Replaces an existing attribute with the new attribute that is specified.</li>
                    <li>add : Adds a new attributes</li>
                    <li>remove : Removes an existing attribute.</li>
                </ul>
            </td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>attributes</td>
            <td>Attributes of the entry to be updated. The attributes to be updated should be specified as comma separated key-value pairs.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <ldap.searchEntry>
        <dn>{${properties.dn}}</dn>
        <mode>{${properties.mode}}</mode>
        <attributes>{${properties.attributes}}</attributes>
    </ldap.searchEntry>
    ```
    
    **Sample request**

    ```json
    {
        "dn":"ou=sales,dc=example,dc=com",
        "mode":"replace",
        "attributes":"mail,uid,givenName,manager,objectGUID"
    }
    ```

??? note "delete"
    The delete operation deletes an existing LDAP entry from the LDAP server.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>dn</td>
            <td>The distinguished name of the entry to be deleted.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <ldap.deleteEntry>
        <dn>{${properties.dn}}</dn>
    </ldap.deleteEntry>
    ```
    
    **Sample request**

    ```json
    {
        "dn":"ou=sales,dc=example,dc=com",
    }
    ```

??? note "updateName"
    The updateName operation renames an entry in the LDAP directory by changing its distinguished name (DN) on the LDAP server.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>oldName</td>
            <td>The distinguished name of the entry to be deleted.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>newName</td>
            <td>The distinguished name of the entry to be deleted.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <ldap.updateName>
        <oldName>{${properties.oldName}}</oldName>
        <newName>{${properties.newName}}</newName>
    </ldap.updateName>
    ```
    
    **Sample request**

    ```json
    {
        "oldName":"ou=sales,dc=example,dc=com",
        "newName":"ou=marketing,dc=example,dc=com"
    }
    ```

## Handle errors

The connector may encounter errors during operation execution. When an error occurs, the `ERROR_DETAIL` property will contain detailed information about the error. You can handle these errors using a `Fault Sequence` in your integration. For more information, refer to [Using Fault Sequences]({{base_path}}/learn/examples/sequence-examples/using-fault-sequences/).

??? note "Error Details"

    | Error Code  | Description |
    | ------------- | ------------- |
    | 7000001 | An error occurred while searching a LDAP entry.    |
    | 7000002 | LDAP root user's credentials are invalid.    |
    | 7000003 | An error occurred while adding a new LDAP entry.    |
    | 7000004 | An error occurred while updating an existing LDAP entry.    |
    | 7000005 | An error occurred while deleting a LDAP entry.    |
    | 7000006 | The LDAP entry that is required to perform the operation does not exist.
