#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const commands_1 = require("./commands");
function start() {
    const program = new commander_1.Command();
    program.helpOption("-h, --help", "Output usage information");
    commands_1.CommandLoader.load(program);
    program.parse();
    if (!process.argv.slice(2).length) {
        program.outputHelp();
    }
}
start();
