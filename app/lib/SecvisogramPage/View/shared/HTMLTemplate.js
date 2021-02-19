import Mustache from 'mustache'
import Template from './HTMLTemplate/Template.html'

/**
 * Encapsulates the rendering of the mustache template.
 *
 * @param {{ document: {} }} props
 */
export default function HTMLTemplate({ document }) {
  return Mustache.render(Template, document)
}
