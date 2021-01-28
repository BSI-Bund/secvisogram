import Mustache from 'mustache'
import Template from './HTMLTemplate/Template.html'

/**
 * @param {{ document: {} }} props
 */
export default function HTMLTemplate({ document }) {
  return Mustache.render(Template, {
    data: { json: document },
    formatDateTime: () =>
      /**
       * @param {string} text
       * @param {(str: string) => string} render
       */
      (text, render) => {
        const date = new Date(render(text))
        return (
          date.getFullYear() +
          '-' +
          (date.getMonth() + 1).toString().padStart(2, '0') +
          '-' +
          date.getDate().toString().padStart(2, '0') +
          ' ' +
          date.getHours().toString().padStart(2, '0') +
          ':' +
          date.getMinutes().toString().padStart(2, '0')
        )
      },
  })
}
