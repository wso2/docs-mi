# How to Periodically Execute Integration Processes

## What you'll build

The sections below demonstrate an example of scheduling a task (using the default implementation) to inject an XML message and print it in the server logs.

### Concepts and artifacts used

- [Sequence]({{base_path}}/reference/mediation-sequences)
- [Log Mediator]({{base_path}}/reference/mediators/log-mediator)
- [Drop Mediator]({{base_path}}/reference/mediators/drop-mediator)
- [Scheduled Task]({{base_path}}/reference/synapse-properties/scheduled-task-properties)

## Let's get started!

### Step 1: Set up the workspace

{!includes/setting-up-workspace-for-mi-for-vscode.md!}

### Step 2: Develop the integration artifacts

Follow the instructions given in this section to create and configure the required artifacts.

#### Create an Integration Project

{!includes/create-new-project.md!}

4. In the **Project Creation Form**, enter `ScheduleTaskTutorial` as the **Project Name**.

5. Provide a location under **Select Project Directory**.

    <a href="{{base_path}}/assets/img/learn/tutorials/using-scheduled-tasks/create-new-project.png"><img src="{{base_path}}/assets/img/learn/tutorials/using-scheduled-tasks/create-new-project.png" alt="create new project" width="80%"></a>

6. Click **Create**.

Now let's start designing the integration by adding the necessary artifacts.

#### Create the Sequence

1. Go to **MI Project Overview** > **Add Artifact**.
2. Click **+ View More** under **Create an Integration**.
3. Select **Sequence** under **Other Artifacts** to open the **Create New Sequence** form.

   <a href="{{base_path}}/assets/img/develop/create-artifacts/create-reusable-sequence/sequence-artifact.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-reusable-sequence/sequence-artifact.png" alt="add sequence artifact" width="80%"></a>

4. In the Sequence Form that appears, provide `InjectXMLSequence` as the **Name**.

5. Click **Create**. Then you will be directed to the **MI Overview** page.

6. Click on `InjectXMLSequence` under **Other Artifacts** > **Sequences** in project explorer to open its diagram view.

7. Next, add a Log mediator to the sequence. Click the **+** icon and select **Log mediator** from the **Palette** under **Mediators** > **Generic**.

8. Enter the following details in the **Log** details pane.  
    - **Log Category**: `INFO`
    - **Message**: `City = ${xpath("//city")}`

9. Click **Submit** to save the Log details.

10. Next, add the Drop mediator. Click on the **+** icon and select **Drop** mediator from **Mediators** > **Generic**.

    <a href="{{base_path}}/assets/img/learn/tutorials/using-scheduled-tasks/add-drop-mediator.png"><img src="{{base_path}}/assets/img/learn/tutorials/using-scheduled-tasks/add-drop-mediator.png" alt="Add drop mediator" width="80%"></a>

11. Click **Add**.

Below is the complete source configuration of the Sequence (i.e., the `InjectXMLSequence.xml` file).

```xml
<?xml version="1.0" encoding="UTF-8"?>
<sequence name="InjectXMLSequence" trace="disable" xmlns="http://ws.apache.org/ns/synapse">
    <log category="INFO" level="custom">
        <property name="City" expression="//city"/>
    </log>
    <drop/>
</sequence>
```

#### Create the Scheduled Task

1. Navigate to the **Project Overview** > **Add Artifact**.
2. Click on **Automation**.

   <a href="{{base_path}}/assets/img/develop/create-artifacts/create-scheduled-tasks/automation-artifact.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-scheduled-tasks/automation-artifact.png" alt="create automation artifact" width="80%"></a>

3. In the Task Form that appears, enter the following details:

    - **Task Name:** `InjectXMLTask`
    - **Count:** `-1`
    - **Interval (in seconds):** `5`
    - **Message inject destination**: `sequence`
    - **Sequence name**: `InjectXMLSequence`
    - **Message** : Check **message format is XML** and enter the following as the message:

        ```xml
        <request xmlns="">   <location>   <city>London</city>    <country>UK</country>   </location>    </request>
        ```

4. Click **Create**.

Below is the complete source configuration of the scheduled task.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<task class="org.apache.synapse.startup.tasks.MessageInjector" group="synapse.simple.quartz" name="InjectXMLTask" xmlns="http://ws.apache.org/ns/synapse">
   <trigger count="-1" interval="5"/>
   <property xmlns:task="http://www.wso2.org/products/wso2commons/tasks" name="message"><request xmlns="">   <location>   <city>London</city>    <country>UK</country>   </location>    </request>
   </property>
   <property xmlns:task="http://www.wso2.org/products/wso2commons/tasks" name="injectTo" value="sequence"/>
   <property xmlns:task="http://www.wso2.org/products/wso2commons/tasks" name="sequenceName" value="InjectXMLSequence"/>
</task>
``` 

### Step 3: Build and run the artifacts

{!includes/build-and-run-artifacts.md!}

### Step 4: Test the use case

You will view the XML message you injected getting printed in the logs of the Micro Integrator every 5 seconds.

```xml
   2024-07-17 17:43:06,257]  INFO {AbstractQuartzTaskManager} - Task scheduled: [ESB_TASK][InjectXMLTask].
   [2024-07-17 17:43:06,285]  INFO {LogMediator} - City = London
   [2024-07-17 17:43:07,944]  INFO {AuthenticationHandlerAdapter} - User admin logged in successfully
   [2024-07-17 17:43:11,261]  INFO {LogMediator} - City = London
   [2024-07-17 17:43:16,262]  INFO {LogMediator} - City = London
   [2024-07-17 17:43:21,262]  INFO {LogMediator} - City = London
   [2024-07-17 17:43:26,262]  INFO {LogMediator} - City = London
   [2024-07-17 17:43:31,261]  INFO {LogMediator} - City = London
   [2024-07-17 17:43:36,262]  INFO {LogMediator} - City = London
   [2024-07-17 17:43:41,257]  INFO {LogMediator} - City = London
   [2024-07-17 17:43:46,262]  INFO {LogMediator} - City = London
   [2024-07-17 17:43:51,262]  INFO {LogMediator} - City = London
   [2024-07-17 17:43:56,260]  INFO {LogMediator} - City = London
   [2024-07-17 17:44:01,260]  INFO {LogMediator} - City = London
   [2024-07-17 17:44:06,262]  INFO {LogMediator} - City = London
   [2024-07-17 17:44:11,261]  INFO {LogMediator} - City = London
```
