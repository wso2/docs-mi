# Using AWS Secrets Manager Secrets

!!! Info
    This feature is available from the **wso2mi-4.5.0.18** update level onwards. If you don't already have this update, you can [get the latest updates](https://updates.docs.wso2.com/en/latest/updates/overview/) now.

By default, the WSO2 Integrator: MI is configured to use [WSO2 secure vault for encrypting secrets]({{base_path}}/install-and-setup/setup/security/encrypting-plain-text), which stores the encrypted secrets inside the MI distribution. If your secrets are already managed centrally in [AWS Secrets Manager](https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html), you can plug AWS Secrets Manager into the WSO2 Integrator: MI as a secret repository instead, using the [carbon-securevault-aws](https://github.com/wso2-extensions/carbon-securevault-aws) extension.

AWS Secrets Manager secrets can be used in **both** server configurations (the `deployment.toml` file) and synapse configurations.

The extension can be configured in two ways:

<table>
    <tr>
        <th>Mode</th>
        <th>Description</th>
    </tr>
    <tr>
        <td><b>Novel</b> (multiple repositories)</td>
        <td>
            AWS Secrets Manager is registered alongside the built-in WSO2 secure vault. Each secret reference names the repository it comes from (for example, <code>vault:aws:my-secret</code>), so you can use both vaults in the same server.<br/><br/>
            Recommended for most deployments.
        </td>
    </tr>
    <tr>
        <td><b>Legacy</b> (single repository)</td>
        <td>
            AWS Secrets Manager completely replaces the built-in WSO2 secure vault implementation. Secret references stay as plain aliases (for example, <code>my-secret</code>), but every secret must then come from AWS Secrets Manager.<br/><br/>
            Use this if you are migrating existing configurations and do not want to change every secret reference.
        </td>
    </tr>
</table>

## Before you begin

-   Create the required secrets in AWS Secrets Manager. The **secret name** you use in AWS is the alias you will refer to from the WSO2 Integrator: MI.

    !!! Note
        The extension retrieves the secret string as it is stored. Store the value as a **plaintext** secret (not a key/value JSON secret) so that the retrieved value is the secret itself.

-   Make sure the identity that the WSO2 Integrator: MI authenticates with has permission to call `secretsmanager:GetSecretValue` on those secrets.
-   Decide which [AWS credential provider](#step-3-set-up-aws-credentials) the WSO2 Integrator: MI should use to authenticate into AWS.

## Step 1: Install the extension

Download the [org.wso2.carbon.securevault.aws-1.1.1.jar](https://maven.wso2.org/nexus/content/groups/wso2-public/org/wso2/carbon/org.wso2.carbon.securevault.aws/1.1.1/org.wso2.carbon.securevault.aws-1.1.1.jar) file and copy it to the `dropins` folder of your WSO2 Integrator: MI distribution (`<MI_HOME>/dropins`).

!!! Note
    Use version **1.1.1** or later with the WSO2 Integrator: MI. Earlier versions depend on Carbon Kernel classes that are not shipped with the MI runtime.

    The AWS SDK classes required by the extension are bundled inside this JAR, so no additional libraries are needed.

## Step 2: Configure the secret repository

Open the `secret-conf.properties` file (stored in the `<MI_HOME>/conf/security` folder) and add the configurations given below for the mode you selected.

!!! Note
    All the properties in this file are commented out by default. Add the following configurations as new (uncommented) lines.

=== "Novel (multiple repositories)"
    ```properties
    keystore.identity.location=repository/resources/security/wso2carbon.jks
    keystore.identity.type=JKS
    keystore.identity.alias=wso2carbon
    keystore.identity.store.password=identity.store.password
    keystore.identity.store.secretProvider=org.wso2.carbon.securevault.DefaultSecretCallbackHandler
    keystore.identity.key.password=identity.key.password
    keystore.identity.key.secretProvider=org.wso2.carbon.securevault.DefaultSecretCallbackHandler
    carbon.secretProvider=org.wso2.securevault.secret.handler.SecretManagerSecretCallbackHandler

    secVault.enabled=true
    secretProviders=vault
    secretProviders.vault.provider=org.wso2.securevault.secret.repository.VaultSecretRepositoryProvider
    secretProviders.vault.repositories=aws,<OTHER_REPOSITORIES_IF_ANY>
    secretProviders.vault.repositories.aws=org.wso2.carbon.securevault.aws.secret.repository.AWSSecretRepository
    secretProviders.vault.repositories.aws.properties.awsregion=<AWS_REGION>
    secretProviders.vault.repositories.aws.properties.credentialProviders=<CREDENTIAL_PROVIDER_TYPE>
    secretProviders.vault.repositories.aws.properties.encryptionEnabled=false
    ```

    !!! Note
        `encryptionEnabled` must be set to **false** in the novel mode. Encryption of stored secrets is only supported in the legacy mode.

    !!! Tip
        List any other secret repositories you use alongside `aws` in the `secretProviders.vault.repositories` property, or remove the placeholder if AWS Secrets Manager is the only one.

=== "Legacy (single repository)"
    ```properties
    keystore.identity.location=repository/resources/security/wso2carbon.jks
    keystore.identity.type=JKS
    keystore.identity.alias=wso2carbon
    keystore.identity.store.password=identity.store.password
    keystore.identity.store.secretProvider=org.wso2.carbon.securevault.DefaultSecretCallbackHandler
    keystore.identity.key.password=identity.key.password
    keystore.identity.key.secretProvider=org.wso2.carbon.securevault.DefaultSecretCallbackHandler
    carbon.secretProvider=org.wso2.securevault.secret.handler.SecretManagerSecretCallbackHandler

    secVault.enabled=true
    secretRepositories=vault
    secretRepositories.vault.provider=org.wso2.carbon.securevault.aws.secret.repository.AWSSecretRepositoryProvider
    secretRepositories.vault.properties.awsregion=<AWS_REGION>
    secretRepositories.vault.properties.credentialProviders=<CREDENTIAL_PROVIDER_TYPE>
    secretRepositories.vault.properties.encryptionEnabled=<ENCRYPTION_ENABLED>
    ```

<table>
    <tr>
        <th>Parameter</th>
        <th>Description</th>
    </tr>
    <tr>
        <td>
            awsregion
        </td>
        <td>
            The AWS region in which the AWS Secrets Manager holding your secrets is deployed.</br></br>
            For example, <code>us-east-2</code>.
        </td>
    </tr>
    <tr>
        <td>
            credentialProviders
        </td>
        <td>
            The credential provider type used to authenticate the WSO2 Integrator: MI into AWS. Possible values are <code>env</code>, <code>ecs</code>, <code>ec2</code>, <code>cli</code>, and <code>k8sServiceAccount</code>.</br></br>
            You can specify multiple values as a comma-separated list to build an authentication chain that is evaluated in the given order. If the value is left empty or is invalid, the AWS default credential provider chain is used.</br></br>
            See <a href="#step-3-set-up-aws-credentials">Step 3</a> for details.
        </td>
    </tr>
    <tr>
        <td>
            encryptionEnabled
        </td>
        <td>
            Specify <code>true</code> or <code>false</code>.</br></br>
            If set to <code>true</code>, the secrets stored in AWS Secrets Manager (except the root passwords) must be encrypted beforehand using the <a href="{{base_path}}/install-and-setup/setup/security/encrypting-plain-text">Cipher Tool</a>, and the encrypted value is what you store in AWS.</br></br>
            This must be <code>false</code> when the novel mode is used.
        </td>
    </tr>
</table>

## Step 3: Set up AWS credentials

The `credentialProviders` property selects how the WSO2 Integrator: MI authenticates into AWS.

<table>
    <tr>
        <th>Value</th>
        <th>Description</th>
    </tr>
    <tr>
        <td>
            env
        </td>
        <td>
            Uses the <a href="https://sdk.amazonaws.com/java/api/latest/software/amazon/awssdk/auth/credentials/EnvironmentVariableCredentialsProvider.html">EnvironmentVariableCredentialsProvider</a> to load credentials from the <code>AWS_ACCESS_KEY_ID</code> and <code>AWS_SECRET_ACCESS_KEY</code> environment variables.
        </td>
    </tr>
    <tr>
        <td>
            ecs
        </td>
        <td>
            Uses the <a href="https://sdk.amazonaws.com/java/api/latest/software/amazon/awssdk/auth/credentials/ContainerCredentialsProvider.html">ContainerCredentialsProvider</a> to load credentials from a local metadata service using the <code>AWS_CONTAINER_CREDENTIALS_RELATIVE_URI</code> environment variable.
        </td>
    </tr>
    <tr>
        <td>
            ec2
        </td>
        <td>
            Uses the <a href="https://sdk.amazonaws.com/java/api/latest/software/amazon/awssdk/auth/credentials/InstanceProfileCredentialsProvider.html">InstanceProfileCredentialsProvider</a> to load credentials from the Amazon EC2 metadata service.
        </td>
    </tr>
    <tr>
        <td>
            cli
        </td>
        <td>
            Uses the <a href="https://sdk.amazonaws.com/java/api/latest/software/amazon/awssdk/auth/credentials/ProfileCredentialsProvider.html">ProfileCredentialsProvider</a> to load credentials from the credential profile file in the default location (<code>~/.aws/credentials</code>) with the default profile name. Use this if you are logged in to AWS using the AWS CLI.
        </td>
    </tr>
    <tr>
        <td>
            k8sServiceAccount
        </td>
        <td>
            Uses the <a href="https://sdk.amazonaws.com/java/api/latest/software/amazon/awssdk/auth/credentials/WebIdentityTokenFileCredentialsProvider.html">WebIdentityTokenFileCredentialsProvider</a> to load credentials from a web identity token file. Use this when the WSO2 Integrator: MI is deployed on an AWS EKS cluster and authenticates using a Kubernetes service account. For more information, see <a href="https://docs.aws.amazon.com/eks/latest/userguide/iam-roles-for-service-accounts.html">IAM roles for service accounts on EKS</a>.
        </td>
    </tr>
    <tr>
        <td>
            (empty)
        </td>
        <td>
            Uses the <a href="https://sdk.amazonaws.com/java/api/latest/software/amazon/awssdk/auth/credentials/DefaultCredentialsProvider.html">DefaultCredentialsProvider</a> chain.
        </td>
    </tr>
</table>

Examples:

```properties
# Single credential provider type
secretProviders.vault.repositories.aws.properties.credentialProviders=env

# Multiple credential provider types, evaluated in order
secretProviders.vault.repositories.aws.properties.credentialProviders=env,ecs,ec2
```

Be sure to set the environment variables required by the credential provider you selected. For example, if you select `env`, the `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` environment variables must be set before starting the server.

## Accessing AWS secrets in server configurations

Once the WSO2 Integrator: MI is connected to AWS Secrets Manager, you can refer to the secrets from the `deployment.toml` file (stored in the `<MI_HOME>/conf` folder) using the `$secret{alias}` placeholder.

1.  Enable runtime secrets by adding the following section to the `deployment.toml` file. This tells the configuration parser to leave the `$secret{...}` placeholders unresolved at startup so that they are resolved from the vault at runtime.

    ```toml
    [runtime_secrets]
    enable = "true"
    ```

2.  Replace the plain-text values with secret references.

    === "Novel (multiple repositories)"
        ```toml
        [super_admin]
        username = "admin"
        password = "$secret{vault:aws:admin-password}"

        [keystore.primary]
        file_name = "wso2carbon.jks"
        password = "$secret{vault:aws:keystore-password}"

        [truststore]
        file_name = "client-truststore.jks"
        password = "$secret{vault:aws:truststore-password}"
        type = "JKS"
        ```

        The reference takes the form `$secret{<provider>:<repository>:<secret-name>}`, where `vault` is the provider name and `aws` is the repository name configured in the `secret-conf.properties` file.

    === "Legacy (single repository)"
        ```toml
        [super_admin]
        username = "admin"
        password = "$secret{admin-password}"

        [keystore.primary]
        file_name = "wso2carbon.jks"
        password = "$secret{keystore-password}"

        [truststore]
        file_name = "client-truststore.jks"
        password = "$secret{truststore-password}"
        type = "JKS"
        ```

The alias (for example, `admin-password`) is the name of the secret stored in AWS Secrets Manager.

## Accessing AWS secrets in synapse configurations

You can refer to AWS secrets from your integration artifacts using the **vault lookup** function, in the same way you would refer to a WSO2 secure vault secret.

=== "Novel (multiple repositories)"
    ```xml
    <variable name="password" expression="${wso2-vault('vault:aws:mysql-password')}"/>
    ```
=== "Legacy (single repository)"
    ```xml
    <variable name="password" expression="${wso2-vault('mysql-password')}"/>
    ```

If you are using the older XPath-based expression syntax, the alias is the same as above for the mode you configured:

=== "Novel (multiple repositories)"
    ```xml
    <property name="password" expression="wso2:vault-lookup('vault:aws:mysql-password')"/>
    ```
=== "Legacy (single repository)"
    ```xml
    <property name="password" expression="wso2:vault-lookup('mysql-password')"/>
    ```

In a **data service**, the datasource password uses the vault lookup function enclosed in curly braces:

=== "Novel (multiple repositories)"
    ```xml
    <password>{wso2:vault-lookup('vault:aws:dbpassword')}</password>
    ```
=== "Legacy (single repository)"
    ```xml
    <password>{wso2:vault-lookup('dbpassword')}</password>
    ```

!!! Note
    The whole element value must be the lookup expression. The password is resolved when the data service is deployed, not per request. See [Limitations](#limitations).

## Retrieving a specific version of a secret

Referring to a secret by its name alone retrieves the **latest** version of the secret. To retrieve a specific version, append the version ID to the alias using a `#` delimiter.

```toml
[keystore.primary]
file_name = "wso2carbon.jks"
password = "$secret{vault:aws:keystore-password#9d21179b-cd37-4174-a65a-7d1cea075dcd}"
```

The same delimiter applies in synapse configurations:

```xml
<variable name="password" expression="${wso2-vault('vault:aws:mysql-password#9d21179b-cd37-4174-a65a-7d1cea075dcd')}"/>
```

!!! Note
    Only a version **ID** can be used after the `#` delimiter. Staging labels such as `AWSPREVIOUS` are not supported.

## Retrieving the keystore passwords from AWS Secrets Manager

By default, the keystore and private key passwords (the secure vault root passwords) are read from the `password-tmp`/`password-persist` file in the `<MI_HOME>` directory, or prompted for on the command line. You can configure the WSO2 Integrator: MI to retrieve these passwords from AWS Secrets Manager instead.

1.  In the `secret-conf.properties` file, change the secret provider of the keystore passwords to the AWS callback handler and add the aliases of the secrets that hold them.

    ```properties
    keystore.identity.store.secretProvider=org.wso2.carbon.securevault.aws.secret.handler.AWSSecretCallbackHandler
    keystore.identity.key.secretProvider=org.wso2.carbon.securevault.aws.secret.handler.AWSSecretCallbackHandler
    keystore.identity.store.alias=<IDENTITY_KEYSTORE_PASSWORD_ALIAS>
    keystore.identity.key.alias=<PRIVATE_KEY_ALIAS>
    ```

    Keep the rest of the configuration from [Step 2](#step-2-configure-the-secret-repository) unchanged.

2.  Create the secrets in AWS Secrets Manager with the names used for `<IDENTITY_KEYSTORE_PASSWORD_ALIAS>` and `<PRIVATE_KEY_ALIAS>`.

!!! Note
    Root passwords are never encrypted with the Cipher Tool, even when `encryptionEnabled` is set to `true`. Store them in AWS Secrets Manager as plain values.

## Enabling debug logs

To troubleshoot the connection between the WSO2 Integrator: MI and AWS Secrets Manager, enable debug logs for the extension.

1.  Add the following lines to the `log4j2.properties` file (stored in the `<MI_HOME>/conf` folder).

    ```properties
    logger.org-wso2-carbon-securevault-aws.name=org.wso2.carbon.securevault.aws
    logger.org-wso2-carbon-securevault-aws.level=DEBUG
    logger.org-wso2-carbon-securevault-aws.additivity=false
    logger.org-wso2-carbon-securevault-aws.appenderRef.CARBON_CONSOLE.ref=CARBON_CONSOLE
    ```

2.  Append `org-wso2-carbon-securevault-aws` to the `loggers` list in the same file.

    ```properties
    loggers = AUDIT_LOG, SERVICE_LOGGER, API_LOGGER, ... , org-wso2-carbon-securevault-aws
    ```

## Limitations

-   AWS Secrets Manager does not provide a caching mechanism, and secrets are fetched on demand when they are requested. Secrets referenced from mediation logic (such as the vault lookup function) therefore pick up updated values at runtime, subject to the mediation-level cache duration.
-   Secrets referenced from artifacts that are resolved at deployment time — such as data sources, message stores, message processors, and inbound endpoints — are resolved once when the artifact is deployed. Updating the secret in AWS Secrets Manager is not reflected until the artifact is redeployed or the server is restarted. This is the same behaviour as with the built-in WSO2 secure vault.
-   Encryption of stored secrets (`encryptionEnabled=true`) is supported only in the legacy mode.
