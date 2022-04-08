# Purl - Specification

The package URL (PURL) representation (`purl`) is a `string` of 7 or more characters with `pattern` (regular
expression):

```
^pkg:[A-Za-z\\.\\-\\+][A-Za-z0-9\\.\\-\\+]*/.+
```

> The given pattern does not completely evaluate whether a PURL is valid according to the [PURL] specification. It
> provides a more generic approach and general guidance to enable forward compatibility.
> CSAF uses only the canonical form of PURL to conform with section 3.3 of [RFC3986]. Therefore, URLs starting with
> `pkg://` are considered invalid.

This package URL (PURL) attribute refers to a method for reliably identifying and locating software packages external to
this specification. See [PURL] for details.

___

**[PURL]**

_Package URL (PURL)_, GitHub Project, https://github.com/package-url/purl-spec.