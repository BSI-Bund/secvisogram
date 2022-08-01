# Sbom Urls - Specification

Die Liste der SBOM-URLs (`sbom_urls`) vom Wertetyp `array` mit 1 oder mehr Elementen enthält eine Liste von URLs, unter denen SBOMs für dieses Produkt abgerufen werden können.

> Die SBOMs können sich in Format oder Detailtiefe unterscheiden. Derzeit unterstützte Formate sind SPDX, CycloneDX und SWID.

```javascript
"sbom_urls": {
    //...
  "items": {
    //...
  }
}
```

[Spezifikation von SBOM-URL-Elementen](types/full_product_name/product_identification_helper/sbom_urls/sbom_url-spec.de.md)
