import chalk from 'chalk'
import { Command } from 'commander'
import { normalizeAndParse } from '../utils/helpers.js'
import { loadTransactions, saveTransaction } from '../utils/storage.js'
import { Transaction } from '../utils/types.js'

interface AddCommandArgs {
  date: string
  category: string
  description: string
  amount: string
}

const registerAddCommand = (program: Command) => {
  program
    .command('add')
    .description('Add a transaction')
    .argument('<date>', 'Date of the transaction')
    .argument('<category>', 'Category for the transaction')
    .argument('<description>', 'Description of the transaction')
    .argument('<amount>', 'The amount you spent for this transaction')
    .action(
      (
        date: AddCommandArgs['date'],
        category: AddCommandArgs['category'],
        description: AddCommandArgs['description'],
        amount: AddCommandArgs['amount'],
      ) => {
        const transactions = loadTransactions()
        const newTransaction: Transaction = {
          id: transactions.length + 1,
          date,
          category,
          description: description,
          amount: normalizeAndParse(amount),
        }
        transactions.push(newTransaction)
        saveTransaction(transactions)
        console.log(chalk.green('Ausgabe erfolgreich hinzugefügt!'))
      },
    )
}

export { registerAddCommand }
