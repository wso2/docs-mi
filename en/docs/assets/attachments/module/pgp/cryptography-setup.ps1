# cryptography-setup.ps1  (native Windows / PowerShell)
#
# Generates the two PGP key pairs (Alice = sender, Bob = receiver) used by the
# WSO2 MI Cryptography (PGP) Module example and exports them to .\keys.
#
# Add the four exported files to the project under resources\keys so the
# connections can reference them as resources:keys/<file>.asc. Each connection's
# keyIdentifier is simply the key's email (alice@example.com / bob@example.com).
#
# The same four files are reused across all three use cases in the example:
#   - alice-private.asc / alice-public.asc  (Alice signs;  verified with the public key)
#   - bob-public.asc    / bob-private.asc   (encrypted to Bob; Bob decrypts)
#
# Usage (in PowerShell):
#   powershell -ExecutionPolicy Bypass -File .\cryptography-setup.ps1
#
# Requires: Gpg4win / gnupg (gpg) 2.1+ on the PATH.
#
# On Linux/macOS (or Git Bash / WSL) use cryptography-setup.sh instead.

$ErrorActionPreference = 'Stop'

# Use a throwaway keyring so this demo never touches your real GnuPG home.
if (-not $env:GNUPGHOME) { $env:GNUPGHOME = Join-Path $env:TEMP 'pgp-demo-keyring' }
$KeyDir    = if ($env:KEY_DIR)    { $env:KEY_DIR }    else { '.\keys' }
$AlicePass = if ($env:ALICE_PASS) { $env:ALICE_PASS } else { 'AlicePass' }
$BobPass   = if ($env:BOB_PASS)   { $env:BOB_PASS }   else { 'BobPass' }

New-Item -ItemType Directory -Force -Path $env:GNUPGHOME | Out-Null
New-Item -ItemType Directory -Force -Path $KeyDir | Out-Null

# Generate the key pairs (RSA 3072, valid for 2 years).
# --pinentry-mode loopback feeds the passphrase non-interactively so gpg never
# blocks on a pinentry dialog.
gpg --batch --pinentry-mode loopback --passphrase $AlicePass --quick-gen-key alice@example.com rsa3072 default 2y
gpg --batch --pinentry-mode loopback --passphrase $BobPass   --quick-gen-key bob@example.com   rsa3072 default 2y

# Export the keys the module reads at mediation time. --output (instead of PowerShell
# redirection, which would write UTF-16 and corrupt the armored files) and --yes keep
# this safe to re-run.
gpg --batch --yes --pinentry-mode loopback --passphrase $AlicePass --armor --output "$KeyDir/alice-private.asc" --export-secret-keys alice@example.com
gpg --batch --yes --armor --output "$KeyDir/alice-public.asc" --export alice@example.com
gpg --batch --yes --pinentry-mode loopback --passphrase $BobPass --armor --output "$KeyDir/bob-private.asc" --export-secret-keys bob@example.com
gpg --batch --yes --armor --output "$KeyDir/bob-public.asc" --export bob@example.com

Write-Host "Done. Keys written to ${KeyDir}:"
Get-ChildItem -Path $KeyDir -Filter '*.asc' | Select-Object -ExpandProperty Name
Write-Host ""
Write-Host "Next:"
Write-Host "  1. Add the four .asc files to the project under resources\keys."
Write-Host "  2. Store the passphrases ('$AlicePass' / '$BobPass') in Secure Vault as the"
Write-Host "     secrets pgp_alice_passphrase and pgp_bob_passphrase, resolved from the connections with"
Write-Host "     wso2-vault('pgp_alice_passphrase') / wso2-vault('pgp_bob_passphrase') (see the example's Prerequisites)."
Write-Host "  3. Use each key's email (alice@example.com / bob@example.com) as the"
Write-Host "     connection keyIdentifier."
