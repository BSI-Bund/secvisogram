const fs = require('fs')

const meta = JSON.parse(fs.readFileSync('metadata.json', 'utf-8'))
const schema = JSON.parse(fs.readFileSync('metadataSchema.json', 'utf-8'))


const Ajv2020 = require("ajv/dist/2020")
const ajv = new Ajv2020({allErrors: true})

const success = ajv.validate(schema, meta)

if (ajv.errors === null) {
  console.log('no schema violations found, metadata.json is valid!')
} else {
  console.log('schema violations found, metadata.json is not valid!')
  console.log(ajv.errors)
}

if (success) {
  process.exit(0)
}
process.exit(1)
