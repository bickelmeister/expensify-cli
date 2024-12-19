import chalk from 'chalk'
import { Command } from 'commander'
import { loadTransactions } from '../utils/storage.js'

const registerListCommand = (program: Command) => {
  program
    .command('list')
    .description('List all transactions')
    .option('-c, --category <category>', 'Filter by category')
    .option('-d, --date <date>', 'Filter by date')
    .option('-id, --show-ids', 'Show transaction IDs in the output')
    .action((options: { category: string; date: string; showIds: any }) => {
      const transactions = loadTransactions()

      let filteredTransactions = transactions

      if (options.category) {
        filteredTransactions = filteredTransactions.filter(
          (transaction) =>
            transaction.category.toLowerCase() ===
            options.category.toLowerCase(),
        )
      }

      if (options.date) {
        filteredTransactions = filteredTransactions.filter(
          (transaction) => transaction.date === options.date,
        )
      }

      if (filteredTransactions.length === 0) {
        console.log(chalk.yellow('Keine Transaktionen gefunden.'))
        return
      }

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
            } - ${chalk.red(`€${transaction.amount.toFixed(2)}`)}`,
          )
        }
      })
    })
}

export { registerListCommand }
