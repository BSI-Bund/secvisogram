# Category - Usage

* For a document with the profile `CSAF Base` the category value must not be
  equal to the (case insensitive) name
  (without the prefix `csaf_`) or value of any other profile than "CSAF Base".
  Any occurrences of dash, whitespace, and underscore characters are removed
  from the values on both sides before the match. Also the value must not start
  with the reserved prefix `csaf_` except if the value is `csaf_base`.
