import React from 'react'
import ErrorScreen from '../../../lib/app/App/ErrorScreen.js'

export const title = 'ErrorScreen'

export const tests = [
  {
    title: 'Simple',
    render: () => (
      <ErrorScreen
        error={new Error('Test error')}
        resetErrorBoundary={console.log.bind(console, 'resetErrorBoundary')}
      />
    ),
  },
]
