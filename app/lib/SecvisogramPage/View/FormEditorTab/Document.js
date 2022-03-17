import '@reach/combobox/styles.css'
import React from 'react'
import AggregateSeverity from './Document/AggregateSeverity'
import Distribution from './Document/Distribution'
import Publisher from './Document/Publisher'
import Tracking from './Document/Tracking'
import { Acknowledgments, Lang, Notes, References } from './shared/definitions'
import EnumAttribute from './shared/EnumAttribute'
import ObjectContainer from './shared/ObjectContainer'
import TextAttribute from './shared/TextAttribute'
import validationErrorShallowEqual from './shared/validationErrorShallowEqual'

export default React.memo(
  /**
   * @param {{
   *  value: unknown
   *  validationErrors: import('../../../shared/validationTypes').ValidationError[]
   *  instancePath: string
   *  onUpdate(instancePath: string, update: {}): void
   * }} props
   */
  function Document(props) {
    return (
      <ObjectContainer
        {...props}
        label="Document level meta-data"
        description="Captures the meta-data about this document describing a particular set of security advisories."
        defaultValue={() => ({
          category: '',
          csaf_version: '2.0',
          publisher: {
            category: '',
            name: '',
            namespace: '',
          },
          title: '',
          tracking: {
            current_release_date: '',
            id: '',
            initial_release_date: '',
            revision_history: [
              {
                date: '',
                number: '',
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
            <Acknowledgments
              {...documentLevelMetaDataProps('acknowledgments')}
              label="Document acknowledgments"
              description="Contains a list of acknowledgment elements associated with the whole document."
            />
            <AggregateSeverity
              {...documentLevelMetaDataProps('aggregate_severity')}
            />
            <EnumAttribute
              {...documentLevelMetaDataProps('category')}
              label="Document category"
              description="Defines a short canonical name, chosen by the document producer, which will inform the end user as to the category of document."
              freeSolo={true}
              options={[
                'csaf_base',
                'csaf_security_incident_response',
                'csaf_informational_advisory',
                'csaf_security_advisory',
                'csaf_vex',
              ]}
            />
            <EnumAttribute
              {...documentLevelMetaDataProps('csaf_version')}
              label="CSAF version"
              description="Gives the version of the CSAF specification which the document was generated for."
              options={['2.0']}
            />
            <Distribution {...documentLevelMetaDataProps('distribution')} />
            <Lang
              {...documentLevelMetaDataProps('lang')}
              label="Document language"
              description="Identifies the language used by this document, corresponding to IETF BCP 47 / RFC 5646."
              deletable
            />
            <Notes
              {...documentLevelMetaDataProps('notes')}
              label="Document notes"
              description="Holds notes associated with the whole document."
            />
            <Publisher {...documentLevelMetaDataProps('publisher')} />
            <References
              {...documentLevelMetaDataProps('references')}
              label="Document references"
              description="Holds a list of references associated with the whole document."
            />
            <Lang
              {...documentLevelMetaDataProps('source_lang')}
              label="Source language"
              description="If this copy of the document is a translation then the value of this property describes from which language this document was translated."
              deletable
            />
            <TextAttribute
              {...documentLevelMetaDataProps('title')}
              label="Title of this document"
              description="This SHOULD be a canonical name for the document, and sufficiently unique to distinguish it from similar documents."
              placeholder="Example Company Cross-Site-Scripting Vulnerability in Example Generator"
            />
            <Tracking {...documentLevelMetaDataProps('tracking')} />
          </>
        )}
      </ObjectContainer>
    )
  },
  validationErrorShallowEqual
)
