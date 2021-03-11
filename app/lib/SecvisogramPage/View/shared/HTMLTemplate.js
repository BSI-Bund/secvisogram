import Mustache from 'mustache'
import Template from './HTMLTemplate/Template.html'

const PRODUCT_STATUS_HEADER = `
<thead>
  <tr>
    <th>Product</th>
    <th>CVSS-Vector</th>
    <th>CVSS Base Score</th>
  </tr>
</thead>`

const PRODUCT_STATUS_ROW = `
<tr>
  <td>{{name}}</td>
  <td>{{vectorString}}</td>
  <td>{{baseScore}}</td>
</tr>`

const REMEDIATION = `
<h5>{{type}}{{#date}} ({{.}}){{/date}}</h5>
<p>{{details}}</p>
{{#product_ids.length}}
  <h6>For products:</h6>
  <ul>
  {{#product_ids}}
    <li>{{name}}</li>
  {{/product_ids}}
  </ul>
{{/product_ids.length}}
{{#group_ids.length}}
  <h6>For groups:</h6>
  <ul>
  {{#group_ids}}
   <li>{{name}}</li>
  {{/group_ids}}
  </ul>
{{/group_ids.length}}        
{{#url}}<a href={{.}}>{{.}}</a>{{/url}}
{{#entitlements}}
  <p>{{.}}</p>
{{/entitlements}}
{{#restart_required}}
  Restart required: <b>{{type}}</b>
  <p>{{details}}</p>
{{/restart_required}}`

const VULNERABILITY_NOTE = `
<b>{{title}}</b>{{#audience}} ({{.}}){{/audience}}
<p>{{text}}</p>
`

const DOCUMENT_NOTE = `
<h2>{{title}}</h2>
<small>{{audience}}</small>
<p>{{text}}<p>
`

/**
 * Encapsulates the rendering of the mustache template.
 *
 * @param {{ document: {} }} props
 */
export default function HTMLTemplate({ document }) {
  return Mustache.render(Template, document, {
    product_status_header: PRODUCT_STATUS_HEADER,
    product_status_row: PRODUCT_STATUS_ROW,
    remediation: REMEDIATION,
    vulnerability_note: VULNERABILITY_NOTE,
    document_note: DOCUMENT_NOTE,
  })
}
