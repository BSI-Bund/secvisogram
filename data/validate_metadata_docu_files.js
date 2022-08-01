const fs = require('fs')

const meta = JSON.parse(fs.readFileSync('metadata.json', 'utf-8'))
const schema = JSON.parse(fs.readFileSync('metadataSchema.json', 'utf-8'))

let allFilesExist = true

const usageDocKeys = Object.keys(
  schema.properties.field_metadata.items.properties.user_documentation.properties.usage.properties
)

meta["field_metadata"].forEach((metaItem) => {
  const docuFilePaths = [
    metaItem.user_documentation.specification,
    ...usageDocKeys
      .map(key => metaItem.user_documentation.usage[key])
      .filter(path => path !== undefined)
  ]

  docuFilePaths.forEach((filePath) => {
    if (filePath === "") {
      console.log(`empty file link found; json path ${metaItem.path}`)
      allFilesExist = false
    }
    else if (!fs.existsSync(`../${filePath}`)) {
      console.log(`linked file does not exist: ${filePath}; json path ${metaItem.path}`)
      allFilesExist = false
    }
  })
})

if (allFilesExist) {
  console.log("all files linked in metadata.json exist")
  process.exit(0)
}
console.log("there are errors for files linked in metadata.json")
process.exit(1)
