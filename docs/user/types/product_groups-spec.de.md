# Product Groups - Specification

Liste von Produktgruppen-IDs (`product_groups_t`) vom Wertetyp `array` mit 1 oder mehreren eindeutigen Elementen (ein `set`) vom Typ Produktgruppen-ID (`product_group_id_t`) gibt eine Liste von `product_group_ids` an, um dem übergeordneten Element einen Kontext zu geben.

```javascript
"product_groups_t": {
  // ...
  "items": {
    // ...
  }
}
```

[Spezifikation von Produktgruppen-IDs](types/product_group_id-spec.de.md)