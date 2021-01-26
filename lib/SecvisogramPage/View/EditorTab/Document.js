import '@reach/combobox/styles.css'
import React from 'react'
import Acknowledgments from './Document/Acknowledgments'
import Publisher from './Document/Publisher'
import Tracking from './Document/Tracking'
import EnumAttribute from './shared/EnumAttribute'
import Object from './shared/Object'
import TextAttribute from './shared/TextAttribute'

/**
 * @param {{
    document?: {
      csaf_version: string
      title: string
      publisher: {
        type: string,
      }
      type: string
      tracking: {
        current_release_date: string,
        id: string,
        initial_release_date: string,
        revision_history: Array<{
          number: string
          date: string
          summary: string
        }>,
        status: string,
        version: string
      }
      acknowledgments: Array<{
        names: string[],
        organizations: string[]
        summary: string
        urls: string[]
      }>
    }
    dataPath: string
    validationErrors: import('../../../shared/validationTypes').ValidationError[]
    onUpdate({}): void
  }} props
 */
export default function Document({
  document,
  dataPath,
  validationErrors,
  onUpdate,
}) {
  return (
    <Object
      object={document}
      label="Document level meta-data"
      description="Captures the meta-data about this document describing a particular set of security advisories."
      dataPath={dataPath}
      validationErrors={validationErrors}
      doAdd={() => {
        onUpdate({
          $set: {
            title: '',
            csaf_version: '',
            type: '',
          },
        })
      }}
      doDelete={() => {
        onUpdate({ $set: undefined })
      }}
    >
      {document ? (
        <>
          <DocumentTitle
            documentTitle={document.title}
            onUpdate={(data) => {
              onUpdate({ title: data })
            }}
          />
          <CsafVersion
            csafVersion={document.csaf_version}
            onUpdate={(data) => {
              onUpdate({ csaf_version: data })
            }}
          />
          <DocumentType
            documentType={document.type}
            onUpdate={(data) => {
              onUpdate({ type: data })
            }}
          />
          <Tracking
            tracking={document.tracking}
            dataPath={`${dataPath}/tracking`}
            validationErrors={validationErrors}
            onUpdate={(data) => {
              onUpdate({ tracking: data })
            }}
          />
          <Publisher
            publisher={document.publisher}
            dataPath={`${dataPath}/publisher`}
            validationErrors={validationErrors}
            onUpdate={(data) => {
              onUpdate({ publisher: data })
            }}
          />
          <Acknowledgments
            dataPath={`${dataPath}/acknowledgments`}
            acknowledgments={document.acknowledgments}
            validationErrors={validationErrors}
            onUpdate={(data) => {
              onUpdate({ acknowledgments: data })
            }}
          />
        </>
      ) : null}
    </Object>
  )
}

/**
   * @param {{
      documentTitle: string
      onUpdate({}): void
    }} props
   */
function DocumentTitle({ documentTitle, onUpdate }) {
  return (
    <TextAttribute
      label="Title of this document"
      description="This SHOULD be a canonical name for the document, and sufficiently unique to distinguish it from similar documents."
      placeholder="Example Company Cross-Site-Scripting Vulnerability in Example Generator"
      value={documentTitle}
      required
      onUpdate={onUpdate}
    />
  )
}

/**
   * @param {{
      csafVersion: string
      onUpdate({}): void
    }} props
   */
function CsafVersion({ csafVersion, onUpdate }) {
  return (
    <EnumAttribute
      label="CSAF version"
      description="Gives the version of the CSAF specification which the document was generated for."
      value={csafVersion}
      options={['2.0']}
      required
      onUpdate={onUpdate}
    />
  )
}

/**
   * @param {{
      documentType: string
      onUpdate({}): void
    }} props
   */
function DocumentType({ documentType, onUpdate }) {
  return (
    <TextAttribute
      label="Document type"
      description="Defines a short canonical name, chosen by the document producer, which will inform the end user as to the type of document."
      placeholder="Security Advisory"
      value={documentType}
      required
      onUpdate={onUpdate}
    />
  )
}
