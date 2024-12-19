import chalk from 'chalk'
import { Command } from 'commander'
import {
  loadConfig,
  setCurrencyInUse,
  getCurrencyInUse,
  setLanguage,
} from '../utils/config.js'
import { translate } from '../utils/translator.js'

const registerConfigCommand = (program: Command) => {
  program
    .command('config')
    .description(translate('commands.config.description'))
    .option('-v, --view', translate('commands.config.view'))
    .option(
      '--set-currency <currency>',
      translate('commands.config.setCurrency'),
    )
    .option(
      '--set-language <language>',
      translate('commands.config.setLanguage'),
    )
    .action((options) => {
      if (options.view) {
        const config = loadConfig()
        console.log(chalk.blue('Current Configuration:'))
        console.log(config)
      } else if (options.setCurrency) {
        try {
          const updatedConfig = setCurrencyInUse(
            options.setCurrency.toUpperCase(),
          )
          console.log(chalk.green('Active currency updated successfully!'))
          const activeCurrency = getCurrencyInUse()
          console.log(
            `Active Currency: ${activeCurrency.label} (${activeCurrency.symbol})`,
          )
        } catch (error: any) {
          console.error(chalk.red(error.message))
        }
      } else if (options.setLanguage) {
        try {
          setLanguage(options.setLanguage)
        } catch (error: any) {
          console.error(chalk.red(error.message))
        }
      } else {
        console.log(
          chalk.yellow(
            'Use --view to view or --set-currency to update the active currency.',
          ),
        )
      }
    })
}

export { registerConfigCommand }
