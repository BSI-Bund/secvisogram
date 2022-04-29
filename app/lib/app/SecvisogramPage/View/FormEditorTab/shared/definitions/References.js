import React from 'react'
import ArrayContainer from '../ArrayContainer.js'
import EnumAttribute from '../EnumAttribute.js'
import ObjectContainer from '../ObjectContainer.js'
import TextAreaAttribute from '../TextAreaAttribute.js'
import TextAttribute from '../TextAttribute.js'
import validationErrorShallowEqual from '../validationErrorShallowEqual.js'

export default React.memo(
  /**
   * @param {{
   *  label?: string
   *  description?: string
   *  value: unknown
   *  validationErrors: import('../../../../shared/types').ValidationError[]
   *  instancePath: string
   *  onUpdate(instancePath: string, update: {}): void
   * }} props
   */
  function References({
    label = 'List of references',
    description = 'Holds a list of references.',
    ...props
  }) {
    return (
      <ArrayContainer
        {...props}
        label={label}
        description={description}
        defaultItemValue={() => ({ summary: '', url: '' })}
      >
        {(itemProps) => (
          <ObjectContainer
            {...itemProps}
            label="Reference"
            description="Holds any reference to conferences, papers, advisories, and other resources that are related and considered related to either a surrounding part of or the entire document and to be of value to the document consumer."
          >
            {(referenceProps) => (
              <>
                <EnumAttribute
                  {...referenceProps('category')}
                  label="Category of reference"
                  description="Indicates whether the reference points to the same document or vulnerability in focus (depending on scope) or to an external resource."
                  options={['external', 'self']}
                  defaultValue={() => 'external'}
                  deletable
                />
                <TextAreaAttribute
                  {...referenceProps('summary')}
                  label="Summary of the reference"
                  description="Indicates what this reference refers to."
                />
                <TextAttribute
                  {...referenceProps('url')}
                  label="URL of reference"
                  description="Provides the URL for the reference."
                  type="url"
                />
              </>
            )}
          </ObjectContainer>
        )}
      </ArrayContainer>
    )
  },
  validationErrorShallowEqual
)
