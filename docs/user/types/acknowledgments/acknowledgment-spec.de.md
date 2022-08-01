# Acknowledgment - Specification

Der Wertetyp von Acknowledgment ist `Object` mit mindestens 1 und höchstens 4 Eigenschaften.
Jedes dieser Elemente erkennt Beiträge an, indem es die Personen beschreibt, die einen Beitrag geleistet haben.
Die Eigenschaften sind:

* [Names](types/acknowledgments/acknowledgment/names-spec.de.md) (`names`)
* [Organisation](types/acknowledgments/acknowledgment/organization-spec.de.md) (`organization`)
* [Zusammenfassung](types/acknowledgments/acknowledgment/summary-spec.de.md) (`summary`)
* [URLs](types/acknowledgments/acknowledgment/urls-spec.de.md) (`urls`)

```javascript
"properties": {
  "names": {
    // ...
  },
  "organisation": {
    // ...
  },
  "Zusammenfassung": {
    // ...
  },
  "urls": {
    // ...
  }
}
```

*Beispiel:*

```javascript
"Bestätigungen": [
  {
    "names": [
      "Johann Sebastian Bach",
      "Georg Philipp Telemann",
      "Georg Friedrich Händel"
    ],
    "Organisation": "Barocke Komponisten",
    "Zusammenfassung": "wonderful music"
  },
  {
    "Organisation": "CISA",
    "Zusammenfassung": "Koordinierungsbemühungen",
    "urls": [
      "https://cisa.gov"
    ]
  },
  {
    "Organisation": "BSI",
    "Zusammenfassung": "Unterstützung bei der Koordinierung"
  },
  {
    "Namen": [
      "Antonio Vivaldi"
    ],
    "summary": "Einfluss auf andere Komponisten"
  },
]
```

Das obige Beispiel SOLLTE zu folgendem Ergebnis in einem menschenlesbaren Ratgeber führen:

> Wir danken den folgenden Parteien für ihre Bemühungen:
>
> Johann Sebastian Bach, Georg Philipp Telemann, Georg Friedrich Händel von den Barockkomponisten für wunderbare Musik
> * CISA für die Koordinierungsbemühungen (siehe: [https://cisa.gov](https://cisa.gov))
> * BSI für die Unterstützung bei der Koordination
> Antonio Vivaldi für die Beeinflussung anderer Komponisten