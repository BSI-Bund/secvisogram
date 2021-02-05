import '@reach/combobox/styles.css'
import React from 'react'
import AggregateSeverity from './Document/AggregateSeverity'
import Distribution from './Document/Distribution'
import Publisher from './Document/Publisher'
import Tracking from './Document/Tracking'
import Acknowledgments from './shared/Definitions/Acknowledgments'
import Lang from './shared/Definitions/Lang'
import Notes from './shared/Definitions/Notes'
import References from './shared/Definitions/References'
import EnumAttribute from './shared/EnumAttribute'
import ObjectContainer from './shared/ObjectContainer'
import TextAttribute from './shared/TextAttribute'

/**
 * @param {{
 *  value: unknown
 *  validationErrors: import('../../../shared/validationTypes').ValidationError[]
 *  dataPath: string
 *  onUpdate({}): void
 * }} props
 */
export default function Document(props) {
  return (
    <ObjectContainer
      {...props}
      label="Document level meta-data"
      description="Captures the meta-data about this document describing a particular set of security advisories."
      defaultValue={() => ({
        csaf_version: '2.0',
        title: '',
        publisher: {
          type: '',
        },
        type: '',
        tracking: {
          id: '',
          current_release_date: '',
          initial_release_date: '',
          revision_history: [
            {
              number: '',
              date: '',
              summary: '',
            },
          ],
          status: '',
          version: '',
        },
      })}
    >
      {(documentLevelMetaDataProps) => (
        <>
          <Acknowledgments {...documentLevelMetaDataProps('acknowledgments')} />
          <AggregateSeverity
            {...documentLevelMetaDataProps('aggregate_severity')}
          />
          <EnumAttribute
            {...documentLevelMetaDataProps('csaf_version')}
            label="CSAF version"
            description="Gives the version of the CSAF specification which the document was generated for."
            options={['2.0']}
          />
          <Distribution {...documentLevelMetaDataProps('distribution')} />
          <Lang
            label="Document language"
            description="Identifies the language used by this document, corresponding to IETF BCP 47 / RFC 5646."
            {...documentLevelMetaDataProps('lang')}
          />
          <Lang
            label="Source language"
            description="If this copy of the document is a translation then the value of this property describes from which language this document was translated."
            {...documentLevelMetaDataProps('source_lang')}
          />
          <Notes
            {...documentLevelMetaDataProps('notes')}
            label="Notes associated with the whole document."
            description="Holds notes about this set of vulnerabilities."
          />
          <Publisher {...documentLevelMetaDataProps('publisher')} />
          <References {...documentLevelMetaDataProps('references')} />
          <TextAttribute
            {...documentLevelMetaDataProps('title')}
            label="Title of this document"
            description="This SHOULD be a canonical name for the document, and sufficiently unique to distinguish it from similar documents."
            placeholder="Example Company Cross-Site-Scripting Vulnerability in Example Generator"
          />
          <Tracking {...documentLevelMetaDataProps('tracking')} />
          <TextAttribute
            {...documentLevelMetaDataProps('type')}
            label="Document type"
            description="Defines a short canonical name, chosen by the document producer, which will inform the end user as to the type of document."
            placeholder="Security Advisory"
          />
        </>
      )}
    </ObjectContainer>
  )
}
