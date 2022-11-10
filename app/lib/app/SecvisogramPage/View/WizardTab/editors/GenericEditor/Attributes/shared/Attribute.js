import { compile } from 'json-pointer'
import React from 'react'
import AttributeErrors from './AttributeErrors.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import SideBarContext from '../../../../../shared/context/SideBarContext.js'

/**
 * Abstracts the base functionality for all input fields in the wizard.
 * It uses the data path to filter the associated validation errors.
 *
 * @param {{
 *  label: string
 *  description: string
 *  validationErrors: import('../../../../../../shared/types').ValidationError[]
 *  instancePath: string[]
 *  children?: React.ReactNode | ((params: {}) => React.ReactNode)
 * }} props
 * @template V
 */
export default function Attribute({
  label,
  description,
  validationErrors,
  instancePath,
  children,
}) {
  const { setSideBarIsOpen, setSideBarSelectedPath } =
    React.useContext(SideBarContext)

  const jsonInstancePath = compile(instancePath)

  const localValidationErrors = validationErrors.filter(
    (e) => e.instancePath === jsonInstancePath
  )
  const attributeName = React.useMemo(
    () => instancePath.slice().pop() ?? '',
    [instancePath]
  )

  return (
    <section
      className="mb-2"
      data-testid={`attribute-${instancePath.join('-')}`}
    >
      <div
        className="mb-0.5 text-xs font-bold"
        id={jsonInstancePath}
        title={attributeName + ': ' + description}
      >
        <label>{label}</label>
        <button
          data-testid={instancePath.join('-') + '-infoButton'}
          type="button"
          className="w-6 h-6 flex-none hover:bg-blue-300 m-1"
          onClick={() => {
            setSideBarIsOpen(true)
            setSideBarSelectedPath(instancePath)
          }}
        >
          <FontAwesomeIcon icon={faInfoCircle} size="xs" />
        </button>
      </div>
      {children}
      <AttributeErrors validationErrors={localValidationErrors} />
    </section>
  )
}
