#!/usr/bin/env node
import commander from 'commander';
import { version, description } from '../../package.json';

const program = commander;

program
  .description(`${description}`)
  .arguments('<firstConfig> <secondConfig>')
  .version(`${version}`, '-v, --version')
  .option('-f, --format [type]', 'Output format');

program.parse(process.argv);
