**Purl - Usage**

Ein Purl ist eine URL, die aus sieben Komponenten besteht, die durch ein bestimmtes Zeichen getrennt sind, um eine eindeutige Analyse zu ermöglichen:

```text
scheme:type/namespace/name@version?qualifiers#subpath
```

Die Definition für jede Komponente lautet:

* `scheme`: dies ist das URL-Schema mit dem konstanten Wert "pkg". Einer der Hauptgründe für dieses einzelne Schema ist es, die zukünftige offizielle Registrierung des "pkg"-Schemas für Paket-URLs zu erleichtern. Erforderlich.
* `type`: der Paket-"Typ" oder das Paket-"Protokoll" wie maven, npm, nuget, gem, pypi, etc. Erforderlich.
* Namespace": ein Namenspräfix wie eine Maven-Gruppennummer, ein Docker-Image-Besitzer, ein GitHub-Benutzer oder eine Organisation. Optional und typspezifisch.
* `Name`: der Name des Pakets. Erforderlich.
* Version": Die Version des Pakets. Optional.
* `Qualifiers`: zusätzliche qualifizierende Daten für ein Paket, wie ein Betriebssystem, eine Architektur, eine Distribution, etc. Optional und typspezifisch.
* `subpath`: zusätzlicher Unterpfad innerhalb eines Pakets, relativ zum Wurzelverzeichnis des Pakets. Optional.

Die Komponenten sind so aufgebaut, dass sie eine Hierarchie bilden, die von der höchstwertigen Komponente auf der linken Seite bis zur niedrigstwertigen Komponente auf der rechten Seite reicht.

Ein purl darf KEINE URL Authority enthalten, d.h. es gibt keine Unterstützung für die Komponenten Benutzername, Passwort, Host und Port.
Ein Namespace-Segment kann manchmal wie ein Host aussehen, aber seine Interpretation ist spezifisch für einen Typ.
Außerdem darf ein purl keine doppelten Schrägstriche `//` enthalten, d.h. das Schema ist `pkg:`.
Dort

Purls eignen sich besonders gut zur Identifizierung von Komponenten innerhalb der von purl unterstützten Pakettypen.
