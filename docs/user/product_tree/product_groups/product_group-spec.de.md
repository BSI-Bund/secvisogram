# Product Groups - Specification

Die Artikel der Produktgruppe sind vom Wertetyp "Objekt" mit den 2 obligatorischen Eigenschaften

* [Gruppen-ID](product_tree/product_groups/product_group/group_id-spec.de.md) (`group_id`)
* [Produkt-IDs](product_tree/product_groups/product_group/product_ids-spec.de.md) (`product_ids`)

und die optionale

* [Zusammenfassung](product_tree/product_groups/product_group/summary-spec.de.md) (`summary`)

Eigenschaft.

```javascript
    "properties": {
      "group_id": {
        // ...
      },
      "product_ids": {
        // ...
      },
      "summary": {
        // ...
      }
    }
```