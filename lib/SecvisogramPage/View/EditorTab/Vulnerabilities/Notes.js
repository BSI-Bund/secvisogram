import '@reach/combobox/styles.css'
import React from 'react'
import Delete from '../shared/Delete'
import DocObject from '../shared/DocObject'
import DocObjectArray from '../shared/DocObjectArray'
import EnumAttribute from '../shared/EnumAttribute'
import TextAreaAttribute from '../shared/TextAreaAttribute'
import TextAttribute from '../shared/TextAttribute'

/**
 * @param {{
 *  value?: Array<{}>
 *  validationErrors: import('../../../../shared/validationTypes').ValidationError[]
 *  dataPath: string
 *  objectName: string
 *  onUpdate({}): void
 * }} props
 */
export default function Notes({
  value: notes,
  validationErrors,
  dataPath,
  objectName,
  onUpdate,
}) {
  return (
    <DocObject
      label="List of notes"
      description="Contains notes which are specific to the current context."
      validationErrors={validationErrors}
      dataPath={dataPath}
      objectName={objectName}
      object={notes}
      doAdd={() => {
        onUpdate({
          $set: [
            {
              type: '',
              text: '',
            },
          ],
        })
      }}
      doDelete={() => {
        onUpdate({ $set: undefined })
      }}
    >
      {notes ? (
        <DocObjectArray
          array={notes}
          itemLabel="Note"
          itemDescription="Is a place to put all manner of text blobs related to the current context."
          dataPath={dataPath}
          validationErrors={validationErrors}
          onUpdate={onUpdate}
        >
          {({ value, index }) => (
            <>
              <TextAttribute
                label="Title of note"
                description="Provides a concise description of what is contained in the text of the note."
                placeholder="Details"
                validationErrors={validationErrors}
                dataPath={`${dataPath}/${index}/title`}
                attributeName="title"
                value={value.title}
                onUpdate={(data) => {
                  onUpdate({ [index]: { title: data } })
                }}
              >
                <Delete
                  doDelete={() => {
                    onUpdate({ [index]: { title: { $set: undefined } } })
                  }}
                />
              </TextAttribute>
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
                attributeName="type"
                value={value.type}
                onUpdate={(data) => {
                  onUpdate({ [index]: { type: data } })
                }}
              />
              <TextAreaAttribute
                label="Note contents"
                description="The contents of the note. Content varies depending on type."
                required
                validationErrors={validationErrors}
                dataPath={`${dataPath}/${index}/text`}
                attributeName="text"
                value={value.text}
                onUpdate={(data) => {
                  onUpdate({ [index]: { text: data } })
                }}
              />
            </>
          )}
        </DocObjectArray>
      ) : null}
    </DocObject>
  )
}
