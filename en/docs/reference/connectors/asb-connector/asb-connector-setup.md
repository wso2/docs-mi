# Setting Up Azure Service Bus

Before using the Azure Service Bus connector, you need to create an Azure Service Bus namespace and obtain the connection string. Follow the steps below to set up your environment.

## Prerequisites

- An active [Azure subscription](https://azure.microsoft.com/free/). If you don't have one, sign up for a free Azure account.

## Step 1: Create a Service Bus Namespace

A namespace provides a scoping container for Service Bus resources within your application.

1. Sign in to the [Azure portal](https://portal.azure.com/).

2. In the left navigation pane, select **All services**, select **Integration** from the list of categories, hover over **Service Bus**, and then select **Create** on the Service Bus tile.

3. In the **Basics** tab of the **Create namespace** page, follow these steps:

    - **Subscription**: Choose an Azure subscription in which to create the namespace.
    - **Resource group**: Choose an existing resource group or create a new one.
    - **Namespace name**: Enter a unique name for the namespace. The name must be unique across Azure, between 6 and 50 characters, and can contain only letters, numbers, and hyphens.
    - **Location**: Choose the region in which your namespace should be hosted.
    - **Pricing tier**: Select the pricing tier (Basic, Standard, or Premium) for the namespace.

    !!! note
        If you want to use topics and subscriptions, choose either **Standard** or **Premium**. Topics and subscriptions are not supported in the Basic pricing tier.

4. Select **Review + create** at the bottom of the page, review your settings, and select **Create**.

## Step 2: Create a Queue

1. In the Azure portal, navigate to your Service Bus namespace.

2. In the left navigation pane of the namespace page, select **Queues**.

3. On the **Queues** page, select **+ Queue** on the toolbar.

4. Enter a **name** for the queue and leave the other settings with their default values.

5. Select **Create**.

## Step 3: Create a Topic and Subscription

1. In the Azure portal, navigate to your Service Bus namespace.

2. In the left navigation pane, select **Topics**.

3. On the **Topics** page, select **+ Topic** on the toolbar.

4. Enter a **name** for the topic and select **Create**.

5. Select the newly created topic, and then select **+ Subscription** on the toolbar.

6. Enter a **name** for the subscription and select **Create**.

## Step 4: Get the Connection String

1. In the Azure portal, navigate to your Service Bus namespace.

2. In the left navigation pane of the namespace page, select **Shared access policies**.

3. Select the **RootManageSharedAccessKey** policy from the list.

4. Copy the **Primary Connection String** value and save it in a secure location. This is the connection string that you will use to configure the Azure Service Bus connector.

    The connection string has the following format:

    ```
    Endpoint=sb://<namespace-name>.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=<key-value>
    ```

!!! tip
    Store the connection string securely. Avoid hardcoding it in your integration configurations. Use WSO2 MI's [secure vault]({{base_path}}/install-and-setup/setup/security/encrypting-plain-text/) to encrypt sensitive credentials.
