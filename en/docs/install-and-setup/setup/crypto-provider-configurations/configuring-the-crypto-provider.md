# Configure the Crypto Provider

## Crypto provider

A **Crypto Provider** (short for *cryptographic provider*) is a software module or library that implements cryptographic algorithms and makes them available to applications through a standard API.

In Java, this concept comes from the **Java Cryptography Architecture (JCA)** and **Java Cryptography Extension (JCE)**. A provider **plugs in** and supplies implementations of cryptographic primitives, such as:

- Message digests (e.g., SHA-256, SHA-512)
- Encryption/decryption algorithms (e.g., AES, RSA, ChaCha20)
- Digital signatures (e.g., SHA256withRSA, ECDSA)
- Key generation (e.g., RSA keypairs, AES keys)
- Secure random number generation (e.g., DRBG, SHA1PRNG, NativePRNG)

#### Examples of crypto providers

- **SUN** – built-in JDK provider with common algorithms
- **SunJCE** – JCE provider for symmetric crypto, padding, etc.
- **SunEC** – Elliptic curve cryptography
- **BC** – Bouncy Castle standard provider
- **BCFIPS** – Bouncy Castle FIPS-compliant provider (for FIPS 140-2/140-3 use)
- **PKCS11 providers** – hardware-backed crypto via HSMs, smartcards

## Why configure a custom crypto provider?

By default, Java applications use the built-in providers that come with the JDK. However, there are several reasons why you might want to configure a custom crypto provider:

- **Enhanced Security**: Some third-party providers offer stronger or more modern algorithms and implementations that may be more secure than the default ones.
- **Compliance Requirements**: Certain industries or regulations may require the use of specific cryptographic standards or FIPS-compliant providers.
- **Performance**: Some providers are optimized for performance and can offer faster cryptographic operations.
- **Additional Features**: Third-party providers may offer additional features or algorithms not available in the default providers.
- **Flexibility**: Configuring a custom provider allows you to tailor the cryptographic capabilities of your application to meet specific needs.

## Guidelines for using BC and BCFIPS providers

When using **BC** or **BCFIPS** provider, ensure that you do not use any algorithms or modes that are not supported by the selected provider. Otherwise, the operation may fall back to the default provider (SUN).

Additionally, the JKS format uses weaker algorithms and is not a supported keystore type for **BC** or **BCFIPS**. You must use a supported keystore and truststore type (such as BCFKS or PKCS12), or convert your existing JKS keystore and truststore to one of these supported formats. After conversion, update the corresponding paths in the `<MI_HOME>/conf/deployment.toml` file.

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

- Update the Deployment Configuration.

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

MI uses the **SUN provider** as the default crypto provider. It also supports the **Bouncy Castle (BC)** and **Bouncy Castle FIPS (BCFIPS)** providers.

You can configure a custom crypto provider by passing JVM arguments when starting the server.

### Enable BC

MI includes the JAR files required for BC. By default, the **BC** environment is disabled. To enable **BC** as the cryptographic provider, start the server using the following command:

=== "Linux/Mac OS"
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

#### Step 1: Set up

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

#### Step 3: Enable the BCFIPS provider

Once the prerequisites are in place, start the server with:

=== "Linux/Mac OS"
    ```
    cd <MI_HOME>/bin/
    sh micro-integrator.sh -Dsecurity.jce.provider=BCFIPS
    ```
=== "Windows"
    ```
    cd <MI_HOME>\bin\
    micro-integrator.bat -Dsecurity.jce.provider=BCFIPSE
    ```

### Disable BCFIPS

If you want to revert from BCFIPS back to the default or BC provider:

- Stop the server if it is running.

- Run the fips script:

=== "Linux/Mac OS"
    ```
    cd <MI_HOME>/bin/
    sh fips.sh DISABLE
    ```
=== "Windows"
    ```
    cd <MI_HOME>\bin\
    fips.bat DISABLE
    ```

## Encrypting data Using custom providers

To encrypt data using the **BC**/**BCFIPS** provider, run the following command based on your operating system:

=== "Linux/Mac OS"
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