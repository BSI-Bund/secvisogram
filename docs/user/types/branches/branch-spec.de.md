# Branch - Specification

Jeder Zweig enthält genau 3 Eigenschaften und ist Teil der hierarchischen Struktur des Produktbaums.
Die Eigenschaften

* [Name](types/branches/branch/name-spec.de.md) (`name`)
* [Kategorie](types/branches/branch/category-spec.de.md) (`category`)

sind obligatorisch.
Darüber hinaus enthält das Objekt entweder eine

* [Zweige](product_tree/branches-spec.de.md) (`branches`)

oder eine

* [Produkt](types/branches/branch/product-spec.de.md) (Eigenschaft `product`.

```javascript
"properties": {
  "branches": {
    // ...
  },
  "Kategorie": {
    // ...
  },
  "name": {
    // ...
  },
  "produkt": {
    // ...
  }
}
```

> `branches_t` unterstützt den Aufbau einer hierarchischen Struktur von Produkten, die es erlaubt, die Beziehung von
> Produkten zueinander aufzeigt und eine Gruppierung zur einfacheren Referenzierung ermöglicht. Als Beispiel kann die Struktur die folgenden > Ebenen verwenden
> folgende Ebenen verwenden: `Anbieter` -> `Produktfamilie` -> `Produktname` -> `Produktversion`.
> Es wird empfohlen, die hierarchische Struktur `Anbieter` -> `Produktname` -> `Produkt_Version` zu verwenden, wann immer
> möglich zu verwenden, um die Identifizierung und den Abgleich von Produkten auf der Verbraucherseite zu unterstützen.