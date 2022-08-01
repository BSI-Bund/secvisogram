# Category - Specification

Dokumentenkategorie (`category`) mit Werttyp `string` aus 1 oder mehr Zeichen mit `pattern` (regulärer Ausdruck):

`Regexp
^[^\\s\\-_\\.](.*[^\\s\\-_\\.])?$
```

Die Dokumentenkategorie definiert einen kurzen kanonischen Namen, der vom Dokumentenersteller gewählt wird und den Endbenutzer über die Kategorie des Dokuments informiert.

> Sie steht in direktem Zusammenhang mit den in Abschnitt 4 der Spezifikation definierten Profilen.

```javascript
"category"
:
{
  // ...
}
```

*Beispiele*:

* `csaf_base`
* `csaf_security_advisory`
* `csaf_vex`
* `Example Company Security Notice`
