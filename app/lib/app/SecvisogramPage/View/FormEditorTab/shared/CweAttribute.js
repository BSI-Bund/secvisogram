import {
  Combobox,
  ComboboxInput,
  ComboboxList,
  ComboboxOption,
  ComboboxPopover,
} from '@reach/combobox'
import { matchSorter } from 'match-sorter'
import React from 'react'
import cwec_4_3 from '../../../../shared/Core/cwec_4.3.json'
import useDebounce from '../../shared/useDebounce.js'
import ObjectContainer from './ObjectContainer.js'
import Attribute from './shared/Attribute.js'

/**
 * Custom attribute.
 *
 * @param {{
 *  validationErrors: import('../../../shared/types').ValidationError[]
 *  instancePath: string
 *  value: unknown
 *  onUpdate: (instancePath: string, update: {}) => void
 * }} props
 */
export default function CweAttribute(props) {
  return (
    <>
      <ObjectContainer
        {...props}
        label="CWE"
        description="Holds the MITRE standard Common Weakness Enumeration (CWE) for the weakness associated."
        defaultValue={() => ({
          id: '',
          name: '',
        })}
      >
        {(cweProps) => {
          const onChange = (
            /** @type {{id: string, name: string}} */ { id, name }
          ) => {
            props.onUpdate(props.instancePath, {
              $set: {
                id: id,
                name: name,
              },
            })
          }
          return (
            <>
              <CwecId {...cweProps('id')} onChange={onChange} />
              <CwecName {...cweProps('name')} onChange={onChange} />
            </>
          )
        }}
      </ObjectContainer>
    </>
  )
}

/**
 * @param {string} term
 * @returns {any[] | null}
 */
function useCwecMatch(term) {
  const throttledTerm = useDebounce(term, 100)
  return React.useMemo(
    () =>
      throttledTerm.trim() === ''
        ? null
        : matchSorter(cwec_4_3.weaknesses, throttledTerm, {
            keys: [(item) => `${item.id}, ${item.name}`],
          }),
    [throttledTerm]
  )
}

/**
 * @param {{
 *  validationErrors: import('../../../shared/types').ValidationError[]
 *  instancePath: string
 *  value: unknown
 *  onUpdate: (instancePath: string, update: {}) => void
 *  onChange({}): void
 * }} props
 */
function CwecId(props) {
  const [value, setValue] = React.useState(/** @type string */ (props.value))
  const [term, setTerm] = React.useState(/** @type string */ (props.value))
  const results = useCwecMatch(term)
  /** @param {React.ChangeEvent<HTMLInputElement>} event  */
  const handleChange = (event) => {
    setValue(event.target.value)
    setTerm(event.target.value)
  }

  /** @param {string} id  */
  const handleSelect = (id) => {
    setTerm('')
    const name = cwec_4_3.weaknesses.find((w) => w.id === id)?.name
    props.onChange({ id: id, name: name })
  }

  React.useEffect(() => {
    setValue(/** @type string */ (props.value))
    setTerm('')
  }, [props.value])

  return (
    <Attribute
      label="Weakness ID"
      description="Holds the ID for the weakness associated."
      {...props}
    >
      {() => (
        <div className="max-w-md flex">
          <div className="w-full">
            <Combobox className="w-full" onSelect={handleSelect}>
              <ComboboxInput
                value={value}
                className="border border-gray-400 py-1 px-2 w-full shadow-inner rounded"
                pattern="^CWE-[1-9]\d{0,5}$"
                placeholder="^CWE-[1-9]\d{0,5}$"
                required={true}
                onChange={handleChange}
              />
              {results && (
                <ComboboxPopover className="shadow-popup">
                  {results.length > 0 ? (
                    <ComboboxList>
                      {results.slice(0, 10).map((result, index) => (
                        <ComboboxOption key={index} value={result.id}>
                          {`${result.id}, ${result.name}`}
                        </ComboboxOption>
                      ))}
                    </ComboboxList>
                  ) : (
                    <span style={{ display: 'block', margin: 8 }}>
                      No results found
                    </span>
                  )}
                </ComboboxPopover>
              )}
            </Combobox>
          </div>
        </div>
      )}
    </Attribute>
  )
}

/**
 * @param {{
 *  validationErrors: import('../../../shared/types').ValidationError[]
 *  instancePath: string
 *  value: unknown
 *  onUpdate: (instancePath: string, update: {}) => void
 *  onChange({}): void
 * }} props
 */
function CwecName(props) {
  const [value, setValue] = React.useState(/** @type string */ (props.value))
  const [term, setTerm] = React.useState(/** @type string */ (props.value))
  const results = useCwecMatch(term)

  /** @param {React.ChangeEvent<HTMLInputElement>} event  */
  const handleChange = (event) => {
    setValue(event.target.value)
    setTerm(event.target.value)
  }

  /** @param {string} name  */
  const handleSelect = (name) => {
    setTerm('')
    const id = cwec_4_3.weaknesses.find((w) => w.name === name)?.id
    props.onChange({ id: id, name: name })
  }

  React.useEffect(() => {
    setValue(/** @type string */ (props.value))
    setTerm('')
  }, [props.value])

  return (
    <Attribute
      label="Weakness name"
      description="Holds the full name of the weakness as given in the CWE specification."
      {...props}
    >
      {() => (
        <div className="max-w-md flex">
          <div className="w-full">
            <Combobox className="w-full" onSelect={handleSelect}>
              <ComboboxInput
                value={value}
                className="border border-gray-400 py-1 px-2 w-full shadow-inner rounded"
                placeholder="Improper Neutralization of Input During Web Page Generation ('Cross-site Scripting') ..."
                required={true}
                onChange={handleChange}
              />
              {results && (
                <ComboboxPopover className="shadow-popup">
                  {results.length > 0 ? (
                    <ComboboxList>
                      {results.slice(0, 10).map((result, index) => (
                        <ComboboxOption key={index} value={result.name}>
                          {`${result.id}, ${result.name}`}
                        </ComboboxOption>
                      ))}
                    </ComboboxList>
                  ) : (
                    <span style={{ display: 'block', margin: 8 }}>
                      No results found
                    </span>
                  )}
                </ComboboxPopover>
              )}
            </Combobox>
          </div>
        </div>
      )}
    </Attribute>
  )
}
