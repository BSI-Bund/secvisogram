# Checkliste für das Erstellen eines CSAF Dokuments

Dieses Dokument soll eine Checkliste für CSAF-Dokumente unterschiedlichster Profile bieten.
Bitte verwenden Sie immer die Prüfungen für das Profil CSAF Base und falls ein anderes Profil verwendet wird, führen Sie
bitte die zusätzlichen, spezifischen Prüfungen durch.

Für jedes Profil wird eine Liste von Feldern aufgeführt, die als Best Practice gelten und ausgefüllt werden sollten.
Die Pflichtfelder, die ausgefüllt werden müssen, werden bereits durch eine Schema-Validierung überprüft.

## Prüfungen für Dokumente nach CSAF Base Profil

- Entspricht ein spezifischeres Profil dem Zweck dieses Dokuments besser?
- Sind die Validierungen und Dokumententests erfolgreich?
- Entspricht der Dateiname den angegebenen Regeln (siehe Kapitel 5.1 der CSAF Spezifikation)?
- Wurden alle optionalen und informativen Tests durchgeführt und deren Ergebnisse bewertet?

### Die gemäß Best Practice zu befüllenden Felder

- `/document/notes[]/title`
- `/vulnerabilities[]/scores[]/cvss_v3`
- `/vulnerabilities[]/scores[]/cvss_v3/attackComplexity`
- `/vulnerabilities[]/scores[]/cvss_v3/attackVector`
- `/vulnerabilities[]/scores[]/cvss_v3/availabilityImpact`
- `/vulnerabilities[]/scores[]/cvss_v3/confidentialityImpact`
- `/vulnerabilities[]/scores[]/cvss_v3/integrityImpact`
- `/vulnerabilities[]/scores[]/cvss_v3/privilegesRequired`
- `/vulnerabilities[]/scores[]/cvss_v3/scope`
- `/vulnerabilities[]/scores[]/cvss_v3/userInteraction`

## Prüfunen für Dokumente nach CSAF Security Incident Response Profil

- Ist das Feld `/document/category` befüllt mit dem Wert `csaf_security_incident_response`?
- Gibt es eine angemessene Beschreibung, um die Reaktion auf den Vorfall verstehen zu können (im Feld `/document/notes`)
  ?

### Die gemäß Best Practice zu befüllenden Felder

- `/document/distribution`
- `/document/notes[]/title`
- `/vulnerabilities[]/scores[]/cvss_v3`
- `/vulnerabilities[]/scores[]/cvss_v3/attackComplexity`
- `/vulnerabilities[]/scores[]/cvss_v3/attackVector`
- `/vulnerabilities[]/scores[]/cvss_v3/availabilityImpact`
- `/vulnerabilities[]/scores[]/cvss_v3/confidentialityImpact`
- `/vulnerabilities[]/scores[]/cvss_v3/integrityImpact`
- `/vulnerabilities[]/scores[]/cvss_v3/privilegesRequired`
- `/vulnerabilities[]/scores[]/cvss_v3/scope`
- `/vulnerabilities[]/scores[]/cvss_v3/userInteraction`

## Prüfungen für Dokumente nach CSAF Informational Advisory Profil

- Ist das Feld `/document/category` befüllt mit dem Wert `csaf_informational_advisory`?
- Gibt es eine angemessene Beschreibung, um das tatsächliche Problem und die Empfehlungen zu dem Vorfall verstehen zu
  können (im Feld`/document/notes`)?

### Die gemäß Best Practice zu befüllenden Felder

- `/document/distribution`
- `/document/notes[]/title`

## Prüfungen für Dokumente nach CSAF Security Advisory Profil

- Ist das Feld `/document/category` befüllt mit dem Wert `csaf_security_advisory`?
- Wenn Sie hauptsächlich nicht betroffene Produkte auflisten, verwenden Sie bitte das Profil VEX.
- Sind alle Produkte richtig beschrieben und gut identifizierbar (`/vulnerabilities[]/product_status`)?
- Sind alle Abhilfemaßnahmen für betroffene Produkte ordnungsgemäß und verständlich beschrieben, d.h. gibt es eine
  Handlungsanweisung in `/vulnerabilities[]/remediations`?

