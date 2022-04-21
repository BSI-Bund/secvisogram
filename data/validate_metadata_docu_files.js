const fs = require('fs')

const meta = require('./metadata.json')

let allFilesExist = true

const usageDocKeys = [
  "generic",
  "specific",
  "csaf_base",
  "csaf_security_incident_response",
  "csaf_informational_advisory",
  "csaf_security_advisory",
  "csaf_vex"
]

meta["metaData"].forEach((metaItem) => {
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
