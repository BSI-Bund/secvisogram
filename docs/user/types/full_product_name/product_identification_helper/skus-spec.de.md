# SKUs - Specification

Die Liste der Bestandseinheiten (`skus`) vom Werttyp `array` mit 1 oder mehr Elementen enthält eine Liste der vollständigen oder abgekürzten (Teil-)Bestandseinheiten.

Eine Liste von Lagerhaltungseinheiten SOLLTE nur verwendet werden, wenn die Liste der Beziehungen dazu dient, z. B. die Hardware von der Software zu entkoppeln, oder wenn sich die Lagerhaltungseinheiten während der Aktualisierung ändern.
In letzterem Fall MÜSSEN die Abhilfemaßnahmen die neuen Lagerhaltungseinheiten oder eine Beschreibung, wie diese zu erhalten sind, enthalten.

> Die Verwendung der Liste der Beziehungen im ersten Fall ist wichtig. Andernfalls ist der Endbenutzer nicht in der Lage zu erkennen
> welche Version (die betroffene oder die nicht betroffene/fixierte) verwendet wird.

```javascript
"skus": {
    //...
  "items": {
    //...
  }
}
```

[Spezifikation von SKU-Positionen](types/full_product_name/product_identification_helper/skus/sku-spec.de.md)