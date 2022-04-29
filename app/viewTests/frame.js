import React from 'react'
import { render } from 'react-dom'
import suites from './shared/suites.js'

const el = document.createElement('div')
document.body.appendChild(el)

render(<App viewTests={suites} />, el)

/**
 * @param {{
    viewTests: Array<{
      title: string
      tests: Array<{ title: string; render(): JSX.Element }>
    }>
  }} props
 */
function App({ viewTests }) {
  return (
    <div className="flex flex-col h-screen">
      <iframe
        className="h-full"
        src={`view-tests-canvas.html?${new URL(
          window.location.href
        ).searchParams.toString()}`}
      />
      <div className="shadow border p-4">
        <select
          className="p-2 w-full md:w-1/3"
          value={
            new URL(window.location.href).searchParams.get('test') ?? undefined
          }
          onChange={(/** @type {any} */ e) => {
            window.location.search = `?test=${e.target.value}`
          }}
        >
          <option value="">-- Select view-test --</option>
          {viewTests.map((suite) => (
            <optgroup key={suite.title} label={suite.title}>
              {suite.tests.map((s) => (
                <option key={s.title} value={`${suite.title}/${s.title}`}>
                  {s.title}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>
    </div>
  )
}
