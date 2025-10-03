# Versioned Artifact Deployment

## Overview

By default, you cannot deploy multiple versions of the same Composite Application (CApp) in WSO2 Integrator: MI. This limitation occurs because all artifacts inside CApps are deployed with only their simple names, leading to conflicts when two projects contain the same artifact names.

With versioned artifact deployment, artifacts are deployed using fully qualified names that include the project’s `groupId`, `artifactId`, and `version`. This allows you to safely deploy multiple versions of the same CApp at the same time.

## Enable versioned deployment

You can enable versioned deployment at either the project level or the server level.

1. **Project level**

    In VS Code, open the Project Overview and go to the Build Details section. Here you can enable or disable versioned artifact deployment for the project.
    By default, this option is enabled for newly created projects.

    <a href="{{base_path}}/assets/img/develop/create-artifacts/versioned-artifact-deployment-for-the-project.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/versioned-artifact-deployment-for-the-project.png" alt="Enable or disable versioned artifact deployment for the project" width="80%"></a>

2. **Server level**

    By default, versioned deployment is disabled at the server level. To enable globally, start the server with:

    ```
    -DenableVersionedCAppDeployment
    ```

    !!! Note
        Enabling this at the server level does not automatically convert previously built CApps into versioned CApps.
        To deploy with versioning, you must use the latest MI for VS Code extension (version 3.0.0 or above), follow the dependency management guidelines, and create a new CApp.

When enabled, all artifacts inside the project (or in the runtime if server level is set) will be deployed with fully qualified names.

## Example versioned deployment

Consider a project with the following configuration:

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
                             https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.microintegrator.project</groupId>
    <artifactId>payment</artifactId>
    <version>1.0.1</version>
    <packaging>pom</packaging>
    <name>HelloWorldService</name>
</project>
```

**Sample API**

```xml
<api context="/payment" name="PaymentAPI" xmlns="http://ws.apache.org/ns/synapse">
    <resource methods="GET">
        <inSequence>
            <sequence key="sequence_in_call"/>
            <respond/>
        </inSequence>
    </resource>
</api>
```

**Sample Proxy Service**

```xml
<proxy name="PaymentProxy" startOnLoad="true" transports="http https" xmlns="http://ws.apache.org/ns/synapse">
    <target>
        <inSequence>
            <log level="full"/>
            <respond/>
        </inSequence>
    </target>
</proxy>
```

**Sample Data Service**

```xml
<data name="PaymentDS" serviceNamespace="http://ws.wso2.org/dataservice" xmlns="http://ws.wso2.org/ns/ns/data">
   <config id="default">
      <property name="org.wso2.ws.dataservice.driver">org.h2.Driver</property>
      <property name="org.wso2.ws.dataservice.protocol">jdbc:h2:mem:testDB</property>
      <property name="org.wso2.ws.dataservice.user">sa</property>
      <property name="org.wso2.ws.dataservice.password"/>
   </config>
   <query id="selectAll" useConfig="default">
      <sql>SELECT 1</sql>
   </query>
   <operation name="getAll">
      <call-query href="selectAll"/>
   </operation>
</data>
```

**Resulting Deployment Names**

When deployed with versioned artifact deployment enabled:

- PaymentAPI →
`com.microintegrator.project__payment__1.0.1__PaymentAPI`

- sequence_in_call →
`com.microintegrator.project__payment__1.0.1__sequence_in_call`

- PaymentProxy →
`com.microintegrator.project__payment__1.0.1__PaymentProxy`

- PaymentDS →
`com.microintegrator.project__payment__1.0.1__PaymentDS`

**Invocation URLs**

- API
```curl
http://localhost:8290/com.microintegrator.project/payment/1.0.1/paymentapi
```

- Proxy Service
```curl
http://localhost:8290/services/com.microintegrator.project__payment__1.0.1/PaymentProxy
```

- Data Service
```curl
http://localhost:8290/services/com.microintegrator.project__payment__1.0.1/PaymentDS
```

!!! Note
    - Versioning is **optional**. If the `-DenableVersionedCAppDeployment` flag is not set, or if project level configuration is disabled, artifacts will continue to be deployed with their simple names as before.  
    - References between artifacts (e.g., sequences, endpoints) are automatically updated to use fully qualified names—no manual changes are required within the project.  
    - When referencing an artifact from a **dependent project**, you should use the fully qualified name **without the version**. For example:  
      ```
      <sequence key="com.microintegrator.project__payment__sequence_in_call"/>
      ```
      If you use the [WSO2 Integrator: MI extension for VS Code]({{base_path}}/develop/mi-for-vscode/mi-for-vscode-overview/), the references will be automatically listed in this format, so no manual changes are necessary. The version of the referenced artifacts will be resolved from the dependent project details defined in the `pom.xml`.
