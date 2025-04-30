# Setting up the Microsoft Azure Data Lake Storage Environment

To work with the Microsoft Azure Storage connector, you need to have a Microsoft Azure account. If you do not have a Microsoft Azure account, you are prompted to create one when you sign up.

## Signing Up for Microsoft Azure

To sign up for Microsoft Azure:

  1. Navigate to [Microsoft Azure](https://azure.microsoft.com/en-in/free/)  and create a **Microsoft Azure account** using **Try Azure for free** button.
    
  2. Follow the online instructions.
    
Part of the sign-up procedure involves receiving a phone call and entering a verification code using the phone keypad. Microsoft Azure will notify you by email when your account is active and available for you to use.
    
## Create Microsoft Azure Storage account

Follow the steps below to obtain the access credentials from Microsoft Azure Storage account.

   1. Go to [Microsoft Azure Portal](https://azure.microsoft.com/en-us/get-started/azure-portal), and sign in to the created Microsoft Azure account. On the Azure portal menu, Type **Storage Accounts**. As you begin typing, the list filters based on your input. Select **Storage Accounts**.                                                                                                                 
      <img src="{{base_path}}/assets/img/integrate/connectors/home-page.png" title="MS Azure Home Page" width="800" alt="MS Azure Home Page"/>

   2. Go to the dashboard and click **Storage accounts** then click **Create** and fill the required details to create a new storage account.
   
      <img src="{{base_path}}/assets/img/integrate/connectors/msazuredatalakestorage-connector/create-ms-azure-storage-account.png" title="Create MS Azure storage account" width="800" alt="Select MS Azure storage account"/>
   
   3. Select the subscription in which to create the storage account.   
      
      <img src="{{base_path}}/assets/img/integrate/connectors/msazuredatalakestorage-connector/add-subscription.png" title="MS azure storage basic configurations" width="800" alt="MS azure storage basic configurations"/>
   
   4. Under the **Resource group** field, select **Create new**. Enter a name for your new resource group.
   
      <img src="{{base_path}}/assets/img/integrate/connectors/msazuredatalakestorage-connector/create-new-resource-group.png" title="Create resource group" width="800" alt="Create resource group"/>
     
   5. Enter a name for your **storage account**.    
   
   6. Select a location for your storage account, or use the default location.

   7. Select **Azure Blobs Storage or Azure Data Lake Storage Gen2** as primary service.

    <img src="{{base_path}}/assets/img/integrate/connectors/msazuredatalakestorage-connector/set-primary-service.png" title="Add primary service" width="800" alt="Add primary service"/>
   
   8. Leave other fields set to their default values.
     
   9. Click the **Next** button to go the advanced options.
   
      <img src="{{base_path}}/assets/img/integrate/connectors/msazuredatalakestorage-connector/basic-to-advance-settings.png" title="Review and create" width="800" alt="Review and create"/>
      
   10. Enable **hierarchical namespace**.

      <img src="{{base_path}}/assets/img/integrate/connectors/msazuredatalakestorage-connector/enable-hierarchical-namespace.png" title="Enable hierarchical namespace" width="800" alt="Enable hierarchical namespace"/>

   11. Leave other fields set to their default values.

   12. Select **Review + Create** to review your storage account settings and create the account.

      <img src="{{base_path}}/assets/img/integrate/connectors/msazuredatalakestorage-connector/review-create.png" title="Review and create" width="800" alt="Review and create"/>

   13. Click **Create** button.

      <img src="{{base_path}}/assets/img/integrate/connectors/msazuredatalakestorage-connector/create.png" title="Review and create" width="800" alt="Review and create"/>

## Obtaining the Client credentials

!!! Note
    If you are planning to use Access key for authentication, skip this and check [Obtaining the access credentials]({{base_path}}/reference/connectors/msazuredatalakestorage-connector/microsoft-azure-data-lake-storage-connector-configuration/#obtaining-the-access-key)

!!! Note
    If you are planning to use Shared Access Signature(SAS) for authentication, skip this and check [Obtaining the Shared Access Signature (SAS) Token]({{base_path}}/reference/connectors/msazuredatalakestorage-connector/microsoft-azure-data-lake-storage-connector-configuration/#Obtaining-the-Shared-Access-Signature-(SAS)-Token)
   
   1. Create an Azure Active Directory application and service principal. For more information refer [Create an Azure Active Directory application](https://learn.microsoft.com/en-us/azure/active-directory/develop/howto-create-service-principal-portal).

      <img src="{{base_path}}/assets/img/integrate/connectors/msazuredatalakestorage-connector/azure-active-directory.png" title="Azure Active Directory" width="800" alt="Azure Active Directory"/>

   2. Go to **App Registrations**. Click on the created app registration. Obtain the **Client ID**, client and **Tenant ID**. Click on **Client Credentials** and obtain **Secret ID**. For more information refer [Create a new application secret](https://learn.microsoft.com/en-us/azure/active-directory/develop/howto-create-service-principal-portal#option-3-create-a-new-application-secret) and [Active Directory tenant ID](https://learn.microsoft.com/en-us/azure/active-directory/fundamentals/how-to-find-tenant).

   <img src="{{base_path}}/assets/img/integrate/connectors/msazuredatalakestorage-connector/app-registrations.png" title="App Registrations" width="800" alt="App Registrations"/>

   <img src="{{base_path}}/assets/img/integrate/connectors/msazuredatalakestorage-connector/get-client-details.png" title="App Registrations" width="800" alt="App Registrations"/>

   3. Assign an Azure role for access to blob data. For more information refer [Assign an Azure role](https://learn.microsoft.com/en-us/azure/role-based-access-control/role-assignments-portal) and [Assign an Azure role for access to blob data](https://learn.microsoft.com/en-us/azure/storage/blobs/assign-azure-role-data-access?tabs=portal).

## Obtaining the Access Key

!!! Note
    If you are planning to use Client credentials for authentication, skip this and check [Obtaining the Client credentials]({{base_path}}/reference/connectors/msazuredatalakestorage-connector/microsoft-azure-data-lake-storage-connector-configuration/#obtaining-the-client-credentials)
    
!!! Note
    If you are planning to use Shared Access Signature(SAS) for authentication, skip this and check [Obtaining the Shared Access Signature (SAS) Token]({{base_path}}/reference/connectors/msazuredatalakestorage-connector/microsoft-azure-data-lake-storage-connector-configuration/#Obtaining-the-Shared-Access-Signature-(SAS)-Token)

   
   1. Navigate to the created **storage account** and click it. 
      
      <img src="{{base_path}}/assets/img/integrate/connectors/msazuredatalakestorage-connector/created_storage.png" title="Select created storage account" width="800" alt="Select created storage account"/>
      
   2. Click **Access keys** under **Security + networking**.
      
   3. Obtain the access key.   
            
      <img src="{{base_path}}/assets/img/integrate/connectors/access_key.png" title="Copy access keys" width="800" alt="Copy access keys"/>  

## Obtaining the Shared Access Signature (SAS) Token

!!! Note
    If you are planning to use Client credentials for authentication, skip this and check [Obtaining the Client credentials]({{base_path}}/reference/connectors/msazuredatalakestorage-connector/microsoft-azure-data-lake-storage-connector-configuration/#obtaining-the-client-credentials)

!!! Note
   If you are planning to use Access key for authentication, skip this and check [Obtaining the Access Key]({{base_path}}/reference/connectors/msazuredatalakestorage-connector/microsoft-azure-data-lake-storage-connector-configuration/#obtaining-the-access-key)

   1. Navigate to the created storage account and click it.

   2. Click **Shared access signature** under **Security + networking**.

   3. Select the required permissions, services, and expiration time.

    <img src="{{base_path}}/assets/img/integrate/connectors/msazuredatalakestorage-connector/sas.png" title="Copy sas keys" width="800" alt="Copy access keys"/>

   4. Click Generate SAS and connection string.

    <img src="{{base_path}}/assets/img/integrate/connectors/msazuredatalakestorage-connector/generate_sas.png" title="Copy sas keys" width="800" alt="Copy sas keys"/>

   5. Copy the SAS token and use it for authentication.
           
> **Note**:  Azure Storage Account does not support HTTP requests. If you are using a storage key to access the storage account, please set **Secure transfer required** to **Disabled** in storage account configuration on Azure Portal. 
    <img src="{{base_path}}/assets/img/integrate/connectors/msazuredatalakestorage-connector/secure-transfer.png" title="Secure transfer" width="800" alt="Secure transfer"/> 
  
