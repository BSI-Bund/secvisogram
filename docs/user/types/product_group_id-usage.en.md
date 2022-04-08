# Product Group ID - Usage

* When referencing an element with the `product_tree` a matching `group_id` must exist.
  This affects the following paths:

  ```
  /vulnerabilities[]/remediations[]/group_ids
  /vulnerabilities[]/threats[]/group_ids
  ```

* The same `group_id` must not be defined more than once in the same document.
