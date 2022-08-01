# Product Group ID - Specification

Der Produktgruppen-ID-Typ (`product_group_id_t`) vom Wertetyp `string` mit 1 oder mehr Zeichen ist ein Referenz-Token für Produktgruppen-Instanzen.
Der Wert ist ein Token, das benötigt wird, um eine Produktgruppe zu identifizieren, so dass von anderen Teilen des Dokuments auf sie verwiesen werden kann.
Es gibt kein vordefiniertes oder erforderliches Format für die Produktgruppen-ID (`product_group_id`), solange sie eine Produktgruppe im Kontext des aktuellen Dokuments eindeutig identifiziert.

```javascript
"product_group_id_t": {
  // ...
}
```

*Beispiele:*

* `CSAFGID-0001`
* `CSAFGID-0002`
* `CSAFGID-0020`

> Auch wenn der Standard kein bestimmtes Format vorschreibt, wird empfohlen, unterschiedliche Präfixe für die
> Produkt-ID und die Produktgruppen-ID zu verwenden, um das Lesen und Parsen des Dokuments zu unterstützen.