import '@reach/combobox/styles.css'
import React from 'react'
import AggregateSeverity from './Document/AggregateSeverity'
import Publisher from './Document/Publisher'
import Tracking from './Document/Tracking'
import Acknowledgments from './shared/Definitions/Acknowledgments'
import Notes from './shared/Definitions/Notes'
import EnumAttribute from './shared/EnumAttribute'
import ObjectContainer from './shared/ObjectContainer'
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
 *    aggregate_severity: {
 *      namespace: string
 *      text: string
 *    }
 *    notes: Array<{
 *    }>
 *  }
 *  validationErrors: import('../../../shared/validationTypes').ValidationError[]
 *  dataPath: string
 *  onUpdate({}): void
 * }} props
 */
export default function Document({
  value: document,
  validationErrors,
  dataPath,
  onUpdate,
}) {
  return (
    <ObjectContainer
      label="Document level meta-data"
      description="Captures the meta-data about this document describing a particular set of security advisories."
      validationErrors={validationErrors}
      dataPath={dataPath}
      value={document}
      defaultValue={() => ({
        title: '',
        csaf_version: '',
        type: '',
      })}
      onUpdate={onUpdate}
    >
      {(documentLevelMetaDataProps) => (
        <>
          <EnumAttribute
            {...documentLevelMetaDataProps('csaf_version')}
            label="CSAF version"
            description="Gives the version of the CSAF specification which the document was generated for."
            options={['2.0']}
          />
          <TextAttribute
            {...documentLevelMetaDataProps('title')}
            label="Title of this document"
            description="This SHOULD be a canonical name for the document, and sufficiently unique to distinguish it from similar documents."
            placeholder="Example Company Cross-Site-Scripting Vulnerability in Example Generator"
          />
          <Publisher {...documentLevelMetaDataProps('publisher')} />
          <TextAttribute
            {...documentLevelMetaDataProps('type')}
            label="Document type"
            description="Defines a short canonical name, chosen by the document producer, which will inform the end user as to the type of document."
            placeholder="Security Advisory"
          />
          <Tracking {...documentLevelMetaDataProps('tracking')} />
          <Acknowledgments {...documentLevelMetaDataProps('acknowledgments')} />
          <AggregateSeverity
            {...documentLevelMetaDataProps('aggregate_severity')}
          />
          <Notes
            {...documentLevelMetaDataProps('notes')}
            label="Notes associated with the whole document."
            description="Holds notes about this set of vulnerabilities."
          />
        </>
      )}
    </ObjectContainer>
  )
}
