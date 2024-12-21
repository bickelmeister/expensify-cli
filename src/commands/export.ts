import { Command } from 'commander'
import fs from 'fs'
import path from 'path'
import { loadTransactions } from '../utils/storage.js'
import { translate } from '../utils/translator.js'
import { Parser } from '@json2csv/plainjs'

const parser = new Parser()

const registerExportCommand = (program: Command) => {
  program
    .command('export')
    .description(translate('commands.export.description'))
    .option('-fp, --filepath <path>', translate('commands.export.filepath'))
    .action(async (options) => {
      try {
        const transactions = loadTransactions()
        const csv = parser.parse(transactions)

        const basePath = options.filepath || process.cwd()
        const filepath = fs.lstatSync(basePath).isDirectory()
          ? path.join(basePath, 'expensify-export.csv')
          : basePath

        const dir = path.dirname(filepath)
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true })
        }

        fs.writeFileSync(filepath, csv)
        console.log(`Transactions successfully exported to ${filepath}`)
      } catch (error: any) {
        console.error('Failed to export transactions:', error.message)
      }
    })
}

export { registerExportCommand }
