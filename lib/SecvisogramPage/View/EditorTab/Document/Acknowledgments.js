import React from 'react'
import Delete from '../shared/Delete'
import Object from '../shared/Object'
import ObjectArray from '../shared/ObjectArray'
import TextAttribute from '../shared/TextAttribute'
import Names from './Acknowledgments/Names'
import Organizations from './Acknowledgments/Organizations'
import Urls from './Acknowledgments/Urls'

/**
 * @param {{
 *  validationErrors: import('../../../../shared/validationTypes').ValidationError[]
 *  dataPath: string
 *  objectName: string
 *  value?: Array<{
 *    names: string[],
 *    organizations: string[]
 *    summary: string
 *    urls: string[]
 *  }>
 *  onUpdate({}): void
 * }} props
 */
export default function Acknowledgments({
  validationErrors,
  dataPath,
  objectName,
  value: acknowledgments,
  ...props
}) {
  /**
   * @param {{}} data
   */
  const onUpdate = (data) => {
    props.onUpdate({
      document: {
        acknowledgments: data,
      },
    })
  }

  return (
    <Object
      label="List of acknowledgments"
      description="Contains a list of acknowledgment elements."
      validationErrors={validationErrors}
      dataPath={dataPath}
      objectName={objectName}
      object={acknowledgments}
      defaultValue={() => [{}]}
      onDocUpdate={props.onUpdate}
    >
      {acknowledgments ? (
        <ObjectArray
          array={acknowledgments}
          itemLabel="Acknowledgment"
          itemDescription="Acknowledges contributions by describing those that contributed."
          dataPath={dataPath}
          validationErrors={validationErrors}
          onDocUpdate={props.onUpdate}
        >
          {({ value, index }) => (
            <>
              <Names
                value={value.names}
                validationErrors={validationErrors}
                dataPath={`${dataPath}/${index}/names`}
                objectName="names"
                onUpdate={(data) => {
                  onUpdate({ [index]: { names: data } })
                }}
              />

              <Organizations
                value={value.organizations}
                dataPath={`${dataPath}/${index}/organizations`}
                objectName="organizations"
                validationErrors={validationErrors}
                onUpdate={(data) => {
                  onUpdate({ [index]: { organizations: data } })
                }}
              />

              <Urls
                value={value.urls}
                dataPath={`${dataPath}/${index}/urls`}
                objectName="urls"
                validationErrors={validationErrors}
                onUpdate={(data) => {
                  onUpdate({ [index]: { urls: data } })
                }}
              />
              <TextAttribute
                label="Summary of the acknowledgment"
                description="SHOULD represent any contextual details the document producers wish to make known about the acknowledgment or acknowledged parties."
                placeholder="First analysis of Coordinated Multi-Stream Attack (CMSA)"
                validationErrors={validationErrors}
                dataPath={`${dataPath}/${index}/summary`}
                attributeName="summary"
                value={value.summary}
                onUpdate={(data) => {
                  onUpdate({ [index]: { summary: data } })
                }}
              >
                <Delete
                  doDelete={() => {
                    onUpdate({ [index]: { summary: { $set: undefined } } })
                  }}
                />
              </TextAttribute>
            </>
          )}
        </ObjectArray>
      ) : null}
    </Object>
  )
}
