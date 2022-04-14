# Product ID - Usage

* When used to reference an element within the `product_tree`, a corresponding Full Product Name element with matching
  `product_id` must be defined. This affects the following paths:

  ```
  /product_tree/product_groups[]/product_ids[]
  /product_tree/relationships[]/product_reference
  /product_tree/relationships[]/relates_to_product_reference
  /vulnerabilities[]/product_status/first_affected[]
  /vulnerabilities[]/product_status/first_fixed[]
  /vulnerabilities[]/product_status/fixed[]
  /vulnerabilities[]/product_status/known_affected[]
  /vulnerabilities[]/product_status/known_not_affected[]
  /vulnerabilities[]/product_status/last_affected[]
  /vulnerabilities[]/product_status/recommended[]
  /vulnerabilities[]/product_status/under_investigation[]
  /vulnerabilities[]/remediations[]/product_ids[]
  /vulnerabilities[]/scores[]/products[]
  /vulnerabilities[]/threats[]/product_ids[]
  ```

* When used in Full Prodct Name elements, the `product_id` must be referenced somewhere within the same documents.
