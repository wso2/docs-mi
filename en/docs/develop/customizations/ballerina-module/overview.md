The WSO2 Micro Integrator module for Ballerina enables integration developers to leverage Ballerina's powerful transformation capabilities within WSO2 MI. Ballerina, being a cloud-native programming language with built-in support for JSON and XML, simplifies data transformations compared to traditional Class Mediators. The module also provides access to Ballerina's extensive ecosystem of language modules and connectors, enhancing connectivity with external systems.

## Prerequisites

- WSO2 Micro Integrator 4.2.0 or later
- Ballerina 2201.12.0 or later
- Java Development Kit (Version 17 for MI 4.2.0/4.3.0, Version 21 for MI 4.4.0)
- VS Code with WSO2 Micro Integrator extension installed
- Ballerina VS Code extension installed

## Get Started with Ballerina Module for MI

There are two ways to use the Ballerina module in your WSO2 MI projects:

1. Using the WSO2 MI VS Code Extension
2. Using the Command Line Interface (CLI)

### Method 1: Use WSO2 MI VS Code Extension

1. Install the [WSO2 Micro Integrator VSCode Extension](https://mi.docs.wso2.com/en/latest/develop/mi-for-vscode/install-wso2-mi-for-vscode/).
2. [Create](https://mi.docs.wso2.com/en/latest/develop/create-integration-project/) a new integration project or open an existing project.
3. Expand the artifact types in the **Add artifact** view and select **Ballerina Module**.
<img src="{{base_path}}/assets/img/develop/ballerina-module/addModule.png" title="Select Ballerina Module" width="800" alt="Select Ballerina Module"/>

4. In the `Create Ballerina Module` form, enter a **name** and a **version** for the module and click **Create**.
<img src="{{base_path}}/assets/img/develop/ballerina-module/addModuleName.png" title="Create Ballerina Module Form" width="800" alt="Create Ballerina Module Form"/>

5. Update the generated sample Ballerina code with your transformation logic and save the file.

6. Click the **Build Ballerina Module** icon.
<img src="{{base_path}}/assets/img/develop/ballerina-module/build.png" title="Build Ballerina Module" width="800" alt="Build Ballerina Module"/>
<br/>Then, there will be a notification in the bottom right corner of the VS Code window indicating that the module is being built.</br>
<img src="{{base_path}}/assets/img/develop/ballerina-module/build-success.png" title="Build Notification" width="400" alt="Build Notification"/>

7. Once the Ballerina module is successfully built, it will appear in the `Mediator palette`, allowing it to be added when constructing integration flows.<br/>
<img src="{{base_path}}/assets/img/develop/ballerina-module/built-module.png" title="Mediator Palette View" width="800" alt="Mediator Palette View"/><br/>
If any changes are made to the transformation logic, the module can be rebuilt by clicking the **Build Ballerina Module** icon or by clicking the **Refresh** icon next to the relevant module in the Mediator Palette.<br/><img src="{{base_path}}/assets/img/develop/ballerina-module/refresh.png" title="Refresh Module" width="400" alt="Refresh Module"/>

### Method 2: Use Command Line Interface (CLI)

#### Pull `mi-module-gen` tool

First, you need to pull the `mi-module-gen` tool which is used to create the WSO2 MI module.

```bash
bal tool pull mi-module-gen
```

<img src="{{base_path}}/assets/img/develop/ballerina-module/cmd.png" title="Pull mi-module-gen" width="800" alt="Pull mi-module-gen"/>

> **Note**: To list-down all the available tools with versions, you can use the command `bal tool list` and to use the specific version of the tool, you can use the command `bal tool use mi-module-gen:<version>`. To remove the tool, you can use the command `bal tool remove mi-module-gen`.

#### Write Ballerina transformation

Create a new Ballerina project using `bal new projectName` or use an existing one and write your transformation logic.
Import the module `wso2/mi` in your Ballerina program.

```ballerina
import wso2/mi;
```

Next, you need to write the Ballerina transformation in a Ballerina project.
For example,

```ballerina
@mi:Operation {}
public function gpa(xml rawMarks, xml credits) returns xml {
   // Your logic to calculate the GPA
}
```

Ballerina function that contains `@mi:Operation` annotation maps with an operation in the Ballerina module.

#### Generate the module

1. Use the `bal mi-module-gen` command to generate the WSO2 Micro Integrator module from Ballerina project.
```bash
bal mi-module-gen -i <path_to_ballerina_project>
```
<br/><img src="{{base_path}}/assets/img/develop/ballerina-module/code-gen.png" title="Generate Module" width="800" alt="Generate Module"/><br/>

2. Above command generates the module zip in the same location. Now, goto the mediator palette and go to the **Connection** section. Then click on **Add connection** .
<br/><img src="{{base_path}}/assets/img/develop/ballerina-module/addNewCon.png" title="Add Connection" width="400" alt="Add Connection"/><br/>

3. Then select the **Import Connector** option.
<br/><img src="{{base_path}}/assets/img/develop/ballerina-module/importCon.png "title="Import Connector" width="500" alt="Import Connector"/><br/>

4. Select the **Upload connector zip file** option and select the generated zip file.
<br/><img src="{{base_path}}/assets/img/develop/ballerina-module/importzip.png" title="Upload Connector Zip File" width="500" alt="Upload Connector Zip File"/><br/>
<br/>
That's it! Now you can use the Ballerina module in your WSO2 Micro Integrator project.
<br/><img src="{{base_path}}/assets/img/develop/ballerina-module/addedCon.png" title="Added Connector" width="800" alt="Added Connector"/>
<br/>

