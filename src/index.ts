#!/usr/bin/env node

import { program } from 'commander'
import { readJSONSync } from 'fs-extra/esm'
import { registerCommands } from './commands/index.js'

const cliInfo = readJSONSync('./package.json')

program
  .name(cliInfo.name)
  .description(cliInfo.description)
  .version(cliInfo.version)

registerCommands(program)

program.parse(process.argv)
