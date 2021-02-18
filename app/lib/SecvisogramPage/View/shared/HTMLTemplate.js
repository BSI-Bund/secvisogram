import Mustache from 'mustache'
import Template from './HTMLTemplate/Template.html'

/**
 * @param {{ document: {} }} props
 */
export default function HTMLTemplate({ document }) {
  return Mustache.render(Template, document)
}
