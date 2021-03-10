import Mustache from 'mustache'
import Template from './HTMLTemplate/Template.html'

const PRODUCT_STATUS_HEADER =
  '<thead><tr><th>Product</th><th>CVSS-Vector</th><th>CVSS Base Score</th></tr></thead>'

const PRODUCT_STATUS_ROW =
  '<tr><td>{{name}}</td><td>{{vectorString}}</td><td>{{baseScore}}</td></tr>'

/**
 * Encapsulates the rendering of the mustache template.
 *
 * @param {{ document: {} }} props
 */
export default function HTMLTemplate({ document }) {
  return Mustache.render(Template, document, {
    product_status_header: PRODUCT_STATUS_HEADER,
    product_status_row: PRODUCT_STATUS_ROW,
  })
}
