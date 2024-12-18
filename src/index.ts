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

program.parse(process.argv)

function normalizeAndParse(amount: string): number {
  const normalizedAmount = amount.replace(',', '.')
  const parsedAmount = parseFloat(normalizedAmount)

  if (isNaN(parsedAmount)) {
    throw new Error(`Ungültiger Betrag: ${amount}`)
  }

  return parsedAmount
}
