import {
  faCheckCircle,
  faExclamationTriangle,
  faMinusSquare,
  faPlusSquare,
  faWindowClose,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import Document from './FormEditorTab/Document.js'
import ProductTree from './FormEditorTab/ProductTree.js'
import ObjectContainer from './FormEditorTab/shared/ObjectContainer.js'
import Vulnerabilities from './FormEditorTab/Vulnerabilities.js'

/**
 * Defines the layout of the form editor.
 *
 * @param {{
 *  formValues: import('../shared/types').FormValues
 *  validationErrors: import('../shared/types').TypedValidationError[]
 *  onUpdate: ((update: {}) => void) & ((instancePath: string, update: {}) => void)
 *  onDownload(doc: {}): void
 *  onCollectProductIds(): Promise<void | {id: string, name: string}[]>
 *  onCollectGroupIds(): Promise<void | {id: string, name: string}[]>
 * }} props
 */
export default function FormEditorTab({
  formValues,
  validationErrors: errors,
  onUpdate,
  onCollectProductIds,
  onCollectGroupIds,
}) {
  const ref = React.useRef(/** @type {HTMLDivElement | null} */ (null))
  const [showErrors, setShowErrors] = React.useState(false)

  const toggleErrors = () => {
    setShowErrors(!showErrors)
    if (!showErrors) setExpanded(true)
  }

  /**
   * Expands all collapsible form elements.
   *
   * @param {boolean} open
   */
  const setExpanded = (open) => {
    if (!ref.current) return
    /** @type {NodeListOf<HTMLDetailsElement>} */
    const elements = ref.current.querySelectorAll('.js-collapsible')
    for (const el of elements) {
      el.open = open
    }
  }

  React.useEffect(() => {
    if (errors.length === 0) {
      setShowErrors(false)
    }
  }, [errors])

  const criticalErrors = errors.filter((e) => e.type === 'error')

  const { doc } = formValues

  return (
    <>
      <div ref={ref} className="form-editor flex h-full mr-3 bg-white">
        <div className="p-3 w-full">
          <div className={'overflow-auto ' + (showErrors ? 'h-4/5' : 'h-full')}>
            <Doc
              instancePath=""
              value={doc}
              validationErrors={criticalErrors}
              onUpdate={onUpdate}
              onCollectProductIds={onCollectProductIds}
              onCollectGroupIds={onCollectGroupIds}
            />
          </div>
          <div
            className={
              'overflow-auto p-3 border border-red-600 bg-red-200 ' +
              (showErrors ? 'h-1/5' : 'hidden')
            }
          >
            <div className="flex justify-between items-start h-full">
              <div className="pr-4">
                <h2 className="text-xl font-bold">
                  Validation <br /> Errors:
                </h2>
              </div>
              <div className="mx-2 flex-grow overflow-auto h-full">
                {errors.map((error, i) => (
                  <div key={i}>
                    <a
                      href={'#' + error.instancePath}
                      className={`validation_error${
                        error.type === 'warning'
                          ? ' validation_error-warning text-yellow-600'
                          : error.type === 'error'
                          ? ' validation_error-error'
                          : error.type === 'info'
                          ? ' validation_error-info text-blue-500'
                          : ''
                      } underline`}
                    >
                      <b>{error.instancePath}</b>:{' '}
                      <span className="validation_error-message">
                        {error.message}
                      </span>
                    </a>
                  </div>
                ))}
              </div>
              <button
                type="button"
                className="text-xl text-red-400"
                onClick={() => setShowErrors(false)}
              >
                <FontAwesomeIcon className="mr-1" icon={faWindowClose} />
              </button>
            </div>
          </div>
        </div>
        <div className="pl-3 pr-6 py-6 w-72 flex flex-col justify-between">
          <div className="flex flex-col">
            <button
              type="button"
              className="mb-2 py-1 px-3 rounded shadow border border-gray-400 bg-gray-400 text-white hover:text-gray-400 hover:bg-white"
              onClick={() => {
                setExpanded(true)
              }}
            >
              <FontAwesomeIcon className="mr-1" icon={faPlusSquare} />
              Expand all
            </button>
            <button
              type="button"
              className="mb-2 py-1 px-3 rounded shadow border border-gray-400 bg-gray-400 text-white hover:text-gray-400 hover:bg-white"
              onClick={() => {
                setExpanded(false)
              }}
            >
              <FontAwesomeIcon className="mr-1" icon={faMinusSquare} />
              Collapse all
            </button>
          </div>
          <div>
            <h2 className="mb-4 text-xl font-bold">Validation Status</h2>
            {criticalErrors.length === 0 ? (
              <>
                <div className="mb-4 flex justify-end">
                  <FontAwesomeIcon
                    className="text-6xl text-green-500"
                    icon={faCheckCircle}
                  />
                </div>
                <div className="h-9" />
              </>
            ) : (
              <div>
                <div className="mb-4 flex justify-between">
                  <span className="text-6xl text-red-500 font-bold">
                    {criticalErrors.length}
                  </span>
                  <FontAwesomeIcon
                    className="text-6xl text-red-500"
                    icon={faExclamationTriangle}
                  />
                </div>
                <button
                  type="button"
                  className="py-1 px-3 h-9 underline text-gray-500"
                  onClick={toggleErrors}
                >
                  {showErrors ? 'Hide errors' : 'Show errors'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

/**
 * Defines the layout of the document. The data path is passed throughout all
 * children to enable error filtering and nested updates. Containers and
 * attributes of the document are defined in respective components.
 *
 * @param {{
 *  value: unknown
 *  validationErrors: import('../shared/types').ValidationError[]
 *  instancePath: string
 *  onUpdate(instancePath: string, update: {}): void
 *  onCollectProductIds(): Promise<void | {id: string, name: string}[]>
 *  onCollectGroupIds(): Promise<void | {id: string, name: string}[]>
 * }} props
 */
function Doc(props) {
  return (
    <ObjectContainer
      {...props}
      label="Common Security Advisory Framework"
      description="Representation of security advisory information as a JSON document."
      collapsible={false}
      deletable={false}
      defaultValue={() => ({
        document: {
          category: '',
          csaf_version: '2.0',
          publisher: {
            category: '',
            name: '',
            namespace: '',
          },
          title: '',
          tracking: {
            current_release_date: '',
            id: '',
            initial_release_date: '',
            revision_history: [
              {
                date: '',
                number: '',
                summary: '',
              },
            ],
            status: '',
            version: '',
          },
        },
      })}
    >
      {(csafProps) => (
        <>
          <Document {...csafProps('document')} />
          <ProductTree
            {...csafProps('product_tree')}
            onCollectProductIds={props.onCollectProductIds}
          />
          <Vulnerabilities
            {...csafProps('vulnerabilities')}
            onCollectGroupIds={props.onCollectGroupIds}
            onCollectProductIds={props.onCollectProductIds}
          />
        </>
      )}
    </ObjectContainer>
  )
}
