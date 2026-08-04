# Cryptography (PGP) Module Reference

The Cryptography Module adds in-line **OpenPGP** (RFC 9580 / RFC 4880) message-level cryptography
to WSO2 Micro Integrator mediation flows. It is built on [Bouncy Castle](https://www.bouncycastle.org/),
so its output is standard OpenPGP and interoperates with GnuPG and any other compliant tool.

Keys are supplied through **connections** — one per key — that operations reference by config key.
There are two connection types:

* **PGP_PRIVATE_KEY** — *Sender* identity. Used to **sign** and **decrypt**.
* **PGP_PUBLIC_KEY** — *Recipient's* key. Used to **encrypt** (to them) and **verify** (their signature).

The module provides six operations:

| Operation | Description | Key connection used |
|-----------|-------------|---------------------|
| [pgpEncrypt](#pgpencrypt) | Encrypt the input for a recipient using their public key. | `encryptionConfigKey` → PGP_PUBLIC_KEY |
| [pgpDecrypt](#pgpdecrypt) | Decrypt the input using recipient's private key. | `decryptionConfigKey` → PGP_PRIVATE_KEY |
| [pgpSign](#pgpsign) | Sign the input with sender's private key. | `signingConfigKey` → PGP_PRIVATE_KEY |
| [pgpVerify](#pgpverify) | Verify a signed message with the sender's public key. | `verificationConfigKey` → PGP_PUBLIC_KEY |
| [pgpSignAndEncrypt](#pgpsignandencrypt) | Sign **then** encrypt in a single pass (outbound). | `signingConfigKey` + `encryptionConfigKey` |
| [pgpDecryptAndVerify](#pgpdecryptandverify) | Decrypt **then** verify in a single pass (inbound). | `decryptionConfigKey` + `verificationConfigKey` |

Every operation takes its input (`Input Source`) in one of **two ways** — the core concept to understand before
reading the parameter tables:

* **Message Body** *(default)* — operate on the raw message payload. This is the natural fit for
  file and binary exchange.
* **Expression** — read the input from a variable or field via `sourceContent` (for example
  `${payload.message}`).

## Connections

A connection points the module at a single PGP key and is reused across any number of operations. In
the VS Code tooling you create keys while configuring an operation. On an operation's key field click **Add New
Key**, choose **PGP Private Key** or **PGP Public Key**, then fill in the key details. On disk it is a
local entry (`cryptography.init`).

### Key material sources

The `privateKeyPath` / `publicKeyPath` field accepts several sources. Use a project registry resource
(`resources:`) as the default.

<table>
<thead>
  <tr><th>Form</th><th>Source</th><th>Use for</th></tr>
</thead>
<tbody>
  <tr><td><code>resources:keys/alice-private.asc</code></td><td>Project registry resource, bundled in the integration project.</td><td><strong>Recommended</strong> — versioned with the project.</td></tr>
  <tr><td><code>env:NAME</code></td><td>Environment variable holding the key material.</td><td>Containers / Kubernetes Secrets.</td></tr>
  <tr><td><code>-----BEGIN PGP…</code></td><td>Key text pasted inline (armored).</td><td>Quick tests.</td></tr>
  <tr><td><code>/path/to/key.asc</code></td><td>Filesystem path.</td><td>On-box files.</td></tr>
  <tr><td><code>gov:/…</code>, <code>conf:/…</code></td><td>WSO2 Registry (legacy syntax).</td><td>Older deployments; still supported.</td></tr>
</tbody>
</table>

!!! note
    `gov:/` and `conf:/` are the legacy registry syntax — still supported for backward compatibility,
    but new integrations should use `resources:`.

### PGP_PRIVATE_KEY

Your identity — used by [pgpSign](#pgpsign), [pgpDecrypt](#pgpdecrypt),
[pgpSignAndEncrypt](#pgpsignandencrypt) (signing side) and [pgpDecryptAndVerify](#pgpdecryptandverify)
(decryption side).

<table>
<thead>
  <tr><th>Field</th><th>Parameter</th><th>Required</th><th>Notes</th></tr>
</thead>
<tbody>
  <tr><td>Connection Name</td><td>name</td><td>Yes</td><td>Unique name referenced by operations (as the config key).</td></tr>
  <tr><td>Private Key Location</td><td>privateKeyPath</td><td>Yes</td><td>Secret key location — see <a href="#key-material-sources">key material sources</a>.</td></tr>
  <tr><td>Key Identifier</td><td>keyIdentifier</td><td>No</td><td>Which key to use: fingerprint (40-hex), 16-hex Key ID (<code>0x…</code>), or exact user ID / email. Optional if the key ring holds a single key.</td></tr>
  <tr><td>Passphrase</td><td>passphrase</td><td>No</td><td>Protects the secret key. Use a Secure Vault reference such as <code>{${wso2-vault('pgp_alice_passphrase')}}</code>, not a literal. Leave blank for an unprotected key.</td></tr>
</tbody>
</table>

```xml
<localEntry key="my-private" xmlns="http://ws.apache.org/ns/synapse">
  <cryptography.init>
    <connectionType>PGP_PRIVATE_KEY</connectionType>
    <privateKeyPath>resources:keys/alice-private.asc</privateKeyPath>
    <keyIdentifier>alice@example.com</keyIdentifier>
    <passphrase>{${wso2-vault('pgp_alice_passphrase')}}</passphrase>
    <name>my-private</name>
  </cryptography.init>
</localEntry>
```

### PGP_PUBLIC_KEY

A party's key — used by [pgpEncrypt](#pgpencrypt), [pgpVerify](#pgpverify),
[pgpSignAndEncrypt](#pgpsignandencrypt) (encryption side) and [pgpDecryptAndVerify](#pgpdecryptandverify)
(verification side). It has no passphrase.

<table>
<thead>
  <tr><th>Field</th><th>Parameter</th><th>Required</th><th>Notes</th></tr>
</thead>
<tbody>
  <tr><td>Connection Name</td><td>name</td><td>Yes</td><td>Unique name referenced by operations (as the config key).</td></tr>
  <tr><td>Public Key Location</td><td>publicKeyPath</td><td>Yes</td><td>Public key location — see <a href="#key-material-sources">key material sources</a>.</td></tr>
  <tr><td>Key Identifier</td><td>keyIdentifier</td><td>No</td><td>Which key to use: fingerprint / 16-hex Key ID / exact email or user ID. Required for encryption only when the ring holds multiple keys.</td></tr>
</tbody>
</table>

```xml
<localEntry key="partner-public" xmlns="http://ws.apache.org/ns/synapse">
  <cryptography.init>
    <connectionType>PGP_PUBLIC_KEY</connectionType>
    <publicKeyPath>resources:keys/partner.asc</publicKeyPath>
    <keyIdentifier>bob@example.com</keyIdentifier>
    <name>partner-public</name>
  </cryptography.init>
</localEntry>
```

## Shared behavior model

Every operation shares the same way of receiving input and emitting output.

<table>
<thead>
  <tr><th>Name</th><th>Parameter</th><th>Value</th><th>Description</th></tr>
</thead>
<tbody>
  <tr>
    <td>Input Source</td>
    <td>inputSource</td>
    <td>Message Body (default), Expression</td>
    <td><strong>Where</strong> the input comes from. <code>Message Body</code> operates on the raw message payload; <code>Expression</code> reads it from <code>sourceContent</code>.</td>
  </tr>
  <tr>
    <td>Source Content</td>
    <td>sourceContent</td>
    <td>e.g. <code>${payload.message}</code></td>
    <td>The expression to read when <code>inputSource</code> is <code>Expression</code>.</td>
  </tr>
  <tr>
    <td>Input Type</td>
    <td>inputType</td>
    <td>BINARY (default), TEXT</td>
    <td><strong>How</strong> to read the input — <em>outbound operations only</em> (<code>pgpEncrypt</code>, <code>pgpSign</code>, <code>pgpSignAndEncrypt</code>). <code>BINARY</code> is raw bytes; <code>TEXT</code> is a <code>charset</code>-decoded string. Drives the OpenPGP literal-data format byte.</td>
  </tr>
  <tr>
    <td>Charset</td>
    <td>charset</td>
    <td>Default: UTF-8</td>
    <td>Charset used when <code>inputType</code> / <code>outputType</code> is <code>TEXT</code>.</td>
  </tr>
  <tr>
    <td>ASCII Armor</td>
    <td>armor</td>
    <td>false (default), true</td>
    <td><em>Outbound only.</em> <code>false</code> yields binary output (<code>.gpg</code>); <code>true</code> yields ASCII-armored, text-safe output (<code>.asc</code>).</td>
  </tr>
  <tr>
    <td>Output Type</td>
    <td>outputType</td>
    <td>BINARY (default), TEXT</td>
    <td><em>Decrypt / verify only, in Advanced.</em> How the recovered output is represented. <code>BINARY</code> (default) reproduces the recovered bytes exactly, so it round-trips <em>any</em> payload — documents, archives, images, as well as text — losslessly. It is the default because this module's primary job is protecting files, and it keeps the inbound side consistent with the binary-first outbound defaults (<code>inputType=BINARY</code>, <code>armor=false</code>); a <code>TEXT</code> default would charset-decode the output and silently corrupt non-text files. Choose <code>TEXT</code> when the payload really is text you want as a string (e.g. for logging or a text/JSON response). <code>BINARY</code> is surfaced as base64 in the response variable.</td>
  </tr>
  <tr>
    <td>Response Variable</td>
    <td>responseVariable</td>
    <td></td>
    <td>Name of the variable the output is assigned to, at <code>${vars.&lt;name&gt;.payload}</code>. Binary results are base64; armored/text results are a string.</td>
  </tr>
  <tr>
    <td>Overwrite Body</td>
    <td>overwriteBody</td>
    <td>true, false (default)</td>
    <td><code>true</code> → the result replaces the message body; <code>false</code> → the result goes to the response variable only.</td>
  </tr>
</tbody>
</table>

!!! note "Decrypt / verify auto-detect their input"
    `pgpDecrypt`, `pgpVerify` and `pgpDecryptAndVerify` accept either armored or binary input and
    detect the format automatically — there is no `inputType` on the inbound side. `outputType`
    controls only how the recovered output is represented; it defaults to `BINARY` (lossless for any
    file) and can be set to `TEXT` in **Advanced** for text payloads. Because of this, a receiving
    flow needs almost no configuration, and it reads the output of any OpenPGP tool (GnuPG included).

!!! note "Signature verdict"
    `pgpVerify` and `pgpDecryptAndVerify` place a boolean **`signatureValid`** field on the response
    variable's **`attributes`**. Branch on it with a Filter mediator, e.g.
    `${vars.<responseVariable>.attributes.signatureValid}`.

!!! note "Protect private-key passphrases"
    Private-key passphrases must never be hard-coded. Store the value in the
    [Secure Vault]({{base_path}}/install-and-setup/setup/security/encrypting-passwords/) and give the
    connection a Secure Vault reference to it, e.g. `{${wso2-vault('pgp_alice_passphrase')}}`. The module
    receives the already-decrypted value and never persists it.

!!! note "Key selection"
    Which key to use is fixed on the [connection](#connections) via `keyIdentifier` (a fingerprint,
    `0x`-prefixed 16-hex Key ID, or exact user ID / email). When it is blank, the module uses the
    single key in the ring (encryption additionally requires a `keyIdentifier` when the ring holds
    more than one key).

---

## pgpEncrypt

Encrypts the input for a recipient using their public key. Uses the standard hybrid scheme: a
one-time symmetric session key is generated per message and wrapped with the recipient's public key.

### Operation details

<table>
<thead>
  <tr><th>Group</th><th>Name</th><th>Parameter</th><th>Value</th><th>Description</th></tr>
</thead>
<tbody>
  <tr><td rowspan="4">General</td><td>Input Type</td><td>inputType</td><td>BINARY (default), TEXT</td><td>How to read the input.</td></tr>
  <tr><td>Charset</td><td>charset</td><td>UTF-8</td><td>Shown when <code>inputType</code> is <code>TEXT</code>.</td></tr>
  <tr><td>Input Source</td><td>inputSource</td><td>Message Body (default), Expression</td><td>Where the input comes from.</td></tr>
  <tr><td>Source Content</td><td>sourceContent</td><td>e.g. <code>${payload}</code></td><td>Shown when <code>inputSource</code> is <code>Expression</code>.</td></tr>
  <tr><td>Recipient Key</td><td>Encryption Config Key</td><td>encryptionConfigKey</td><td>a PGP_PUBLIC_KEY connection (required)</td><td>The recipient's public-key connection.</td></tr>
  <tr><td rowspan="5">Encryption Options</td><td>Symmetric Key Algorithm</td><td>symmetricKeyAlgorithm</td><td>AES_256 (default), AES_192, AES_128, CAMELLIA_256, CAMELLIA_192, CAMELLIA_128, TWOFISH, CAST5, TRIPLE_DES, BLOWFISH, IDEA</td><td>Cipher for the one-time session key.</td></tr>
  <tr><td>Compression Algorithm</td><td>compressionAlgorithm</td><td>ZLIB (default), ZIP, BZIP2, UNCOMPRESSED</td><td>Compression applied before encryption.</td></tr>
  <tr><td>ASCII Armor</td><td>armor</td><td>false (default), true</td><td>Binary <code>.gpg</code> vs armored <code>.asc</code>.</td></tr>
  <tr><td>Integrity Check</td><td>integrityCheck</td><td>true (default), false</td><td>Add an integrity-protection (MDC) packet.</td></tr>
  <tr><td>File Name</td><td>fileName</td><td>optional</td><td>File name embedded in the literal-data packet.</td></tr>
  <tr><td rowspan="2">Output</td><td>Response Variable</td><td>responseVariable</td><td>required</td><td>Variable the output is assigned to.</td></tr>
  <tr><td>Overwrite Body</td><td>overwriteBody</td><td>false (default), true</td><td>Write the result to the message body.</td></tr>
</tbody>
</table>

### Sample configuration

```xml
<cryptography.pgpEncrypt>
    <encryptionConfigKey>partner-public</encryptionConfigKey>
    <symmetricKeyAlgorithm>AES_256</symmetricKeyAlgorithm>
    <compressionAlgorithm>ZLIB</compressionAlgorithm>
    <armor>false</armor>
    <integrityCheck>true</integrityCheck>
    <responseVariable>enc</responseVariable>
    <overwriteBody>true</overwriteBody>
</cryptography.pgpEncrypt>
```

---

## pgpDecrypt

Decrypts the input using your private key. Input format (armored or binary) is auto-detected.

### Operation details

<table>
<thead>
  <tr><th>Group</th><th>Name</th><th>Parameter</th><th>Value</th><th>Description</th></tr>
</thead>
<tbody>
  <tr><td rowspan="4">General</td><td>Input Source</td><td>inputSource</td><td>Message Body (default), Expression</td><td>Where the input comes from.</td></tr>
  <tr><td>Source Content</td><td>sourceContent</td><td>e.g. <code>${payload}</code></td><td>Shown when <code>inputSource</code> is <code>Expression</code>.</td></tr>
  <tr><td>Decryption Config Key</td><td>decryptionConfigKey</td><td>a PGP_PRIVATE_KEY connection (required)</td><td>Your private-key connection.</td></tr>
  <tr><td>Require Integrity</td><td>requireIntegrity</td><td>true (default), false</td><td>Reject the message if it lacks integrity protection (MDC).</td></tr>
  <tr><td rowspan="2">Advanced</td><td>Output Type</td><td>outputType</td><td>BINARY (default), TEXT</td><td>How the recovered output is represented; <code>BINARY</code> round-trips any file losslessly. Set <code>TEXT</code> for a readable string.</td></tr>
  <tr><td>Charset</td><td>charset</td><td>UTF-8</td><td>Shown when <code>outputType</code> is <code>TEXT</code>.</td></tr>
  <tr><td rowspan="2">Output</td><td>Response Variable</td><td>responseVariable</td><td>required</td><td>Variable the output is assigned to.</td></tr>
  <tr><td>Overwrite Body</td><td>overwriteBody</td><td>false (default), true</td><td>Write the result to the message body.</td></tr>
</tbody>
</table>

**Result attributes:** `fileName`, `modificationTime` (embedded metadata, surfaced when present).

### Sample configuration

```xml
<cryptography.pgpDecrypt>
    <decryptionConfigKey>my-private</decryptionConfigKey>
    <requireIntegrity>true</requireIntegrity>
    <responseVariable>dec</responseVariable>
    <overwriteBody>true</overwriteBody>
</cryptography.pgpDecrypt>
```

---

## pgpSign

Signs the input with your private key, producing a one-pass signed OpenPGP message.

### Operation details

<table>
<thead>
  <tr><th>Group</th><th>Name</th><th>Parameter</th><th>Value</th><th>Description</th></tr>
</thead>
<tbody>
  <tr><td rowspan="4">General</td><td>Input Type</td><td>inputType</td><td>BINARY (default), TEXT</td><td>How to read the input.</td></tr>
  <tr><td>Charset</td><td>charset</td><td>UTF-8</td><td>Shown when <code>inputType</code> is <code>TEXT</code>.</td></tr>
  <tr><td>Input Source</td><td>inputSource</td><td>Message Body (default), Expression</td><td>Where the input comes from.</td></tr>
  <tr><td>Source Content</td><td>sourceContent</td><td>e.g. <code>${payload}</code></td><td>Shown when <code>inputSource</code> is <code>Expression</code>.</td></tr>
  <tr><td>Signing Key</td><td>Signing Config Key</td><td>signingConfigKey</td><td>a PGP_PRIVATE_KEY connection (required)</td><td>Your private-key connection.</td></tr>
  <tr><td rowspan="4">Signing Options</td><td>Signature Hash Algorithm</td><td>signatureHashAlgorithm</td><td>SHA256 (default), SHA384, SHA512, SHA224, SHA1, RIPEMD160</td><td>Hash used for the signature.</td></tr>
  <tr><td>Compression Algorithm</td><td>compressionAlgorithm</td><td>ZLIB (default), ZIP, BZIP2, UNCOMPRESSED</td><td>Compression applied to the signed message.</td></tr>
  <tr><td>ASCII Armor</td><td>armor</td><td>false (default), true</td><td>Binary vs armored output.</td></tr>
  <tr><td>File Name</td><td>fileName</td><td>optional</td><td>File name embedded in the literal-data packet.</td></tr>
  <tr><td rowspan="2">Output</td><td>Response Variable</td><td>responseVariable</td><td>required</td><td>Variable the output is assigned to.</td></tr>
  <tr><td>Overwrite Body</td><td>overwriteBody</td><td>false (default), true</td><td>Write the result to the message body.</td></tr>
</tbody>
</table>

### Sample configuration

```xml
<cryptography.pgpSign>
    <signingConfigKey>my-private</signingConfigKey>
    <signatureHashAlgorithm>SHA256</signatureHashAlgorithm>
    <compressionAlgorithm>ZLIB</compressionAlgorithm>
    <armor>false</armor>
    <responseVariable>sig</responseVariable>
    <overwriteBody>true</overwriteBody>
</cryptography.pgpSign>
```

---

## pgpVerify

Verifies a signed message with the sender's public key and exposes the verdict. Input format is
auto-detected.

### Operation details

<table>
<thead>
  <tr><th>Group</th><th>Name</th><th>Parameter</th><th>Value</th><th>Description</th></tr>
</thead>
<tbody>
  <tr><td rowspan="4">General</td><td>Input Source</td><td>inputSource</td><td>Message Body (default), Expression</td><td>Where the input comes from.</td></tr>
  <tr><td>Source Content</td><td>sourceContent</td><td>e.g. <code>${payload}</code></td><td>Shown when <code>inputSource</code> is <code>Expression</code>.</td></tr>
  <tr><td>Verification Config Key</td><td>verificationConfigKey</td><td>a PGP_PUBLIC_KEY connection (required)</td><td>The sender's public-key connection.</td></tr>
  <tr><td>Require Valid Signer Key</td><td>requireValidSignerKey</td><td>true (default), false</td><td>Reject the message if the signer's key is unusable (revoked/expired) or untrusted.</td></tr>
  <tr><td rowspan="2">Advanced</td><td>Output Type</td><td>outputType</td><td>BINARY (default), TEXT</td><td>How the recovered output is represented; <code>BINARY</code> round-trips any file losslessly. Set <code>TEXT</code> for a readable string.</td></tr>
  <tr><td>Charset</td><td>charset</td><td>UTF-8</td><td>Shown when <code>outputType</code> is <code>TEXT</code>.</td></tr>
  <tr><td rowspan="2">Output</td><td>Response Variable</td><td>responseVariable</td><td>required</td><td>Variable the output is assigned to.</td></tr>
  <tr><td>Overwrite Body</td><td>overwriteBody</td><td>false (default), true</td><td>Write the result to the message body.</td></tr>
</tbody>
</table>

**Result attributes:** `signatureValid` (boolean), `fileName`, `modificationTime`.

### Sample configuration

```xml
<cryptography.pgpVerify>
    <verificationConfigKey>partner-public</verificationConfigKey>
    <requireValidSignerKey>true</requireValidSignerKey>
    <responseVariable>ver</responseVariable>
    <overwriteBody>false</overwriteBody>
</cryptography.pgpVerify>

<filter xpath="${vars.ver.attributes.signatureValid}">
    <then>
        <!-- signature valid: continue processing ${vars.ver.payload} -->
    </then>
    <else>
        <log category="WARN"><property name="msg" value="REJECTED: bad PGP signature"/></log>
        <drop/>
    </else>
</filter>
```

---

## pgpSignAndEncrypt

Signs **then** encrypts in a single pass. The output is a single standard OpenPGP message
(encrypt-of-compress-of-one-pass-sign) that GnuPG and peer tools read natively — it is not the two
single operations chained.

### Operation details

<table>
<thead>
  <tr><th>Group</th><th>Name</th><th>Parameter</th><th>Value</th><th>Description</th></tr>
</thead>
<tbody>
  <tr><td rowspan="4">General</td><td>Input Type</td><td>inputType</td><td>BINARY (default), TEXT</td><td>How to read the input.</td></tr>
  <tr><td>Charset</td><td>charset</td><td>UTF-8</td><td>Shown when <code>inputType</code> is <code>TEXT</code>.</td></tr>
  <tr><td>Input Source</td><td>inputSource</td><td>Message Body (default), Expression</td><td>Where the input comes from.</td></tr>
  <tr><td>Source Content</td><td>sourceContent</td><td>e.g. <code>${payload}</code></td><td>Shown when <code>inputSource</code> is <code>Expression</code>.</td></tr>
  <tr><td>Signing Key (yours)</td><td>Signing Config Key</td><td>signingConfigKey</td><td>a PGP_PRIVATE_KEY connection (required)</td><td>Your private-key connection, used to sign.</td></tr>
  <tr><td>Recipient Key</td><td>Encryption Config Key</td><td>encryptionConfigKey</td><td>a PGP_PUBLIC_KEY connection (required)</td><td>The recipient's public-key connection, used to encrypt.</td></tr>
  <tr><td rowspan="6">Algorithm Options</td><td>Symmetric Key Algorithm</td><td>symmetricKeyAlgorithm</td><td>AES_256 (default), AES_192, AES_128, CAMELLIA_256, CAMELLIA_192, CAMELLIA_128, TWOFISH, CAST5, TRIPLE_DES, BLOWFISH, IDEA</td><td>Cipher for the one-time session key.</td></tr>
  <tr><td>Compression Algorithm</td><td>compressionAlgorithm</td><td>ZLIB (default), ZIP, BZIP2, UNCOMPRESSED</td><td>Compression applied before encryption.</td></tr>
  <tr><td>Signature Hash Algorithm</td><td>signatureHashAlgorithm</td><td>SHA256 (default), SHA384, SHA512, SHA224, SHA1, RIPEMD160</td><td>Hash used for the signature.</td></tr>
  <tr><td>ASCII Armor</td><td>armor</td><td>false (default), true</td><td>Binary vs armored output.</td></tr>
  <tr><td>Integrity Check</td><td>integrityCheck</td><td>true (default), false</td><td>Add an integrity-protection (MDC) packet.</td></tr>
  <tr><td>File Name</td><td>fileName</td><td>optional</td><td>File name embedded in the literal-data packet.</td></tr>
  <tr><td rowspan="2">Output</td><td>Response Variable</td><td>responseVariable</td><td>required</td><td>Variable the output is assigned to.</td></tr>
  <tr><td>Overwrite Body</td><td>overwriteBody</td><td>false (default), true</td><td>Write the result to the message body.</td></tr>
</tbody>
</table>

### Sample configuration

```xml
<cryptography.pgpSignAndEncrypt>
    <signingConfigKey>my-private</signingConfigKey>
    <encryptionConfigKey>partner-public</encryptionConfigKey>
    <symmetricKeyAlgorithm>AES_256</symmetricKeyAlgorithm>
    <compressionAlgorithm>ZLIB</compressionAlgorithm>
    <signatureHashAlgorithm>SHA256</signatureHashAlgorithm>
    <armor>false</armor>
    <integrityCheck>true</integrityCheck>
    <responseVariable>enc</responseVariable>
    <overwriteBody>true</overwriteBody>
</cryptography.pgpSignAndEncrypt>
```

---

## pgpDecryptAndVerify

Decrypts **then** verifies in a single pass and exposes the verdict. Input format is auto-detected.

### Operation details

<table>
<thead>
  <tr><th>Group</th><th>Name</th><th>Parameter</th><th>Value</th><th>Description</th></tr>
</thead>
<tbody>
  <tr><td rowspan="5">General</td><td>Input Source</td><td>inputSource</td><td>Message Body (default), Expression</td><td>Where the input comes from.</td></tr>
  <tr><td>Source Content</td><td>sourceContent</td><td>e.g. <code>${payload}</code></td><td>Shown when <code>inputSource</code> is <code>Expression</code>.</td></tr>
  <tr><td>Decryption Key (yours)</td><td>decryptionConfigKey</td><td>a PGP_PRIVATE_KEY connection (required)</td><td>Your private-key connection, used to decrypt.</td></tr>
  <tr><td>Verification Config Key</td><td>verificationConfigKey</td><td>a PGP_PUBLIC_KEY connection (required)</td><td>The sender's public-key connection, used to verify.</td></tr>
  <tr><td>Require Integrity / Valid Signer</td><td>requireIntegrity / requireValidSignerKey</td><td>true (default), false</td><td>Reject on missing integrity protection, or on an unusable/untrusted signer key.</td></tr>
  <tr><td rowspan="2">Advanced</td><td>Output Type</td><td>outputType</td><td>BINARY (default), TEXT</td><td>How the recovered output is represented; <code>BINARY</code> round-trips any file losslessly. Set <code>TEXT</code> for a readable string.</td></tr>
  <tr><td>Charset</td><td>charset</td><td>UTF-8</td><td>Shown when <code>outputType</code> is <code>TEXT</code>.</td></tr>
  <tr><td rowspan="2">Output</td><td>Response Variable</td><td>responseVariable</td><td>required</td><td>Variable the output is assigned to.</td></tr>
  <tr><td>Overwrite Body</td><td>overwriteBody</td><td>false (default), true</td><td>Write the result to the message body.</td></tr>
</tbody>
</table>

**Result attributes:** `signatureValid` (boolean), `fileName`, `modificationTime`.

### Sample configuration

```xml
<cryptography.pgpDecryptAndVerify>
    <decryptionConfigKey>my-private</decryptionConfigKey>
    <verificationConfigKey>partner-public</verificationConfigKey>
    <requireIntegrity>true</requireIntegrity>
    <requireValidSignerKey>true</requireValidSignerKey>
    <responseVariable>dec</responseVariable>
    <overwriteBody>false</overwriteBody>
</cryptography.pgpDecryptAndVerify>

<filter xpath="${vars.dec.attributes.signatureValid}">
    <then>
        <property name="payload" expression="${vars.dec.payload}" scope="default"/>
        <!-- signature valid: continue processing -->
    </then>
    <else>
        <log category="WARN"><property name="msg" value="REJECTED: bad PGP signature"/></log>
        <drop/>
    </else>
</filter>
```

---

## Error codes

When an operation fails it raises one of the following error codes (available on the message context
for a fault sequence to branch on).

<table>
<thead>
  <tr><th>Code</th><th>Name</th><th>Meaning</th></tr>
</thead>
<tbody>
  <tr><td>701301</td><td>INVALID_INPUT</td><td>The input payload/content is missing or malformed.</td></tr>
  <tr><td>701302</td><td>INVALID_CONFIGURATION</td><td>The operation or connection is misconfigured.</td></tr>
  <tr><td>701303</td><td>KEY_NOT_FOUND</td><td>No key matched the <code>keyIdentifier</code> (or the ring is empty).</td></tr>
  <tr><td>701304</td><td>KEY_LOAD_ERROR</td><td>The key file could not be read or parsed.</td></tr>
  <tr><td>701305</td><td>INVALID_PASSPHRASE</td><td>The passphrase for the private key is wrong.</td></tr>
  <tr><td>701306</td><td>INVALID_MESSAGE_FORMAT</td><td>The input is not a valid OpenPGP message.</td></tr>
  <tr><td>701307</td><td>INTEGRITY_CHECK_FAILED</td><td>The integrity-protection (MDC) check failed — the message was altered.</td></tr>
  <tr><td>701308</td><td>INTEGRITY_PROTECTION_MISSING</td><td>Integrity protection was required (<code>requireIntegrity=true</code>) but absent.</td></tr>
  <tr><td>701309</td><td>OPERATION_ERROR</td><td>The cryptographic operation failed.</td></tr>
  <tr><td>701310</td><td>GENERAL_ERROR</td><td>An unclassified error.</td></tr>
  <tr><td>701320</td><td>KEY_UNUSABLE</td><td>The key is revoked or expired.</td></tr>
  <tr><td>701321</td><td>SIGNER_KEY_UNTRUSTED</td><td>The signer's key is untrusted and <code>requireValidSignerKey=true</code>.</td></tr>
</tbody>
</table>
