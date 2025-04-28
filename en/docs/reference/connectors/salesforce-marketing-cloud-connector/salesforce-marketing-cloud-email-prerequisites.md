# Prerequisites for Sending an Email

!!!Note
    Make sure authentication is set up before sending emails to prevent them from being bounced. Specifically, if the sending domain fails any of the SPF, DKIM, or DMARC checks, the email will be rejected.

To ensure reliable email delivery and avoid bounces, it's important to properly configure the following authentication mechanisms:

1. Sender Policy Framework (SPF): SPF validates that Salesforce is authorized to send emails on your domain’s behalf. [Learn more about SPF](https://help.salesforce.com/s/articleView?id=emailadmin_spf_overview.htm&type=5).
2. DomainKeys Identified Mail (DKIM): DKIM adds a cryptographic signature to outgoing emails, verifying they weren't altered in transit. Generate and activate DKIM keys in Salesforce and add the provided CNAME records to your DNS. [Learn more about DKIM setup](https://help.salesforce.com/s/articleView?id=sf.emailadmin_setup_dkim_key.htm&type=5).
3. Domain-based Message Authentication, Reporting, and Conformance (DMARC): DMARC builds on SPF and DKIM to define how email receivers should handle authentication failures and provides reporting. [Learn more about DMARC](https://help.salesforce.com/s/articleView?id=sf.emailadmin_dmarc.htm&type=5).

## Create and send emails in Salesforce Marketing Cloud

### Step 1: Log in and access Email Studio

1. Navigate to your [Salesforce Marketing Cloud login page](https://mc.exacttarget.com/cloud/login.html) and log in with your credentials.

   <img src="{{base_path}}/assets/img/integrate/connectors/sfmc/sfmc-login.png" title="SFMC login" width="50%" alt="SFMC login"/>

2. Navigate to Email Studio from the main dashboard.

### Step 2: Develop Your Email Template

1. Access the Email Templates Home. Within Email Studio, locate the Content section or Email Templates.

   <img src="{{base_path}}/assets/img/integrate/connectors/sfmc/email-template-home.png" title="Email Template Home" width="50%" alt="Email Template Home"/>

2. Click **New Email Template**, fill in the required details, and save.

   <img src="{{base_path}}/assets/img/integrate/connectors/sfmc/email-template-new.png" title="New Email Template" width="100%" alt="New Email Template"/>

3. Open the template details page and click **Edit in Builder** From there, you can modify the HTML, paste an existing template, or choose from their available templates. I have also added a custom HTML template, which you can find [here](https://github.com/wso2-extensions/mi-connector-salesforcemarketingcloud/blob/main/docs/email_template.html).

   <img src="{{base_path}}/assets/img/integrate/connectors/sfmc/email-template-edit.png" title="Edit Email Template" width="100%" alt="Edit Email Template"/>

5. Save your changes and return to the Email Templates home. This template can now be used in subsequent email sends.

### Step 3: Create the Email Message in Content Builder

1. From Email Studio, click on **Content**.
2. Choose **Create** and select your preferred email type (Template Based, HTML Paste, or Text Only).

   <img src="{{base_path}}/assets/img/integrate/connectors/sfmc/create-email.png" title="Create Email" width="100%" alt="Create Email"/>

3. Enter the necessary details such as the email subject, preheader, and other required fields.
4. Construct the email content according to the chosen format.

    <img src="{{base_path}}/assets/img/integrate/connectors/sfmc/email-content.png" title="Email Content" width="100%" alt="Email Content"/>

5. Use the preview features (desktop, mobile, HTML, and plain text) to verify the email’s appearance.
6. Save your email draft when satisfied.

### Step 4 Configure a Sender Profile

1. In Email Studio, click the **Admin** tab (or use the Email drop-down to find **Admin**).
2. Find the **Sender Profiles** option in the left-hand menu.

    <img src="{{base_path}}/assets/img/integrate/connectors/sfmc/sender-profiles.png" title="Sender Profiles" width="30%" alt="Sender Profiles"/>

3. Click **Create** to make a new profile or select an existing profile to update.

    <img src="{{base_path}}/assets/img/integrate/connectors/sfmc/new-profile.png" title="New Profile" width="100%" alt="New Profile"/>

4. Provide a **From Name** and a verified **From Email Address** that is authorized in your Salesforce Marketing Cloud account.
5. Confirm and save your sender profile.

### Step 5: Set Up a Delivery Profile

1. Provide a reply-to email address.
2. Configure additional settings such as headers, footers, and tracking options as needed.

<img src="{{base_path}}/assets/img/integrate/connectors/sfmc/delivery-profile.png" title="Delivery Profile" width="100%" alt="Delivery Profile"/>

### Step 6: Create a Send-Classification

1. Combine your sender profile and delivery profile in a send-classification.
2. Choose whether your send is Commercial or Transactional.

<img src="{{base_path}}/assets/img/integrate/connectors/sfmc/send-classification.png" title="Send Classification" width="100%" alt="Send Classification"/>

### Step 7: Build the Email Send Definition

1. Attach your email template/message, send classification, and target audience.
2. Define scheduling options or decide on an immediate send.

> Note: You can use the WSO2 Micro Integrator (MI) "Create Email Send Definition" operation to programmatically create the send-definition.

### Step 8: Test Your Email

1. Use Email Studio’s preview features to ensure the email renders correctly across different devices and email clients.

<img src="{{base_path}}/assets/img/integrate/connectors/sfmc/send-test-email.png" title="Send Test Email" width="100%" alt="Send Test Email"/>

2. Send a test email to a small group to validate the sender profile, delivery profile, send classification, and overall email formatting.

### Step 9: Execute the Full Send

After a successful test send and verification of all settings, proceed with the full email send to your entire target audience.

> Note: You can use the WSO2 Micro Integrator (MI) "Send Email Message" operation to programmatically trigger the full email send.
