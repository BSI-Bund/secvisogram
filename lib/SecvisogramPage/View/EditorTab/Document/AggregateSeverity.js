import '@reach/combobox/styles.css'
import React from 'react'
import DocObject from '../shared/DocObject'
import TextAttribute from '../shared/TextAttribute'

/**
 * @param {{
 *  validationErrors: import('../../../../shared/validationTypes').ValidationError[]
 *  dataPath: string
 *  value?: {
 *    namespace: string,
 *    text: string,
 *  }
 *  onUpdate({}): void
 * }} props
 */
export default function AggregateSeverity({
  value: aggregateSeverity,
  validationErrors,
  dataPath,
  onUpdate,
}) {
  return (
    <DocObject
      label="Aggregate severity"
      description="Is a vehicle that is provided by the document producer to convey the urgency and criticality with which the one or more vulnerabilities reported should be addressed. It is a document-level metric and applied to the document as a whole — not any specific vulnerability. The range of values in this field is defined according to the document producer's policies and procedures."
      validationErrors={validationErrors}
      dataPath={dataPath}
      object={aggregateSeverity}
      defaultValue={() => ({
        text: '',
      })}
      onUpdate={onUpdate}
    >
      {aggregateSeverity ? (
        <>
          <TextAttribute
            label="Namespace of aggregate severity"
            description="Points to the namespace so referenced."
            type="url"
            deletable
            validationErrors={validationErrors}
            dataPath={`${dataPath}/namespace`}
            value={aggregateSeverity.namespace}
            onUpdate={onUpdate}
          />
          <TextAttribute
            label="Text of aggregate severity"
            description="Provides a severity which is independent of - and in addition to - any other standard metric for determining the impact or severity of a given vulnerability (such as CVSS)."
            placeholder="Moderate"
            validationErrors={validationErrors}
            dataPath={`${dataPath}/text`}
            value={aggregateSeverity.text}
            onUpdate={onUpdate}
          />
        </>
      ) : null}
    </DocObject>
  )
}
