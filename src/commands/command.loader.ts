import { Command } from "commander";
import { TokenCommand } from "./token.command";
import { DateCommand } from "./date.command";
import { DateAction, TokenAction } from "../actions";
import { Converter } from "../converter";

export class CommandLoader {
  public static load(program: Command): void {
    new TokenCommand(new TokenAction(new Converter())).load(program);
    new DateCommand(new DateAction(new Converter())).load(program);
  }
}
