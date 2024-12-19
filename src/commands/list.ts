import chalk from 'chalk'
import { Command } from 'commander'
import { loadTransactions } from '../utils/storage.js'
import { parseDate } from '../utils/helpers.js'

const registerListCommand = (program: Command) => {
  program
    .command('list')
    .description('List all transactions')
    .option('-c, --category <category>', 'Filter by category')
    .option('-d, --date <date>', 'Filter by date')
    .option('-id, --show-ids', 'Show transaction IDs in the output')
    .option('-desc, --descending', 'Sort by date in descending order')
    .action(
      (options: {
        category?: string
        date?: string
        showIds?: boolean
        descending?: boolean
      }) => {
        const transactions = loadTransactions()

        let filteredTransactions = transactions

        // Filter by category
        if (options.category) {
          filteredTransactions = filteredTransactions.filter(
            (transaction) =>
              transaction.category.toLowerCase() ===
              options.category?.toLowerCase(),
          )
        }

        // Filter by date
        if (options.date) {
          filteredTransactions = filteredTransactions.filter(
            (transaction) => transaction.date === options.date,
          )
        }

        // Sort transactions by date
        filteredTransactions = filteredTransactions.sort((a, b) => {
          const dateA = parseDate(a.date).getTime()
          const dateB = parseDate(b.date).getTime()

          return options.descending ? dateB - dateA : dateA - dateB
        })

        if (filteredTransactions.length === 0) {
          console.log(chalk.yellow('Keine Transaktionen gefunden.'))
          return
        }

        // Display transactions
        console.log(chalk.blue('\nDeine Transaktionen:'))
        filteredTransactions.forEach((transaction) => {
          if (options.showIds) {
            console.log(
              `${chalk.bold(chalk.blue(transaction.id))} - ${transaction.date} - ${
                transaction.category
              } - ${transaction.description} - ${chalk.green(
                `€${transaction.amount.toFixed(2)}`,
              )}`,
            )
          } else {
            console.log(
              `${chalk.bold(transaction.date)} - ${transaction.category} - ${
                transaction.description
              } - ${chalk.green(`€${transaction.amount.toFixed(2)}`)}`,
            )
          }
        })
      },
    )
}

export { registerListCommand }
