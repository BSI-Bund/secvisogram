# TLP - Specification

Traffic Light Protocol (TLP) (`tlp`) vom Wertetyp `Object` mit der obligatorischen Eigenschaft

* [Label](document/distribution/tlp/label-spec.de.md) (`label`)

und der optionalen Eigenschaft

* [URL](document/distribution/tlp/url-spec.de.md) (`url`)

liefert Einzelheiten über die TLP-Klassifizierung des Dokuments.

``javascript
"tlp": {
  // ...
  "properties": {
    "label": {
      // ...
    },
    "url": {
      // ...
    }
  }
}
```