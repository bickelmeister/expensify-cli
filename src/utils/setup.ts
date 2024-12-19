import { existsSync, mkdirSync } from 'fs'
import { writeJSONSync } from 'fs-extra/esm'
import path from 'path'

const TRANSACTION_FILE = path.join(
  process.cwd(),
  'storage',
  'transactions.json',
)

export const loadConfig = (): { transactionFile: string } => {
  const transactionFile = TRANSACTION_FILE
  const transactionDir = path.dirname(transactionFile)

  if (!existsSync(transactionDir)) {
    mkdirSync(transactionDir, { recursive: true })
    console.log(`Verzeichnis erstellt: ${transactionDir}`)
  }

  if (!existsSync(transactionFile)) {
    writeJSONSync(transactionFile, [])
    console.log(`Datei erstellt: ${transactionFile}`)
  }

  return { transactionFile }
}
