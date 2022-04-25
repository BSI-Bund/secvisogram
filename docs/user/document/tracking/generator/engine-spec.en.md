# Engine - Specification

Engine of document generation (`engine`) of value type `object` with mandatory
property

* [Engine Name](engine/name-spec.en.md) (`name`)

and optional property

* [Engine version](engine/version-spec.en.md) (`version`)

contains information about the engine that generated the CSAF document.

```json
"engine": {
  // ...
  "properties": {
    "name": {
      // ...
    },
    "version": {
      // ...
    }
  }
}
```
