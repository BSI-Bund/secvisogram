# Engine - Specification

Engine der Dokumentenerzeugung (`engine`) vom Wertetyp `object` mit obligatorischer Eigenschaft

* [Name der Engine](document/tracking/generator/engine/name-spec.de.md) (`Name`)

und optionaler Eigenschaft

* [Engine Version](document/tracking/generator/engine/version-spec.de.md) (`version`)

enthält Informationen über die Engine, die das CSAF-Dokument erzeugt hat.

```javascript
"engine": {
  // ...
  "properties": {
    "name": {
      // ...
    },
    "version": {
      // ...
    }
  }
}
```
