import React from 'react'
import View from '../../../lib/SecvisogramPage/View'

export const title = 'SecvisogramPage'

const props = {
  isLoading: false,
  isSaving: false,
  data: {
    doc: {
      acknowledgments: [
        {
          names: [''],
        },
      ],
    },
  },
  activeTab: /** @type {'EDITOR'} */ ('EDITOR'),
  editorPageUrl: '#/editor',
  sourcePageUrl: '#/source',
  advisoryPageUrl: '#/advisory',
  htmlPageUrl: '#/html',
  csafJsonPageUrl: '#/csafJson',
  onNew: console.log.bind(console, 'onNew'),
  onDownload: console.log.bind(console, 'onDownload'),
  onOpen: console.log.bind(console, 'onOpen'),
  onSave: console.log.bind(console, 'onSave'),
}

export const tests = [
  {
    title: 'Is loading',
    render: () => <View {...props} isLoading={true} />,
  },
  {
    title: 'Is saving',
    render: () => <View {...props} isSaving={true} />,
  },
  {
    title: 'Editor',
    render: () => <View {...props} />,
  },
  {
    title: 'Source',
    render: () => <View {...props} activeTab="SOURCE" />,
  },
]
