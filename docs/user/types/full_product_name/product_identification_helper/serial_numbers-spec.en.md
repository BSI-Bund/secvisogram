# Serial Numbers - Specification

The list of serial numbers (`serial_numbers`) of value type `array` with 1 or more unique items contains a list of
parts, or full serial numbers.

A list of serial numbers SHOULD only be used if a certain range of serial numbers with its corresponding software
version is affected, or the serial numbers change during update.

```
"serial_numbers": {
    //...
  "items": {
    //...
  }
}
```

[Specification of Serial Number items](serial_numbers/serial_number-spec.en.md)
