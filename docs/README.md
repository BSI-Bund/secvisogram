# CSAF Documentation

This directory contains documentation on creation of CSAF documents that will be displayed in the user interface.
The documentation comprises specification and usage details.

## Translating the Documentation

The script `translate_docs.py` uses the [DeepL Translation API](https://www.deepl.com/pro-api) to bootstrap translation
of this documentation in another language supported by the API. The API requires an API Key, check DeepL's documentation
for more information.

Some effort is made to preserve formatting, but it is not guaranteed to be always correct in the translation results.
Also, translations are most likely not perfect or coherent throughout all different files.
It is highly recommended to manually check and correct the translations before adding them.

## Generating the Author Guide

The author guide is a concatenation of the usage documentation files compiled into an accessible PDF document.
To generate this document the following steps are necessary:

* merge the usage documentation files using the script `md_merge.py`
  this script allows for selecting a specific language, see the `--lang` flag
* convert the resulting markdown file into docx format with pandoc
* convert the docx file to PDF with libreoffice

A direct conversion from markdown to PDF with pandoc is not suitable as Universal Access can not be guaranteed.

A GitHub action is used to automate these steps and publish the English author guide in the `author-guide` branch.
