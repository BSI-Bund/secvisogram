# Secvisogram Security Considerations

Author: Benjamin Schmid <benjamin.schmid@exxcellent.de>

This document describes the Security Considerations made during the development of the Secvisogram CSAF Editor following the [OWASP Top 10 Web Application Security Risks](https://owasp.org/www-project-top-ten/).

<!-- TOC depthFrom:2 depthTo:3 insertAnchor:true -->

- [1. Injection](#1-injection)
- [2. Broken Authentication](#2-broken-authentication)
- [3. Sensitive Data Exposure](#3-sensitive-data-exposure)
- [4. XML External Entities (XXE)](#4-xml-external-entities-xxe)
- [5. Broken Access Control](#5-broken-access-control)
- [6. Security Misconfiguration](#6-security-misconfiguration)
- [7. Cross-Site Scripting (XSS)](#7-cross-site-scripting-xss)
- [8. Insecure Deserialization](#8-insecure-deserialization)
- [9. Using Components with Known Vulnerabilities](#9-using-components-with-known-vulnerabilities)
- [10. Insufficient Logging & Monitoring](#10-insufficient-logging--monitoring)

<!-- /TOC -->

<a id="markdown-1-injection" name="1-injection"></a>

## 1. Injection

> Injection flaws, such as SQL, NoSQL, OS, and LDAP injection, occur when untrusted data is sent to an interpreter as part of a command or query. The attacker's hostile data can trick the interpreter into executing unintended commands or accessing data without proper authorization.

Secvisogram is a client-only application and does not store/retrieve any dynamic, server-side content, except when being asked for.

The user can make modifications or process input in one of only four ways:

- by opening a local JSON File,
- by loading a JSON File from a URL
- by using the JSON Editor file to provide JSON content, or
- by using the Form Editor functionality to edit the content directly.

For information on the security measures regarding the interpretation of JSON content, please refer to considerations under [Insecure Deserialization](#8-insecure-deserialization).

The rendered "Preview" functionality uses the mustache template framework, which also [transparently quotes any HTML entities](https://github.com/janl/mustache.js/blob/master/mustache.js#L67) in its output. The exported HTML is the direct result of the mustache template engine, thus benefiting from the same security mechanisms.

Given these measures, it should not be possible to trigger any client-side code execution within the application. No server-side logic nor handling is present.

<a id="markdown-2-broken-authentication" name="2-broken-authentication"></a>

## 2. Broken Authentication

> Application functions related to authentication and session management are often implemented incorrectly, allowing attackers to compromise passwords, keys, or session tokens, or to exploit other implementation flaws to assume other users' identities temporarily or permanently.

Secvisogram is a public, stateless, client-side browser application requiring no user identity and no authentication at all. Therefore, this risk does not apply.

<a id="markdown-3-sensitive-data-exposure" name="3-sensitive-data-exposure"></a>

## 3. Sensitive Data Exposure

> Many web applications and APIs do not properly protect sensitive data, such as financial, healthcare, and PII. Attackers may steal or modify such weakly protected data to conduct credit card fraud, identity theft, or other crimes. Sensitive data may be compromised without extra protection, such as encryption at rest or in transit, and requires special precautions when exchanged with the browser.

Secvisogram is a pure client-side, browser-only application. No content data is transferred over the network with the exception of loading a JSON file from an URL. The user can load & save local files. Secvisogram cannot ensure the integrity and proper handling of files created and stored by the user on his local system, nor of files loaded from a URL.

This consideration implies that the Secvisogram program is trustworthy and not tampered. Therefore, Secvisogram should be hosted on a reliable endpoint properly secured by TLS transports.

<a id="markdown-4-xml-external-entities-xxe" name="4-xml-external-entities-xxe"></a>

## 4. XML External Entities (XXE)

> Many older or poorly configured XML processors evaluate external entity references within XML documents. External entities can be used to disclose internal files using the file URI handler, internal file shares, internal port scanning, remote code execution, and denial of service attacks.

This risk does not apply, as Secvisogram does no XML processing.

<a id="markdown-5-broken-access-control" name="5-broken-access-control"></a>

## 5. Broken Access Control

> Restrictions on what authenticated users are allowed to do are often not properly enforced. Attackers can exploit these flaws to access unauthorized functionality and/or data, such as access other users' accounts, view sensitive files, modify other users' data, change access rights, etc.

As Secvisogram does not require any authentication and access control, this risk does not apply. See also: [Broken Authentication](#2-broken-authentication).

<a id="markdown-6-security-misconfiguration" name="6-security-misconfiguration"></a>

## 6. Security Misconfiguration

> Security misconfiguration is the most commonly seen issue. This is commonly a result of insecure default configurations, incomplete or ad hoc configurations, open cloud storage, misconfigured HTTP headers, and verbose error messages containing sensitive information. Not only must all operating systems, frameworks, libraries, and applications be securely configured, but they must be patched/upgraded in a timely fashion.

Secvisogram will offer an example nginx configuration file with proposed HTTP headers for enhanced security.

It's the duty of the service provider to ensure and maintain a secure configuration of the Secvisogram hosting website as well as to monitor and upgrade as new security issues are detected in the libraries used. We propose the use of an automated SAST tool as described in [Using Components with Known Vulnerabilities](#9-using-components-with-known-vulnerabilities).

<a id="markdown-7-cross-site-scripting-xss" name="7-cross-site-scripting-xss"></a>

## 7. Cross-Site Scripting (XSS)

> XSS flaws occur whenever an application includes untrusted data in a new web page without proper validation or escaping, or updates an existing web page with user-supplied data using a browser API that can create HTML or JavaScript. XSS allows attackers to execute scripts in the victim's browser which can hijack user sessions, deface web sites, or redirect the user to malicious sites.

Secvisogram tackles the risk of Cross-Site Scripting (XSS) using two approaches:

1. Escaping all HTML entities in all views as described in [Injection](#1-injection)
1. Providing an example configuration for hardened HTTP header pragmas

<a id="markdown-8-insecure-deserialization" name="8-insecure-deserialization"></a>

## 8. Insecure Deserialization

> Insecure deserialization often leads to remote code execution. Even if deserialization flaws do not result in remote code execution, they can be used to perform attacks, including replay attacks, injection attacks, and privilege escalation attacks.

Secvisogram deserializes only JSON files.

Any JSON content is interpreted using the hardened Browser `JSON.parse()` functionality. The form editor uses React as its core framework, which ensures that any HTML content is transparently quoted.

<a id="markdown-9-using-components-with-known-vulnerabilities" name="9-using-components-with-known-vulnerabilities"></a>

## 9. Using Components with Known Vulnerabilities

> Components, such as libraries, frameworks, and other software modules, run with the same privileges as the application. If a vulnerable component is exploited, such an attack can facilitate serious data loss or server takeover. Applications and APIs using components with known vulnerabilities may undermine application defenses and enable various attacks and impacts.

The node package management feature of `package-lock.json` is used to ensure dependency integrity. The dependencies/components were kept up-to-date during the development cycles.

It is the duty of the service provider to ensure and maintain a secure configuration of the Secvisogram hosting website as well as to monitor and address new security issues detected in the libraries during production. We therefore recommend leveraging an automated SAST scanning tool like [Github Dependabot](https://github.blog/2020-06-01-keep-all-your-packages-up-to-date-with-dependabot/). An example `dependabot.yml` is provided within the Secvisogram repository.

<a id="markdown-10-insufficient-logging--monitoring" name="10-insufficient-logging--monitoring"></a>

## 10. Insufficient Logging & Monitoring

> Insufficient logging and monitoring, coupled with missing or ineffective integration with incident response, allows attackers to further attack systems, maintain persistence, pivot to more systems, and tamper, extract, or destroy data. Most breach studies show time to detect a breach is over 200 days, typically detected by external parties rather than internal processes or monitoring.

Secvisogram is a pure client-only application and does not accept any requests from third parties other than the actual browser user. Therefore, no request logging is required here.

Regarding attacks directed at the web host, we recommend industrial standard security practices for hosting web content with Javascript content.
