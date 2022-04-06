import addFormats from 'ajv-formats'
import Ajv2020 from 'ajv/dist/2020.js'
import cvss_v2_0 from './ajv/cvss-v2.0.js'
import cvss_v3_0 from './ajv/cvss-v3.0.js'
import cvss_v3_1 from './ajv/cvss-v3.1.js'

const ajv = new Ajv2020({ strict: false, allErrors: true })
addFormats(ajv)
ajv.addSchema(cvss_v2_0, 'https://www.first.org/cvss/cvss-v2.0.json')
ajv.addSchema(cvss_v3_0, 'https://www.first.org/cvss/cvss-v3.0.json')
ajv.addSchema(cvss_v3_1, 'https://www.first.org/cvss/cvss-v3.1.json')

export default ajv
