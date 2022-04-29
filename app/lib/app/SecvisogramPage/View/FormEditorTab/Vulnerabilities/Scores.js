import React from 'react'
import ArrayContainer from '../shared/ArrayContainer.js'
import { Products } from '../shared/definitions.js'
import ObjectContainer from '../shared/ObjectContainer.js'
import TextAttribute from '../shared/TextAttribute.js'
import CVSSV3Editor from './Scores/CVSS3Editor.js'

/**
 * @param {{
 *  value: unknown
 *  validationErrors: import('../../../shared/types').ValidationError[]
 *  instancePath: string
 *  onUpdate(instancePath: string, update: {}): void
 *  onCollectProductIds(): Promise<void | {id: string, name: string}[]>
 * }} props
 */
export default function Scores({ onCollectProductIds, ...props }) {
  return (
    <ArrayContainer
      {...props}
      label="List of scores"
      description="Contains score objects for the current vulnerability."
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
              <Products
                {...scoreProps('products')}
                onCollectProductIds={onCollectProductIds}
              />
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
