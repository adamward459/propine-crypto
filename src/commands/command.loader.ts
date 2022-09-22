import { Command } from "commander";
import { BaseAction } from "../actions";
import { Converter } from "../converter";
import { BaseCommand } from "./base.command";

export class CommandLoader {
  public static load(program: Command): void {
    new BaseCommand(new BaseAction(new Converter())).load(program);
  }
}
