# Full Product Name - Specification

Full Product Name (`full_product_name_t`) mit dem Wertetyp `object` spezifiziert Informationen über das Produkt und weist die Produkt-ID zu. Die Eigenschaften

* [Name](types/full_product_name/name-spec.de.md) (`name`)
* [Produkt-ID](types/full_product_name/product_id-spec.de.md) (`product_id`)

sind erforderlich. Die Eigenschaft

* [Produktidentifikationshilfe](types/full_product_name/product_identification_helper-spec.de.md)
  (`Produkt-Identifikations-Helfer`)

ist optional.

```javascript
"full_product_name_t": {
  // ...
  "properties": {
    "name": {
      // ...
    },
    "product_id": {
      // ...
    },
    "product_identification_helper": {
      // ...
    }
  }
}
```