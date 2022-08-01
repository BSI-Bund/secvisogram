**Product ID - Usage**

Die Produkt-ID wird verwendet, um später im Dokument auf das Produkt zu verweisen, und es gibt kein bestimmtes Format.
Der Wert wird normalerweise vom Generator zugewiesen.
Um die Fehlersuche zu erleichtern, empfiehlt es sich, ein Präfix zur Unterscheidung von Produktgruppen-IDs zu verwenden.

Dieselbe `product_id` darf nicht mehrmals im selben Dokument definiert werden.

Die `product_id` sollte irgendwo innerhalb desselben Dokuments referenziert werden.

Ergänzend zum Profil CSAF Informational Advisory_

Die Anforderung, dass die `product_id` irgendwo in denselben Dokumenten referenziert werden muss, gilt nicht für das Profil `csaf_informational_advisory`.
Gemäß Profildefinition gelten die in einem solchen CSAF-Dokument genannten Informationen für alle im Produktbaum aufgeführten Produkte.