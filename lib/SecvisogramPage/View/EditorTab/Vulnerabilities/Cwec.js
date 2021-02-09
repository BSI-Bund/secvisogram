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
 *  onUpdate({}): void
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
        {(cweProps) => <CwecId {...cweProps('id')} />}
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
 *  onUpdate({}): void
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
      {({ onChange }) => (
        <div className="max-w-md flex">
          <div className="w-full">
            <Combobox
              className="w-full"
              onSelect={(item) => {
                setTerm(item)
                onChange(item)
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
