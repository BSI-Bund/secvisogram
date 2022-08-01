# Aggregate Severity - Specification

Aggregate Severity (`aggregate_severity`) vom Wertetyp `object` mit der obligatorischen Eigenschaft

* [Text](document/aggregate_severity/text-spec.de.md) (`text`)

und der optionalen Eigenschaft

* [Namespace](document/aggregate_severity/namespace-spec.de.md) (`namespace`)

ist ein Mittel, das vom Hersteller des Dokuments zur Verfügung gestellt wird, um die Dringlichkeit und Kritikalität zu vermitteln, mit der die gemeldete(n) Schwachstelle(n) behoben werden sollten.
Es ist eine Metrik auf Dokumentenebene und wird auf das Dokument als Ganzes angewendet - nicht auf eine bestimmte Schwachstelle.
Der Wertebereich in diesem Feld wird gemäß den Richtlinien und Verfahren des Dokumentherstellers festgelegt.

```javascript
"aggregate_severity": {
  // ...
  "properties": {
    "namespace": {
      // ...
    },
    "text": {
      // ...
    }
  }
}
```