#!/usr/bin/env node
import {Command} from "commander";
import {CommandLoader} from "./commands";

function start() {
  const program = new Command();
  program.helpOption("-h, --help", "Output usage information");

  CommandLoader.load(program);

  program.parse()

  if (!process.argv.slice(2).length) {
    program.outputHelp();
  }
}

start();
