**Version - Usage**

Die Version des vorliegenden Dokuments.

Die Version kann noch Vorabinformationen (z. B. 1.0.0-17) oder Metadaten für Dokumente im "Entwurfsstatus" enthalten.
Für Dokumente im `interim` oder `final` Status dürfen keine Informationen über die Vorabversion enthalten sein.

Generell wird zwischen ganzzahliger Versionierung und semantischer Versionierung unterschieden.
Bei der ganzzahligen Versionierung wird die Versionsnummer bei jeder öffentlichen Freigabe um eins erhöht.
Bei der semantischen Versionierung hat die Versionsnummer die Form `MAJOR.MINOR.PATCH` und die einzelnen Teile werden unter bestimmten Bedingungen inkrementiert.
Immer wenn der Anwender einen neuen Abgleichslauf in seiner Asset-Datenbank durchführen muss (Abgleich der Produkte aus dem CSAF-Produktbaum mit den eingesetzten Produkten), wird die Version `MAJOR` inkrementiert.
Bei kleinen Änderungen, wie der Korrektur von Tippfehlern, wird die Version "PATCH" inkrementiert.
Alle dazwischen liegenden Änderungen führen zu einer Erhöhung der `MINOR`-Version.
Die genauen Regeln des Versionsschemas sind in [Abschnitt 3.1.11 der Spezifikation](https://docs.oasis-open.org/csaf/csaf/v2.0/cs02/csaf-v2.0-cs02.html#3111-version-type) definiert.

Eine weitere Beschreibung dieses Typs findet sich unter [types](types/version-usage.de.md).
