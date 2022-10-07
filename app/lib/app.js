import React from 'react'
import { render } from 'react-dom'
import App from './app/App.js'
import SecvisogramPage from './app/SecvisogramPage.js'

const root = document.createElement('div')
document.body.appendChild(root)

render(<App secvisogramPage={<SecvisogramPage />} />, root)
