import { render } from 'react-dom'
import suites from './shared/suites.js'

const viewTests = suites

const el = document.createElement('div')
document.body.appendChild(el)

const viewTest = viewTests
  .find(
    (t) =>
      new URL(window.location.href).searchParams.get('test')?.split('/')[0] ===
      t.title
  )
  ?.tests.find(
    (t) =>
      t.title ===
      new URL(window.location.href).searchParams.get('test')?.split('/')[1]
  )

if (viewTest) {
  render(viewTest.render(), el)
}
