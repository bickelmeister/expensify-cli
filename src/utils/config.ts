import { existsSync } from 'fs'
import { readJSONSync, writeJSONSync } from 'fs-extra/esm'
import path from 'path'

const CONFIG_FILE = path.join(process.cwd(), 'transactions.json')

const DEFAULT_CONFIG = {
  currencies: [
    { label: 'EUR', symbol: '€', inUse: true },
    { label: 'USD', symbol: '$', inUse: false },
    { label: 'GBP', symbol: '£', inUse: false },
  ],
}

export const loadConfig = (): any => {
  if (!existsSync(CONFIG_FILE)) {
    writeJSONSync(CONFIG_FILE, DEFAULT_CONFIG, { spaces: 2 })
    console.log(`Konfigurationsdatei erstellt: ${CONFIG_FILE}`)
  }

  const config = readJSONSync(CONFIG_FILE)
  return config
}

export const saveConfig = (config: any): void => {
  writeJSONSync(CONFIG_FILE, config, { spaces: 2 })
}

export const setCurrencyInUse = (label: string): void => {
  const config = loadConfig()

  const currencyExists = config.currencies.some((c: any) => c.label === label)
  if (!currencyExists) {
    throw new Error(`Currency "${label}" is not supported.`)
  }

  config.currencies = config.currencies.map((currency: any) => ({
    ...currency,
    inUse: currency.label === label,
  }))

  saveConfig(config)
  console.log(`Aktive Währung auf "${label}" gesetzt.`)
}

export const getCurrencyInUse = (): any => {
  const config = loadConfig()
  const currency = config.currencies.find((c: any) => c.inUse)

  if (!currency) {
    throw new Error('Keine aktive Währung gefunden.')
  }

  return currency
}
