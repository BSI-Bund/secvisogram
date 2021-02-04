import '@reach/combobox/styles.css'
import React from 'react'
import Publisher from './Document/Publisher'
import Tracking from './Document/Tracking'
import Acknowledgments from './shared/Definitions/Acknowledgments'
import Notes from './shared/Definitions/Notes'
import DocObject from './shared/DocObject'
import EnumAttribute from './shared/EnumAttribute'
import TextAttribute from './shared/TextAttribute'

/**
 * @param {{
 *  value?: {
 *    csaf_version: string
 *    title: string
 *    publisher: {
 *      type: string,
 *    }
 *    type: string
 *    tracking: {
 *      current_release_date: string,
 *      id: string,
 *      initial_release_date: string,
 *      revision_history: Array<{
 *        number: string
 *        date: string
 *        summary: string
 *      }>,
 *      status: string,
 *      version: string
 *    }
 *    acknowledgments: Array<{
 *      names: string[],
 *      organizations: string[]
 *      summary: string
 *      urls: string[]
 *    }>
 *    notes: Array<{
 *    }>
 *  }
 *  validationErrors: import('../../../shared/validationTypes').ValidationError[]
 *  dataPath: string
 *  objectName: string
 *  onUpdate({}): void
 * }} props
 */
export default function Document({
  value: document,
  validationErrors,
  dataPath,
  objectName,
  onUpdate,
}) {
  return (
    <DocObject
      label="Document level meta-data"
      description="Captures the meta-data about this document describing a particular set of security advisories."
      validationErrors={validationErrors}
      dataPath={dataPath}
      objectName={objectName}
      object={document}
      defaultValue={() => ({
        title: '',
        csaf_version: '',
        type: '',
      })}
      onUpdate={onUpdate}
    >
      {document ? (
        <>
          <TextAttribute
            label="Title of this document"
            description="This SHOULD be a canonical name for the document, and sufficiently unique to distinguish it from similar documents."
            placeholder="Example Company Cross-Site-Scripting Vulnerability in Example Generator"
            required
            minLength={1}
            validationErrors={validationErrors}
            dataPath={`${dataPath}/title`}
            value={document.title}
            onUpdate={onUpdate}
          />
          <EnumAttribute
            label="CSAF version"
            description="Gives the version of the CSAF specification which the document was generated for."
            options={['2.0']}
            required
            validationErrors={validationErrors}
            dataPath={`${dataPath}/csaf_version`}
            value={document.csaf_version}
            onUpdate={onUpdate}
          />
          <TextAttribute
            label="Document type"
            description="Defines a short canonical name, chosen by the document producer, which will inform the end user as to the type of document."
            placeholder="Security Advisory"
            required
            minLength={1}
            validationErrors={validationErrors}
            dataPath={`${dataPath}/type`}
            value={document.type}
            onUpdate={onUpdate}
          />
          <Tracking
            validationErrors={validationErrors}
            dataPath={`${dataPath}/tracking`}
            objectName="tracking"
            value={document.tracking}
            onUpdate={onUpdate}
          />
          <Publisher
            validationErrors={validationErrors}
            dataPath={`${dataPath}/publisher`}
            objectName="publisher"
            value={document.publisher}
            onUpdate={onUpdate}
          />
          <Acknowledgments
            validationErrors={validationErrors}
            dataPath={`${dataPath}/acknowledgments`}
            objectName="acknowledgments"
            value={document.acknowledgments}
            onUpdate={onUpdate}
          />
          <Notes
            label="Notes associated with the whole document."
            description="Holds notes about this set of vulnerabilities."
            validationErrors={validationErrors}
            dataPath={`${dataPath}/notes`}
            objectName="notes"
            value={document.notes}
            onUpdate={onUpdate}
          />
        </>
      ) : null}
    </DocObject>
  )
}
