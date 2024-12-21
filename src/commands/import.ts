import { Command } from 'commander'
import { readFileSync } from 'fs'
import { parse } from 'csv-parse/sync'
import { saveTransaction, loadTransactions } from '../utils/storage.js'
import { translate } from '../utils/translator.js'

const registerImportCommand = (program: Command) => {
  program
    .command('import')
    .description(translate('commands.import.description'))
    .option('-fp, --filepath <path>', translate('commands.import.filepath'))
    .action(async (options) => {
      try {
        const csvContent = readFileSync(options.filepath, 'utf-8')
        const transactions = parse(csvContent, {
          columns: true,
          skip_empty_lines: true,
        })

        const existingTransactions = loadTransactions()
        const newTransactions = transactions.map(
          (transaction: any, index: number) => ({
            ...transaction,
            id: existingTransactions.length + index + 1,
            amount: parseFloat(transaction.amount),
          }),
        )

        saveTransaction([...existingTransactions, ...newTransactions])
        console.log(
          `Transactions successfully imported from ${options.filepath}`,
        )
      } catch (error: any) {
        console.error('Failed to import transactions:', error.message)
      }
    })
}

export { registerImportCommand }
