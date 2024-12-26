import { existsSync } from 'fs'
import { readJSONSync, writeJSONSync } from 'fs-extra/esm'
import { loadConfig } from './setup.js'
import { Transaction } from './types.js'
import chalk from 'chalk'

const { transactionFile } = loadConfig()

if (!existsSync(transactionFile)) {
  writeJSONSync(transactionFile, [])
}

export const loadTransactions = (): Transaction[] => {
  return readJSONSync(transactionFile)
}

export const saveTransaction = (expenses: Transaction[]): void => {
  writeJSONSync(transactionFile, expenses, { spaces: 2 })
}

export const reorderTransactions = (
  transactions: Transaction[],
): Transaction[] => {
  return transactions.map((transaction, index) => ({
    ...transaction,
    id: index + 1,
  }))
}

export const getUniqueCategories = (): string[] => {
  const transactions = loadTransactions()

  if (transactions.length === 0) {
    console.log(
      chalk.yellow('Found no transactions to extract the categories.'),
    )
  }

  return [...new Set(transactions.map((transaction) => transaction.category))]
}
