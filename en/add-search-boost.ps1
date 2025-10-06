# PowerShell script to add search boost to latest connector documentation
# This boosts search rankings for the latest connector versions

$connectors = @(
    "reference/connectors/amazons3-connector/amazons3-connector-overview.md",
    "reference/connectors/amazonlambda-connector/amazonlambda-connector-overview.md",
    "reference/connectors/amazondynamodb-connector/amazondynamodb-connector-overview.md",
    "reference/connectors/amazonsqs-connector/amazonsqs-connector-overview.md",
    "reference/connectors/email-connector/email-connector-example.md",
    "reference/connectors/email-connector/email-connector-config.md",
    "reference/connectors/file-connector/file-connector-overview.md",
    "reference/connectors/file-connector/5.x/file-connector-example.md",
    "reference/connectors/file-connector/5.x/file-connector-config.md",
    "reference/connectors/gmail-connector/gmail-connector-overview.md",
    "reference/connectors/gmail-connector/gmail-connector-example.md",
    "reference/connectors/gmail-connector/gmail-connector-config.md",
    "reference/connectors/google-spreadsheet-connector/google-spreadsheet-overview.md",
    "reference/connectors/google-spreadsheet-connector/google-spreadsheet-connector-example.md",
    "reference/connectors/google-spreadsheet-connector/google-spreadsheet-connector-config.md",
    "reference/connectors/google-pubsub-connector/googlepubsub-connector-overview.md",
    "reference/connectors/google-pubsub-connector/googlepubsub-connector-example.md",
    "reference/connectors/google-pubsub-connector/googlepubsub-connector-reference.md",
    "reference/connectors/iso8583-connector/iso8583-connector-overview.md",
    "reference/connectors/iso8583-connector/iso8583-connector-example.md",
    "reference/connectors/iso8583-connector/iso8583-connector-reference.md",
    "reference/connectors/jira-connector/jira-connector-overview.md",
    "reference/connectors/jira-connector/jira-connector-config.md",
    "reference/connectors/jira-connector/jira-connector-example.md",
    "reference/connectors/kafka-connector/kafka-connector-overview.md",
    "reference/connectors/kafka-connector/kafka-connector-producer-example.md",
    "reference/connectors/kafka-connector/kafka-connector-config.md",
    "reference/connectors/ldap-connector/ldap-connector-overview.md",
    "reference/connectors/ldap-connector/ldap-connector-example.md",
    "reference/connectors/ldap-connector/ldap-server-configuration.md",
    "reference/connectors/microsoft-azure-storage-connector/microsoft-azure-overview.md",
    "reference/connectors/microsoft-azure-storage-connector/2.x/microsoft-azure-storage-connector-example.md",
    "reference/connectors/microsoft-azure-storage-connector/2.x/microsoft-azure-storage-reference.md",
    "reference/connectors/mongodb-connector/mongodb-connector-overview.md",
    "reference/connectors/mongodb-connector/3.x/mongodb-connector-example.md",
    "reference/connectors/mongodb-connector/3.x/mongodb-connector-config.md",
    "reference/connectors/redis-connector/redis-connector-overview.md",
    "reference/connectors/redis-connector/redis-connector-example.md",
    "reference/connectors/redis-connector/2.7.x/redis-connector-reference.md",
    "reference/connectors/salesforce-connectors/sf-overview.md",
    "reference/connectors/salesforce-connectors/3.x/sf-rest-connector-config.md",
    "reference/connectors/salesforce-connectors/3.x/sf-rest-connector-example.md",
    "reference/connectors/servicenow-connector/servicenow-overview.md",
    "reference/connectors/servicenow-connector/servicenow-connector-config.md",
    "reference/connectors/servicenow-connector/servicenow-connector-example.md",
    "reference/connectors/smpp-connector/smpp-connector-overview.md",
    "reference/connectors/smpp-connector/smpp-connector-example.md",
    "reference/connectors/smpp-connector/smpp-connector-config.md",
    "reference/connectors/twitter-connector/twitter-connector-overview.md",
    "reference/connectors/twitter-connector/4.x/twitter-connector-example.md",
    "reference/connectors/twitter-connector/4.x/twitter-connector-reference.md"
)

$boostMetadata = @"
---
search:
  boost: 2
---

"@

$processedCount = 0
$skippedCount = 0
$errorCount = 0

foreach ($connector in $connectors) {
    $filePath = Join-Path "docs" $connector
    
    if (Test-Path $filePath) {
        try {
            $content = Get-Content $filePath -Raw -Encoding UTF8
            
            # Check if already has boost metadata
            if ($content -match "^---\s*\nsearch:\s*\n\s+boost:") {
                Write-Host "SKIPPED (already has boost): $connector" -ForegroundColor Yellow
                $skippedCount++
                continue
            }
            
            # Check if has other frontmatter
            if ($content -match "^---\s*\n") {
                Write-Host "SKIPPED (has other frontmatter): $connector" -ForegroundColor Yellow
                $skippedCount++
                continue
            }
            
            # Add boost metadata at the beginning
            $newContent = $boostMetadata + $content
            Set-Content -Path $filePath -Value $newContent -Encoding UTF8 -NoNewline
            
            Write-Host "ADDED boost to: $connector" -ForegroundColor Green
            $processedCount++
        }
        catch {
            Write-Host "ERROR processing: $connector - $_" -ForegroundColor Red
            $errorCount++
        }
    }
    else {
        Write-Host "NOT FOUND: $connector" -ForegroundColor Red
        $errorCount++
    }
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "SUMMARY:" -ForegroundColor Cyan
Write-Host "  Processed: $processedCount" -ForegroundColor Green
Write-Host "  Skipped: $skippedCount" -ForegroundColor Yellow
Write-Host "  Errors: $errorCount" -ForegroundColor Red
Write-Host "========================================`n" -ForegroundColor Cyan
