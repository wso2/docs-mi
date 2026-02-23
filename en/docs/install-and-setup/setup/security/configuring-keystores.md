# Configuring Keystores for the WSO2 Integrator: MI

Follow the instructions given below to configure [keystores for the WSO2 Integrator: MI]({{base_path}}/reference/mi-security-reference/using-keystores).

## The default keystore configuration
WSO2 Integrator: MI is shipped with a default keystore (wso2carbon.jks) and default trust store client-truststore.jks, which are stored in the `MI_HOME/repository/resources/security/` directory.

The **default keystore** is used for the following requirements:

* **Encrypting/decrypting passwords** and other confidential information, which are maintained in various configuration files as well as internal data stores.

    !!! Note 
        It is recommended to separate the [keystore for encrypting information in internal data stores](#separating-the-internal-keystore).

* **Signing messages** when the WSO2 product communicates with external parties.

The **default trust store** contains the certificates of reputed CAs that can validate the identity of third party systems that communicate with the WSO2 Integrator: MI. This trust store also contains the self-signed certificate of the default `wso2carbon.jks` keystore.


## Changing the default primary keystore

If you want to change the [default primary keystore](#the-default-keystore-configuration) that is shipped with the product, follow the steps given below.

1. [Create a new keystore]({{base_path}}/install-and-setup/setup/security/creating-keystores). 

    !!! Note
        CA-signed certificates are recommended for this keystore because it is used for communicating with external parties.

2.  You can copy the new file to the `<MI_HOME>/repository/resources/security/` folder. You can use a custom location as well.

3. Open the `deployment.toml` file and add the relevant configurations as described below.

    === "JKS"

        ```toml
        [keystore.primary]
        file_name="repository/resources/security/wso2carbon.jks"
        type="JKS"
        password="wso2carbon"
        alias="wso2carbon"
        key_password="wso2carbon"
        ```

    === "PKCS12"

        ```toml
        [keystore.primary]
        file_name="repository/resources/security/wso2carbon.p12"
        type="PKCS12"
        password="wso2carbon"
        alias="wso2carbon"
        key_password="wso2carbon"
        ```

    Find more details about [keystore parameters]({{base_path}}/reference/config-catalog-mi/#primary-keystore).
    
3. [Import the required CA-signed certificates]({{base_path}}/install-and-setup/setup/security/importing-ssl-certificate) to the key store.

## Separating the internal keystore
By default, the [primary keystore](#the-default-keystore-configuration) is used for internal **data encryption** (encrypting data in internal data stores and configuration files) as well as for **signing messages** that are communicated with external parties.

!!! Info
    **Why separate the internal keystore?**
    
    It is sometimes a common requirement to have separate keystores for communicating messages with external parties (such as SAML, OIDC id_token signing) and for encrypting information in **internal data stores**. This is because, for the first scenario of signing messages, the keystore certificates need to be frequently renewed. However, for encrypting information in internal data stores, the keystore certificates should not be changed frequently because the data that is already encrypted will become unusable every time the certificate changes.

Follow the steps given below to separate the keystore that is used for encrypting data in internal data stores.

1. [Create a new keystore]({{base_path}}/install-and-setup/setup/security/creating-keystores). 

    !!! Note
        CA-signed certificates are recommended for this keystore because it is used for communicating with external parties.

2.  You can copy the new file to the `<MI_HOME>/repository/resources/security/` folder. You can use a custom location as well.

3.  Open the `deployment.toml` file and add the relevant configurations as described below.

    === "JKS"

        ```toml
        [keystore.internal]
        file_name="repository/resources/security/wso2carbon.jks"
        type="JKS"
        password="wso2carbon"
        alias="wso2carbon"
        key_password="wso2carbon"
        ```

    === "PKCS12"

        ```toml
        [keystore.internal]
        file_name="repository/resources/security/wso2carbon.p12"
        type="PKCS12"
        password="wso2carbon"
        alias="wso2carbon"
        key_password="wso2carbon"
        ```

    Find more details about [internal keystore parameters]({{base_path}}/reference/config-catalog-mi/#internal-keystore).
            
## Optional: Changing the default truststore
If you want to change the [default truststore](#the-default-keystore-configuration) that is shipped with the product, follow the steps given below.

1. [Create a new keystore]({{base_path}}/install-and-setup/setup/security/creating-keystores). 

    !!! Note
        CA-signed certificates are recommended for this keystore because it is used for communicating with external parties.

2.  You can copy the new file to the `<MI_HOME>/repository/resources/security/` folder. You can use a custom location as well.

3.  Open the `deployment.toml` file and add the relevant configurations as described below.

    ```toml
    [truststore]
    file_name="repository/resources/security/client-truststore.jks"
    type="JKS"
    password="wso2carbon"
    alias="symmetric.key.value"
    algorithm="AES"
    ```

3. [Import the required certificates]({{base_path}}/install-and-setup/setup/security/importing-ssl-certificate#importing-ssl-certificates-to-a-truststore) to the truststore.

## Add new keys to an existing keystore

The following guides explain how you can add new keys to existing keystores.

### Add an asymmetric key pair to an existing keystore

To add a key,

1. Navigate to the [default keystore](#the-default-keystore-configuration) or other existing keystore on a terminal.

2. Execute the following command.

    === "Format"

        ```bash
        keytool -genkey -alias <public_certificate_alias> -keyalg RSA -keysize 2048 -keystore <keystore_name> -storetype <keystore_type> -dname "CN=<<Common Name>>,OU=<<Organization Unit>>,O=<<Organization>>,L=<<Locality>>,S=<<StateofProvice Name>>,C=<<Country Name>>" -storepass <keystore_password> -keypass <private_key_password>
        ```

    === "Sample command (JKS)"

        ``` bash
        keytool -genkey -alias newkey -keyalg RSA -keysize 2048 -keystore wso2carbon.jks -dname "CN=localhost, OU=IT,O={{base_path}},L=SL,S=WS,C=LK" -storepass wso2carbon -keypass wso2carbon
        ```

    === "Sample command (PKCS12)"

        ``` bash
        keytool -genkey -alias newkey -keyalg RSA -keysize 2048 -keystore wso2carbon.p12 -storetype PKCS12 -dname "CN=localhost, OU=IT,O={{base_path}},L=SL,S=WS,C=LK" -storepass wso2carbon -keypass wso2carbon
        ```

    !!! tip  
        If you are planning to delete the newly added keys in the future, it is recommended to maintain separate keystores for internal and external encryption purposes.

This newly added key can be used for different purposes.

### Add a symmetric secret to a PKCS12 keystore

To create a PKCS12 keystore with an AES key or add an existing key to the keystore, use the following command. If the keystore is not available, new PKCS12 keystore will be created.

=== "Format"

    ``` bash

    keytool -genseckey -alias <SECRET_ALIAS> -keyalg AES -keysize 256 -keystore <KEYSTORE_NAME> -storetype PKCS12 -storepass <KEYSTORE_PASSWORD> -keypass <KEYSTORE_PASSWORD>

    ```


=== "Sample keytool command"

    ``` bash

    keytool -genseckey -alias secretkey -keyalg AES -keysize 256 -keystore keystore.p12 -storetype PKCS12 -storepass password -keypass password

    ```

!!! abstract ""

    **Example**

    Follow the instructions given below to set the newly added key for symmetric encryption using cipher tool:

    1. Open the `deployment.toml` file in the `<MI_HOME>/conf` directory.

    2. Update the `alias` parameter under the `[keystore.internal]` element with the new keystore `alias`.       

        ```toml
        [keystore.internal]
        file_name = "keystore.p12"
        password = "password"
        key_password = "password"
        type = "PKCS12"
        alias= "secretkey"
        ```

