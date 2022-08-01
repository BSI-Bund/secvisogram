# Status - Specification

Dokumentstatus (`status`) vom Wertetyp `string` und `enum` definiert den Entwurfsstatus des Dokuments.
Der Wert MUSS einer der folgenden sein:

* `draft`
* `final`
* `interim`

Der Wert `draft` zeigt an, dass es sich um eine Vorabversion handelt, die nur für den internen Gebrauch der herausgebenden Partei bestimmt ist, oder möglicherweise extern verwendet wird, wenn die Partei um Feedback bittet oder ihre Absichten in Bezug auf ein bestimmtes Thema kundtut.

Der Wert `final` bedeutet, dass die herausgebende Partei versichert, dass sich der Inhalt wahrscheinlich nicht ändern wird.
Der Status "endgültig" ist nur ein Hinweis und schließt Aktualisierungen nicht aus.
Dieser Wert SOLLTE verwendet werden, wenn die ausstellende Partei keine, langsame oder wenige Änderungen erwartet.

Der Wert `interim` zeigt an, dass die ausstellende Partei schnelle Aktualisierungen erwartet.
Dieser Wert SOLLTE verwendet werden, wenn die erwartete Veröffentlichungsrate für dieses Dokument deutlich höher ist als für andere Dokumente.
Sobald sich die Rate verlangsamt, MUSS sie auf `final` geändert werden.
Dies KANN in einer Patch-Version geschehen.

> Dies ist für nachgelagerte Anbieter äußerst nützlich, um die Endbenutzer ständig über laufende Untersuchungen zu informieren. Es kann
Es kann > als Hinweis darauf dienen, das CSAF-Dokument häufiger zu ziehen.
