# Note - Specification

Der Werttyp jedes solchen Notiz-Elements ist "Objekt" mit den obligatorischen Eigenschaften

* Kategorie](types/notes/note/category-spec.de.md) (`category`)
* [Text](types/notes/note/text-spec.de.md) (`text`)

bietet einen Platz für alle Arten von Textblöcken, die sich auf den aktuellen Kontext beziehen.
Ein "Note"-Objekt KANN die folgenden optionalen Eigenschaften aufweisen

* [Audience](types/notes/note/audience-spec.de.md) (`audience`)
* [Titel](types/notes/note/title-spec.de.md) (`title`)

```javascript
"properties": {
  "audience": {
    // ...
  },
  "category": {
    // ...
  },
  "text": {
    // ...
  },
  "title": {
    // ...
  }
}
```