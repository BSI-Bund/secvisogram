import React from 'react'
import ArrayContainer from '../ArrayContainer'
import EnumAttribute from '../EnumAttribute'
import ObjectContainer from '../ObjectContainer'
import TextAreaAttribute from '../TextAreaAttribute'
import TextAttribute from '../TextAttribute'

/**
 * @param {{
 *  label?: string
 *  description?: string
 *  validationErrors: import('../../../../../shared/validationTypes').ValidationError[]
 *  dataPath: string
 *  value: unknown
 *  onUpdate({}): void
 * }} props
 */
export default function Notes({
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
        type: '',
        text: '',
      })}
    >
      {(itemProps) => (
        <ObjectContainer
          {...itemProps}
          label="Note"
          description="Is a place to put all manner of text blobs related to the current context."
        >
          {(noteProps) => (
            <>
              <TextAttribute
                {...noteProps('title')}
                label="Title of note"
                description="Provides a concise description of what is contained in the text of the note."
                placeholder="Details"
                deletable
              />
              <EnumAttribute
                {...noteProps('type')}
                label="Note type"
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
              <TextAreaAttribute
                {...noteProps('text')}
                label="Note contents"
                description="The contents of the note. Content varies depending on type."
              />
            </>
          )}
        </ObjectContainer>
      )}
    </ArrayContainer>
  )
}
