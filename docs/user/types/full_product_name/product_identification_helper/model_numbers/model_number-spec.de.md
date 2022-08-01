# Model Number - Specification

Eine beliebige Modellnummer vom Wertetyp `String` mit mindestens 1 Zeichen stellt eine vollständige oder abgekürzte (Teil-)Modellnummer der zu identifizierenden Komponente dar.

> Die Begriffe "Modell", "Modellnummer" und "Modellvariante" werden meist synonym verwendet. Oft werden sie mit "MN" abgekürzt,
> M/N" oder "Modell-Nr." abgekürzt.

Wenn ein Teil einer Modellnummer des zu identifizierenden Bauteils angegeben wird, SOLLTE er mit dem ersten Zeichen der Modellnummer beginnen und an einer beliebigen Stelle enden.
Zeichen, die NICHT übereinstimmen SOLLTEN, MÜSSEN entweder durch `?` (für ein einzelnes Zeichen) oder `*` (für null oder mehr Zeichen) ersetzt werden.
Zwei "*" MÜSSEN NICHT aufeinander folgen.

*Beispiele:*

* `6RA8096-4MV62-0AA0`
* `6RA801?-??V62-0AA0`
* `IC25T060ATCS05-0`
