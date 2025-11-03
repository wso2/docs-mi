# How to Periodically Execute Integration Processes

## What you'll build

The sections below demonstrate an example of a scheduled trigger (task) that injects an XML message and prints it in the server logs.

### Concepts and artifacts used

- [Sequence]({{base_path}}/reference/mediation-sequences)
- [Log Mediator]({{base_path}}/reference/mediators/log-mediator)
- [Drop Mediator]({{base_path}}/reference/mediators/drop-mediator)
- [Scheduled trigger]({{base_path}}/reference/synapse-properties/scheduled-task-properties)

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

#### Create a Scheduled trigger (task)

1. In the **Add Artifact** interface, under **Create an Integration**, click on **Automation**. This opens the Automation Form.

    <a href="{{base_path}}/assets/img/learn/tutorials/using-scheduled-tasks/automation-artifact.png"><img src="{{base_path}}/assets/img/learn/tutorials/using-scheduled-tasks/automation-artifact.png" alt="create automation artifact" width="80%"></a>

    !!! Note
        WSO2 Integrator: MI supports automation flows that can be triggered either on a schedule or at server startup. It provides two types of automations:

        - **Scheduled Triggers (Task)** – Executes a task repeatedly based on a defined interval or cron expression. (You will explore this in this tutorial.)

        - **Startup Triggers** – Executes a task once when the WSO2 Integrator: MI starts, runs the integration, and then shuts down. To learn more, refer to [Running the WSO2 Integrator: MI in Automation Mode]({{base_path}}/install-and-setup/install/running-the-mi-in-automation-mode/).

2. Enter the details given below to create a new REST API.

    <table>
        <tr>
            <th style="width: 150px">Property</th>
            <th>Value</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>Automation Type</td>
            <td><code>Scheduled Trigger</code></td>
            <td>Specifies the type of automation to be created.</td>
        </tr>
        <tr>
            <td>Task Name</td>
            <td><code>InjectXMLTask</code></td>
            <td>The name assigned to the scheduled trigger (task).</td>
        </tr>
        <tr>
            <td>Trigger Mode</td>
            <td><code>Fixed Interval</code></td>
            <td>Defines how often the task executes. <b>Fixed Interval</b> triggers the task repeatedly after a set time, or you can choose <b>Cron</b> to configure a cron expression.</td>
        </tr>
        <tr>
            <td>Interval</td>
            <td><code>5</code></td>
            <td>The execution interval in seconds. Since <b>Trigger Indefinitely</b> is enabled, the task will continue running indefinitely at the given interval.</td>
        </tr>
        <tr>
            <td>Message</td>
            <td><pre><code>&lt;request xmlns=""&gt;&lt;location&gt;&lt;city&gt;London&lt;/city&gt;&lt;country&gt;UK&lt;/country&gt;&lt;/location&gt;&lt;/request&gt;</code></pre></td>
            <td>The XML payload that will be injected when the task is triggered.</td>
        </tr>
    </table>

    <a href="{{base_path}}/assets/img/learn/tutorials/using-scheduled-tasks/new-task.png"><img src="{{base_path}}/assets/img/learn/tutorials/using-scheduled-tasks/new-task.png" alt="create new task" width="80%"></a>

3. Click **Create**. This will open the integration flow (sequence) that will be executed by the configured Scheduled Trigger.

#### Update the mediation flow

You can now start designing the integration logic. We will add a [Log Mediator]({{base_path}}/reference/mediators/log-mediator) to log the message when the Scheduled Trigger executes the flow.

1. Click on the **+** icon on the canvas to open the **Mediator Palette**.

2. Under **Mediators**, select the **Log** mediator.

    <a href="{{base_path}}/assets/img/learn/tutorials/using-scheduled-tasks/select_log_mediator.png"><img src="{{base_path}}/assets/img/learn/tutorials/using-scheduled-tasks/select_log_mediator.png" alt="create new task" width="80%"></a>

