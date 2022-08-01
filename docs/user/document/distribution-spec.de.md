# Distribution - Specification

Regeln für die gemeinsame Nutzung von Dokumenten (`Distribution`) des Werttyps `Object` mit mindestens 1 der 2 Eigenschaften

* [Text](document/distribution/text-spec.de.md) (`text`)
* [Traffic Light Protocol (TLP)](document/distribution/tlp-spec.de.md) (`tlp`)

beschreibt alle Beschränkungen, wie dieses Dokument weitergegeben werden kann.

``javascript
"Verteilung": {
  // ...
  "properties": {
    "text": {
      // ...
    },
    "tlp": {
      // ...
    }
  }
}
```

Wenn beide Werte vorhanden sind, SOLLTEN die TLP-Informationen bevorzugt werden, da dies die Automatisierung erleichtert.
