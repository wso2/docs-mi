# Setup User Stores on Kubernetes using Helm resources

Follow the instructions below to setup the user store for *MI* and *ICP* on Kubernetes (K8s) using Helm resources. Let's refer to the root folder of server as `<SERVER_HOME>`.

## User Stores
### File-based user store (default)

!!! Note
    The `values.yaml` is preconfigured to use a file-based user store by default. If you wish to proceed with this configuration, skip the following section.

    ```yaml
    wso2:
     config:
        userstore:
            file:
                # -- Enable/Disable file based userstore
                enabled: true
    ```
    You can use default ADMIN user [username='admin', password='admin'] for testing purposes.

!!! Important
    It is recommended to use a LDAP or RDBMS user store in the production environment.


### LDAP user store

Please add following configurations to `values.yaml` file to setup LDAP server as a user store.

Example for READ ONLY LDAP:
```yaml
wso2:
    config:
        userstore:
            file:
                enabled: false
            ldap:
                type: "read_only_ldap"
                connectionUrl: "ldap://{hostname}:{port}"
                connectionName: "uid=admin,ou=system"
                connectionPassword: "admin"
                userSearchBase: "ou=Users,dc=wso2,dc=org"
```

Refer to [MI documentation](https://mi.docs.wso2.com/en/latest/reference/config-catalog-mi/#external-user-store) for complete list of parameters.

### RDBMS user store

Please add following configurations to `values.yaml` file to setup prefered RDBMS user store.

Example for MySQL:
```yaml
wso2:
    config:
        userstore:
            file:
                enabled: false
            rdbms:
                url: "jdbc:mysql://{hostname}:{port}/userdb"
                username: "<username>"
                password: "<password>"
                jdbc:
                    driver: "com.mysql.jdbc.Driver"
                    poolParameters:
                        maxActive: 50
                        maxWait: 60000
```

Refer to [MI documentation](https://mi.docs.wso2.com/en/latest/install-and-setup/setup/user-stores/setting-up-a-userstore-in-icp/#configure-an-rdbms-user-store:~:text=RDBMS%20user%20store-,%C2%B6,-Before%20you%20begin) for more information on supporting RDBMS types.


!!! Note 
    When using RDBMS, the JDBC driver must be added to the `<SERVER_HOME>/lib` folder. To achieve this, you need to build a custom server image. 

#### Build a custom Server image with JDBC driver

Follow these steps below to add JDBC driver:
    
Step 1 : Create the Dockerfile 

- BASE_IMAGE:
    * MI: `wso2/wso2mi:4.3.0`
    * ICP: `wso2/wso2-integration-control-plane:1.0.0`
- WSO2_SERVER_HOME:
    * MI: `/home/wso2carbon/wso2mi-4.3.0`
    * ICP: `/home/wso2carbon/wso2-integration-control-plane-1.0.0`
        
    Example for MySQL:

    ```yaml
    FROM <BASE_IMAGE>
    USER root
    RUN apt-get update && \
        apt-get install -y wget && \
        apt-get clean && \
        rm -rf /var/lib/apt/lists/*
    ENV WSO2_SERVER_HOME=<WSO2_SERVER_HOME>
    RUN mkdir -p ${WSO2_SERVER_HOME}/lib
    ARG JDBC_DRIVER_URL=https://dev.mysql.com/get/Downloads/Connector-J/mysql-connector-j-8.0.33.tar.gz
    RUN wget -O /tmp/mysql-connector.tar.gz "${JDBC_DRIVER_URL}" && \
        tar -xzf /tmp/mysql-connector.tar.gz -C /tmp && \
        find /tmp -name "mysql-connector*.jar" -exec cp {} ${WSO2_SERVER_HOME}/lib/ \; && \
        rm -rf /tmp/mysql-connector.tar.gz
    RUN chown -R wso2carbon:wso2 ${WSO2_SERVER_HOME}/lib && \
        chmod -R 755 ${WSO2_SERVER_HOME}/lib
    USER wso2carbon
    ```

Step 2 : Build the image

```bash
docker build -t customized-wso2-img:1.0.0 .
```   

Step 3:  Update the following configurations in `values.yaml`

```yaml
containerRegistry: ""
    wso2:
        deployment:
            image:
                repository: "customized-wso2-img"
                tag: "1.0.0"
                pullPolicy: IfNotPresent
```   

!!! Tip  
    You can use the [MI VSCode extension](https://marketplace.visualstudio.com/items/?itemName=WSO2.micro-integrator) to create the **custom MI server image with JDBC driver**. You can create the custom MI server image in development and use in production by pushing to a remote repository. Please check [Create a Project]({{base_path}}/develop/create-integration-project.md).

#### Create custom MI server image with VS Code
    
Step 1 : Add JDBC JAR file to `<PROJECT_DIR>/deployment/libs` folder. Please make sure that only JDBC driver resides in '<PROJECT_DIR>/deployment/libs' folder.

<img src="{{base_path}}/assets/img/setup-and-install/project-structure.png" alt="Project Structure" />

Step 2 : Add following instruction to '<PROJECT_DIR>/deployment/docker/Dockerfile'. 

```bash
COPY libs/*.jar ${WSO2_SERVER_HOME}/lib/
``` 

Step 3 : Click **Create Docker Image** button under Deployment Options to build the Docker image and push it to the local registry.

<img src="{{base_path}}/assets/img/setup-and-install/create-docker-image.png" alt="Create Docker Image"/>
