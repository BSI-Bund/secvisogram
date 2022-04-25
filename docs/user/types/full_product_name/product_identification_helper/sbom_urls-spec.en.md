# Sbom Urls - Specification

The list of SBOM URLs (`sbom_urls`) of value type `array` with 1 or more items
contains a list of URLs where SBOMs for this product can be retrieved.

> The SBOMs might differ in format or depth of detail. Currently supported
> formats are SPDX, CycloneDX, and SWID.

```json
"sbom_urls": {
    //...
  "items": {
    //...
  }
}
```

[Specification of SBOM URL items](sbom_urls/sbom_url-spec.en.md)
