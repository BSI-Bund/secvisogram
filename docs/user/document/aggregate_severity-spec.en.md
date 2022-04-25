# Aggregate Severity - Specification

Aggregate severity (`aggregate_severity`) of value type `object` with the
mandatory property

* [Text](aggregate_severity/text-spec.en.md) (`text`)

and the optional property

* [Namespace](aggregate_severity/namespace-spec.en.md) (`namespace`)

is a vehicle that is provided by the document producer to convey the urgency and
criticality with which the one or more vulnerabilities reported should be
addressed. It is a document-level metric and applied to the document as a whole
— not any specific vulnerability. The range of values in this field is defined
according to the document producer's policies and procedures.

```json
"aggregate_severity": {
  // ...
  "properties": {
    "namespace": {
      // ...
    },
    "text": {
      // ...
    }
  }
}
```