3. Provide `City = ${xpath("//city")}` as the **Message**, and click **Add** to insert the **Log** mediator into the integration flow.

4. Click on the **+** icon after the **Log** mediator to open the **Mediator Palette**. We will add a [Drop Mediator]({{base_path}}/reference/mediators/drop-mediator) to stop processing the current message after it is logged.

5. Under **Mediators**, select the **Drop** mediator, and click **Add** to insert it into the integration flow.

    <a href="{{base_path}}/assets/img/learn/tutorials/using-scheduled-tasks/select_drop_mediator.png"><img src="{{base_path}}/assets/img/learn/tutorials/using-scheduled-tasks/select_drop_mediator.png" alt="create new task" width="80%"></a>

You have successfully completed the integration flow with the scheduled trigger and logged the message. For reference, you can review the configured scheduled trigger (task) and the sequence.

??? "InjectXMLTask"

    !!! info
        You can view the source view by clicking on the **Show Source** (`</>`) icon located in the top right corner of the VS Code.

    === "Design View"
        <a href="{{base_path}}/assets/img/learn/tutorials/using-scheduled-tasks/task_config.png"><img src="{{base_path}}/assets/img/learn/tutorials/using-scheduled-tasks/task_config.png" alt="InjectXMLTask" width="40%"></a>

    === "Source View"
        ```yaml
        <?xml version="1.0" encoding="UTF-8"?>
        <task class="org.apache.synapse.startup.tasks.MessageInjector" group="synapse.simple.quartz" name="InjectXMLTask" xmlns="http://ws.apache.org/ns/synapse">
            <trigger interval="5"/>
            <property xmlns:task="http://www.wso2.org/products/wso2commons/tasks" name="message"><request xmlns=""><location><city>London</city><country>UK</country></location></request></property>
            <property xmlns:task="http://www.wso2.org/products/wso2commons/tasks" name="injectTo" value="sequence"/>
            <property xmlns:task="http://www.wso2.org/products/wso2commons/tasks" name="sequenceName" value="InjectXMLTaskSequence"/>
        </task>
        ```

??? "InjectXMLTaskSequence"

    !!! info
        You can view the source view by clicking on the **Show Source** (`</>`) icon located in the top right corner of the VS Code.

    === "Design View"
        <a href="{{base_path}}/assets/img/learn/tutorials/using-scheduled-tasks/sequence_config.png"><img src="{{base_path}}/assets/img/learn/tutorials/using-scheduled-tasks/sequence_config.png" alt="InjectXMLTaskSequence" width="70%"></a>

    === "Source View"
        ```yaml
        <?xml version="1.0" encoding="UTF-8"?>
        <sequence name="InjectXMLTaskSequence" trace="disable" xmlns="http://ws.apache.org/ns/synapse">
            <log category="INFO" logMessageID="false" logFullPayload="false">
                <message>City = ${xpath(&quot;//city&quot;)}</message>
            </log>
            <drop/>
        </sequence>
        ```

### Step 3: Build and run the artifacts

Now that you have developed an integration using the WSO2 Integrator: MI for the Visual Studio Code plugin, it's time to deploy the integration to the WSO2 Integrator: MI server runtime.

Click the **Build and Run** icon located in the top right corner of VS Code.

<a href="{{base_path}}/assets/img/learn/tutorials/using-scheduled-tasks/build_and_run_btn.png"><img src="{{base_path}}/assets/img/learn/tutorials/using-scheduled-tasks/build_and_run_btn.png" alt="Build and Run" width="80%"></a>

### Step 4: Test the use case

When you run the integration artifact as described in [Step 3](#step-3-build-and-run-the-artifacts), you will see the injected XML message being printed in the WSO2 Integrator: MI logs every 5 seconds, in the **Output** tab of VS Code.

<a href="{{base_path}}/assets/img/learn/tutorials/using-scheduled-tasks/output_log.png"><img src="{{base_path}}/assets/img/learn/tutorials/using-scheduled-tasks/output_log.png" alt="MI output logs" width="80%"></a>
