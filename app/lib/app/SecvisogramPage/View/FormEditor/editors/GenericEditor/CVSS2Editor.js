import { set } from 'lodash/fp.js'
import React from 'react'
import {
  vectorUpdateBaseScore,
  vectorUpdateEnvironmentalScore,
  vectorUpdateFromVectorString,
  vectorUpdateTemporalScore,
  vectorUpdateVectorString,
} from '../../../../../../shared/cvss2Tools.js'
import DocumentEditorContext from '../../../shared/DocumentEditorContext.js'
import ObjectEditor from './ObjectEditor.js'

/**
 * @param {object} props
 * @param {import('../../shared/types').Property | null} props.parentProperty
 * @param {import('../../shared/types').Property} props.property
 * @param {unknown} props.value
 * @param {string[]} props.instancePath
 */
export default function CVSS2Editor({
  instancePath,
  property,
  parentProperty,
  ...props
}) {
  const { doc, updateDoc, ...outerDocumentEditor } = React.useContext(
    DocumentEditorContext
  )
  /** @type {import('../../../../../../shared/cvss2Tools.js').VectorShape} */
  const value = React.useMemo(
    () =>
      typeof props.value === 'object' && props.value !== null
        ? props.value
        : {},
    [props.value]
  )

  /** @type {React.ContextType<typeof DocumentEditorContext>} */
  const documentEditor = React.useMemo(
    () => ({
      ...outerDocumentEditor,
      doc,
      updateDoc(updatedInstancePath, updatedValue) {
        const field = updatedInstancePath.at(-1)
        let updatedVector = set(
          updatedInstancePath.slice(instancePath.length),
          updatedValue
        )(value)
        updatedVector.version = '2.0'

        updatedVector =
          field === 'vectorString' && typeof updatedValue === 'string'
            ? vectorUpdateFromVectorString(updatedVector)
            : vectorUpdateVectorString(updatedVector)

        updatedVector = vectorUpdateBaseScore(updatedVector)
        updatedVector = vectorUpdateTemporalScore(updatedVector)
        updatedVector = vectorUpdateEnvironmentalScore(updatedVector)
        updateDoc(instancePath, updatedVector)
      },
    }),
    [outerDocumentEditor, updateDoc, instancePath, value, doc]
  )

  return (
    <DocumentEditorContext.Provider value={documentEditor}>
      <ObjectEditor
        instancePath={instancePath}
        parentProperty={parentProperty}
        property={property}
      />
    </DocumentEditorContext.Provider>
  )
}
