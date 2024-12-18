#!/usr/bin/env node

import chalk from 'chalk'
import { program } from 'commander'
import {
  loadTransactions,
  reorderTransactions,
  saveTransaction,
} from './storage.js'
import { Transaction } from './types.js'

program
  .name('balance')
  .description('Hold your balance while tracking your expenses.')
  .version('0.0.1')

program
  .command('add')
  .description('Add a transaction')
  .argument('<date>', 'Date of the transaction')
  .argument('<category>', 'Category for the transaction')
  .argument('<description>', 'Description of the transaction')
  .argument('<amount>', 'The amount you spent for this transaction')
  .action(
    (date: string, category: string, description: string, amount: string) => {
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
          transaction.category.toLowerCase() === options.category.toLowerCase(),
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
      transactions[transactionIndex].amount = parseFloat(options.amount)
    if (options.description)
      transactions[transactionIndex].description = options.description

    saveTransaction(transactions)

    console.log(chalk.green('Transaktion erfolgreich aktualisiert.'))
  })

program
  .command('remove')
  .description('Remove a transaction by ID')
  .argument('<id>', 'ID of the transaction to remove')
  .action((id: string) => {
    let transactions = loadTransactions()

    const transactionIndex = transactions.findIndex(
      (t) => t.id === parseInt(id, 10),
    )
    if (transactionIndex === -1) {
      console.log(chalk.red('Keine Transaktion mit dieser ID gefunden.'))
      return
    }

    transactions.splice(transactionIndex, 1) // Transaktion entfernen
    transactions = reorderTransactions(transactions) // IDs neu sortieren
    saveTransaction(transactions)

    console.log(chalk.green('Transaktion erfolgreich entfernt.'))
  })

program
  .command('report')
  .description(
    'Generate a report showing the percentage distribution of transactions by category',
  )
  .option('-m, --month <month>', 'Specify a month in YYYY-MM format')
  .action((options: { month?: string }) => {
    const transactions = loadTransactions()

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
        `${chalk.bold(category.padEnd(maxCategoryLength))} | ${bar.padEnd(50)} ${chalk.green(`${percentage}%`)}${chalk.italic(`(${amount.toFixed(2)}€)`)}`,
      )
    })

    console.log(chalk.bold(`\nGesamtbetrag: €${totalAmount.toFixed(2)}`))
  })

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
      chalk.bold(`\nInsgesamt ${uniqueCategories.length} Kategorien gefunden.`),
    )
  })

program.parse(process.argv)

function normalizeAndParse(amount: string): number {
  const normalizedAmount = amount.replace(',', '.')
  const parsedAmount = parseFloat(normalizedAmount)

  if (isNaN(parsedAmount)) {
    throw new Error(`Ungültiger Betrag: ${amount}`)
  }

  return parsedAmount
}
