# Product Groups - Specification

The product group items are of value type `object` with the 2 mandatory properties

* [Group ID](product_group/group_id-spec.en.md) (`group_id`)
* [Product IDs](product_group/product_ids-spec.en.md) (`product_ids`)

and the optional

* [Summary](product_group/summary-spec.en.md) (`summary`)

property.

```
    "properties": {
      "group_id": {
        // ...
      },
      "product_ids": {
        // ...
      },
      "summary": {
        // ...
      }
    }
```
