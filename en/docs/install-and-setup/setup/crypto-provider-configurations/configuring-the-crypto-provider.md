# Configure the Crypto Provider

## Crypto Provider

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
- **Hardware Integration**: To leverage hardware security modules (HSMs) or other secure hardware, you may need to use a provider that supports PKCS#11 or similar standards.
- **Additional Features**: Third-party providers may offer additional features or algorithms not available in the default providers.
- **Flexibility**: Configuring a custom provider allows you to tailor the cryptographic capabilities of your application to meet specific needs.

## Providers supported in Micro Integrator

MI uses the **SUN provider** as the default crypto provider. It also supports the **Bouncy Castle (BC)** and **Bouncy Castle FIPS (BCFIPS)** providers.

You can configure a custom crypto provider by passing JVM arguments when starting the server.

### Enable Bouncy Castle (BC)

To Enable Bouncy Castle (BC) as the crypto provider, use the following command when starting the server:

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

### Enable Bouncy Castle FIPS (BCFIPS)

The Bouncy Castle FIPS (BCFIPS) provider enforces FIPS 140-2/140-3 approved algorithms and modes only.
Use this provider if your environment requires FIPS compliance or operates under strict security regulations.

#### Step 1: Set up prerequisites

Before enabling BCFIPS, you must add the required FIPS-compliant JARs to the MI runtime.
Use the provided script in the MI_HOME/bin directory:

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

#### Step 2: Verify installation

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

#### Step 3: Enable BCFIPS provider

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

### Disable the Bouncy Castle FIPS provider

If you want to revert from BCFIPS back to the default (SUN) or BC provider:

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

This will remove the FIPS jars and restore the environment to its non-FIPS state.
