import path from 'path'
import { config } from 'dotenv'
import { existsSync, mkdirSync } from 'fs'
import { writeJSONSync } from 'fs-extra/esm'

const ENV_FILE = path.join(process.cwd(), '.env')

export const loadConfig = (): { transactionFile: string } => {
  config({ path: ENV_FILE })

  const transactionFile = process.env.TRANSACTION_FILE

  if (!transactionFile) {
    console.error(
      'TRANSACTION_FILE in der Konfiguration nicht gefunden. Bitte Setup ausführen.',
    )
    process.exit(1)
  }

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
