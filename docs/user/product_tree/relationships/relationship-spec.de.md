# Relationship - Specification

Das Beziehungselement hat den Werttyp "Objekt" und vier obligatorische Eigenschaften:

* [Beziehungskategorie](product_tree/relationships/relationship/category-spec.de.md) (`category`)
* [Vollständiger Produktname](product_tree/relationships/relationship/full_product_name-spec.de.md) (`full_product_name`)
* [Produktreferenz](product_tree/relationships/relationship/product_reference-spec.de.md) (`product_reference`)
* [Bezieht sich auf Produktreferenz](product_tree/relationships/relationship/relates_to_product_reference-spec.de.md) (`relates_to_product_reference`)

Das Relationship-Element stellt eine Verbindung zwischen zwei existierenden `full_product_name_t`-Elementen her, was es dem Dokumentersteller ermöglicht, eine Kombination von zwei Produkten zu definieren, die einen neuen `full_product_name`-Eintrag bilden.

```javascript
"properties": {
  "category": {
    // ...
  },
  "full_product_name": {
    // ...
  },
  "produkt_referenz": {
    // ...
  },
  "relates_to_product_reference": {
    // ...
  }
}
```

> Die Situation, in der es notwendig ist, eine Beziehung zu deklarieren, ist gegeben, wenn ein Produkt z.B. nur dann angreifbar ist, wenn es zusammen mit
> zusammen mit einem anderen installiert wird, oder um Betriebssystemkomponenten zu beschreiben.