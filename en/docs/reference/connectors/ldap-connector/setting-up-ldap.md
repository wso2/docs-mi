# Setting up an LDAP Server

### Apache Directory Studio

1. Download Apache Directory Studio from [here](http://directory.apache.org/studio/) and open.
2. Click on the LDAP Servers tab found in the bottom left corner and click New Server button.</br>
   <img src="{{base_path}}/assets/img/integrate/connectors/ldap_connector/create-ldap-server.png" title="LDAP new connection" width="400" alt="LDAP new connection"/>
3. Click `ApacheDS 2.0.0` and click **Finish**.</br>
   <img src="{{base_path}}/assets/img/integrate/connectors/ldap_connector/create-ldap-server-form.png" title="LDAP new connection" width="400" alt="LDAP new connection"/>
4. Click Start Server button.</br>
   <img src="{{base_path}}/assets/img/integrate/connectors/ldap_connector/start-ldap-server.png" title="LDAP new connection" width="400" alt="LDAP new connection"/>
5. Right click on the LDAP Servers tab found in the bottom left corner and click **New Connection**.</br>
    <img src="{{base_path}}/assets/img/integrate/connectors/ldap_connector/ds_create_new_connection.png" title="LDAP new connection" width="400" alt="LDAP new connection"/>
6. Configure network parameters as follows and click next.</br>
    <img src="{{base_path}}/assets/img/integrate/connectors/ldap_connector/creating_a_new_connection.png" title="LDAP new connection" width="600" alt="LDAP new connection"/>
7. Provide authentication parameters as follows and click **Finish**.
    * Bind DN or user parameter - **uid=admin,ou=system**
    * Bind password - **admin**
8.  Right click on newly created connection and select **Open Connection**.</br>
    <img src="{{base_path}}/assets/img/integrate/connectors/ldap_connector/open_connection.png" title="LDAP new connection" width="400" alt="LDAP new connection"/>
