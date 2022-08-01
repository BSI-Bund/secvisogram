**Version - Usage**

Verschiedene Versionen des Generators können CSAF-Dokumente mit möglicherweise unterschiedlicher Struktur erzeugen.
Basierend auf diesem Wert müssen möglicherweise unterschiedliche Pfade für den Abgleich verwendet werden.

*Beispiele:*

* Ein Unternehmen kann seinen Namen und damit auch den `full_product_name` ändern und die Erzeugung des Dokuments ändert sich.
  Dies würde eine Anpassung des Abgleichs erfordern.

Eine Änderung in der Versionierung (z.B. Wechsel von [integer versioning](https://docs.oasis-open.org/csaf/csaf/v2.0/csaf-v2.0.html#31112-version-type---semantic-versioning) zu
[semantische Versionierung](https://docs.oasis-open.org/csaf/csaf/v2.0/csaf-v2.0.html#31111-version-type---integer-versioning)) erfordert eine Änderung des Abgleichs.

*Beispiele:*

* `0.6.0`
* `1.0.0-beta+exp.sha.a1c44f85`
* `2`