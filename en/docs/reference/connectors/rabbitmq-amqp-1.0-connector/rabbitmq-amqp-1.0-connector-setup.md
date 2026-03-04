# Set up RabbitMQ Broker

This guide demonstrates how to deploy a standalone RabbitMQ server for local testing and development purposes, with support for **TLS encryption** and **OAuth2 authentication** to enable secure communication with the RabbitMQ broker.

## Deploy a single-node RabbitMQ instance

Follow the steps below to set up a single-node RabbitMQ deployment for testing purposes.

!!! note "Prerequisites"
    This guide has been tested with the following environment:
    
    - RabbitMQ version: 4.2.3
    - Operating Systems: Unix-based systems and macOS

### Step 1: Download RabbitMQ

Download the RabbitMQ distribution to your preferred location using the following URL:

```bash
https://github.com/rabbitmq/rabbitmq-server/releases/download/v4.2.3/rabbitmq-server-generic-unix-4.2.3.tar.xz
```

### Step 2: Extract the distribution

Open a terminal, navigate to the download location, and execute the following command:

```bash
tar -xf rabbitmq-server-generic-unix-4.2.3.tar.xz
```

### Step 3: Install Erlang

Install the Erlang distribution as required by RabbitMQ. For detailed installation instructions, refer to the [RabbitMQ Erlang documentation](https://www.rabbitmq.com/docs/install-debian#erlang-repositories).

!!! tip "macOS users"
    On macOS, you can install RabbitMQ directly using Homebrew, then proceed with the remaining steps to start the broker.

### Step 4: Start the RabbitMQ server

Navigate to the `<RABBITMQ_HOME>/sbin` directory, where `<RABBITMQ_HOME>` is the extracted RabbitMQ distribution (for example, `/opt/homebrew/opt/rabbitmq` on macOS), and execute the following command:

```bash
sudo ./rabbitmq-server -detached
```

### Step 5: Enable the management plugin

Execute the following command to enable the RabbitMQ management console:

```bash
sudo ./rabbitmq-plugins enable rabbitmq_management
```

### Step 6: Access the management console

Navigate to the following URL in your web browser to access the RabbitMQ management UI:

```bash
http://localhost:15672/#/
```

### Configure SSL/TLS for RabbitMQ

To enable TLS encryption for secure communication, refer to the official [RabbitMQ TLS documentation](https://www.rabbitmq.com/docs/ssl#enabling-tls). Ensure you have the following components prepared:

- **Certificate Authority (CA) certificate** (`ca.cert.pem`) - Used to verify client certificates
- **Server certificate** (`server.cert.pem`) - Identifies the RabbitMQ server
- **Server private key** (`server.key.pem`) - Associated with the server certificate

### Configure OAuth 2.0 authentication

RabbitMQ supports OAuth 2.0 authentication to provide secure access control. To configure OAuth 2.0 with OpenID Connect, refer to the official [RabbitMQ OAuth 2.0 documentation](https://www.rabbitmq.com/docs/oauth2). Ensure you have the following components:

- **OpenID Connect provider** - Identity provider such as Keycloak, Auth0, or Okta
- **Client ID and Client Secret** - Credentials for your RabbitMQ application
- **Issuer URL** - The OpenID Connect provider's issuer endpoint
- **JWKS URI** - The JSON Web Key Set endpoint for token verification
- **Resource server ID** - The identifier for RabbitMQ as a resource server

!!! note
    When configuring the OAuth2 Token Endpoint with the RabbitMQ Connector and Inbound Endpoint, ensure that the HTTPS URL of the token endpoint is provided. Additionally, the public certificate of the Identity Provider must be imported into the WSO2 Micro Integrator `client-truststore.jks` file to establish a secure connection over HTTPS. You may refer to the [import the CA-signed public key certificate to the trust store]({{base_path}}/install-and-setup/setup/security/importing-ssl-certificate/#importing-ssl-certificates-to-a-truststore) section for instructions on how to import the certificate.


## Using RabbitMQ in production

When you move your RabbitMQ deployment to production, be sure to follow the instructions and guidelines specified in the official [RabbitMQ Documentation](https://www.rabbitmq.com/docs/download.html).

!!! note
    For **high availability** in your RabbitMQ deployment, note the following:
    RabbitMQ servers need to be clustered. Refer to the [RabbitMQ Clustering Guide](https://www.rabbitmq.com/clustering.html).
    A minimum of three nodes is recommended for a RabbitMQ cluster. This is because RabbitMQ uses [Quorum-based distributed consensus](https://www.rabbitmq.com/clustering.html#node-count).