# Serial Number - Specification

Jede gegebene Seriennummer vom Wertetyp `String` mit mindestens 1 Zeichen stellt eine vollständige oder abgekürzte (Teil-)Seriennummer der zu identifizierenden Komponente dar.

Wird ein Teil einer Seriennummer des zu identifizierenden Bauteils angegeben, SOLLTE er mit dem ersten Zeichen der Seriennummer beginnen und an einer beliebigen Stelle enden.
Zeichen, die NICHT übereinstimmen SOLLTEN, MÜSSEN entweder durch `?` (für ein einzelnes Zeichen) oder `*` (für null oder mehr Zeichen) ersetzt werden.
Zwei "*" MÜSSEN NICHT aufeinander folgen.