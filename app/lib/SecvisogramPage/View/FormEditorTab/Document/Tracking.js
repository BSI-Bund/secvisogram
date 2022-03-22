import '@reach/combobox/styles.css'
import React from 'react'
import ArrayContainer from '../shared/ArrayContainer.js'
import DateAttribute from '../shared/DateAttribute.js'
import { Version } from '../shared/definitions.js'
import EnumAttribute from '../shared/EnumAttribute.js'
import ObjectContainer from '../shared/ObjectContainer.js'
import TextAttribute from '../shared/TextAttribute.js'
import validationErrorShallowEqual from '../shared/validationErrorShallowEqual.js'
import RevisionHistory from './Tracking/RevisionHistory.js'

export default React.memo(
  /**
   * @param {{
   *  validationErrors: import('../../../../shared/validationTypes').ValidationError[]
   *  instancePath: string
   *  value: unknown
   *  onUpdate(instancePath: string, update: {}): void
   * }} props
   */
  function Tracking(props) {
    return (
      <ObjectContainer
        {...props}
        label="Tracking"
        description="Is a container designated to hold all management attributes necessary to track a CSAF document as a whole."
        defaultValue={() => ({
          current_release_date: '',
          id: '',
          initial_release_date: '',
          status: '',
          version: '',
        })}
      >
        {(trackingProps) => (
          <>
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
              {...trackingProps('generator')}
              label="Document generator"
              description="Is a container to hold all elements related to the generation of the document. These items will reference when the document was actually created, including the date it was generated and the entity that generated it."
              defaultValue={() => ({ engine: {} })}
              deletable={false}
            >
              {(generatorProps) => (
                <>
                  <DateAttribute
                    {...generatorProps('date')}
                    label="Date of document generation"
                    description="This SHOULD be the current date that the document was generated. Because documents are often generated internally by a document producer and exist for a nonzero amount of time before being released, this field MAY be different from the Initial Release Date and Current Release Date."
                    readOnly
                  />
                  <ObjectContainer
                    {...generatorProps('engine')}
                    label="Engine of document generation"
                    description="Contains information about the engine that generated the CSAF document."
                    defaultValue={() => ({ name: '' })}
                    deletable={false}
                  >
                    {(engineProps) => (
                      <>
                        <TextAttribute
                          {...engineProps('name')}
                          label="Engine name"
                          description="Represents the name of the engine that generated the CSAF document."
                          placeholder="Secvisogram"
                          readOnly
                        />
                        <TextAttribute
                          {...engineProps('version')}
                          label="Engine version"
                          description="Contains the version of the engine that generated the CSAF document."
                          placeholder="0.6.0"
                          readOnly
                        />
                      </>
                    )}
                  </ObjectContainer>
                </>
              )}
            </ObjectContainer>
            <TextAttribute
              {...trackingProps('id')}
              label="Unique identifier for the document"
              description="The ID is a simple label that provides for a wide range of numbering values, types, and schemes. Its value SHOULD be assigned and maintained by the original document issuing authority."
              pattern="^[\S](.*[\S])?$"
              placeholder="Example Company - 2019-YH3234"
            />
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
  },
  validationErrorShallowEqual
)
