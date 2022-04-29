import React from 'react'
import ArrayContainer from '../../ArrayContainer.js'
import ObjectContainer from '../../ObjectContainer.js'
import TextAttribute from '../../TextAttribute.js'

/**
 * @param {{
 *  validationErrors: import('../../../../../shared/types').ValidationError[]
 *  instancePath: string
 *  value: unknown
 *  onUpdate(instancePath: string, update: {}): void
 * }} props
 */
export default function ProductIdentificationHelper({
  value: productIdentificationHelper,
  validationErrors,
  instancePath,
  onUpdate,
}) {
  return (
    <ObjectContainer
      label="Helper to identify the product"
      description="Provides at least one method which aids in identifying the product in an asset database."
      validationErrors={validationErrors}
      instancePath={instancePath}
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
            pattern="^(cpe:2\.3:[aho\*\-](:(((\?*|\*?)([a-zA-Z0-9\-\._]|(\\[\\\*\?!\x22#\$%&'\(\)\+,/:;<=>@\[\]\^`\{\|\}~]))+(\?*|\*?))|[\*\-])){5}(:(([a-zA-Z]{2,3}(-([a-zA-Z]{2}|[0-9]{3}))?)|[\*\-]))(:(((\?*|\*?)([a-zA-Z0-9\-\._]|(\\[\\\*\?!\x22#\$%&'\(\)\+,/:;<=>@\[\]\^`\{\|\}~]))+(\?*|\*?))|[\*\-])){4})|([c][pP][eE]:/[AHOaho]?(:[A-Za-z0-9\._\-~%]*){0,6})$"
            placeholder="^(cpe:2\.3:[aho\*\-](:(((\?*|\*?)([a-zA-Z0-9\-\._]|(\\[\\\*\?!\x22#\$%&'\(\)\+,/:;<=>@\[\]\^`\{\|\}~]))+(\?*|\*?))|[\*\-])){5}(:(([a-zA-Z]{2,3}(-([a-zA-Z]{2}|[0-9]{3}))?)|[\*\-]))(:(((\?*|\*?)([a-zA-Z0-9\-\._]|(\\[\\\*\?!\x22#\$%&'\(\)\+,/:;<=>@\[\]\^`\{\|\}~]))+(\?*|\*?))|[\*\-])){4})|([c][pP][eE]:/[AHOaho]?(:[A-Za-z0-9\._\-~%]*){0,6})$"
            minLength={5}
            deletable
          />
          <ArrayContainer
            {...productIdentificationHelperProps('hashes')}
            label="List of hashes"
            description="Contains a list of cryptographic hashes usable to identify files."
            defaultItemValue={() => ({
              file_hashes: [
                {
                  algorithm: 'sha256',
                  value: '',
                },
              ],
              filename: '',
            })}
          >
            {(hashItemProps) => (
              <ObjectContainer
                {...hashItemProps}
                label="Cryptographic hashes"
                description="Contains all information to identify a file based on its cryptographic hash values."
              >
                {(hashProps) => (
                  <>
                    <TextAttribute
                      {...hashProps('filename')}
                      label="Filename"
                      description="Contains the name of the file which is identified by the hash values."
                    />
                    <ArrayContainer
                      {...hashProps('file_hashes')}
                      label="List of file hashes"
                      description="Contains a list of cryptographic hashes for this file."
                      defaultItemValue={() => ({
                        algorithm: 'sha256',
                        value: '',
                      })}
                    >
                      {(fileHashItemProps) => (
                        <ObjectContainer
                          {...fileHashItemProps}
                          label="File hash"
                          description="Contains the name of the cryptographic hash algorithm used to calculate the value."
                        >
                          {(fileHashProps) => (
                            <>
                              <TextAttribute
                                {...fileHashProps('algorithm')}
                                label="Algorithm of the cryptographic hash"
                                description="Contains the name of the cryptographic hash algorithm used to calculate the value."
                              />
                              <TextAttribute
                                {...fileHashProps('value')}
                                label="Value of the cryptographic hash"
                                description="Contains the cryptographic hash value in hexadecimal representation."
                                placeholder="4775203615d9534a8bfca96a93dc8b461a489f69124a130d786b42204f3341c"
                                minLength={32}
                              />
                            </>
                          )}
                        </ObjectContainer>
                      )}
                    </ArrayContainer>
                  </>
                )}
              </ObjectContainer>
            )}
          </ArrayContainer>
          <ArrayContainer
            {...productIdentificationHelperProps('model_numbers')}
            label="List of models"
            description="Contains a list of parts, or full model numbers."
            defaultItemValue={() => ''}
          >
            {(modelNumbersItemProps) => (
              <TextAttribute
                {...modelNumbersItemProps}
                label="Model number"
                description="Contains a part, or a full model number of the component to identify."
                deletable
              />
            )}
          </ArrayContainer>
          <TextAttribute
            {...productIdentificationHelperProps('purl')}
            label="package URL representation"
            description="The package URL (purl) attribute refers to a method for reliably identifying and locating software packages external to this specification."
            pattern="^pkg:[A-Za-z\\.\\-\\+][A-Za-z0-9\\.\\-\\+]*/.+"
            minLength={7}
            deletable
          />
          <ArrayContainer
            {...productIdentificationHelperProps('sbom_urls')}
            label="List of SBOM URLs"
            description="Contains a list of URLs where SBOMs for this product can be retrieved."
            defaultItemValue={() => ''}
          >
            {(sbomUrlsItemProps) => (
              <TextAttribute
                {...sbomUrlsItemProps}
                label="SBOM URL"
                description="Contains a URL of one SBOM for this product."
                deletable
              />
            )}
          </ArrayContainer>
          <ArrayContainer
            {...productIdentificationHelperProps('serial_numbers')}
            label="List of serial numbers"
            description="Contains a list of parts, or full serial numbers."
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
            {...productIdentificationHelperProps('skus')}
            label="List of stock keeping units"
            description="Contains a list of parts, or full stock keeping units."
            defaultItemValue={() => ''}
          >
            {(skusItemProps) => (
              <TextAttribute
                {...skusItemProps}
                label="Stock keeping unit"
                description="Contains a part, or a full stock keeping unit (SKU) which is used in the ordering process to identify the component."
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
