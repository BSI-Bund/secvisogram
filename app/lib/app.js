import React from 'react'
import { render } from 'react-dom'
import App from './app/App.js'
import SecvisogramPage from './app/SecvisogramPage.js'
import './i18next/i18next.js'

const root = document.createElement('div')
document.body.appendChild(root)

render(
  <React.Suspense fallback={<div>bla</div>}>
    <App secvisogramPage={<SecvisogramPage />} />
  </React.Suspense>,
  root
)
