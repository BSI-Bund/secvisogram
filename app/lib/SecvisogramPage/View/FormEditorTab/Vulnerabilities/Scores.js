import React from 'react'
import ArrayContainer from '../shared/ArrayContainer'
import { Products } from '../shared/definitions'
import ObjectContainer from '../shared/ObjectContainer'
import TextAttribute from '../shared/TextAttribute'
import CVSSV3Editor from './Scores/CVSS3Editor'

/**
 * @param {{
 *  value: unknown
 *  validationErrors: import('../../../../shared/validationTypes').ValidationError[]
 *  dataPath: string
 *  onUpdate(dataPath: string, update: {}): void
 * }} props
 */
export default function Scores(props) {
  return (
    <ArrayContainer
      {...props}
      label="List of scores"
      description="contains score objects for the currrent vulnerability."
      defaultItemValue={() => ({
        products: [''],
      })}
    >
      {(scoreItemProps) => (
        <ObjectContainer
          {...scoreItemProps}
          label="Score"
          description="specifies information about (at least one) score of the vulnerability and for which products the given value applies."
        >
          {(scoreProps) => (
            <>
              <Products {...scoreProps('products')} />
              <ObjectContainer
                {...scoreProps('cvss_v2')}
                label="JSON Schema for Common Vulnerability Scoring System version 2.0"
                description=""
              >
                {(cvssV2Props) => (
                  <>
                    <TextAttribute
                      {...cvssV2Props('vectorString')}
                      label="VectorString"
                      description=""
                      canBeAdded={false}
                      readOnly
                    />
                  </>
                )}
              </ObjectContainer>
              <CVSSV3Editor {...scoreProps('cvss_v3')} />
            </>
          )}
        </ObjectContainer>
      )}
    </ArrayContainer>
  )
}
