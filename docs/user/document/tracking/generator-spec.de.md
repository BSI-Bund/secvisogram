# Generator - Specification

Dokumentgenerator (`generator`) vom Wertetyp `object` mit obligatorischer Eigenschaft

* [Engine](document/tracking/generator/engine-spec.de.md) (`engine`)

und optionaler Eigenschaft

* [Datum](document/tracking/generator/date-spec.de.md) (`date`)

ist ein Container, der alle Elemente enthält, die sich auf die Erstellung des Dokuments beziehen.
Diese Elemente verweisen darauf, wann das Dokument tatsächlich erstellt wurde, einschließlich des Datums, an dem es erzeugt wurde, und der Entität, die es erzeugt hat.

```javascript
"generator": {
  // ...
  "properties": {
    "date": {
      // ...
    },
    "motor": {
      // ...
    }
  }
}
```