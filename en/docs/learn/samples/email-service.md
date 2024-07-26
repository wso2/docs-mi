# Email Service Sample

This sample contains a REST API which exposes email send and retrieve capabilities using the WSO2 email connector.

Here, the send operation uses the SMTP protocol whereas the retrieve operation uses the IMAP protocol to connect with the mailbox.

This sample contains a REST API called `EmailService` along with `smtpsconnection` and `imapsconnection` local entries. You can invoke the respective resource of this API to perform send and retrieve operations with the email connector.

## Deploying the sample

1. Open the sample by clicking on the **Email Service** card.
2. Give a folder location to save the sample.
3. Open `imapsconnection` and `smtpsconnection` local entry artifacts and replace the `EMAIL_ADDRESS` and `PASSWORD` values with your email credentials.
4. [Build and run]({{base_path}}/develop/deploy-artifacts#build-and-run) the sample in your Micro Integrator.

## Running the sample

1. Once the sample is running you will get a runtime services view with the API swagger definition. You can test the API using the swagger editor or follow step 2 for manual invocation.

2. Open a terminal and run the following commands to invoke the APIs.

    - curl for send operation

    ```bash
    curl --location --request POST 'http://localhost:8290/email/send' --header 'Content-Type: application/json' \
    --data-raw '{
        "from": "your@gmail.com",
        "to": "your@gmail.com",
        "subject": "Sample email",
        "content": "This is the body of the sample email",
        "contentType":"text/plain"
    }' 
    ```

    - curl for retrieve operation

    ```bash
    curl --location --request POST 'http://localhost:8290/email/retrieve' --header 'Content-Type: application/json' \
    --data-raw '{
        "subjectRegex":"Sample email"
    }'
    ```
