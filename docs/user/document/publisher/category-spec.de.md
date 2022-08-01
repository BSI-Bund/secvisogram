# Category - Specification

Die Kategorie des Herausgebers (`category`) vom Wertetyp `string` und `enum` liefert Informationen über die Kategorie des Herausgebers, der das Dokument freigibt. Die gültigen Werte sind:

* `Koordinator`
* `Entdecker`
* `andere`
* `Übersetzer`
* `user`
* `Anbieter`

Der Wert "Koordinator" bezeichnet Personen oder Organisationen, die die Reaktion eines einzelnen Anbieters oder mehrerer Anbieter auf eine Schwachstelle, eine Sicherheitslücke oder einen Vorfall verwalten.
Dazu gehören alle Computer Emergency/Incident Response Teams (CERTs/CIRTs) oder Agenten, die im Namen eines Forschers handeln.

Der Wert "Entdecker" bezeichnet Personen oder Organisationen, die Schwachstellen oder Sicherheitslücken finden.
Dies schließt alle Arten von Forschern ein.

Der Wert `Translator` bezeichnet Personen oder Organisationen, die CSAF-Dokumente übersetzen.
Dazu gehören alle Arten von Sprachübersetzern, auch solche, die für die Partei arbeiten, die den ursprünglichen Hinweis herausgibt.

Der Wert "Sonstige" ist ein Auffangbecken für alle anderen.
Dazu gehören derzeit Redakteure, Gutachter, Weiterleiter, Wiederveröffentlicher und sonstige Mitwirkende.

Der Wert "Benutzer" bezeichnet jeden, der das Produkt eines Anbieters verwendet.

Der Wert "Anbieter" steht für Entwickler oder Betreuer von Informationssystemprodukten oder -diensten.
Dazu gehören alle maßgeblichen Produktanbieter, Product Security Incident Response Teams (PSIRTs) und Produktwiederverkäufer und -vertreiber, einschließlich maßgeblicher Anbieterpartner.
