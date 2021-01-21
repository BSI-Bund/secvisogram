import Mustache from 'mustache'
import React from 'react'
import Template from './HTMLTemplate/Template.html'

/**
 * @param {{ document: {} }} props
 */
export default function HTMLTemplate({ document }) {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: Mustache.render(Template, {
          data: { document },
          documentStringified: JSON.stringify(document, null, 2),
        }),
      }}
    ></div>
  )
}
