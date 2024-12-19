import chalk from 'chalk'
import { Command } from 'commander'
import { format } from 'date-fns'
import { normalizeAndParse } from '../utils/helpers.js'
import { loadTransactions, saveTransaction } from '../utils/storage.js'
import { Transaction } from '../utils/types.js'

interface AddCommandArgs {
  category: string
  description: string
  amount: string
  date?: string
}

const registerAddCommand = (program: Command) => {
  program
    .command('add')
    .description('Add a transaction')
    .argument('<category>', 'Category for the transaction')
    .argument('<description>', 'Description of the transaction')
    .argument('<amount>', 'The amount you spent for this transaction')
    .argument('[date]', 'Date of the transaction (optional, defaults to today)')
    .action(
      (
        category: AddCommandArgs['category'],
        description: AddCommandArgs['description'],
        amount: AddCommandArgs['amount'],
        date: AddCommandArgs['date'] | undefined,
      ) => {
        const transactionDate: string = date || format(new Date(), 'dd.MM.yyyy')

        const transactions = loadTransactions()
        const newTransaction: Transaction = {
          id: transactions.length + 1,
          date: transactionDate,
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
