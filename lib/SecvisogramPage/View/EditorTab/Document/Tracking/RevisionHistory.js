import React from 'react'
import ArrayContainer from '../../shared/ArrayContainer'
import DateAttribute from '../../shared/DateAttribute'
import Version from '../../shared/Definitions/Version'
import ObjectContainer from '../../shared/ObjectContainer'
import TextAreaAttribute from '../../shared/TextAreaAttribute'

/**
 * @param {{
 *  validationErrors: import('../../../../../shared/validationTypes').ValidationError[]
 *  dataPath: string
 *  value: unknown
 *  onUpdate({}): void
 * }} props
 */
export default function RevisionHistory(props) {
  return (
    <ArrayContainer
      {...props}
      label="Revision history"
      description="Contains all the information elements required to track the evolution of a CSAF document."
      defaultItemValue={() => ({
        number: '',
        date: '',
        summary: '',
      })}
    >
      {(revisionHistoryProps) => (
        <ObjectContainer {...revisionHistoryProps} label="" description="">
          {(revisionHistoryItemProps) => (
            <>
              <Version {...revisionHistoryItemProps('number')} />
              <DateAttribute
                {...revisionHistoryItemProps('date')}
                label="Date of the revision"
                description="The date of the revision entry"
              />
              <TextAreaAttribute
                {...revisionHistoryItemProps('summary')}
                label="Summary of the revision"
                description="Holds a single non-empty string representing a short description of the changes."
              />
            </>
          )}
        </ObjectContainer>
      )}
    </ArrayContainer>
  )
}
