import '@reach/combobox/styles.css'
import React from 'react'
import ArrayContainer from '../../ArrayContainer'
import ObjectContainer from '../../ObjectContainer'
import TextAttribute from '../../TextAttribute'

/**
 * @param {{
 *  validationErrors: import('../../../../../../shared/validationTypes').ValidationError[]
 *  dataPath: string
 *  value: unknown
 *  onUpdate(dataPath: string, update: {}): void
 * }} props
 */
export default function ProductIdentificationHelper({
  value: productIdentificationHelper,
  validationErrors,
  dataPath,
  onUpdate,
}) {
  return (
    <ObjectContainer
      label="Helper to identify the product"
      description="Provides at least one method which aids in identifying the product in an asset database."
      validationErrors={validationErrors}
      dataPath={dataPath}
      value={productIdentificationHelper}
      defaultValue={() => ({})}
      onUpdate={onUpdate}
    >
      {(productIdentificationHelperProps) => (
        <>
          <TextAttribute
            {...productIdentificationHelperProps('cpe')}
            label="Common Platform Enumeration representation"
            description="The Common Platform Enumeration (CPE) attribute refers to a method for naming platforms external to this specification."
            pattern="^cpe:(/|\\d+\\.\\d+)[^:]*:?[^:]*:?[^:]*:?[^:]*:?[^:]*:?[^:]*:?[^:]*$"
            placeholder="^cpe:(/|\\d+\\.\\d+)[^:]*:?[^:]*:?[^:]*:?[^:]*:?[^:]*:?[^:]*:?[^:]*$"
            minLength={5}
            deletable
          />
          <ArrayContainer
            {...productIdentificationHelperProps('hashes')}
            label="List of hashes"
            description="Contains a list of cryptographic hashes usable to identify files."
            defaultItemValue={() => ({
              algorithm: 'SHA-3',
              file: '',
              value: '',
            })}
          >
            {(hashItemProps) => (
              <ObjectContainer
                {...hashItemProps}
                label="Cryptographic hash"
                description="Contains all information to identify a file based on its cryptographic hash value."
              >
                {(hashProps) => (
                  <>
                    <TextAttribute
                      {...hashProps('algorithm')}
                      label="Algorithm of the cryptographic hash"
                      description="Contains the name of the cryptographic hash algorithm used to calculate the value."
                    />
                    <TextAttribute
                      {...hashProps('file')}
                      label="Filename"
                      description="Contains the name of the file which is identified by the hash value."
                    />
                    <TextAttribute
                      {...hashProps('value')}
                      label="Value of the cryptographic hash"
                      description="Contains the cryptographic hash value."
                      placeholder="da4fa28021c21c738485012886ff921e2d2be471165510dfadb93b7aff688108553e52aa38c253c900352a8e60b08d42be6f8a4f7185c5c0def8fe9ca0554b4c"
                    />
                  </>
                )}
              </ObjectContainer>
            )}
          </ArrayContainer>
          <TextAttribute
            {...productIdentificationHelperProps('purl')}
            label="package URL representation"
            description="The package URL (purl) attribute refers to a method for reliably identifying and locating software packages external to this specification."
            pattern="^pkg:"
            minLength={4}
            deletable
          />
          <ArrayContainer
            {...productIdentificationHelperProps('serial_numbers')}
            label="List of serial numbers"
            description="Contains a list of parts, or a full serial numbers."
            defaultItemValue={() => ''}
          >
            {(serialNumbersItemProps) => (
              <TextAttribute
                {...serialNumbersItemProps}
                label="Serial number"
                description="Contains a part, or a full serial number of the component to identify."
                deletable
              />
            )}
          </ArrayContainer>
          <ArrayContainer
            {...productIdentificationHelperProps('x_generic_uris')}
            label="List of generic URIs"
            description="Contains a list of identifiers which are either vendor-specific or derived from a standard not yet supported."
            defaultItemValue={() => ({
              namespace: '',
              uri: '',
            })}
          >
            {(xGenericUriItemProps) => (
              <ObjectContainer
                {...xGenericUriItemProps}
                label="Generic URI"
                description="Provides a generic extension point for any identifier which is either vendor-specific or derived from a standard not yet supported."
              >
                {(xGenericUriProps) => (
                  <>
                    <TextAttribute
                      {...xGenericUriProps('namespace')}
                      label="Namespace of the generic URI"
                      description="Refers to a URL which provides the name and knowledge about the specification used or is the namespace in which these values are valid."
                      type="url"
                    />
                    <TextAttribute
                      {...xGenericUriProps('uri')}
                      label="URI"
                      description="Contains the identifier itself."
                      type="url"
                    />
                  </>
                )}
              </ObjectContainer>
            )}
          </ArrayContainer>
        </>
      )}
    </ObjectContainer>
  )
}
