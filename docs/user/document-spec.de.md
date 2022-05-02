# Document - Spezifikation

Metadaten des Dokuments (`document`) des Typs `object` mit den 5 verpflichtenden Eigenschaften

* [Kategorie](document/category-spec.de.md) (`category`)
* [CSAF Version](document/csaf_version-spec.de.md) (`csaf_version`)
* [Herausgeber](document/publisher-spec.de.md) (`publisher`)
* [Titel](document/title-spec.de.md) (`title`)
* [Versionsverfolgung](document/tracking-spec.de.md) (`tracking`)

umfasst die Metadaten des Dokuments das eine bestimmte Menge von Security Advisories. Zusätzlich können die 7 optionalen Eigenschaften

* [Danksagungen](document/acknowledgments-spec.de.md) (`acknowledgments`)
* [Aggregierter Schweregrad](document/aggregate_severity-spec.de.md) (`aggregate_severity`)
* [Verbreitung](document/distribution-spec.de.md) (`distribution`)
* [Sprache](document/lang-spec.de.md) (`lang`)
* [Anmerkungen](document/notes-spec.de.md) (`notes`)
* [Referenzen](document/references-spec.de.md) (`references`)
* [Ausgangssprache](document/source_lang-spec.de.md) (`source_lang`)

angegeben werden.

```javascript
"document": {
  // ...
  "properties": {
    "acknowledgments": {
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
    "references": {
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
