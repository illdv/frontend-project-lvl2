#!/usr/bin/env node
import commander from 'commander';
import { version, description } from '../../package.json';
import gendiff from '..';

const program = commander;

program
  .description(`${description}`)
  .arguments('<firstConfig> <secondConfig>')
  .version(`${version}`, '-v, --version')
  .option('-f, --format [type]', 'Output format', 'tree')
  .action((file1, file2) => console.log(gendiff(file1, file2, program.format)));
program.parse(process.argv);
