import React from 'react'
import { render } from 'react-dom'
import App from './app/App.js'
import SecvisogramPage from './app/SecvisogramPage.js'
import './i18next/i18next.js'
import LoadingIndicator from './app/SecvisogramPage/View/LoadingIndicator.js'

const root = document.createElement('div')
document.body.appendChild(root)

render(
  <React.Suspense fallback={<LoadingIndicator label="" />}>
    <App secvisogramPage={<SecvisogramPage />} />
  </React.Suspense>,
  root
)
