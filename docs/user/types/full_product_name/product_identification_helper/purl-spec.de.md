# Purl - Specification

Die Darstellung der Paket-URL (PURL) (`purl`) ist eine `String` aus 7 oder mehr Zeichen mit `Pattern` (regulärer Ausdruck):

`regexp`.
^pkg:[A-Za-z\\.\\-\\+][A-Za-z0-9\\.\\-\\+]*/.+
```

> Das angegebene Muster wertet nicht vollständig aus, ob eine PURL gemäß der [[PURL]](#purl)-Spezifikation gültig ist.
> Es bietet einen allgemeineren Ansatz und eine allgemeine Anleitung, um Vorwärtskompatibilität zu ermöglichen. CSAF verwendet nur die kanonische
> Form von PURL, um mit Abschnitt 3.3 von [[RFC3986]](#rfc3986) konform zu sein. Daher werden URLs, die mit "pkg://" beginnen
> als ungültig angesehen.

Dieses Paket-URL (PURL)-Attribut bezieht sich auf eine Methode zur zuverlässigen Identifizierung und Lokalisierung von Softwarepaketen außerhalb dieser Spezifikation.
Siehe [[PURL]](#purl) für Details.

___

<a name="purl"/>**[PURL]**

*Package URL (PURL)*, GitHub Project, [https://github.com/package-url/purl-spec](https://github.com/package-url/purl-spec).

<a name="rfc3986"/>[RFC3986]

Berners-Lee, T., Fielding, R., und L. Masinter, "Uniform Resource Identifier (URI): Generic Syntax", STD 66, RFC 3986, DOI 10.17487/RFC3986, Januar 2005, [https://www.rfc-editor.org/info/rfc3986](https://www.rfc-editor.org/info/rfc3986).