import React from 'react'
import EnumAttribute from '../shared/EnumAttribute.js'
import ObjectContainer from '../shared/ObjectContainer.js'
import TextAttribute from '../shared/TextAttribute.js'
import validationErrorShallowEqual from '../shared/validationErrorShallowEqual.js'

export default React.memo(
  /**
   * @param {{
   *  validationErrors: import('../../../shared/types').ValidationError[]
   *  instancePath: string
   *  value: unknown
   *  onUpdate(instancePath: string, update: {}): void
   * }} props
   */
  function Publisher(props) {
    return (
      <ObjectContainer
        {...props}
        label="Publisher"
        description="Provides information about the publisher of the document."
        defaultValue={() => ({
          category: '',
          name: '',
        })}
      >
        {(publisherProps) => (
          <>
            <EnumAttribute
              {...publisherProps('category')}
              label="Category of publisher"
              description="Provides information about the category of publisher releasing the document."
              options={[
                'coordinator',
                'discoverer',
                'other',
                'translator',
                'user',
                'vendor',
              ]}
            />
            <TextAttribute
              {...publisherProps('contact_details')}
              label="Contact details"
              description="Information on how to contact the publisher, possibly including details such as web sites, email addresses, phone numbers, and postal mail addresses."
              placeholder="Example Company can be reached at contact_us@example.com, or via our website at https://www.example.com/contact."
              deletable
            />
            <TextAttribute
              {...publisherProps('issuing_authority')}
              label="Issuing authority"
              description="Provides information about the authority of the issuing party to release the document, in particular, the party's constituency and responsibilities or other obligations."
              deletable
            />
            <TextAttribute
              {...publisherProps('name')}
              label="Name of publisher"
              description="Contains the name of the issuing party."
              placeholder="Example PSIRT"
            />
            <TextAttribute
              {...publisherProps('namespace')}
              label="Namespace of publisher"
              description="Contains a URL which is under control of the issuing party and can be used as a globally unique identifier for that issuing party."
              placeholder="https://www.example.com"
            />
          </>
        )}
      </ObjectContainer>
    )
  },
  validationErrorShallowEqual
)
