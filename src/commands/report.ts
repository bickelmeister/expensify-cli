import { Command } from 'commander'
import { loadTransactions } from '../utils/storage.js'
import chalk from 'chalk'
import { getCurrencyInUse } from '../utils/config.js'

const registerReportCommand = (program: Command) => {
  program
    .command('report')
    .description(
      'Generate a report showing the percentage distribution of transactions by category',
    )
    .option('-m, --month <month>', 'Specify a month in YYYY-MM format')
    .action((options: { month?: string }) => {
      const transactions = loadTransactions()
      const activeCurrency = getCurrencyInUse()

      if (transactions.length === 0) {
        console.log(chalk.yellow('Keine Transaktionen gefunden.'))
        return
      }

      let filteredTransactions = transactions
      if (options.month) {
        const [year, month] = options.month.split('-')
        if (!year || !month) {
          console.log(
            chalk.red('Ungültiges Datumsformat. Bitte YYYY-MM verwenden.'),
          )
          return
        }

        filteredTransactions = transactions.filter((transaction) => {
          const [day, monthStr, yearStr] = transaction.date.split('.')
          const transactionYear = parseInt(yearStr, 10)
          const transactionMonth = parseInt(monthStr, 10)

          return (
            transactionYear === parseInt(year, 10) &&
            transactionMonth === parseInt(month, 10)
          )
        })

        if (filteredTransactions.length === 0) {
          console.log(
            chalk.yellow(`Keine Transaktionen für ${options.month} gefunden.`),
          )
          return
        }
      }

      const categorySums: { [key: string]: number } = {}
      filteredTransactions.forEach((transaction) => {
        if (!categorySums[transaction.category]) {
          categorySums[transaction.category] = 0
        }
        categorySums[transaction.category] += transaction.amount
      })

      const totalAmount = Object.values(categorySums).reduce(
        (sum, value) => sum + value,
        0,
      )

      console.log(
        chalk.blue.bold(
          `\nProzentuale Verteilung der Transaktionen nach Kategorie${
            options.month ? ` für ${options.month}` : ''
          }:\n`,
        ),
      )

      const sortedCategories = Object.entries(categorySums).sort(
        (a, b) => b[1] - a[1],
      )

      sortedCategories.forEach(([category, amount]) => {
        const percentage = ((amount / totalAmount) * 100).toFixed(2)
        const bar = '█'.repeat(Math.round(parseFloat(percentage) / 2))
        const maxCategoryLength = Math.max(
          ...sortedCategories.map(([category]) => category.length),
        )

        console.log(
          `${chalk.bold(category.padEnd(maxCategoryLength))} | ${bar.padEnd(50)} ${chalk.green(`${percentage}%`)}${chalk.italic(`(${amount.toFixed(2)}${activeCurrency.symbol})`)}`,
        )
      })

      console.log(
        chalk.bold(
          `\nGesamtbetrag: ${totalAmount.toFixed(2)}${activeCurrency.symbol}`,
        ),
      )
    })
}

export { registerReportCommand }
