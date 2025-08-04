# Manage Dependent Integration Projects

## Overview 

When building integration solutions, you may need to reuse common artifacts or share functionality across multiple projects. Managing **integration project dependencies** allows you to reference one project inside another, ensuring better reusability, modularity, and maintainability.

This guide explains how to configure and use integration project dependencies in WSO2 Integrator: MI for Visual Studio Code (VS Code).

## Create a Utility Project

First, create a utility project that contains reusable artifacts.

1. Follow the [Create a Project](https://mi.docs.wso2.com/en/latest/develop/create-integration-project/) guide to create a new integration project named **`integration-utils`**.
2. Then, create two reusable sequences by following the [Create a Reusable Sequence](https://mi.docs.wso2.com/en/latest/develop/creating-artifacts/creating-reusable-sequences/) guide:

    - **`requestLoggerSeq`**
    - **`authValidatorSeq`**

For simplicity, both sequences use log mediators:

**requestLoggerSeq**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<sequence name="requestLoggerSeq" trace="disable" xmlns="http://ws.apache.org/ns/synapse">
    <log category="INFO" logMessageID="false" logFullPayload="false">
        <message>request payload = ${payload}</message>
    </log>
</sequence>
``` 

**authValidatorSeq**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<sequence name="authValidatorSeq" trace="disable" xmlns="http://ws.apache.org/ns/synapse">
    <log category="INFO" logMessageID="false" logFullPayload="false">
        <message>validating...</message>
    </log>
</sequence>
```

Before using this project as a dependency, it needs to be **built by creating a CApp**. Make sure to note the **groupId**, **artifactId**, and **version**, as these values are required when referencing it in another project.

   <img src="{{base_path}}/assets/img/develop/integration-project-dependencies/build-capp-deployment-option.png" alt="Build CAPP Deployment Option" width="1000"/>

## Add Utility Project as Integration Project Dependency

Next, create a new project that depends on the utility project.

1. Create a new project named `order-service`.
2. Go to the **Overview** page in VS Code.
3. In the **Project Summary** section, locate **Integration Project Dependencies**.

     <img src="{{base_path}}/assets/img/develop/integration-project-dependencies/integration-project-dependencies-overview-section.png" alt="Integration Project Dependencies Overview Section" width="1000"/>

4. Click **Manage Dependencies**.
5. In the dependency list, click **Add Dependency**.
6. Enter the **groupId**, **artifactId**, and **version** of the `integration-utils` project.  

    <img src="{{base_path}}/assets/img/develop/integration-project-dependencies/add-dependency.png" alt="Add Dependency" width="1000"/>

7. Click **Update Dependencies** to save changes and load artifacts from the dependency.

Now, create an API in the order-service project:

1. Follow the [Create an API](https://mi.docs.wso2.com/en/latest/develop/creating-artifacts/creating-an-api/) guide to create an API named `test`. 
2. Add a **Call Sequence** mediator to its resource. 
3. From the available options, you will see the sequences from the `integration-utils` project (e.g., `requestLoggerSeq`, `authValidatorSeq`).

    <img src="{{base_path}}/assets/img/develop/integration-project-dependencies/select-dependent-artifacts.png" alt="Select Dependent Artifacts" width="1000"/>

## Enable the FAT CAR option

When building a project with dependencies, you can choose whether to bundle all artifacts including artifacts in dependent projects into a single CApp file or not.

1. Open the **Project Overview** and go to **Build Details**.

    <img src="{{base_path}}/assets/img/develop/integration-project-dependencies/build-details-overview-section.png" alt="Build Details Section in Overview" width="1000"/>

2. Locate the **Enable FAT CAR** option. By default, this is set to **false**.

    <img src="{{base_path}}/assets/img/develop/integration-project-dependencies/enable-fat-car-setting.png" alt="Enable Fat CAR Setting" width="1000"/>

## Build and Run the Project

### FAT CAR Enabled 

* All dependent projects’ artifacts are packaged into a single CApp file.
* You only need to deploy this single CApp file to the MI server.

### FAT CAR Disabled (Recommended)

* Only the current project’s CApp file is built.
* All dependent CApp files must also be present in the `MI_HOME/deployment/server/carbonapps` directory.
* Use the **Export** option on the **Overview** page to export the necessary dependencies.
* When starting the MI server, the server generates a dependency graph from the available CApp files and deploys them in the correct order. This eliminates the need to rename CApp files manually.

