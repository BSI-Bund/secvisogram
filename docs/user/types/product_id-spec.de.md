# Product ID - Specification

Der Produkt-ID-Typ (`product_id_t`) vom Wertetyp `string` mit 1 oder mehr Zeichen ist ein Referenz-Token für Produktinstanzen.
Der Wert ist ein Token, das benötigt wird, um einen `full_product_name` zu identifizieren, so dass von anderen Teilen des Dokuments auf ihn verwiesen werden kann.
Es gibt kein vordefiniertes oder erforderliches Format für die Produkt-ID (`product_id`), solange sie ein Produkt im Kontext des aktuellen Dokuments eindeutig identifiziert.

```javascript
"product_id_t": {
  // ...
}
```

*Beispiele:*

* `CSAFPID-0004`
* `CSAFPID-0008`

> Auch wenn der Standard kein bestimmtes Format vorschreibt, wird empfohlen, unterschiedliche Präfixe für die
> Produkt-ID und die Produktgruppen-ID zu verwenden, um das Lesen und Parsen des Dokuments zu unterstützen.