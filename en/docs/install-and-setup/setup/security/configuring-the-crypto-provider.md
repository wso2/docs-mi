# Configure the Crypto Provider

## Crypto provider

Java Cryptographic Service Providers (Crypto Providers) are software modules that implement cryptographic algorithms and security services for Java applications.

They provide implementations for operations such as encryption, decryption, digital signatures, hashing, key generation, key management, and secure random number generation. These providers integrate with the Java Cryptography Architecture (JCA), enabling applications to access cryptographic functionality through a consistent and standardized API.

## Guidelines for using BC and BCFIPS providers

When using the **Bouncy Castle (BC)** or **Bouncy Castle FIPS (BCFIPS)** provider, ensure that only algorithms and modes supported by the selected provider are used. If an unsupported algorithm is requested, the operation may fall back to the default SUN provider, which can lead to unexpected behavior or non-compliant execution.

Additionally, the **JKS** keystore format uses legacy algorithms and is not supported when operating in BCFIPS mode. Therefore, you must use a supported keystore and truststore type such as:

- BCFKS (recommended for BCFIPS)
- PKCS12

If you currently use JKS, convert the keystore and truststore to a supported format and update the keystore and truststore configurations in `<MI_HOME>/conf/deployment.toml`.

- Convert **JKS** to **BCFKS**

    Use the following command to convert a JKS keystore or truststore to the **BCFKS** format using the **BCFIPS** provider:

    ```sh
    "$JAVA_HOME/bin/keytool" -importkeystore \
      -srckeystore "/path/to/<SOURCE_FILE>.jks" \
      -srcstoretype JKS \
      -srcstorepass "<source_password>" \
      -destkeystore "/path/to/<TARGET_FILE>.bcfks" \
      -deststoretype BCFKS \
      -deststorepass "<target_password>" \
      -providerclass org.bouncycastle.jcajce.provider.BouncyCastleFipsProvider \
      -providername BCFIPS \
      -providerpath "/path/to/<BC_FIPS>.jar" \
      -noprompt
    ```

- Update the deployment configuration.

    After creating the `.bcfks` keystore and truststore files, copy them to the `<MI_HOME>/repository/resources/security` directory and update the `<MI_HOME>/conf/deployment.toml` file as shown below:
    ```toml
    [keystore.primary]
    file_name = "repository/resources/security/wso2carbon.bcfks"
    password = "wso2carbon"
    alias = "wso2carbon"
    key_password = "wso2carbon"
    type = "BCFKS"

    [truststore]
    file_name = "repository/resources/security/client-truststore.bcfks"
    password = "wso2carbon"
    alias = "symmetric.key.value"
    algorithm = "AES"
    type = "BCFKS"
    ```

## Providers supported in MI

MI uses the SUN provider as the default crypto provider. It also supports other crypto providers such as Bouncy Castle (BC) and Bouncy Castle FIPS (BCFIPS).

If you need to use a crypto provider other than the default one, you can configure it by passing the required JVM arguments when starting the server.

### Enable BC

MI includes the JAR files required for BC. By default, the **BC** environment is disabled. To enable **BC** as the cryptographic provider, start the server using the following command:

=== "Linux/macOS"
    ```
    cd <MI_HOME>/bin/
    sh micro-integrator.sh -Dsecurity.jce.provider=BC
    ```
=== "Windows"
    ```
    cd <MI_HOME>\bin\
    micro-integrator.bat -Dsecurity.jce.provider=BC
    ```

### Enable BCFIPS

The **BCFIPS** provider enforces FIPS 140-2/140-3 approved algorithms and modes only.
Use this provider if your environment requires FIPS compliance or operates under strict security regulations.

#### Step 1: Set up FIPS dependencies

Before enabling **BCFIPS**, you must add the required FIPS-compliant JARs to the MI runtime.
Use the provided script in the `<MI_HOME>/bin` directory:

=== "Linux / macOS"
    ```
    cd <MI_HOME>/bin/
    sh fips.sh
    ```

=== "Windows"
    ```
    cd <MI_HOME>\bin\
    fips.bat
    ```

This downloads and installs the required **bc-fips**, **bcpkix-fips**, **bctls-fips**, and **bcutil-fips** JARs into the correct directories.

#### Step 2: Verify the setup

To verify that the required changes were applied successfully:

=== "Linux / macOS"
    ```
    cd <MI_HOME>/bin/
    sh fips.sh VERIFY
    ```

=== "Windows"
    ```bash
    cd <MI_HOME>\bin\
    fips.bat VERIFY
    ```

The script will check for the presence of required JARs and confirm whether the product is FIPS dependency-complete.

#### Step 3: Enable BCFIPS 

Once the prerequisites are in place, start the server with:

=== "Linux/macOS"
    ```
    cd <MI_HOME>/bin/
    sh micro-integrator.sh -Dsecurity.jce.provider=BCFIPS
    ```
=== "Windows"
    ```
    cd <MI_HOME>\bin\
    micro-integrator.bat -Dsecurity.jce.provider=BCFIPS
    ```

### Disable BCFIPS

If you want to revert from BCFIPS back to the default or BC provider:

- Stop the server if it is running.

- Run the fips script:

=== "Linux/macOS"
    ```
    cd <MI_HOME>/bin/
    sh fips.sh DISABLE
    ```
=== "Windows"
    ```
    cd <MI_HOME>\bin\
    fips.bat DISABLE
    ```

## Encrypting data using custom providers

To encrypt data using the **BC**/**BCFIPS** provider, run the following command based on your operating system:

=== "Linux/macOS"
    ```
    cd <MI_HOME>/bin/
    sh ciphertool.sh -Dsecurity.jce.provider=<PROVIDER>
    ```
=== "Windows"
    ```
    cd <MI_HOME>\bin\
    ciphertool.bat -Dsecurity.jce.provider=<PROVIDER>
    ```

For more information on using the ciphertool, see [Encrypting and Decrypting Sensitive Data Using the Ciphertool]({{base_path}}/install-and-setup/setup/security/encrypting-plain-text/).