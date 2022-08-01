# Category - Specification

Die Notizkategorie (`category`) vom Wertetyp `string` und `enum` enthält die Information, um welche Art von Notiz es sich handelt.

* `Beschreibung`
* `Details`
* `faq`
* `Allgemein`
* `legal_disclaimer`
* `Sonstiges`
* `Zusammenfassung`

Der Wert `description` zeigt an, dass die Notiz eine Beschreibung von etwas ist. Die optionale Geschwister-Eigenschaft `title` kann in diesem Fall mehr Informationen enthalten.

Der Wert `details` zeigt an, dass es sich bei der Notiz um eine detaillierte Diskussion auf niedriger Ebene handelt. Die optionale Geschwister-Eigenschaft `title` KANN in diesem Fall weitere Informationen enthalten.

Der Wert `faq` zeigt an, dass es sich um eine Liste häufig gestellter Fragen handelt.

Der Wert `general` zeigt an, dass es sich um einen allgemeinen, übergeordneten Hinweis handelt. Die optionale Geschwister-Eigenschaft `title` KANN in diesem Fall weitere Informationen enthalten.

Der Wert `legal_disclaimer` zeigt an, dass der Hinweis eine mögliche rechtliche Diskussion, einschließlich Einschränkungen, im Zusammenhang mit dem Dokument darstellt.

Der Wert `other` zeigt an, dass es sich um einen Hinweis handelt, der nicht in die anderen Kategorien passt. Das optionale Geschwisterattribut `title` SOLLTE mehr Informationen enthalten, um klar anzugeben, welche Art von Hinweis in diesem Fall zu erwarten ist.

Der Wert `summary` zeigt an, dass die Notiz eine Zusammenfassung von etwas ist. Die optionale Geschwistereigenschaft `title` KANN in diesem Fall mehr Informationen enthalten.