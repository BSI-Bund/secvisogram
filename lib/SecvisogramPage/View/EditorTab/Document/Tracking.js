import '@reach/combobox/styles.css'
import React from 'react'
import ArrayContainer from '../shared/ArrayContainer'
import DateAttribute from '../shared/DateAttribute'
import Version from '../shared/Definitions/Version'
import EnumAttribute from '../shared/EnumAttribute'
import ObjectContainer from '../shared/ObjectContainer'
import TextAttribute from '../shared/TextAttribute'
import RevisionHistory from './Tracking/RevisionHistory'

/**
 * @param {{
 *  validationErrors: import('../../../../shared/validationTypes').ValidationError[]
 *  dataPath: string
 *  value: unknown
 *  onUpdate({}): void
 * }} props
 */
export default function Tracking(props) {
  return (
    <ObjectContainer
      {...props}
      label="Tracking"
      description="Is a container designated to hold all management attributes necessary to track a CSAF document as a whole."
      defaultValue={() => ({
        id: '',
        current_release_date: '',
        initial_release_date: '',
        status: '',
        version: '',
      })}
    >
      {(trackingProps) => (
        <>
          <TextAttribute
            {...trackingProps('id')}
            label="Unique identifier for the document"
            description="The ID is a simple label that provides for a wide range of numbering values, types, and schemes. Its value SHOULD be assigned and maintained by the original document issuing authority."
            placeholder="Example Company - 2019-YH3234"
          />
          <ArrayContainer
            {...trackingProps('aliases')}
            label="Aliases"
            description="Contains a list of alternate names for the same document."
            defaultItemValue={() => ''}
          >
            {(aliasItemProps) => (
              <TextAttribute
                {...aliasItemProps}
                label="Alternate name"
                description="Specifies a non-empty string that represents a distinct optional alternative ID used to refer to the document."
                placeholder="CVE-2019-12345"
                deletable
              />
            )}
          </ArrayContainer>
          <DateAttribute
            {...trackingProps('current_release_date')}
            label="Current release date"
            description="The date when the current revision of this document was released"
          />
          <ObjectContainer
            /** @todo Generate values */
            {...trackingProps('generator')}
            label="Document generator"
            description="Is a container to hold all elements related to the generation of the document. These items will reference when the document was actually created, including the date it was generated and the entity that generated it."
            defaultValue={() => ({ engine: '' })}
          >
            {(generatorProps) => (
              <>
                <TextAttribute
                  {...generatorProps('engine')}
                  label="Engine of document generation"
                  description="This string SHOULD represent the name of the engine that generated the CSAF document, and MAY additionally refer to its version."
                  placeholder="TVCE"
                  readOnly
                />
                <DateAttribute
                  {...generatorProps('date')}
                  label="Date of document generation"
                  description="This SHOULD be the current date that the document was generated. Because documents are often generated internally by a document producer and exist for a nonzero amount of time before being released, this field MAY be different from the Initial Release Date and Current Release Date."
                  deletable
                  readOnly
                />
              </>
            )}
          </ObjectContainer>
          <DateAttribute
            {...trackingProps('initial_release_date')}
            label="Initial release date"
            description="The date when this document was first published."
          />
          <RevisionHistory {...trackingProps('revision_history')} />
          <EnumAttribute
            {...trackingProps('status')}
            label="Document status"
            description="Defines the draft status of the document."
            options={['draft', 'final', 'interim']}
          />
          <Version {...trackingProps('version')} />
        </>
      )}
    </ObjectContainer>
  )
}
