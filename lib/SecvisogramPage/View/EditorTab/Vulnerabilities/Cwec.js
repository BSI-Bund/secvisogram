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
import useDebounce from '../../shared/useDebounce'
import Attribute from '../shared/Attribute'
import ObjectContainer from '../shared/ObjectContainer'

/**
 * @param {{
 *  validationErrors: import('../../../../shared/validationTypes').ValidationError[]
 *  dataPath: string
 *  value: unknown
 *  onUpdate: ((update: {}) => void) & ((dataPath: string, update: {}) => void)
 * }} props
 */
export default function Cwec(props) {
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
          const onChange = (/** @type {string[]} */ data) => {
            props.onUpdate(props.dataPath, {
              $set: {
                id: data[0],
                name: data[1],
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
 *  validationErrors: import('../../../../shared/validationTypes').ValidationError[]
 *  dataPath: string
 *  value: unknown
 *  onUpdate: ((update: {}) => void) & ((dataPath: string, update: {}) => void)
 *  onChange(data: string[]): void
 * }} props
 */
function CwecId(props) {
  const [term, setTerm] = React.useState(/** @type string */ (props.value))
  const results = useCwecMatch(term)
  /** @param {React.ChangeEvent<HTMLInputElement>} event  */
  const handleChange = (event) => setTerm(event.target.value)

  return (
    <Attribute
      label="Weakness ID"
      description="Holds the ID for the weakness associated."
      {...props}
    >
      {() => (
        <div className="max-w-md flex">
          <div className="w-full">
            <Combobox
              className="w-full"
              onSelect={(item) => {
                const data = item.split('#')
                setTerm(data[0])
                props.onChange(data)
              }}
            >
              <ComboboxInput
                value={term}
                className="border p-2 w-full shadow-inner rounded-l"
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
                        <ComboboxOption
                          key={index}
                          value={`${result.id}#${result.name}`}
                        >
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
 *  validationErrors: import('../../../../shared/validationTypes').ValidationError[]
 *  dataPath: string
 *  value: unknown
 *  onUpdate: ((update: {}) => void) & ((dataPath: string, update: {}) => void)
 *  onChange(data: string[]): void
 * }} props
 */
function CwecName(props) {
  const [term, setTerm] = React.useState(/** @type string */ (props.value))
  const results = useCwecMatch(term)
  /** @param {React.ChangeEvent<HTMLInputElement>} event  */
  const handleChange = (event) => setTerm(event.target.value)

  return (
    <Attribute
      label="Weakness name"
      description="Holds the full name of the weakness as given in the CWE specification."
      {...props}
    >
      {() => (
        <div className="max-w-md flex">
          <div className="w-full">
            <Combobox
              className="w-full"
              onSelect={(item) => {
                const data = item.split('#')
                setTerm(data[1])
                props.onChange(data)
              }}
            >
              <ComboboxInput
                value={term}
                className="border p-2 w-full shadow-inner rounded-l"
                placeholder="Improper Neutralization of Input During Web Page Generation ('Cross-site Scripting') ..."
                required={true}
                onChange={handleChange}
              />
              {results && (
                <ComboboxPopover className="shadow-popup">
                  {results.length > 0 ? (
                    <ComboboxList>
                      {results.slice(0, 10).map((result, index) => (
                        <ComboboxOption
                          key={index}
                          value={`${result.id}#${result.name}`}
                        >
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
