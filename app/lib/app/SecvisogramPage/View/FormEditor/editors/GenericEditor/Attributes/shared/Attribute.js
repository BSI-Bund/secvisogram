import { t } from 'i18next'
import { compile } from 'json-pointer'
import React from 'react'
import AttributeErrors from './AttributeErrors.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import SideBarContext from '../../../../../shared/context/SideBarContext.js'
import DocumentEditorContext from '../../../../../shared/DocumentEditorContext.js'
import RelevanceLevelContext from '../../../../shared/context/RelevanceLevelContext.js'

/**
 * Abstracts the base functionality for all input fields in the editor.
 * It uses the data path to filter the associated validation errors.
 *
 * @param {{
 *  label: string
 *  description: string
 *  instancePath: string[]
 *  children?: React.ReactNode | ((params: {}) => React.ReactNode)
 *  property: import('../../../../shared/types').Property
 *  disabled: boolean
 * }} props
 * @template V
 */
export default function Attribute({
  label,
  description,
  instancePath,
  children,
  property,
  disabled,
}) {
  const { errors, doc } = React.useContext(DocumentEditorContext)
  const { selectedRelevanceLevel, relevanceLevels } = React.useContext(
    RelevanceLevelContext
  )

  const { setSideBarIsOpen, setSideBarSelectedPath } =
    React.useContext(SideBarContext)

  const jsonInstancePath = compile(instancePath)

  const localValidationErrors = errors.filter(
    (e) => e.instancePath === jsonInstancePath
  )
  const attributeName = React.useMemo(
    () => instancePath.slice().pop() ?? '',
    [instancePath]
  )

  let showAttribute = true

  const category = doc.document?.category
  const relevanceLevelForCategory = category
    ? (property.metaData?.relevanceLevels || {})[category] || ''
    : ''

  if (
    category &&
    relevanceLevels.indexOf(relevanceLevelForCategory) >
      relevanceLevels.indexOf(selectedRelevanceLevel)
  ) {
    showAttribute = false
  }

  return showAttribute ? (
    <section
      className={'mb-2' + (disabled ? ' opacity-50' : '')}
      data-testid={`attribute-${instancePath.join('-')}`}
    >
      <div
        className="mb-0.5 text-xs font-bold"
        id={jsonInstancePath}
        title={
          attributeName +
          ': ' +
          description +
          (property.examples
            ? '\n\n' + t('menu.examples') + ':\n' + property.examples.join(', ')
            : '')
        }
      >
        <label>{label}</label>
        <button
          data-testid={instancePath.join('-') + '-infoButton'}
          type="button"
          className="w-6 h-6 flex-none text-slate-400 hover:text-slate-800 m-1"
          onClick={() => {
            setSideBarIsOpen(true)
            setSideBarSelectedPath(instancePath)
          }}
        >
          <FontAwesomeIcon icon={faInfoCircle} />
        </button>
      </div>
      {children}
      <AttributeErrors validationErrors={localValidationErrors} />
    </section>
  ) : null
}
