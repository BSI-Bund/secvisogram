# Product Tree - Usage

Der Produktbaum enthält alle Definitionen von Produkten, auf die später im CSAF-Dokument verwiesen wird.
Dies ist unabhängig vom Status der Produkte.

Es wird empfohlen, eine hierarchische Struktur mit Hilfe von Verzweigungen im `product_tree` zu modellieren.
Die Zweigstruktur besteht typischerweise aus Hersteller, Produktname und Produktversion.
Zwischen dem Hersteller und dem Produktnamen kann auch eine Produktfamilie aufgeführt werden. Dies vereinfacht die Gruppierung und die Anzeige in einem für den Menschen lesbaren Ratgeber.
Die Struktur hängt stark von der Struktur der Produkte ab und davon, wie sie den Nutzern der Hinweise bekannt sind.

*Beispiele:*

* Es gibt eine Produktfamilie mit nur 2 Produkten, die für den Hinweis relevant sind, dann muss die Produktfamilie nicht unbedingt aufgeführt werden.
* Bei einer Produktfamilie mit 120 Produkten, für die der Hinweis gilt, wird dringend empfohlen, die Familie ebenfalls aufzuführen.

Grundsätzlich sind Software- und Hardwarekomponenten getrennt darzustellen, da die Hardware gleich bleibt, auch wenn die Software aktualisiert wird.
Dies ermöglicht auch die Trennung von Software, die auf mehreren Hardware-Installationen laufen kann.
Die Verbindungen von Hardware und Software sind über `/product_tree/relationships` darzustellen.

Der `product_identification_helper` erleichtert den Abgleich zwischen dem Advisory und der Asset- oder SBOM-Datenbank.

*Beispiel:*

* Wenn sich der Name eines Unternehmens aufgrund einer Übernahme ändert, würde der Name im Prinzip ab einer bestimmten Version des Produkts geändert werden.
  Tatsächlich können aber auch andere, weitergehende Namensänderungen auftreten, die hier modelliert werden sollen.

_Ergänzung zum Profil CSAF Informational Advisory_

Wenn ein `product_tree` in einem Advisory mit dem Profil `CSAF Informational Advisory` aufgeführt ist, dann sind die aufgeführten Produkte alle Produkte, für die das Advisory gilt.
