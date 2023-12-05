# Markdown enabled fields
Markdown syntax can be used in the following fields:
```
/document/acknowledgments[]/summary
/document/distribution/text
/document/notes[]/text
/document/publisher/issuing_authority
/document/references[]/summary
/document/tracking/revision_history[]/summary
/product_tree/product_groups[]/summary
/vulnerabilities[]/acknowledgments[]/summary
/vulnerabilities[]/involvements[]/summary
/vulnerabilities[]/notes[]/text
/vulnerabilities[]/references[]/summary
/vulnerabilities[]/remediations[]/details
/vulnerabilities[]/remediations[]/entitlements[]
/vulnerabilities[]/remediations[]/restart_required/details
/vulnerabilities[]/threats[]/details
```

# Markdown Syntax
This guide gives a quick overview over all markdown options that are available within Secvisogram.

## Headings
To create a heading, up to six number signs (`#`) can be added before the heading text. The number of number signs (`#`) used determines the hierarchy level and the font size of the heading.
```
# A first-level heading
## A second-level heading
### A third-level heading
```

## Format Text
| Style                         | Syntax               | Example                                  | Output                                 |
|-------------------------------|----------------------|------------------------------------------|----------------------------------------|
| Bold                          | `** **` or `__ __`   | `**Bold Text**`                          | **Bold Text**                          |
| Italic                        | `* *` or `_ _`       | `_Italic Text_`                          | _Italic Text_                          |
| strikethrough                 | `~~ ~~`              | `~~This was mistaken Text~~`             | ~~This was mistaken Text~~             |
| Nested Bold and Italic        | `** **` and `_ _`    | `**This text is _extremely_ important**` | **This text is _extremely_ important** |
| All Bold and Italic           | `*** ***`            | `***All this text is important***`       | ***All this text is important***       |

## Quoting Text
Text can be quoted with the following symbol: `>`.

*Example:*
```
not quoted text
> quoted text
```

*Output:*

not quoted text
> quoted text

quoted text will be indented and displayed in another font color.

## Quoting Code
Code can be quoted within one line by using simple backticks. The text within the backticks will not be formatted.

*Example:*
```
Use the command `ssh user@host` to establish a connection.
```

*Output:*

Use the command `ssh user@host` to establish a connection.

To format Code or text in its own paragraph, three backticks can be used.

*Example:*
````
Example commands:
```
ssh user@host
cp /etc/secrets.txt ~
exit
```
````

*Output:*

Example commands:
```
ssh user@host
cp /etc/secrets.txt ~
exit
```

## Links
Inline links can be created by enclosing the text in square brackets `[ ]` and the URL in round brackets `( )`.

*Example:*

`The document was created using the [Secvisogram](https://secvisogram.github.io/) software.`

*Output:*

The document was created using the [Secvisogram](https://secvisogram.github.io/) software.

## Lists
Unordered lists can be created by prefixing a line or lines of text with `-`, `*`, or `+`.

*Example:*
```markdown
- George Washington
* John Adams
+ Thomas Jefferson
```

*Output:*
- George Washington
* John Adams
+ Thomas Jefferson

To create an ordered list, a number has to be prefixed to the line.

*Example:*
```markdown
1. George Washington
1. John Adams
1. Thomas Jefferson
```

*Output:*
1. George Washington
1. John Adams
1. Thomas Jefferson

### Nested Lists
Nested lists can be created by indenting the nested elements below another element.

*Example:*
```markdown
1. First list item
   - First nested list item
     - Second nested list item
```

*Output:*
1. First list item
   - First nested list item
     - Second nested list item

## Check Lists
To create a task list, prefix the list items with a dash and a space followed by `[ ]`. To mark a task as done, use `[x]`.

*Example:*:
```markdown
- [ ] Task 1
- [x] Task 2
- [ ] Task 3
```

*Output:*
- [ ] Task 1
- [x] Task 2
- [ ] Task 3

If the description of a checkbox element starts with a bracket, the bracket has to be escaped with `\`
`- [ ] \(Optional) Do something`

## Paragraphs
To create a new paragraph, one line has to be left empty between the lines of text.