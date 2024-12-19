import chalk from 'chalk'
import { Command } from 'commander'
import { loadTransactions } from '../utils/storage.js'

const registerCategoriesCommand = (program: Command) => {
  program
    .command('categories')
    .description('List all unique categories from transactions')
    .action(() => {
      const transactions = loadTransactions()

      if (transactions.length === 0) {
        console.log(chalk.yellow('Keine Transaktionen gefunden.'))
        return
      }

      const uniqueCategories = [
        ...new Set(transactions.map((transaction) => transaction.category)),
      ]

      console.log(chalk.blue.bold('\nVorhandene Kategorien:'))
      uniqueCategories.forEach((category) => {
        console.log(`- ${chalk.green(category)}`)
      })

      console.log(
        chalk.bold(
          `\nInsgesamt ${uniqueCategories.length} Kategorien gefunden.`,
        ),
      )
    })
}

export { registerCategoriesCommand }
