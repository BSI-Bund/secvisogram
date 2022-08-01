# Document - Specification

Metadaten auf Dokumentebene (`Dokument`) vom Werttyp `Objekt` mit den 5 obligatorischen Eigenschaften

* Kategorie](document/category-spec.de.md) (`Kategorie`)
* [CSAF Version](document/csaf_version-spec.de.md) (`csaf_version`)
* [Herausgeber](document/publisher-spec.de.md) (`Herausgeber`)
* [Titel](document/title-spec.de.md) (`title`)
* Tracking](document/tracking-spec.de.md) (`tracking`)

erfasst die Metadaten zu diesem Dokument, das einen bestimmten Satz von Sicherheitshinweisen beschreibt.
Zusätzlich kann das `document`-Objekt die folgenden 7 optionalen Eigenschaften aufweisen

* [Danksagungen](document/acknowledgments-spec.de.md) (`acknowledgments`)
* [Aggregate Severity](document/aggregate_severity-spec.de.md) (`aggregate_severity`)
* [Verteilung](document/distribution-spec.de.md) (`distribution`)
* [Sprache](document/lang-spec.de.md) (`lang`)
* [Anmerkungen](document/notes-spec.de.md) (`Anmerkungen`)
* [Referenzen](document/references-spec.de.md) (`references`)
* [Quellsprache](document/source_lang-spec.de.md) (`source_lang`)

```javascript
"document": {
  // ...
  "properties": {
    "Bestätigungen": {
      // ...
    },
    "aggregate_severity" : {
      // ...
    },
    "category": {
      // ...
    },
    "csaf_version": {
      // ...
    },
    "distribution": {
      // ...
    },
    "lang": {
      // ...
    },
    "notes": {
      // ...
    },
    "publisher": {
      // ...
    },
    "Referenzen": {
      // ...
    },
    "source_lang": {
      // ...
    },
    "title": {
      // ...
    },
    "tracking": {
      // ...
    }
  }
}
```