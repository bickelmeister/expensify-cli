import chalk from 'chalk'
import { Command } from 'commander'
import { getUniqueCategories } from '../utils/storage.js'

const registerCategoriesCommand = (program: Command) => {
  program
    .command('categories')
    .description('List all unique categories from transactions')
    .action(() => {
      const uniqueCategories: string[] = getUniqueCategories()

      if (uniqueCategories.length === 0) {
        console.log(chalk.yellow('No categories found.'))
        return
      }

      console.log(chalk.blue.bold('\nAvailable Categories:'))
      uniqueCategories.forEach((category: string) => {
        console.log(`- ${chalk.green(category)}`)
      })

      console.log(
        chalk.bold(
          `\nA total of ${uniqueCategories.length} categories were found.`,
        ),
      )
    })
}

export { registerCategoriesCommand }
