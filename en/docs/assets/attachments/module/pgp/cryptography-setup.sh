#!/usr/bin/env bash
#
# cryptography-setup.sh  (Linux / macOS — also works on Windows via Git Bash or WSL)
#
# Generates the two PGP key pairs (Alice = sender, Bob = receiver) used by the
# WSO2 MI Cryptography (PGP) Module example and exports them to ./keys.
#
# Add the four exported files to the project under resources/keys so the
# connections can reference them as resources:keys/<file>.asc. Each connection's
# keyIdentifier is simply the key's email (alice@example.com / bob@example.com).
#
# The same four files are reused across all three use cases in the example:
#   - alice-private.asc / alice-public.asc  (Alice signs;  verified with the public key)
#   - bob-public.asc    / bob-private.asc   (encrypted to Bob; Bob decrypts)
#
# Usage:
#   chmod +x cryptography-setup.sh
#   ./cryptography-setup.sh
#
# Requires: gnupg (gpg) 2.1+ on the PATH.
#
# On native Windows (PowerShell) use cryptography-setup.ps1 instead.

set -euo pipefail

# Use a throwaway keyring so this demo never touches your real GnuPG home.
export GNUPGHOME="${GNUPGHOME:-/tmp/pgp-demo-keyring}"
KEY_DIR="${KEY_DIR:-./keys}"
ALICE_PASS="${ALICE_PASS:-AlicePass}"
BOB_PASS="${BOB_PASS:-BobPass}"

mkdir -p "$GNUPGHOME"
chmod 700 "$GNUPGHOME" 2>/dev/null || true
mkdir -p "$KEY_DIR"

# Generate the key pairs (RSA 3072, valid for 2 years).
# --pinentry-mode loopback feeds the passphrase non-interactively so gpg never
# blocks on a pinentry dialog.
gpg --batch --pinentry-mode loopback --passphrase "$ALICE_PASS" \
    --quick-gen-key alice@example.com rsa3072 default 2y
gpg --batch --pinentry-mode loopback --passphrase "$BOB_PASS" \
    --quick-gen-key bob@example.com rsa3072 default 2y

# Export the keys the module reads at mediation time. --output (instead of shell
# redirection) and --yes keep this safe to re-run.
gpg --batch --yes --pinentry-mode loopback --passphrase "$ALICE_PASS" --armor \
    --output "$KEY_DIR/alice-private.asc" --export-secret-keys alice@example.com
gpg --batch --yes --armor --output "$KEY_DIR/alice-public.asc" --export alice@example.com
gpg --batch --yes --pinentry-mode loopback --passphrase "$BOB_PASS" --armor \
    --output "$KEY_DIR/bob-private.asc" --export-secret-keys bob@example.com
gpg --batch --yes --armor --output "$KEY_DIR/bob-public.asc" --export bob@example.com

echo "Done. Keys written to $KEY_DIR:"
ls -1 "$KEY_DIR"/alice-*.asc "$KEY_DIR"/bob-*.asc
echo
echo "Next:"
echo "  1. Add the four .asc files to the project under resources/keys."
echo "  2. Store the passphrases ('$ALICE_PASS' / '$BOB_PASS') in Secure Vault as the"
echo "     secrets pgp_alice_passphrase and pgp_bob_passphrase, resolved from the connections with"
echo "     wso2-vault('pgp_alice_passphrase') / wso2-vault('pgp_bob_passphrase') (see the example's Prerequisites)."
echo "  3. Use each key's email (alice@example.com / bob@example.com) as the"
echo "     connection keyIdentifier."
