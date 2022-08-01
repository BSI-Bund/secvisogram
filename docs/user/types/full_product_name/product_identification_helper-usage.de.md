# Product Identification Helper - Usage

Eine Sammlung verschiedener Möglichkeiten, ein Produkt in der Asset-Datenbank oder SBOM zu identifizieren.

Wenn sie verwendet wird, um ein neues Produkt zu identifizieren, das durch eine Beziehung gebildet wird, darf kein Wert mit einem der Produkte, die die Beziehung bilden, identisch sein.
Andernfalls würde ein Abgleich zu irreführenden Ergebnissen führen.

*Beispiel*:

Es gibt eine Anwendung (Produkt A), die unter Linux und Windows denselben Hash hat, und es wird eine Sicherheitslücke gefunden, die das Programm betrifft, wenn es unter Windows, aber nicht unter Linux ausgeführt wird.
Wenn derselbe Hash in der Beziehung zwischen den Produkten "Produkt A unter Windows" und "Produkt A unter Linux" verknüpft wäre, würde ein Abgleichsalgorithmus dieselbe Liste von Assets für alle drei Produkt-IDs zurückgeben.
Dies ist jedoch eine zweideutige Übereinstimmung.