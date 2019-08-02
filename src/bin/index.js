#!/usr/bin/env node
import commander from 'commander';
import { version, description } from '../../package.json';
import gendiff from '..';

const program = commander;

program
  .description(`${description}`)
  .arguments('<firstConfig> <secondConfig>')
  .version(`${version}`, '-v, --version')
  .option('-f, --format [type]', 'Output format')
  .action((file1, file2) => gendiff(file1, file2));
program.parse(process.argv);
console.log(__dirname);
gendiff('/__tests__/__fixtures__/after.json', '/__tests__/__fixtures__/before.json');
