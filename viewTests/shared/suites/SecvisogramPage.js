import React from 'react'
import View from '../../../lib/SecvisogramPage/View'
import seed1 from './SecvisogramPage/seed-1.json'
import seed2 from './SecvisogramPage/seed-2.json'

export const title = 'SecvisogramPage'

const props = {
  isLoading: false,
  isSaving: false,
  data: {
    documentIsValid: null,
    errors: [],
    doc: {
      document: {
        csaf_version: '',
        title: '',
        publisher: {
          type: '',
        },
        type: '',
        tracking: {
          current_release_date: '',
          id: '',
          initial_release_date: '',
          revision_history: [
            {
              number: '',
              date: '',
              summary: '',
            },
          ],
          status: '',
          version: '',
        },
        acknowledgments: [
          {
            names: [],
            organizations: [],
            summary: '',
            urls: [],
          },
        ],
      },
    },
  },
  activeTab: /** @type {'EDITOR'} */ ('EDITOR'),
  onNew: console.log.bind(console, 'onNew'),
  onDownload: console.log.bind(console, 'onDownload'),
  onOpen: console.log.bind(console, 'onOpen'),
  onSave: console.log.bind(console, 'onSave'),
  onChangeTab: console.log.bind(console, 'onChangeTab'),
  onValidate: console.log.bind(console, 'onValidate'),
}

export const tests = [
  {
    title: 'Is loading',
    render: () => <View {...props} data={null} isLoading={true} />,
  },
  {
    title: 'Is saving',
    render: () => <View {...props} isSaving={true} />,
  },
  {
    title: 'With valid document',
    render: () => (
      <View
        {...props}
        data={{ ...props.data, documentIsValid: true, errors: [] }}
      />
    ),
  },
  {
    title: 'With invalid document',
    render: () => (
      <View
        {...props}
        data={{ ...props.data, documentIsValid: false, errors: [{}] }}
      />
    ),
  },
  {
    title: 'Editor',
    render: () => <View {...props} />,
  },
  {
    title: 'Editor (seed-1)',
    render: () => (
      <View
        {...props}
        data={{ ...props.data, doc: /** @type {any} */ (seed1) }}
      />
    ),
  },
  {
    title: 'Editor (seed-2)',
    render: () => (
      <View
        {...props}
        data={{ ...props.data, doc: /** @type {any} */ (seed2) }}
      />
    ),
  },
  {
    title: 'Source',
    render: () => <View {...props} activeTab="SOURCE" />,
  },
  {
    title: 'Advisory',
    render: () => <View {...props} activeTab="ADVISORY" />,
  },
  {
    title: 'HTML',
    render: () => <View {...props} activeTab="HTML" />,
  },
  {
    title: 'CSAF-JSON',
    render: () => <View {...props} activeTab="CSAF-JSON" />,
  },
]
