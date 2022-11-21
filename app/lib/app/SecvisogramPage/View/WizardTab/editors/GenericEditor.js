import React from 'react'
import DocumentEditorContext from '../../shared/DocumentEditorContext.js'
import ArrayEditor from './GenericEditor/ArrayEditor.js'
import ObjectEditor from './GenericEditor/ObjectEditor.js'
import TextAttribute from './GenericEditor/Attributes/TextAttribute.js'
import TextAreaAttribute from './GenericEditor/Attributes/TextAreaAttribute.js'
import DateAttribute from './GenericEditor/Attributes/DateAttribute.js'
import EnumAttribute from './GenericEditor/Attributes/EnumAttribute.js'
import CweAttribute from './GenericEditor/Attributes/CweAttribute.js'
import IdAttribute from './GenericEditor/Attributes/IdAttribute.js'

/**
 * utility function to get the color of circles identifying errors
 *
 * @param {Array<{ instancePath: string; message?: string; type?: string}>} errors
 * @returns {string}
 */
export function getErrorTextColor(errors) {
  const errorTypes = errors.map((e) => e.type)
  return errorTypes.includes('error')
    ? 'text-red-600'
    : errorTypes.includes('warning')
    ? 'text-yellow-600'
    : errorTypes.includes('info')
    ? 'text-blue-600'
    : errors.length
    ? 'text-red-600' // fall back to red if there are errors but their type is not known
    : 'text-green-600'
}

/**
 * @param {object} props
 * @param {import('../shared/types').Property | null} props.parentProperty
 * @param {import('../shared/types').Property} props.property
 * @param {string[]} props.instancePath
 */
export default function Editor({ parentProperty, property, instancePath }) {
  const { doc, collectIds } = React.useContext(DocumentEditorContext)

  const uiType = property.metaData?.uiType
  const label = property.title || ''

  if (property.type === 'ARRAY') {
    return <ArrayEditor property={property} instancePath={instancePath} />
  } else if (property.type === 'OBJECT') {
    if (uiType === 'OBJECT_CWE') {
      return (
        <CweAttribute
          label={label}
          description={property.description}
          property={property}
          instancePath={instancePath}
        />
      )
    }
    return (
      <ObjectEditor
        parentProperty={parentProperty}
        property={property}
        instancePath={instancePath}
      />
    )
  } else if (property.type === 'STRING') {
    const value = instancePath.reduce((value, pathSegment) => {
      return (value ?? {})[pathSegment]
    }, /** @type {Record<string, any> | null} */ (doc))

    if (uiType === 'STRING_DATETIME') {
      return (
        <DateAttribute
          label={label}
          description={property.description}
          instancePath={instancePath}
          value={value}
        />
      )
    } else if (uiType === 'STRING_ENUM') {
      return (
        <EnumAttribute
          label={label}
          description={property.description}
          options={property.enum || property.metaData?.options || []}
          freeSolo={property.metaData?.freeSolo || false}
          instancePath={instancePath}
          value={value}
        />
      )
    } else if (uiType === 'STRING_MULTI_LINE') {
      return (
        <TextAreaAttribute
          label={label}
          description={property.description}
          minLength={property.minLength || 0}
          required={property.mandatory}
          instancePath={instancePath}
          value={value}
        />
      )
    } else if (uiType === 'STRING_PRODUCT_ID') {
      return (
        <IdAttribute
          label={property.title || ''}
          description={property.description}
          instancePath={instancePath}
          value={value || ''}
          onCollectIds={collectIds['productIds']}
        />
      )
    } else if (uiType === 'STRING_GROUP_ID') {
      return (
        <IdAttribute
          label={property.title || ''}
          description={property.description}
          instancePath={instancePath}
          value={value || ''}
          onCollectIds={collectIds['groupIds']}
        />
      )
    } else if (uiType === 'STRING_URI') {
      return (
        <TextAttribute
          label={label}
          description={property.description}
          minLength={property.minLength || 0}
          type={'url'}
          pattern={property.pattern || ''}
          required={property.mandatory}
          instancePath={instancePath}
          value={value}
        />
      )
    } else {
      return (
        <TextAttribute
          label={label}
          description={property.description}
          minLength={property.minLength || 0}
          pattern={property.pattern || ''}
          required={property.mandatory}
          instancePath={instancePath}
          value={value}
        />
      )
    }
  } else {
    return (
      <div className="bg-white">
        <div>{property.fullName.join('.')}</div>
        <div>{}</div>
      </div>
    )
  }
}
