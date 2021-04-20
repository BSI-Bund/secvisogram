import React from 'react'
import ArrayContainer from '../ArrayContainer'
import ObjectContainer from '../ObjectContainer'
import TextAttribute from '../TextAttribute'
import validationErrorShallowEqual from '../validationErrorShallowEqual'

export default React.memo(
  /**
   * @param {{
   *  validationErrors: import('../../../../../shared/validationTypes').ValidationError[]
   *  dataPath: string
   *  value: unknown
   *  onUpdate(dataPath: string, update: {}): void
   * }} props
   */
  function Acknowledgments(props) {
    return (
      <ArrayContainer
        {...props}
        label="List of acknowledgments"
        description="Contains a list of acknowledgment elements."
        defaultItemValue={() => ({})}
      >
        {(acknowledgementsProps) => (
          <ObjectContainer
            {...acknowledgementsProps}
            label="Acknowledgment"
            description="Acknowledges contributions by describing those that contributed."
          >
            {(acknowledgmentProps) => (
              <>
                <ArrayContainer
                  {...acknowledgmentProps('names')}
                  label="List of acknowledged names"
                  description="Contains the names of entities being recognized."
                  defaultItemValue={() => ''}
                >
                  {(namesItemProps) => (
                    <TextAttribute
                      {...namesItemProps}
                      label="Name of entity being recognized"
                      description="Contains the name of a single person."
                      placeholder="Johann Sebastian Bach"
                      deletable
                    />
                  )}
                </ArrayContainer>
                <TextAttribute
                  {...acknowledgmentProps('organization')}
                  label="Contributing organization"
                  description="Contains the name of a contributing organization being recognized."
                  placeholder="CISA"
                  deletable
                />
                <TextAttribute
                  {...acknowledgmentProps('summary')}
                  label="Summary of the acknowledgment"
                  description="SHOULD represent any contextual details the document producers wish to make known about the acknowledgment or acknowledged parties."
                  placeholder="First analysis of Coordinated Multi-Stream Attack (CMSA)"
                  deletable
                />
                <ArrayContainer
                  {...acknowledgmentProps('urls')}
                  label="List of URLs"
                  description="Specifies a list of URLs or location of the reference to be acknowledged."
                  defaultItemValue={() => ''}
                >
                  {(urlsItemProps) => (
                    <TextAttribute
                      {...urlsItemProps}
                      label="URL of acknowledgment"
                      description="Contains the URL or location of the reference to be acknowledged."
                      placeholder="CISA"
                      deletable
                    />
                  )}
                </ArrayContainer>
              </>
            )}
          </ObjectContainer>
        )}
      </ArrayContainer>
    )
  },
  validationErrorShallowEqual
)
