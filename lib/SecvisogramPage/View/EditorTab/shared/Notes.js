import React from 'react'
import DocObject from '../shared/DocObject'
import DocObjectArray from '../shared/DocObjectArray'
import EnumAttribute from '../shared/EnumAttribute'
import TextAreaAttribute from '../shared/TextAreaAttribute'
import TextAttribute from '../shared/TextAttribute'

/**
 * @param {{
 *  label: string
 *  description: string
 *  validationErrors: import('../../../../shared/validationTypes').ValidationError[]
 *  dataPath: string
 *  objectName: string
 *  value?: Array<{
 *  }>
 *  onUpdate({}): void
 * }} props
 */
export default function Notes({
  label,
  description,
  validationErrors,
  dataPath,
  objectName,
  value: notes,
  onUpdate,
}) {
  return (
    <DocObject
      label={label}
      description={description}
      validationErrors={validationErrors}
      dataPath={dataPath}
      objectName={objectName}
      object={notes}
      defaultValue={() => [
        {
          type: '',
          text: '',
        },
      ]}
      onUpdate={onUpdate}
    >
      {notes ? (
        <DocObjectArray
          array={notes}
          itemLabel="Note"
          itemDescription="Is a place to put all manner of text blobs related to the current context."
          dataPath={dataPath}
          validationErrors={validationErrors}
          defaultValue={() => [
            {
              type: '',
              text: '',
            },
          ]}
          onDocUpdate={onUpdate}
        >
          {({ value, index }) => (
            <>
              <TextAttribute
                label="Title of note"
                description="Provides a concise description of what is contained in the text of the note."
                placeholder="Details"
                minLength={1}
                validationErrors={validationErrors}
                dataPath={`${dataPath}/${index}/title`}
                value={value.title}
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
                required
                validationErrors={validationErrors}
                dataPath={`${dataPath}/${index}/type`}
                value={value.type}
                onUpdate={onUpdate}
              />
              <TextAreaAttribute
                label="Note contents"
                description="The contents of the note. Content varies depending on type."
                required
                validationErrors={validationErrors}
                dataPath={`${dataPath}/${index}/text`}
                attributeName="text"
                value={value.text}
                onUpdate={() => {}}
              />
            </>
          )}
        </DocObjectArray>
      ) : null}
    </DocObject>
  )
}
