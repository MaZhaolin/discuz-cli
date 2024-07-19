#!/usr/bin/env node
import * as commander from 'commander';
import config from '../package.json' assert { type: "json" };
import create from '../lib/create.js';

const program = new commander.Command();


program
.command('create <plugin-name>')
.description('create a new plugin')
.option('-t, --type <type>', 'plugin type')
.action(create);

program.on('--help', function () {
  console.log('  Examples:');
  console.log('');
  console.log('    $ create-cli create my-plugin');
  console.log('    $ create-cli create my-plugin -t my-plugin-type');
  console.log('');
});

program
.version(config.version)
.usage('<command [option]');

program.parse(process.argv);
