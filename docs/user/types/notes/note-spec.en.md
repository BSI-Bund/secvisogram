# Note - Specification

Value type of every such Note item is `object` with the mandatory properties

* [Category](note/category-spec.en.md) (`category`)
* [Text](note/text-spec.en.md) (`text`)

providing a place to put all manner of text blobs related to the current
context. A Note `object` MAY provide the optional properties

* [Audience](note/audience-spec.en.md) (`audience`)
* [Title](note/title-spec.en.md) (`title`)

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
