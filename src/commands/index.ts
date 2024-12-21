import { Command } from 'commander'
import { registerAddCommand } from './add.js'
import { registerCategoriesCommand } from './categories.js'
import { registerEditCommand } from './edit.js'
import { registerListCommand } from './list.js'
import { registerRemoveCommand } from './remove.js'
import { registerReportCommand } from './report.js'
import { registerConfigCommand } from './config.js'
import { registerExportCommand } from './export.js'
import { registerImportCommand } from './import.js'

export const registerCommands = (program: Command) => {
  registerAddCommand(program)
  registerEditCommand(program)
  registerListCommand(program)
  registerRemoveCommand(program)
  registerReportCommand(program)
  registerCategoriesCommand(program)
  registerConfigCommand(program)
  registerImportCommand(program)
  registerExportCommand(program)
}
