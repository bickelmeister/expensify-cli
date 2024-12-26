import { Command } from 'commander'
import { loadTransactions, saveTransaction } from '../utils/storage.js'
import chalk from 'chalk'
import { normalizeAndParse } from '../utils/helpers.js'

const registerEditCommand = (program: Command) => {
  program
    .command('edit')
    .description('Edit a transaction by ID')
    .argument('<id>', 'ID of the transaction to edit')
    .option('-d, --date <date>', 'New date of the transaction')
    .option('-c, --category <category>', 'New category for the transaction')
    .option('-a, --amount <amount>', 'New amount for the transaction')
    .option(
      '-desc, --description <description>',
      'New description for the transaction',
    )
    .action((id: string, options) => {
      let transactions = loadTransactions()

      const transactionIndex = transactions.findIndex(
        (t) => t.id === parseInt(id),
      )
      if (transactionIndex === -1) {
        console.log(chalk.red('Keine Transaktion mit dieser ID gefunden.'))
        return
      }

      if (options.date) transactions[transactionIndex].date = options.date
      if (options.category)
        transactions[transactionIndex].category = options.category
      if (options.amount)
        transactions[transactionIndex].amount = normalizeAndParse(
          options.amount,
        )
      if (options.description)
        transactions[transactionIndex].description = options.description

      saveTransaction(transactions)

      console.log(chalk.green('Transaktion erfolgreich aktualisiert.'))
    })
}

export { registerEditCommand }
