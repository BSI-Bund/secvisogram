import React from 'react'
import LoadingIndicator from '../../../lib/SecvisogramPage/View/LoadingIndicator'

export const title = 'LoadingIndicator'

export const tests = [
  {
    title: 'Simple',
    render: () => <LoadingIndicator label="Loading data ..." />,
  },
]
