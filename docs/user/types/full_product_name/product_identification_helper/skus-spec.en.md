# Skus - Specification

The list of stock keeping units (`skus`) of value type `array` with 1 or more items contains a list of parts, or full
stock keeping units.

A list of stock keeping units SHOULD only be used if the list of relationships is used to decouple e.g. hardware from
the software, or the stock keeping units change during update. In the latter case the remediations SHALL include the new
stock keeping units is or a description how it can be obtained.

> The use of the list of relationships in the first case is important. Otherwise, the end user is unable to identify
> which version (the affected or the not affected / fixed one) is used.

```
"skus": {
    //...
  "items": {
    //...
  }
}
```

[Specification of SKU items](skus/sku-spec.en.md)
