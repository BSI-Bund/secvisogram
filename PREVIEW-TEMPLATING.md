# Secvisogram Preview Templating

<!-- TOC depthFrom:2 depthTo:3 -->

- [HTML Templating Overview](#html-templating-overview)
- [How to create a custom HTML template](#how-to-create-a-custom-html-template)
- [Technical Overview](#technical-overview)
  - [Mustache template example](#mustache-template-example)
- [Full list of template attributes](#full-list-of-template-attributes)

<!-- /TOC -->

## HTML Templating Overview

Secvisogram offers functionality, to render a CSAF JSON document as HTML document. Therefore the Secvisogram "Preview" function offers the possibility to view the CSAF document as rendered HTML document as well as the underlying HTML source code.

The rendered HTML file is aimed self-sufficient so that it can be saved into a standalone HTML file (i.e. for printing or PDF export). Therefore Secvisogram offers a possiblity to save the generated HTML content.

Another use case might be addressed by the Preview Source, which displays the HTML source code of the rendered Preview document. This might i.e. helpful for users to copy & paste-source HTML content for inclusion in their content management system (CMS).

This document describes, how to create and integrate custom Preview Templates.

## How to create a custom HTML template

To create a custom Preview HTML template:

1. Edit & modify the `lib/SecvisogramPage/View/shared/HTMLTemplate/Template.html` file according to the instructions in this file
2. Build & Deploy a new version of Secvisogram as described in the [`README.md` in the "Getting started" section](README.md#getting-started)

## Technical Overview

Sevisogram uses the popular [{{ mustache }} library](https://mustache.github.io/) for the templating mechanism. Currently the template is currently build-in and therefore can only be changed during build-time.

### Mustache template example

The following code example illustrates the basic templating mechanism. For a detailed introduction please refer to the [mustache man page](https://mustache.github.io/mustache.5.html).

```
<h3>List of acknowledgments</h3>
{{#data.json.document.acknowledgments}}
    <h4>Acknowledgment</h4>
    <h5>List of acknowledged names</h5>
    {{#names}}{{#.}}
            <h6>Name of entity being recognized</h6>
            <p>{{.}}</p>
        {{/.}} {{/names}}
    <h5>List of contributing organizations</h5>
    {{#organizations}}{{#.}}
            <h6>Contributing organization</h6>
            <p>{{.}}</p>
        {{/.}} {{/organizations}} {{#summary}}
        <h5>Summary of the acknowledgment</h5>
        <p>{{summary}}</p>
    {{/summary}}
    <h5>List of URLs</h5>
    {{#urls}}{{#.}}
            <h6>URL of acknowledgment</h6>
            <p>{{.}}</p>
        {{/.}} {{/urls}}
{{/data.json.document.acknowledgments}}
```

- `{{#attribute}} … {{/attribute}}` opens a section, referring to the template attribute `attribute`.
- All CSAF document values are provided by the `data.json` object like `data.json.document` for the CSAF `document` node/attribute.
- By nesting mustache statements you can navigate down the CSAF object graph. Please be aware, that many fields are optional and must be handled properly in your template.
- `data.json.document.acknowledgments.names` refers to a list. Hence Mustache will loop over every element in the list.
- You can use `{{.}}` to refer to the current element. By wrapping this into a `{{#.}} … {{/.}}` you can also include content which should be repeated on every loop.

## Full list of template attributes

This is the full list of document properties. It reflects the structure as defined by the CSAF schema definition

| Attribute                 | Description                               | Example value |
| ------------------------- | ----------------------------------------- | ------------- |
| `document.notes`          | Notes associated with the whole document. | ``            |
| `document.publisher.type` | Type of publisher                         | `coordinator` |
