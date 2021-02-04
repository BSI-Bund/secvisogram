import React from 'react'
import ArrayContainer from '../ArrayContainer'
import EnumAttribute from '../EnumAttribute'
import ObjectContainer from '../ObjectContainer'
import TextAreaAttribute from '../TextAreaAttribute'
import TextAttribute from '../TextAttribute'

/**
 * @param {{
 *  label: string
 *  description: string
 *  validationErrors: import('../../../../../shared/validationTypes').ValidationError[]
 *  dataPath: string
 *  value?: unknown
 *  onUpdate({}): void
 * }} props
 */
export default function Notes({
  label,
  description,
  validationErrors,
  dataPath,
  value: notes,
  onUpdate,
}) {
  return (
    <ArrayContainer
      label={label}
      description={description}
      validationErrors={validationErrors}
      dataPath={dataPath}
      value={notes}
      defaultItemValue={() => ({
        type: '',
        text: '',
      })}
      onUpdate={onUpdate}
    >
      {({ value, dataPath: itemDataPath }) => (
        <ObjectContainer
          value={value}
          label="Note"
          description="Is a place to put all manner of text blobs related to the current context."
          dataPath={`${itemDataPath}`}
          validationErrors={validationErrors}
          defaultValue={() => ({
            type: '',
            text: '',
          })}
          onUpdate={onUpdate}
        >
          {({ value: note }) => (
            <>
              <TextAttribute
                label="Title of note"
                description="Provides a concise description of what is contained in the text of the note."
                placeholder="Details"
                deletable
                validationErrors={validationErrors}
                dataPath={`${itemDataPath}/title`}
                value={note.title}
                onUpdate={onUpdate}
              />
              <EnumAttribute
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
                validationErrors={validationErrors}
                dataPath={`${itemDataPath}/type`}
                value={note.type}
                onUpdate={onUpdate}
              />
              <TextAreaAttribute
                label="Note contents"
                description="The contents of the note. Content varies depending on type."
                validationErrors={validationErrors}
                dataPath={`${itemDataPath}/text`}
                value={note.text}
                onUpdate={onUpdate}
              />
            </>
          )}
        </ObjectContainer>
      )}
    </ArrayContainer>
  )
}
