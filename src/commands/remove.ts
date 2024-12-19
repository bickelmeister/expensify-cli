import { Command } from 'commander'
import {
  loadTransactions,
  reorderTransactions,
  saveTransaction,
} from '../utils/storage.js'
import chalk from 'chalk'

const registerRemoveCommand = (program: Command) => {
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
}

export { registerRemoveCommand }
