# Hash - Specification

Kryptografische Hashes vom Wertetyp `Objekt` enthalten alle Informationen zur Identifizierung einer Datei auf der Grundlage ihrer kryptografischen Hashwerte.
Jedes kryptografische Hashes-Objekt hat die 2 obligatorischen Eigenschaften

* [File Hashes](types/full_product_name/product_identification_helper/hashes/hash/file_hashes-spec.de.md) (`file_hashes`)
* [Dateiname](types/full_product_name/product_identification_helper/hashes/hash/filename-spec.de.md) (`filename`)

```javascript
"Eigenschaften": {
  "file_hashes": {
    // ...
  },
  "filename": {
    // ...
  }
}
```