import { Command } from 'commander'
import { registerAddCommand } from './add.js'
import { registerCategoriesCommand } from './categories.js'
import { registerEditCommand } from './edit.js'
import { registerListCommand } from './list.js'
import { registerRemoveCommand } from './remove.js'
import { registerReportCommand } from './report.js'

export const registerCommands = (program: Command) => {
  registerAddCommand(program)
  registerEditCommand(program)
  registerListCommand(program)
  registerRemoveCommand(program)
  registerReportCommand(program)
  registerCategoriesCommand(program)
}
