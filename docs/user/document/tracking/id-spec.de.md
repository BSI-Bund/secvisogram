# ID - Specification

Eindeutiger Bezeichner für das Dokument (`id`) vom Wertetyp `string` mit 1 oder mehr Zeichen mit `pattern` (regulärer Ausdruck):

`regexp
^[\\S](.*[\\S])?$
```

Der eindeutige Bezeichner für das Dokument enthält den Identifier.

> Er MUSS NICHT mit einem Leerzeichen beginnen oder enden und darf keinen Zeilenumbruch enthalten.

Die ID ist eine einfache Kennzeichnung, die eine breite Palette von Nummerierungswerten, -typen und -schemata zulässt.
Ihr Wert MUSS von der Behörde, die das Originaldokument ausstellt, zugewiesen und gepflegt werden.
Sie MUSS für diese Organisation eindeutig sein.

*Beispiele:*

* `Beispiel Unternehmen - 2019-YH3234`
* `RHBA-2019:0024`
* `cisco-sa-20190513-secureboot`

> Die Kombination aus `/document/publisher/namespace` und `/document/tracking/id` identifiziert ein CSAF-Dokument global
> eindeutig.

Dieser Wert wird auch verwendet, um den Dateinamen für das CSAF-Dokument zu bestimmen (vgl. Spezifikationsabschnitt 5.1).