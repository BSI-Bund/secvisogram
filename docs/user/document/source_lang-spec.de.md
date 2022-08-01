# Source Lang - Specification

Ausgangssprache (`source_lang`) vom Wertetyp Language Type (`lang_t`) gibt an, wenn es sich bei dieser Kopie des Dokuments um eine Übersetzung handelt, dann beschreibt der Wert dieser Eigenschaft, aus welcher Sprache dieses Dokument übersetzt wurde.

Die Eigenschaft MUSS für jedes CSAF-Dokument mit dem Wert `translator` in `/document/publisher/category` vorhanden und gesetzt sein.
Die Eigenschaft MUSS NICHT vorhanden sein, wenn das Dokument nicht übersetzt wurde.

Wenn eine ausstellende Partei ein CSAF-Dokument mit demselben Inhalt in mehr als einer Sprache veröffentlicht, > MUSS eines dieser Dokumente
> eines dieser Dokumente als "Original" betrachtet werden, die anderen SOLLTEN als Übersetzungen des "Originals" betrachtet werden. Die ausstellende
Die ausstellende > Partei kann ihre ursprünglichen Herausgeberinformationen einschließlich der "Kategorie" beibehalten. Es gelten jedoch andere Regeln, die in der
> Konformitätsklausel "CSAF translator" definierten Regeln SOLLTEN jedoch angewendet werden.

[Spezifikation des Sprachtyps](types/lang-spec.de.md)
