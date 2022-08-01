# Revision History - Usage

Die Revisionshistorie dient dazu, die Entwicklung des Dokuments zumindest in allen veröffentlichten Versionen zu verfolgen.
Für jede veröffentlichte Version muss ein Eintrag in der Revisionshistorie vorhanden sein.
Für Vorabversionen gibt es keine Einträge in der Versionshistorie. Vor der ersten Freigabe kann das Feld jedoch verwendet werden, um Änderungen zu erfassen.

Die nach Datum sortierten Revisionseinträge müssen aufsteigende `Nummern`-Werte haben.

Die "Nummer" des Revisionseintrags mit dem jüngsten "Datums"-Wert muss dieselbe sein wie in "/document/tracking/version".
Für diesen Vergleich werden Build-Metadaten ignoriert.
Wenn das Dokument den Status "Entwurf" hat, wird auch jeder Teil vor der Veröffentlichung ignoriert.

Die nach Datum sortierten Revisionseinträge dürfen keine Versionsnummer auslassen.
Im Falle von [semantischer Versionierung] (https://docs.oasis-open.org/csaf/csaf/v2.0/csaf-v2.0.html#31111-version-type---integer-versioning),
gilt dies nur für die Hauptversion.
Diese sortierte Liste von Versionsnummern muss mit der (Haupt-)Version `0` für Dokumente im `Entwurfsstatus` oder `1` im `Final` oder `Interim` Status beginnen.

Dieselbe Versionsnummer darf nicht für mehrere Revisionspunkte wiederholt werden.

Der älteste Revisionspunkt sollte kein neueres `Datum` haben als das Datum der Erstveröffentlichung `/document/tracking/initial_release_date`.
