# Set up Apache Pulsar

In this section, we’ll walk through how to set up an Apache Pulsar standalone server for local testing and development. This setup will also demonstrate how to enable **TLS encryption** and **JWT-based authentication**, which are essential for establishing secure and authenticated communication with the Pulsar broker.

### Download and Extract Pulsar

- Download the Apache Pulsar v4.0.4 release from the [official website](https://pulsar.apache.org/download/). (This example was tested with Apache Pulsar version 4.0.4.)
- Extract the archive to a preferred location on your machine.

---

### Configure TLS Encryption

For this example, **TLS encryption using PEM certificates** is used to ensure secure communication with the Pulsar broker. To configure TLS with PEM, refer to the official [Apache Pulsar documentation](https://pulsar.apache.org/docs/next/security-tls-transport/#configure-mtls-encryption-with-pem) for a step-by-step guide and ensure that you have the following components prepared:

- A **Certificate Authority (CA)** certificate (`ca.cert.pem`) - `tlsTrustCertsFilePath`
- A **server certificate** (`server.cert.pem`) - `tlsCertificateFilePath`
- The **server's private key** (`server.key-pk8.pem`) - `tlsKeyFilePath`

---

### Configure Authentication using tokens based on JSON Web Tokens (JWT)

For this example, **JWT-based authentication** is used to restrict access to authorized clients only. To configure JWT authentication, refer to the official [Apache Pulsar documentation](https://pulsar.apache.org/docs/next/security-jwt/) for a step-by-step guide. Ensure that you have the following components prepared:

- A **JWT token** that includes the necessary claims for authentication. The compact representation of a signed JWT is a string that looks like:
    ```bash
    eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJKb2UifQ.ipevRNuRP6HflG8cFKnmUPtypruRC4fb1DWtoLL62SY
    ```

  Once the JWT token is generated, configure the Pulsar broker to enable JWT-based authentication.

### Start the Pulsar Standalone Server

- Navigate to the extracted Pulsar directory.
- Start the standalone server using the following command:

      ```bash
      bin/pulsar standalone
      ```

!!!Note
    - For setting up Pulsar in other environments such as Docker or Kubernetes, please refer to the [official Apache Pulsar documentation](https://pulsar.apache.org/docs/next/getting-started-home/).
    - The recommended version of Java for Apache Pulsar is 21 or above.
