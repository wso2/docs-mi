# Cryptography (PGP) Module Overview

The Cryptography Module adds **OpenPGP** (RFC 9580 / RFC 4880) message-level cryptography to WSO2 Integrator: MI mediation flows. It lets you encrypt, decrypt, sign and verify payloads in line protecting data for storage or store-and-forward exchange (files, batch B2B transfers, archives) and proving its origin. The cryptographic core is [Bouncy Castle](https://www.bouncycastle.org/), so the output is standard OpenPGP and interoperates with GnuPG and any other compliant tool.

- It is a **message-mediation** module: each operation takes its input from the **message body** (the default) or an **expression** (such as `${payload.x}` or `${vars.x}`), performs a single PGP operation, and writes the result back to the message body or to a response variable.
- Keys are supplied through **PGP key connections** — one connection per key — that operations reference by config key.
- Each operation reads and writes either **TEXT** or **BINARY**, mirroring the File Connector / VFS transport, so it slots directly into file-based `read → PGP → write` flows.

Go to the <a target="_blank" href="https://store.wso2.com/">WSO2 Connector Store</a> to download the
Cryptography Module.

## Operations

The module provides six operations:

* `pgpEncrypt` — encrypt the input for a recipient using their public key.
* `pgpDecrypt` — decrypt the input using sender's private key and passphrase.
* `pgpSign` — sign the input with recipient's private key.
* `pgpVerify` — verify a signed message with the sender's public key.
* `pgpSignAndEncrypt` — sign then encrypt in a single pass (outbound).
* `pgpDecryptAndVerify` — decrypt then verify in a single pass (inbound).

## Compatibility

| Module version | Supported product versions |
| -------------- | -------------------------- |
| 1.0.0          | MI 4.6.0 onwards           |

## Cryptography Module documentation

* **[Cryptography Module Reference]({{base_path}}/reference/connectors/cryptography-module/1.x/cryptography-module-config/)**: the reference guide for all six operations and their parameters.
* **[Cryptography Module Example]({{base_path}}/reference/connectors/cryptography-module/1.x/cryptography-module-example/)**: a step-by-step example that signs, encrypts, decrypts and verifies a message end to end.

## How to contribute

As an open source project, WSO2 extensions welcome contributions from the community.

To contribute to the code for this module, please create a pull request in the module's GitHub
repository. 

- **[Cryptography Module Github Repository](https://github.com/wso2-extensions/mediation-cryptography-module/pull/1)**

Check the issue tracker for open issues that interest you. We look forward to receiving
your contributions.
