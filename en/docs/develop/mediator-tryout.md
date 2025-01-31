# Utilizing the Mediator Tryout Feature

The Mediator Tryout feature in the WSO2 Micro Integrator VS Code extension streamlines the process of testing and validating mediator behavior during the development phase. This feature enables developers to easily verify the correctness of their integration configurations without the need for extensive debugging.

The Tryout feature simplifies development workflows by allowing users to experiment with mediators in real-time, helping to ensure that mediators function as expected.

The tryout feature allows you to visualize the following mediation properties:

1. Payload: The payload passed into and out of the mediator.
2. Headers: The headers passed into and out of the mediator.
3. Variables: The variables passed into and out of the mediator.
4. Properties: The underlying message context properties, including:
    1. Synapse Properties
    2. Axis2 Properties
    3. Axis2Client Properties
    4. Axis2Transport Properties
    5. Axis2Operation Properties
5. Parameters: The parameters used in the mediation, such as:
    1. Path Parameters: Parameters that are part of the URI path and are used to identify specific resources.
    2. Query Parameters: Parameters that are appended to the URI after the question mark (?).
    3. Function Parameters: Parameters that are defined in the sequence template.

## Using the Mediator Tryout

!!!Note
    This feature is supported only from MI 4.4.0 onwards.

!!!Warning
    The Mediator Tryout feature executes the entire mediation sequence, not just a specific mediator. Any external resources referenced in the mediation (e.g., databases, message queues) will be executed as per the defined mediation logic. To prevent unintended interactions or modifications, please refrain from using any external resources that are in production.

{!includes/create-new-project.md!}

1. Navigate to the **Add Artifact** page and add a new API artifact to your project.

2. Access the design view of the API resource.

3. Click on the **Start** node in the diagram. Here, you can add a new request to utilize the tryout feature. The payload specified on this page will be used to tryout the mediator.
<img src="{{base_path}}/assets/img/develop/tryout/tryout_start_node.png" alt="Set Payload" width="700"/>

4. Add a mediator to the sequence and save your changes. For demonstration purposes, we will add a variable mediator in this example.
<img src="{{base_path}}/assets/img/develop/tryout/tryout_add_a_mediator.png" alt="Add the mediator" width="700"/>

5. Open the mediator and click on the **Tryout** tab. This action will load the input data for the mediator by executing the mediation flow.
<img src="{{base_path}}/assets/img/develop/tryout/tryout_mediator.png" alt="Get the input for tryout" width="700"/>

6. You can modify the input data if needed, and then press the **Run** button to view the mediator's output.
<img src="{{base_path}}/assets/img/develop/tryout/tryout_input.png" alt="Run the mediator" width="700"/>

7. After clicking **Run**, the output of the mediator will be displayed as follows.
<img src="{{base_path}}/assets/img/develop/tryout/tryout_input_output.png" alt="Input/Output of the mediator" width="700"/>
