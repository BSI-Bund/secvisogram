import React from 'react'
import ArrayContainer from '../shared/ArrayContainer'
import Products from '../shared/Definitions/Products'
import ObjectContainer from '../shared/ObjectContainer'
import CVSSV3Editor from './Scores/CVSS3Editor'

/**
 * @param {{
 *  value: unknown
 *  validationErrors: import('../../../../shared/validationTypes').ValidationError[]
 *  dataPath: string
 *  onUpdate({}): void
 * }} props
 */
export default function Scores(props) {
  return (
    <ArrayContainer
      {...props}
      label="List of scores"
      description="contains score objects for the currrent vulnerability."
      defaultItemValue={() => ({
        products: [],
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
              {/** @todo cvss_v2 missing */}
              <CVSSV3Editor {...scoreProps('cvss_v3')} />
            </>
          )}
        </ObjectContainer>
      )}
    </ArrayContainer>
  )
}
