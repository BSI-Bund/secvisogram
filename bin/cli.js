const yargs = require('yargs/yargs')
const generateCWAList = require('./cli/generateCWAList')
const generateHTMLTemplate = require('./cli/generateHTMLTemplate')
const generateICANNList = require('./cli/generateICANNList')

yargs(process.argv.slice(2))
  .command(
    'generate-html-template',
    '',
    (command) =>
      command
        .option('csaf20Schema', { alias: 'csaf', type: 'string' })
        .option('cvss31Schema', { alias: 'cvss-3.1', type: 'string' })
        .demandOption(['csaf20Schema', 'cvss31Schema']),
    generateHTMLTemplate
  )
  .command(
    'generate-cwe-list',
    '',
    (command) =>
      command.option('cwec', { type: 'string' }).demandOption('cwec'),
    generateCWAList
  )
  .command(
    'generate-icann-list',
    '',
    (command) =>
      command.option('registry', { type: 'string' }).demandOption('registry'),
    generateICANNList
  )
  .demandCommand(1)
  .help()
  .version(false).argv
