# Create a Scheduled trigger (Task)

Follow the instructions below to create a Scheduled trigger in the WSO2 Integrator: MI for Visual Studio Code (MI for VS Code) extension.

## Create a Scheduled trigger artifact

{!includes/creating-project.md!}

    Hereafter, this project will be referred to as `<PROJECT_NAME>`.

3. To add a new Scheduled trigger, navigate to **WSO2 Integrator: MI Project Explorer**.

4. Click on the **+** icon to open the **Add Artifact** pane.

    <a href="{{base_path}}/assets/img/develop/create-artifacts/add-artifact-icon.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/add-artifact-icon.png" alt="add artifact" width="40%"></a>

5. On the **Add artifact** pane, click **Automation** under **Create an Integration** to open the **Task Form**.

6. Specify values for the [required parameters]({{base_path}}/reference/synapse-properties/scheduled-task-properties) for the Scheduled trigger.

    <a href="{{base_path}}/assets/img/develop/create-artifacts/create-scheduled-tasks/create-new-scheduled-task.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-scheduled-tasks/create-new-scheduled-task.png" alt="create new Scheduled trigger" width="80%"></a>

The created Scheduled trigger will be available in **Project Overview** under **Automation**.

!!! info
    You can switch to the default Visual Studio Code Explorer to view the folder structure.

    The newly-created task will be stored in the `<PROJECT_NAME>/src/main/wso2mi/artifacts/tasks` folder of your integration project.

## Update configurations

You can later update the task configurations to specify the incoming message that should trigger the task and the destination where the message should be injected.

1. Go to **MI Project Explorer**.

2. Under **Automation**, select the task you want to edit.

3. This will open the **Task View**.

4. Click the pen icon next to the task name.

    <a href="{{base_path}}/assets/img/develop/create-artifacts/create-scheduled-tasks/edit-scheduled-task.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-scheduled-tasks/edit-scheduled-task.png" alt="create new Scheduled trigger" width="80%"></a>

5. Update task configurations.

6. Click **Update**.

!!! info
    See the [Scheduled triggers Property Catalog]({{base_path}}/reference/synapse-properties/scheduled-task-properties/) documentation for a list of all available configurations for tasks.

## Tutorials

Follow our tutorial on Scheduled triggers:

- [Periodically execute an integration process]({{base_path}}/learn/integration-tutorials/using-scheduled-tasks) using a Scheduled trigger

## Examples

Follow our examples on Scheduled triggers:     

- [Task Scheduling using a Simple Trigger]({{base_path}}/learn/examples/scheduled-tasks/task-scheduling-simple-trigger)
- [Inject Messages to a RESTful Endpoint]({{base_path}}/learn/examples/scheduled-tasks/injecting-messages-to-rest-endpoint)
