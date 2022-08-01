# Category - Specification

Kategorie des Verweises (`category`) vom Wertetyp `string` und `enum` gibt an, ob der Verweis auf das gleiche Dokument oder die gleiche Schwachstelle im Fokus (je nach Umfang) oder auf eine externe Ressource verweist.
Gültige "enum"-Werte sind:

* `external`
* `self`

Der Standardwert für `category` ist `external`.

Der Wert `external` zeigt an, dass dieses Dokument ein externer Verweis auf ein Dokument oder eine Verwundbarkeit im Fokus ist
ist (abhängig vom Geltungsbereich).

Der Wert "self" zeigt an, dass dieses Dokument ein Verweis auf dasselbe Dokument oder dieselbe Sicherheitslücke ist (ebenfalls abhängig vom Anwendungsbereich).

> Dies gilt auch für Verweise auf Dokumente mit gleichem Inhalt, aber anderem Dateiformat (z. B. Hinweise im PDF- oder HTML-Format).
