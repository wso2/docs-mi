# PGP Cryptography Example

This page walks through the PGP Cryptography Module with three hands-on **B2B file-exchange**
scenarios that share a single cast and a single set of keys, so you set things up once and then try
each in turn.

**Business participants**

* **Alice — ABC Retail** runs the **sender's** integration (the originating side).
* **Bob — Global Electronics Ltd.** runs the **receiver's** integration (the consuming side).

**PGP keys** (created in the [Prerequisites](#prerequisites)):

| Key | Used for |
|-----|----------|
| Alice private key | Signing |
| Alice public key | Signature verification |
| Bob public key | Encryption |
| Bob private key | Decryption |

Each scenario protects a different real business document, chosen to show *when* you reach for each
operation:

| What the business needs | Operation pair | Scenario |
|-------------------------|----------------|----------|
| Confidentiality for a file in transit | `pgpEncrypt` → `pgpDecrypt` | [Scenario 1](#scenario-1-secure-purchase-order-exchange) — Secure Purchase Order Exchange |
| Authenticity & integrity, but **not** secrecy | `pgpSign` → `pgpVerify` | [Scenario 2](#scenario-2-signed-product-price-catalog-distribution) — Signed Product Price Catalog |
| **All three (Confidentiality, Authenticity & integrity)** at once | `pgpSignAndEncrypt` → `pgpDecryptAndVerify` | [Scenario 3](#scenario-3-secure-invoice-exchange) — Secure Invoice Exchange |

**Every scenario uses:**

* a **File Inbound Endpoint** on each side, which *detects and reads* the incoming file — for
  simplicity in this example its after-process and after-failure actions are both set to `DELETE` and
  file locking is disabled,
* the **PGP Module**, which signs / encrypts / decrypts / verifies the content, and
* the **File Connector** (write and move operations), which writes the result to the next folder.

!!! note
    PGP protects **data**, not the transport. Below, files move between local folders on the MI host
    for a self-contained demo; in production the same flows run over **SFTP/FTP** by swapping the File
    connection — the PGP operations are identical either way.

!!! tip "How input and output are decided"
    Each PGP operation is governed by following configuration choices:
    
    1. **Input Type** — how to interpret the data on the receiving side (decryption/verification):
        - **BINARY** (default) — read as raw bytes
        - **TEXT** — read as a text string

        `inputType` applies to outbound operations(encrypt/sign). Inbound operations (decrypt/verifiy) auto-detect the OpenPGP input and use `outputType`outputType for the recovered representation.
    
    2. **Input Source** — where the data comes from:
        - **Message Body** (default) — the raw payload
        - **Expression** — a custom source specified via `sourceContent`
    
    3. **ASCII Armor** — controls the output format of encrypted/signed content:
        - **FALSE** (default) — binary format, save as `.gpg` or `.pgp`
        - **TRUE** — text format, save as `.asc`

!!! example "Armored vs. binary output"
    Both forms carry the *same* encrypted bytes — ASCII armor just wraps them in a printable text
    envelope so they survive channels that would mangle raw binary (email, HTTP/JSON, copy-paste):

    === "armor=false — binary `.gpg` (default)"

        ```text
        # raw OpenPGP packets (hexdump) — compact, but not text-safe
        85 01 0c 03 a7 f6 a7 7a cb f6 4d 1d 01 08 00 b3
        7e 9c 41 2a d8 0f 5e c1 6a 22 e2 1f a4 6b 9d 22
        ```

    === "armor=true — ASCII-armored `.asc`"

        ```text
        -----BEGIN PGP MESSAGE-----

        hQEMA6f2p3rL9k0dAQf/W3qcQSrYD15e0mFqPphV4G8kR2oX9v
        Hh0bJq2pT7yb0f2n1c5aXo9dQ2m8s...(base64)...=3Xy9
        -----END PGP MESSAGE-----
        ```

!!! note
    For these scenarios, all three scenarios exchange files in binary format by default. The receiving side automatically detects content type, requiring minimal configuration.

## Prerequisites

1. **WSO2 Integrator : MI 4.6.0** and **WSO2 Integrator: MI for VS Code**.
2. **GnuPG (`gpg`) installed and on the `PATH`** — used to create and export the demo keys. Check with
   `gpg --version`; if it is missing, install it from the
   [official GnuPG downloads](https://gnupg.org/download/index.html):
    * **Linux** — your package manager, e.g. `sudo apt install gnupg` (Debian/Ubuntu) or
      `sudo yum install gnupg2` (RHEL/CentOS).
    * **macOS** — [GPG Suite](https://gpgtools.org/), or `brew install gnupg`.
    * **Windows** — [Gpg4win](https://www.gpg4win.org/). This installs the `gpg` command-line tool
      (used here) alongside the Kleopatra GUI; open a **new** terminal afterwards and run
      `gpg --version` to confirm it is on the `PATH`.
3. **Two PGP key pairs** — one for Alice (sender) and one for Bob (receiver). Download and run the
   setup script for your OS, or run the equivalent commands inline. Each key carries a user ID (the
   email), which the connections use directly as the `keyIdentifier` — so there is no key-ID to copy.

    ??? example "Generate and export the keys"

        === "Linux / macOS"

            Script: [cryptography-setup.sh]({{base_path}}/assets/attachments/module/pgp/cryptography-setup.sh)
            — `chmod +x cryptography-setup.sh && ./cryptography-setup.sh` (also works in Git Bash / WSL on Windows).

            Or run the commands directly:
            ```bash
            export GNUPGHOME=/tmp/pgp-demo-keyring
            mkdir -p ./keys        # add these files to the project's resources/keys later

            # Generate the key pairs (RSA 3072, valid 2 years)
            gpg --batch --pinentry-mode loopback --passphrase 'AlicePass' \
                --quick-gen-key alice@example.com rsa3072 default 2y
            gpg --batch --pinentry-mode loopback --passphrase 'BobPass' \
                --quick-gen-key bob@example.com rsa3072 default 2y

            # Export the keys the module reads at mediation time
            gpg --batch --yes --pinentry-mode loopback --passphrase 'AlicePass' --armor \
                --output ./keys/alice-private.asc --export-secret-keys alice@example.com
            gpg --batch --yes --armor --output ./keys/alice-public.asc --export alice@example.com
            gpg --batch --yes --pinentry-mode loopback --passphrase 'BobPass' --armor \
                --output ./keys/bob-private.asc --export-secret-keys bob@example.com
            gpg --batch --yes --armor --output ./keys/bob-public.asc --export bob@example.com
            ```

        === "Windows (PowerShell)"

            Script: [cryptography-setup.ps1]({{base_path}}/assets/attachments/module/pgp/cryptography-setup.ps1)
            — `powershell -ExecutionPolicy Bypass -File .\cryptography-setup.ps1`.

            Or run the commands directly:
            ```powershell
            $env:GNUPGHOME = "$env:TEMP\pgp-demo-keyring"
            New-Item -ItemType Directory -Force -Path $env:GNUPGHOME, '.\keys' | Out-Null   # add .\keys to the project's resources/keys later

            # Generate the key pairs (RSA 3072, valid 2 years)
            gpg --batch --pinentry-mode loopback --passphrase AlicePass --quick-gen-key alice@example.com rsa3072 default 2y
            gpg --batch --pinentry-mode loopback --passphrase BobPass   --quick-gen-key bob@example.com   rsa3072 default 2y

            # Export the keys the module reads at mediation time
            gpg --batch --yes --pinentry-mode loopback --passphrase AlicePass --armor --output .\keys\alice-private.asc --export-secret-keys alice@example.com
            gpg --batch --yes --armor --output .\keys\alice-public.asc --export alice@example.com
            gpg --batch --yes --pinentry-mode loopback --passphrase BobPass --armor --output .\keys\bob-private.asc --export-secret-keys bob@example.com
            gpg --batch --yes --armor --output .\keys\bob-public.asc --export bob@example.com
            ```

    This gives you four files used across all three scenarios: Alice signs with `alice-private.asc` and is
    verified with `alice-public.asc`. For Bob data is encrypted with `bob-public.asc` and decrypts with
    `bob-private.asc`.

4. **Store two passphrases in Secure Vault.** - Add them to `MI-HOME/conf/deployment.toml`, then
   run `MI-HOME/bin/ciphertool.sh -Dconfigure` to encrypt the values at rest. The connections resolve
   them with `{${wso2-vault('pgp_alice_passphrase')}}` / `{${wso2-vault('pgp_bob_passphrase')}}`:
    ```toml
    [secrets]
    pgp_alice_passphrase = "[AlicePass]"
    pgp_bob_passphrase = "[BobPass]"
    ```

## Set up the integration project

1. Follow [Create a Project]({{base_path}}/develop/create-integration-project/) to set up the
   integration project.

2. **Add the four key files to the project.** - Copy the `.asc` files into the project's resources —
   in VS Code, use **[Import from file system]({{base_path}}/develop/creating-artifacts/creating-registry-resources/#import-from-file-system)**
   to add them under a `keys` folder, which lands them under `src/main/wso2mi/resources/keys/`. The
   connections reference them as `resources:keys/<file>.asc`, so the keys travel with the deployable
   artifact instead of living at a fixed host path.

    <img src="{{base_path}}/assets/img/integrate/connectors/cryptography/pgp/PGP_Keys_store.png" title="PGP key files added to the project resources" width="800" alt="PGP key files under resources/keys in the project explorer"/>

    Check **[Import from file system](https://mi.docs.wso2.com/en/latest/develop/creating-artifacts/creating-registry-resources/#import-from-file-system)**

    !!! warning
        These are disposable demo keys, so all four `.asc` files go under `resources:keys/` here for
        simplicity. **In production, never put a private key under `resources:`** — keep it in
        `env:NAME` or the Secure Vault
        ([details]({{base_path}}/reference/connectors/cryptography-module/1.x/cryptography-module-config/#public-vs-private-keys-where-each-goes)).

## Set up Local file structure

Before running the examples, create the following directory structure at the desired location on your local machine. Remember to configure the inbound File URI path and File connector write path with your local paths. 

```text
FileExchange/
├── send/
├── exchange/
├── receive/
├── publish/
├── consume/
├── secure/
└── open/
```

| Scenario | Folder | Purpose |
|----------|--------|---------|
| Scenario 1 | `send` | Input folder for files that need encryption. |
|           | `exchange` | Shared folder that carries the **encrypted** purchase order. |
|           | `receive` | Destination for the **decrypted** purchase order. |
| Scenario 2 | `publish` | Input Folder for files need to be **signed**. |
|           | `consume` | Destination for the **signed** catalog. |
| Scenario 3 | `secure` | Input Folder for files that need to be **signed-and-encrypted**. |
|           | `open` | Destination for the **signed-and-encrypted** invoice. |

## Scenario 1 — Secure Purchase Order Exchange

**Objective:** demonstrate **Encrypt** → **Decrypt**.

!!! note "Business scenario"
    ABC Retail sends purchase orders to Global Electronics every evening. Alice exports a purchase
    order from the ERP system; because it carries negotiated prices and quantities it is commercially
    sensitive. Before it leaves ABC Retail, WSO2 MI **encrypts** the purchase order with Bob's public
    key and writes it to the shared `exchange` folder. Bob's integration watches `exchange`; when a
    new encrypted file arrives, MI **decrypts** it with Bob's private key and stores the original in
    `receive` for processing. This ensures only Bob can read the purchase order while it is stored and
    transferred.

**Input file — `purchase_order.csv`** (drop it into `send/`):

```csv
PO_Number,Order_Date,Supplier,Item_Code,Description,Quantity,Unit_Price,Currency
PO10025,2026-07-31,Global Electronics,LAP001,Laptop,20,1200,USD
PO10025,2026-07-31,Global Electronics,MOU101,Wireless Mouse,50,18,USD
PO10025,2026-07-31,Global Electronics,KEY201,Mechanical Keyboard,30,45,USD
PO10025,2026-07-31,Global Electronics,MON301,24-inch Monitor,15,220,USD
PO10025,2026-07-31,Global Electronics,HUB401,USB-C Hub,25,35,USD
```

**File flow:**

<img src="{{base_path}}/assets/img/integrate/connectors/cryptography/pgp/scenario_1_flow.png" title="Scenario 1 file flow" width="800" alt="Purchase order flow: send → encrypt → exchange → decrypt → receive"/>

Two File Inbound Endpoints drive the flow: the **outbound** listener encrypts anything dropped in
`send/` and writes it to `exchange/`; the **inbound** listener decrypts anything that lands in
`exchange/` and writes the original to `receive/`. Both run on the module's defaults — Message Body,
BINARY, `armor=false` — so the bytes pass straight through.

### Build the outbound (encrypt) flow

1. **Create (or open) the project** that will host the two listeners.

    <img src="{{base_path}}/assets/img/integrate/connectors/cryptography/pgp/create_project.png" title="Create the project" width="800" alt="Creating the integration project"/>

2. **Add a File Inbound Endpoint** named `PurchaseOrderOutboundListener` that polls the `send/`
   folder. The content of the file it picks up becomes the message body.

    <img src="{{base_path}}/assets/img/integrate/connectors/cryptography/pgp/purchase_order_encrypt_inbound.png" title="Outbound file inbound endpoint" width="800" alt="Creating the PurchaseOrderOutboundListener on the send folder"/>

3. In the listener's sequence, **search the palette for the PGP module.**

    <img src="{{base_path}}/assets/img/integrate/connectors/cryptography/pgp/pgp_search.png" title="Search for the PGP module" width="800" alt="Searching the palette for the PGP module"/>

4. **Select the PGP Encrypt operation.**

    <img src="{{base_path}}/assets/img/integrate/connectors/cryptography/pgp/pgp_encrypt_select.png" title="Select PGP Encrypt" width="800" alt="Selecting the pgpEncrypt operation"/>

5. **Add Bob's public key as the encryption connection** — click to **+ Add new key**.

    <img src="{{base_path}}/assets/img/integrate/connectors/cryptography/pgp/add_new_public_key_click.png" title="Add a new PGP public key" width="800" alt="Clicking add new PGP public key connection"/>

    Then select the public key type as `PGP_PUBLIC_KEY` and point it at Bob's public key (`bob-public.asc`).

    <img src="{{base_path}}/assets/img/integrate/connectors/cryptography/pgp/add_bob_public_key.png" title="Bob's public key connection" width="800" alt="Configuring Bob's public key connection"/>

6. The **encrypt operation** now reads the message body and encrypts to Bob. Configure with following values

    - **Input Type**: BINARY
    - **input Source**: Message Body
    - **ASCII Armor**: false
    - **File Name** : `${headers.FILE_NAME}`
    - **overwrite Body** : true

    <img src="{{base_path}}/assets/img/integrate/connectors/cryptography/pgp/add_encrypt_operation.png" title="Encrypt operation configured" width="800" alt="The configured pgpEncrypt operation"/>

7. **Add a File Write** after the operation — select the File Connector's write operation.

    <img src="{{base_path}}/assets/img/integrate/connectors/cryptography/pgp/file_write_select.png" title="Select File Write" width="800" alt="Selecting the File Write operation"/>

    Then create a new local file connection.

    <img src="{{base_path}}/assets/img/integrate/connectors/cryptography/pgp/add_new_local_file_connection.png" title="Add a new local file connection" width="800" alt="Adding a new local file connection"/>

    Set `FileExchange` as working directory.

    <img src="{{base_path}}/assets/img/integrate/connectors/cryptography/pgp/add_file_exchange_connection.png" title="File connection to the working directory" width="800" alt="Configuring the file connection to the SecureB2BFileExchange directory"/>

    Then configure to write the encrypted content to `/exchange/purchase_order.pgp`.

    <img src="{{base_path}}/assets/img/integrate/connectors/cryptography/pgp/add_file_write_operation.png" title="File Write to the exchange folder" width="800" alt="Configuring the file write to the exchange folder"/>

8. The finished **outbound** flow — listener → `pgpEncrypt` → file write to `exchange`:

    <img src="{{base_path}}/assets/img/integrate/connectors/cryptography/pgp/purchase_order_outbound_listener_flow.png" title="Outbound listener flow" width="800" alt="Completed PurchaseOrderOutboundListener flow"/>

### Build the inbound (decrypt) flow

1. **Add a second File Inbound Endpoint** named `PurchaseOrderInboundListener` that polls the
   `exchange/` folder (filter on `purchase_order.pgp`).

    <img src="{{base_path}}/assets/img/integrate/connectors/cryptography/pgp/purchase_order_decrypt_inbound.png" title="Inbound file inbound endpoint" width="800" alt="Creating the PurchaseOrderInboundListener on the exchange folder"/>

2. **Add the PGP Decrypt operation** to its sequence. Its input type is auto-detected. Configure with following values

    - **input Source**: Message Body
    - **overwrite Body** : true

    <img src="{{base_path}}/assets/img/integrate/connectors/cryptography/pgp/add_pgp_decrypt_operation.png" title="Add PGP Decrypt" width="800" alt="Adding the pgpDecrypt operation"/>

3. **Add Bob's private key as the decryption key** — click **+ Add new key**.

    <img src="{{base_path}}/assets/img/integrate/connectors/cryptography/pgp/add_new_key_pgp_private.png" title="Add a new PGP private key" width="800" alt="Adding a new PGP private key connection"/>

    Then select the private key type as `PGP_PRIVATE_KEY` and point it at Bob's private key (`bob-private.asc`, which carries the Secure Vault passphrase).

    <img src="{{base_path}}/assets/img/integrate/connectors/cryptography/pgp/add_bob_private_key.png" title="Bob's private key connection" width="800" alt="Configuring Bob's private key connection"/>

4. **Add a File Write** that saves the recovered order to `/receive/purchase_order.csv`, reusing the
   file connection you created for the outbound flow.

5. The finished **inbound** flow — listener → `pgpDecrypt` → file write to `receive`:

    <img src="{{base_path}}/assets/img/integrate/connectors/cryptography/pgp/purchase_order_inbound_listener_flow.png" title="Inbound listener flow" width="800" alt="Completed PurchaseOrderInboundListener flow"/>

### Synapse configuration

Both sides are File Inbound Endpoints. In each artifact the **Inbound Endpoint** polls a folder and
its **Inbound Sequence** runs the PGP operation and writes the result. Point the
`transport.vfs.FileURI` parameters and the `fileExchange` file connection at your working directory.

#### Sender — `PurchaseOrderOutboundListener` (encrypt)

??? example "Synapse configuration"

    === "Inbound Endpoint"

        ```xml
        <?xml version="1.0" encoding="UTF-8"?>
        <inboundEndpoint name="PurchaseOrderOutboundListener" class="org.wso2.carbon.inbound.vfs.VFSConsumer" sequence="PurchaseOrderOutboundListener-inboundSequence" onError="PurchaseOrderOutboundListener-inboundErrorSequence" suspend="false">
            <parameters xmlns="http://ws.apache.org/ns/synapse">
                <parameter name="transport.vfs.FileURI">/path/to/FileExchange/send</parameter>
                <parameter name="scheduleType">Polling</parameter>
                <parameter name="interval">5</parameter>
                <parameter name="transport.vfs.ContentType">application/octet-stream</parameter>
                <parameter name="fileThrottlingType">Count</parameter>
                <parameter name="transport.vfs.FileProcessCount">1</parameter>
                <parameter name="sequential">true</parameter>
                <parameter name="coordination">true</parameter>
                <parameter name="transport.vfs.ActionAfterProcess">DELETE</parameter>
                <parameter name="transport.vfs.ActionAfterFailure">DELETE</parameter>
                <parameter name="transport.vfs.Locking">disable</parameter>
            </parameters>
        </inboundEndpoint>
        ```

    === "Inbound Sequence"

        ```xml
        <?xml version="1.0" encoding="UTF-8"?>
        <sequence name="PurchaseOrderOutboundListener-inboundSequence" trace="disable" xmlns="http://ws.apache.org/ns/synapse">
            <cryptography.pgpEncrypt>
                <inputSource>Message Body</inputSource>
                <inputType>BINARY</inputType>
                <encryptionConfigKey>Bob-public-key</encryptionConfigKey>
                <symmetricKeyAlgorithm>AES_256</symmetricKeyAlgorithm>
                <compressionAlgorithm>ZLIB</compressionAlgorithm>
                <armor>false</armor>
                <integrityCheck>true</integrityCheck>
                <fileName>{${headers.FILE_NAME}}</fileName>
                <responseVariable>cryptography_pgpEncrypt_1</responseVariable>
                <overwriteBody>true</overwriteBody>
            </cryptography.pgpEncrypt>
            <file.write configKey="fileExchange">
                <filePath>/exchange/purchase_order.pgp</filePath>
                <contentOrExpression></contentOrExpression>
                <mimeType>Automatic</mimeType>
                <writeMode>Overwrite</writeMode>
                <responseVariable>file_write_1</responseVariable>
                <overwriteBody>false</overwriteBody>
            </file.write>
        </sequence>
        ```

#### Receiver — `PurchaseOrderInboundListener` (decrypt)

??? example "Synapse configuration"

    === "Inbound Endpoint"

        ```xml
        <?xml version="1.0" encoding="UTF-8"?>
        <inboundEndpoint name="PurchaseOrderInboundListener" class="org.wso2.carbon.inbound.vfs.VFSConsumer" sequence="PurchaseOrderInboundListener-inboundSequence" onError="PurchaseOrderInboundListener-inboundErrorSequence" suspend="false">
            <parameters xmlns="http://ws.apache.org/ns/synapse">
                <parameter name="transport.vfs.FileURI">/path/to/FileExchange/exchange</parameter>
                <parameter name="scheduleType">Polling</parameter>
                <parameter name="interval">5</parameter>
                <parameter name="transport.vfs.ContentType">application/octet-stream</parameter>
                <parameter name="fileThrottlingType">Count</parameter>
                <parameter name="transport.vfs.FileProcessCount">1</parameter>
                <parameter name="sequential">true</parameter>
                <parameter name="coordination">true</parameter>
                <parameter name="transport.vfs.ActionAfterProcess">DELETE</parameter>
                <parameter name="transport.vfs.ActionAfterFailure">DELETE</parameter>
                <parameter name="transport.vfs.Locking">disable</parameter>
            </parameters>
        </inboundEndpoint>
        ```

    === "Inbound Sequence"

        ```xml
        <?xml version="1.0" encoding="UTF-8"?>
        <sequence name="PurchaseOrderInboundListener-inboundSequence" trace="disable" xmlns="http://ws.apache.org/ns/synapse">
            <cryptography.pgpDecrypt>
                <inputSource>Message Body</inputSource>
                <outputType>BINARY</outputType>
                <decryptionConfigKey>Bob-private-key</decryptionConfigKey>
                <requireIntegrity>true</requireIntegrity>
                <responseVariable>cryptography_pgpDecrypt_1</responseVariable>
                <overwriteBody>true</overwriteBody>
            </cryptography.pgpDecrypt>
            <file.write configKey="fileExchange">
                <filePath>{${"/receive/"+vars.cryptography_pgpDecrypt_1.attributes.fileName}}</filePath>
                <contentOrExpression></contentOrExpression>
                <mimeType>Automatic</mimeType>
                <writeMode>Create New</writeMode>
                <responseVariable>file_write_1</responseVariable>
                <overwriteBody>false</overwriteBody>
            </file.write>
        </sequence>
        ```


### Get the project

You can download the ZIP file and extract the contents to get the project code.

<a href="{{base_path}}/assets/attachments/connectors/cryptography-module.zip">
    <img src="{{base_path}}/assets/img/integrate/connectors/download-zip.png" width="200" alt="Download ZIP">
</a>

### Deployment

To deploy and run the project, refer to the [Build and Run]({{base_path}}/develop/deploy-artifacts/#build-and-run) guide.

### Test the flow
- Drop `purchase_order.csv` into `/send` directory. 
- Within a poll cycle the outbound listener encrypt and writes `/exchange/purchase_order.pgp` (unreadable to anyone but Bob). 
- Then the inbound listener then decrypt and writes `receive/purchase_order.csv`.
- You can check the `purchase_order.csv` file in `receive` directory and you will see that original content is there.

## Scenario 2 — Signed Product Price Catalog Distribution

**Objective:** demonstrate **Sign** → **Verify**.

!!! note "Business scenario"
    ABC Retail publishes a weekly product catalog. Every customer receives the same catalog,
    so it is public and needs no encryption — but customers must be able to verify that it genuinely
    originated from ABC Retail and has not been modified. Alice **signs** the catalog with her
    private key; Bob **verifies** the signature with Alice's public key before importing it. If
    verification fails, the catalog is rejected.

**Input file — `price_catalog.csv`**:

```csv
Item_Code,Description,Category,Unit_Price,Currency
LAP001,Laptop,Computers,1200,USD
MOU101,Wireless Mouse,Accessories,18,USD
KEY201,Mechanical Keyboard,Accessories,45,USD
MON301,24-inch Monitor,Displays,220,USD
HUB401,USB-C Hub,Accessories,35,USD
```

**File flow:**

<img src="{{base_path}}/assets/img/integrate/connectors/cryptography/pgp/scenario_2_flow.png" title="Scenario 2 file flow" width="800" alt="Price catalog flow: publish → sign → consume → verify → verified/rejected"/>

### Inbound Listener Flow

1. `PriceCatalogPublisherListener` polls `/publish/` and picks up `price_catalog.csv`; the file content
   becomes the message body.
2. **PGP Sign** signs the catalog with Alice's private key (`signingConfigKey` → `alice-private`).
3. The **File Write** operation writes the signed catalog to `consume/`.
4. `PriceCatalogConsumerListener` polls `consume/` and picks up the signed file.
5. **PGP Verify** checks the signature with Alice's public key (`verificationConfigKey` →
   `alice-public`). The result carries a boolean `signatureValid` on its `attributes`.
6. When `signatureValid` is `true`, the verified catalog is written to `/verified`, ready to import;
   otherwise it is rejected and written into `rejected/`.

### Synapse configuration

The publisher signs the catalog and writes it for consumers. The consumer verifies the signature and
routes the file to `/verified` or `/rejected` directories based on the `signatureValid` verdict.

#### Sender — `PriceCatalogPublisherListener` (sign)

<img src="{{base_path}}/assets/img/integrate/connectors/cryptography/pgp/price_catalog_publisher_listener_flow.png" title="Publisher listener flow" width="800" alt="Completed PriceCatalogPublisherListener flow"/>

??? example "Synapse configuration"

    === "Inbound Endpoint"

        ```xml
        <?xml version="1.0" encoding="UTF-8"?>
        <inboundEndpoint name="PriceCatalogPublisherListener" class="org.wso2.carbon.inbound.vfs.VFSConsumer" sequence="PriceCatalogPublisherListener-inboundSequence" onError="PriceCatalogPublisherListener-inboundErrorSequence" suspend="false">
            <parameters xmlns="http://ws.apache.org/ns/synapse">
                <parameter name="transport.vfs.FileURI">/path/to/FileExchange/publish</parameter>
                <parameter name="scheduleType">Polling</parameter>
                <parameter name="interval">5</parameter>
                <parameter name="transport.vfs.ContentType">application/octet-stream</parameter>
                <parameter name="fileThrottlingType">Count</parameter>
                <parameter name="transport.vfs.FileProcessCount">1</parameter>
                <parameter name="sequential">true</parameter>
                <parameter name="coordination">true</parameter>
                <parameter name="transport.vfs.ActionAfterProcess">DELETE</parameter>
                <parameter name="transport.vfs.ActionAfterFailure">DELETE</parameter>
                <parameter name="transport.vfs.Locking">disable</parameter>
            </parameters>
        </inboundEndpoint>
        ```

    === "Inbound Sequence"

        ```xml
        <?xml version="1.0" encoding="UTF-8"?>
        <sequence name="PriceCatalogPublisherListener-inboundSequence" trace="disable" xmlns="http://ws.apache.org/ns/synapse">
            <cryptography.pgpSign>
                <inputSource>Message Body</inputSource>
                <inputType>BINARY</inputType>
                <signingConfigKey>alice-private-key</signingConfigKey>
                <signatureHashAlgorithm>SHA256</signatureHashAlgorithm>
                <compressionAlgorithm>ZLIB</compressionAlgorithm>
                <armor>true</armor>
                <fileName>{${headers.FILE_NAME}}</fileName>
                <responseVariable>cryptography_pgpSign_1</responseVariable>
                <overwriteBody>true</overwriteBody>
            </cryptography.pgpSign>
            <file.write configKey="fileExchange">
                <filePath>/consume/price_catalog.asc</filePath>
                <contentOrExpression></contentOrExpression>
                <mimeType>Automatic</mimeType>
                <writeMode>Overwrite</writeMode>
                <responseVariable>file_write_1</responseVariable>
                <overwriteBody>false</overwriteBody>
            </file.write>
        </sequence>
        ```

#### Receiver — `PriceCatalogConsumerListener` (verify)

<img src="{{base_path}}/assets/img/integrate/connectors/cryptography/pgp/price_catalog_consumer_listener_flow.png" title="Consumer listener flow" width="800" alt="Completed PriceCatalogConsumerListener flow"/>

??? example "Synapse configuration"

    === "Inbound Endpoint"

        ```xml
        <?xml version="1.0" encoding="UTF-8"?>
        <inboundEndpoint name="PriceCatalogConsumerListener" class="org.wso2.carbon.inbound.vfs.VFSConsumer" sequence="PriceCatalogConsumerListener-inboundSequence" onError="PriceCatalogConsumerListener-inboundErrorSequence" suspend="false">
            <parameters xmlns="http://ws.apache.org/ns/synapse">
                <parameter name="transport.vfs.FileURI">/path/to/FileExchange/consume</parameter>
                <parameter name="scheduleType">Polling</parameter>
                <parameter name="interval">5</parameter>
                <parameter name="transport.vfs.ContentType">application/octet-stream</parameter>
                <parameter name="fileThrottlingType">Count</parameter>
                <parameter name="transport.vfs.FileProcessCount">1</parameter>
                <parameter name="sequential">true</parameter>
                <parameter name="coordination">true</parameter>
                <parameter name="transport.vfs.ActionAfterProcess">DELETE</parameter>
                <parameter name="transport.vfs.ActionAfterFailure">DELETE</parameter>
                <parameter name="transport.vfs.Locking">disable</parameter>
            </parameters>
        </inboundEndpoint>
        ```

    === "Inbound Sequence"

        ```xml
        <?xml version="1.0" encoding="UTF-8"?>
        <sequence name="PriceCatalogConsumerListener-inboundSequence" trace="disable" xmlns="http://ws.apache.org/ns/synapse">
            <cryptography.pgpVerify>
                <inputSource>Message Body</inputSource>
                <outputType>BINARY</outputType>
                <verificationConfigKey>alice-public-key</verificationConfigKey>
                <requireValidSignerKey>true</requireValidSignerKey>
                <responseVariable>cryptography_pgpVerify_1</responseVariable>
                <overwriteBody>true</overwriteBody>
            </cryptography.pgpVerify>
            <!-- route by the signature verdict -->
            <filter xpath="${vars.cryptography_pgpVerify_1.attributes.signatureValid}">
                <then>
                    <file.write configKey="fileExchange">
                        <filePath>{${"/verified/"+vars.cryptography_pgpVerify_1.attributes.fileName}}</filePath>
                        <contentOrExpression></contentOrExpression>
                        <mimeType>Automatic</mimeType>
                        <writeMode>Create New</writeMode>
                        <responseVariable>file_write_1</responseVariable>
                        <overwriteBody>false</overwriteBody>
                    </file.write>
                </then>
                <else>
                    <file.write configKey="fileExchange">
                        <filePath>{${"/rejected/"+vars.cryptography_pgpVerify_1.attributes.fileName}}</filePath>
                        <contentOrExpression></contentOrExpression>
                        <mimeType>Automatic</mimeType>
                        <writeMode>Create New</writeMode>
                        <responseVariable>file_write_2</responseVariable>
                        <overwriteBody>false</overwriteBody>
                    </file.write>
                </else>
            </filter>
        </sequence>
        ```

### Test the flow
 - Drop `price_catalog.csv` into `/publish` directory. 
 - The publisher signs it (armored) and writes `consume/price_catalog.asc`.
 - Then the consumer verifies the signature and, because it is valid, writes the recovered catalog to `verified/price_catalog.csv`. Tamper with the signed file before it is consumed and it lands in `rejected/` instead.


## Scenario 3 — Secure Invoice Exchange

**Objective:** demonstrate **Sign** → **Encrypt** → **Decrypt** → **Verify**.

!!! note "Business scenario"
    After shipping products, Global Electronics sends an invoice to ABC Retail. The invoice contains
    negotiated pricing, payment amounts, and banking information, so it must satisfy three security
    requirements at once: **only ABC Retail can read it**, **ABC Retail knows it came from Global
    Electronics**, and **ABC Retail knows it was not modified**. Alice **signs** the invoice with her
    private key, then it is **encrypted** with Bob's public key. Bob **decrypts** it with his private
    key and **verifies** Alice's signature before forwarding it to the finance system.

**Input file — `invoice.csv`** (drop it into `send/`):

```csv
Invoice_Number,PO_Number,Item_Code,Description,Quantity,Unit_Price,Line_Total
INV5001,PO10025,LAP001,Laptop,20,1200,24000
INV5001,PO10025,MOU101,Wireless Mouse,50,18,900
INV5001,PO10025,KEY201,Mechanical Keyboard,30,45,1350
INV5001,PO10025,MON301,24-inch Monitor,15,220,3300
INV5001,PO10025,HUB401,USB-C Hub,25,35,875
```

**File flow:**

<img src="{{base_path}}/assets/img/integrate/connectors/cryptography/pgp/scenario_3_flow.png" title="Scenario 3 file flow" width="800" alt="Invoice flow: secure → sign & encrypt → open → decrypt & verify"/>

### Inbound Listener Flow

1. `InvoiceOutboundListener` polls `/secure` directory  and picks up `invoice.csv`.
2. **PGP Sign then Encrypt** — sign with Alice's private key and encrypt to Bob's public key. The
   module's `pgpSignAndEncrypt` operation does both in a single pass (`signingConfigKey` →
   `alice-private`, `encryptionConfigKey` → `bob-public`), producing one standard OpenPGP message.
3. The **File Write** operation writes the signed-and-encrypted invoice to `open/`.
4. `InvoiceInboundListener` polls `open/` and picks up the sealed file.
5. **PGP Decrypt then Verify** — `pgpDecryptAndVerify` decrypts with Bob's private key
   (`decryptionConfigKey` → `bob-private`) and verifies Alice's signature (`verificationConfigKey` →
   `alice-public`) in one pass, exposing `signatureValid` on its `attributes`.
6. When `signatureValid` is `true`, the recovered invoice is written to logs, otherwise it is rejected with error message.

### Synapse configuration

The sender signs **and** encrypts the invoice in a single `pgpSignAndEncrypt` pass and writes the
sealed file; the receiver decrypts **and** verifies it in a single `pgpDecryptAndVerify` pass, logging
the recovered invoice on success and raising an error on a bad signature.

#### Sender — `InvoiceOutboundListener` (sign & encrypt)

<img src="{{base_path}}/assets/img/integrate/connectors/cryptography/pgp/invoice_outbound_listener_flow.png" title="Invoice outbound listener flow" width="800" alt="Completed InvoiceOutboundListener flow"/>

??? example "Synapse configuration"

    === "Inbound Endpoint"

        ```xml
        <?xml version="1.0" encoding="UTF-8"?>
        <inboundEndpoint name="InvoiceOutboundListener" class="org.wso2.carbon.inbound.vfs.VFSConsumer" sequence="InvoiceOutboundListener-inboundSequence" onError="InvoiceOutboundListener-inboundErrorSequence" suspend="false">
            <parameters xmlns="http://ws.apache.org/ns/synapse">
                <parameter name="transport.vfs.FileURI">/path/to/FileExchange/secure</parameter>
                <parameter name="scheduleType">Polling</parameter>
                <parameter name="interval">5</parameter>
                <parameter name="transport.vfs.ContentType">application/octet-stream</parameter>
                <parameter name="fileThrottlingType">Count</parameter>
                <parameter name="transport.vfs.FileProcessCount">1</parameter>
                <parameter name="sequential">true</parameter>
                <parameter name="coordination">true</parameter>
                <parameter name="transport.vfs.ActionAfterProcess">DELETE</parameter>
                <parameter name="transport.vfs.ActionAfterFailure">DELETE</parameter>
                <parameter name="transport.vfs.Locking">disable</parameter>
            </parameters>
        </inboundEndpoint>
        ```

    === "Inbound Sequence"

        ```xml
        <?xml version="1.0" encoding="UTF-8"?>
        <sequence name="InvoiceOutboundListener-inboundSequence" trace="disable" xmlns="http://ws.apache.org/ns/synapse">
            <cryptography.pgpSignAndEncrypt>
                <inputSource>Message Body</inputSource>
                <inputType>BINARY</inputType>
                <signingConfigKey>alice-private-key</signingConfigKey>
                <encryptionConfigKey>Bob-public-key</encryptionConfigKey>
                <symmetricKeyAlgorithm>AES_256</symmetricKeyAlgorithm>
                <compressionAlgorithm>ZLIB</compressionAlgorithm>
                <signatureHashAlgorithm>SHA256</signatureHashAlgorithm>
                <armor>true</armor>
                <integrityCheck>true</integrityCheck>
                <fileName>{${headers.FILE_NAME}}</fileName>
                <responseVariable>cryptography_pgpSignAndEncrypt_1</responseVariable>
                <overwriteBody>true</overwriteBody>
            </cryptography.pgpSignAndEncrypt>
            <file.write configKey="fileExchange">
                <filePath>/open/invoice.asc</filePath>
                <contentOrExpression></contentOrExpression>
                <mimeType>Automatic</mimeType>
                <writeMode>Overwrite</writeMode>
                <responseVariable>file_write_1</responseVariable>
                <overwriteBody>false</overwriteBody>
            </file.write>
        </sequence>
        ```

#### Receiver — `InvoiceInboundListener` (decrypt & verify)

<img src="{{base_path}}/assets/img/integrate/connectors/cryptography/pgp/invoice_inbound_listener_flow.png" title="Invoice inbound listener flow" width="800" alt="Completed InvoiceInboundListener flow"/>

??? example "Synapse configuration"

    === "Inbound Endpoint"

        ```xml
        <?xml version="1.0" encoding="UTF-8"?>
        <inboundEndpoint name="InvoiceInboundListener" class="org.wso2.carbon.inbound.vfs.VFSConsumer" sequence="InvoiceInboundListener-inboundSequence" onError="InvoiceInboundListener-inboundErrorSequence" suspend="false">
            <parameters xmlns="http://ws.apache.org/ns/synapse">
                <parameter name="transport.vfs.FileURI">/path/to/FileExchange/open</parameter>
                <parameter name="scheduleType">Polling</parameter>
                <parameter name="interval">5</parameter>
                <parameter name="transport.vfs.ContentType">application/octet-stream</parameter>
                <parameter name="fileThrottlingType">Count</parameter>
                <parameter name="transport.vfs.FileProcessCount">1</parameter>
                <parameter name="sequential">true</parameter>
                <parameter name="coordination">true</parameter>
                <parameter name="transport.vfs.ActionAfterProcess">DELETE</parameter>
                <parameter name="transport.vfs.ActionAfterFailure">DELETE</parameter>
                <parameter name="transport.vfs.Locking">disable</parameter>
            </parameters>
        </inboundEndpoint>
        ```

    === "Inbound Sequence"

        ```xml
        <?xml version="1.0" encoding="UTF-8"?>
        <sequence name="InvoiceInboundListener-inboundSequence" trace="disable" xmlns="http://ws.apache.org/ns/synapse">
            <cryptography.pgpDecryptAndVerify>
                <inputSource>Message Body</inputSource>
                <charset>UTF-8</charset>
                <outputType>TEXT</outputType>
                <decryptionConfigKey>Bob-private-key</decryptionConfigKey>
                <verificationConfigKey>alice-public-key</verificationConfigKey>
                <requireIntegrity>true</requireIntegrity>
                <requireValidSignerKey>true</requireValidSignerKey>
                <responseVariable>cryptography_pgpDecryptAndVerify_1</responseVariable>
                <overwriteBody>true</overwriteBody>
            </cryptography.pgpDecryptAndVerify>
            <!-- accept on a valid signature, otherwise raise an error -->
            <filter xpath="${vars.cryptography_pgpDecryptAndVerify_1.attributes.signatureValid}">
                <then>
                    <log category="INFO" logMessageID="false" logFullPayload="false" description="VERIFIED">
                        <message>[isVerified] : ${vars.cryptography_pgpDecryptAndVerify_1.attributes.signatureValid}, [File Content] : ${payload.text}</message>
                    </log>
                </then>
                <else>
                    <log category="INFO" logMessageID="false" logFullPayload="false" description="REJECTED">
                        <message>[isVerified] : ${vars.cryptography_pgpDecryptAndVerify_1.attributes.signatureValid}</message>
                    </log>
                    <throwError errorMessage="INVALID_PGP_SIGNATURE" type="VERIFICATION_ERROR"/>
                </else>
            </filter>
        </sequence>
        ```

### Test the flow
- Drop `invoice.csv` into `/secure` directory. 
- The outbound listener signs and encrypts it to `open/invoice.asc`. 
- Then inbound listener then decrypts and verifies it — there is **no file write on the receiver side** for this scenario instead it logs decrypted content/throws an error based on verification reults.

```text
[2026-08-04 22:06:28,218]  INFO {LogMediator} - {inboundendpoint:InvoiceInboundListener} [isVerified] : true, [File Content] : Invoice_Number,PO_Number,Item_Code,Description,Quantity,Unit_Price,Line_Total
INV5001,PO10025,LAP001,Laptop,20,1200,24000
INV5001,PO10025,MOU101,Wireless Mouse,50,18,900
INV5001,PO10025,KEY201,Mechanical Keyboard,30,45,1350
INV5001,PO10025,MON301,24-inch Monitor,15,220,3300
INV5001,PO10025,HUB401,USB-C Hub,25,35,875
```

If the signature is invalid, the sequence logs `[isVerified] : false` and raises an
`INVALID_PGP_SIGNATURE` error instead.

## What's next

* See the [Cryptography Module Reference]({{base_path}}/reference/connectors/cryptography-module/1.x/cryptography-module-config/)
  for every operation, connection field, and parameter — including the full list of algorithm options
  and error codes.
* Swap the local **File** connection for an **SFTP/FTP** connection to run any scenario between hosts
  — the PGP operations stay identical.
```