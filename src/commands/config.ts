import chalk from 'chalk'
import { Command } from 'commander'
import {
  loadConfig,
  setCurrencyInUse,
  getCurrencyInUse,
} from '../utils/config.js'

const registerConfigCommand = (program: Command) => {
  program
    .command('config')
    .description('View or update configuration settings')
    .option('-v, --view', 'View current configuration')
    .option(
      '--set-currency <currency>',
      'Set the active currency (e.g., USD, EUR)',
    )
    .action(async (options) => {
      if (options.view) {
        const config = await loadConfig()
        console.log(chalk.blue('Current Configuration:'))
        console.log(JSON.stringify(config, null, 2))
      } else if (options.setCurrency) {
        try {
          const updatedConfig = await setCurrencyInUse(
            options.setCurrency.toUpperCase(),
          )
          console.log(chalk.green('Active currency updated successfully!'))
          const activeCurrency = await getCurrencyInUse()
          console.log(
            `Active Currency: ${activeCurrency.label} (${activeCurrency.symbol})`,
          )
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
