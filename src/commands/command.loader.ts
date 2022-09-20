import { Command } from "commander";
import { TokenCommand } from "./token.command";
import { DateCommand } from "./date.command";
import { DateAction, TokenAction } from "../actions";

export class CommandLoader {
  public static load(program: Command): void {
    new TokenCommand(new TokenAction()).load(program);
    new DateCommand(new DateAction()).load(program);
  }
}
