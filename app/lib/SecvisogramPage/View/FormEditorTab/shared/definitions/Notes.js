import React from 'react'
import ArrayContainer from '../ArrayContainer'
import EnumAttribute from '../EnumAttribute'
import ObjectContainer from '../ObjectContainer'
import TextAreaAttribute from '../TextAreaAttribute'
import TextAttribute from '../TextAttribute'
import validationErrorShallowEqual from '../validationErrorShallowEqual'

export default React.memo(
  /**
   * @param {{
   *  label?: string
   *  description?: string
   *  validationErrors: import('../../../../../shared/validationTypes').ValidationError[]
   *  dataPath: string
   *  value: unknown
   *  onUpdate(dataPath: string, update: {}): void
   * }} props
   */
  function Notes({
    label = 'List of notes',
    description = 'Contains notes which are specific to the current context.',
    ...props
  }) {
    return (
      <ArrayContainer
        {...props}
        label={label}
        description={description}
        defaultItemValue={() => ({
          category: '',
          text: '',
        })}
      >
        {(itemProps) => <Note {...itemProps} />}
      </ArrayContainer>
    )
  },
  validationErrorShallowEqual
)

const Note = React.memo(
  /**
   * @param {{
   *  validationErrors: import('../../../../../shared/validationTypes').ValidationError[]
   *  dataPath: string
   *  value: unknown
   *  defaultValue?(): {}
   *  onUpdate(dataPath: string, update: {}): void
   * }} props
   */
  function Note({ ...props }) {
    return (
      <ObjectContainer
        {...props}
        label="Note"
        description="Is a place to put all manner of text blobs related to the current context."
      >
        {(noteProps) => (
          <>
            <TextAttribute
              {...noteProps('audience')}
              label="Audience of note"
              description="Indicate who is intended to read it."
              placeholder="all"
              deletable
            />
            <EnumAttribute
              {...noteProps('category')}
              label="Note category"
              description="Choice of what kind of note this is."
              options={[
                'description',
                'details',
                'faq',
                'general',
                'legal_disclaimer',
                'other',
                'summary',
              ]}
            />
            <TextAttribute
              {...noteProps('title')}
              label="Title of note"
              description="Provides a concise description of what is contained in the text of the note."
              placeholder="Details"
              deletable
            />
            <TextAreaAttribute
              {...noteProps('text')}
              label="Note contents"
              description="The contents of the note. Content varies depending on type."
            />
          </>
        )}
      </ObjectContainer>
    )
  },
  validationErrorShallowEqual
)
