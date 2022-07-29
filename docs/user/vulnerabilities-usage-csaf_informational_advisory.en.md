# Vulnerabilities - Usage

The `csaf_informational_advisory` profile deals with information that are not classified as vulnerabilities.
Therefore, it must not have the `/vulnerabilities` element.
If there is a vulnerability, another profile, e.g. `csaf_security_advisory` should be selected.