### Die gemäß Best Practice zu befüllenden Felder

- `/document/acknowledgments`
- `/document/acknowledgments[]/names`
- `/document/acknowledgments[]/organization`
- `/document/acknowledgments[]/summary`
- `/document/aggregate_severity/text`
- `/document/distribution`
- `/document/distribution/tlp`
- `/document/distribution/tlp/label`
- `/document/notes`
- `/document/notes[]/title`
- `/document/publisher/contact_details`
- `/document/references`
- `/product_tree/branches`
- `/vulnerabilities[]/acknowledgments[]/names`
- `/vulnerabilities[]/acknowledgments[]/organization`
- `/vulnerabilities[]/acknowledgments[]/summary`
- `/vulnerabilities[]/cve`
- `/vulnerabilities[]/cwe`
- `/vulnerabilities[]/involvements[]/date`
- `/vulnerabilities[]/involvements[]/summary`
- `/vulnerabilities[]/notes[]/title`
- `/vulnerabilities[]/product_status/fixed`
- `/vulnerabilities[]/product_status/known_affected`
- `/vulnerabilities[]/references`
- `/vulnerabilities[]/remediations`
- `/vulnerabilities[]/remediations[]/url`
- `/vulnerabilities[]/scores`
- `/vulnerabilities[]/scores[]/cvss_v3`
- `/vulnerabilities[]/scores[]/cvss_v3/attackComplexity`
- `/vulnerabilities[]/scores[]/cvss_v3/attackVector`
- `/vulnerabilities[]/scores[]/cvss_v3/availabilityImpact`
- `/vulnerabilities[]/scores[]/cvss_v3/confidentialityImpact`
- `/vulnerabilities[]/scores[]/cvss_v3/integrityImpact`
- `/vulnerabilities[]/scores[]/cvss_v3/privilegesRequired`
- `/vulnerabilities[]/scores[]/cvss_v3/scope`
- `/vulnerabilities[]/scores[]/cvss_v3/userInteraction`
- `/vulnerabilities[]/threats[]/date`
- `/vulnerabilities[]/threats[]/group_ids`
- `/vulnerabilities[]/threats[]/product_ids`
- `/vulnerabilities[]/title`

## Prüfungen für Dokumente nach CSAF VEX Profil

- Ist das Feld `/document/category` befüllt mit dem Wert `csaf_vex`?
- Sind alle Abhilfemaßnahmen für betroffene Produkte ordnungsgemäß und verständlich beschrieben, d.h. gibt es eine
  Handlungsanweisung in `/vulnerabilities[]/remediations`?
- Für nicht betroffene Produkte muss eine angemessene Beschreibung vorliegen, aus der hervorgeht, warum das Produkt
  nicht betroffen ist (Impact Statement).

### Die gemäß Best Practice zu befüllenden Felder

- `/document/notes[]/title`
- `/document/publisher/contact_details`
- `/document/references`
- `/product_tree/branches`
- `/vulnerabilities[]/flags[]/date`
- `/vulnerabilities[]/involvements[]/date`
- `/vulnerabilities[]/involvements[]/summary`
- `/vulnerabilities[]/notes[]/title`
- `/vulnerabilities[]/references`
- `/vulnerabilities[]/remediations[]/url`
- `/vulnerabilities[]/scores[]/cvss_v3`
- `/vulnerabilities[]/scores[]/cvss_v3/attackComplexity`
- `/vulnerabilities[]/scores[]/cvss_v3/attackVector`
- `/vulnerabilities[]/scores[]/cvss_v3/availabilityImpact`
- `/vulnerabilities[]/scores[]/cvss_v3/confidentialityImpact`
- `/vulnerabilities[]/scores[]/cvss_v3/integrityImpact`
- `/vulnerabilities[]/scores[]/cvss_v3/privilegesRequired`
- `/vulnerabilities[]/scores[]/cvss_v3/scope`
- `/vulnerabilities[]/scores[]/cvss_v3/userInteraction`
- `/vulnerabilities[]/threats[]/date`
