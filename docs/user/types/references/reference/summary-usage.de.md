# Summary - Usage

Ein aussagekräftiger Titel oder eine kurze Zusammenfassung der Referenz.

Bei Webseiten ist dies oft der Seitentitel aus den HTML-Metadaten.
Bei anderen Dokumenten ist es der Titel des Dokuments.

Für verschiedene Formate von Hinweisen hat der Titel oder die Zusammenfassung das folgende Format:

  `ID: TITEL - FORMAT`

wobei `ID` der Wert von `/document/tracking/id` ist, `TITLE` ist optional und der Wert von `/document/title` und `FORMAT` ist eines von `PDF`, `TXT`, `CSAF` oder `HTML`.

Wenn verschiedene Versionen des Dokuments unter verschiedenen URLs zu finden sind, sollte der Wert von `/document/tracking/version` als `- version VERSION` hinter `FORMAT` angehängt werden.
Wenn die neueste Version immer unter derselben URL zu finden ist, kann der `VERSION`-Teil als `- neueste Version` bezeichnet werden