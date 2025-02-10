# Mediator Tryout Feature

The Mediator Tryout feature in the WSO2 Micro Integrator for VS Code extension (MI for VS Code) streamlines the process of testing and validating mediator behavior during the development phase. This feature enables developers to easily verify the correctness of their integration configurations without the need for extensive debugging.

The Tryout feature simplifies development workflows by allowing users to experiment with mediators in real-time, helping to ensure that mediators function as expected.

The tryout feature allows you to visualize the following mediation properties:

- Payload: The payload passed into and out of the mediator.
- Headers: The headers passed into and out of the mediator.
- Variables: The variables passed into and out of the mediator.
- Properties: The underlying message context properties, including:
    - Synapse Properties
    - Axis2 Properties
    - Axis2Client Properties
    - Axis2Transport Properties
    - Axis2Operation Properties
- Parameters: The parameters used in the mediation, such as:
    - Path Parameters: Parameters that are part of the URI path and are used to identify specific resources.
    - Query Parameters: Parameters that are appended to the URI after the question mark (?).
    - Function Parameters: Parameters that are defined in the sequence template.

## Use the Mediator Tryout feature

!!!Note
    This feature is supported only from MI 4.4.0 onwards.

!!!Warning
    The Mediator Tryout feature executes the entire mediation sequence, not just a specific mediator. Any external resources referenced in the mediation (for example, databases and message queues) will be executed as per the defined mediation logic. To prevent unintended interactions or modifications, please refrain from using any external resources that are in production.

{!includes/create-new-project.md!}

1. Navigate to the **Add Artifact** page and add a new API artifact to your project.

2. Access the **Design View** of the API resource.

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
