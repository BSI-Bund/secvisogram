# Tracking - Specification

Tracking (`tracking`) of value type `object` with the six mandatory properties:

* [Current Release Date](tracking/current_release_date-spec.en.md) (`current_release_date`)
* [Identifier](tracking/id-spec.en.md) (`id`)
* [Initial Release Date](tracking/initial_release_date-spec.en.md) (`initial_release_date`)
* [Revision History](tracking/revision_history-spec.en.md) (`revision_history`)
* [Status](tracking/status-spec.en.md) (`status`)
* [Version](tracking/version-spec.en.md) (`version`)

is a container designated to hold all management attributes necessary to track a
CSAF document as a whole. The two optional additional properties are

* [Aliases](tracking/aliases-spec.en.md) (`aliases`)
* [Generator](tracking/generator-spec.en.md) (`generator`).

```javascript
"tracking": {
  // ...
  "properties": {
    "aliases": {
      // ...
    },
    "current_release_date": {
      // ...
    },
    "generator": {
      // ...
    },
    "id": {
      // ...
    },
    "initial_release_date": {
      // ...
    },
    "revision_history": {
      // ...
    },
    "status": {
      // ...
    },
    "version": {
      // ...
    }
  }
}
```
