# Reference - Specification

Der Wertetyp eines jeden solchen Verweises ist "Objekt" mit den obligatorischen Eigenschaften

* [URL](types/references/reference/url-spec.de.md) (`url`)
* [Zusammenfassung](types/references/reference/summary-spec.de.md) (`summary`)

enthält jeden Verweis auf Konferenzen, Papiere, Empfehlungen und andere Ressourcen, die entweder mit einem umgebenden Teil des Dokuments oder mit dem gesamten Dokument in Verbindung stehen und für den Nutzer des Dokuments von Wert sind.
Ein Verweisobjekt KANN die optionale Eigenschaft

* [Kategorie](types/references/reference/category-spec.de.md) (`category`)

```javascript
"properties": {
  "category": {
    // ...
  },
  "summary": {
    // ...
  },
  "url": {
    // ...
  }
}
```
