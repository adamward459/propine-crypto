import { AbstractCommand } from "./abstract.command";
import { Command } from "commander";

export class BaseCommand extends AbstractCommand {
  load(program: Command) {
    program
      .option(
        "--date <date>",
        "Get the portfolio value per token in USD on that date"
      )
      .option(
        "--token <token>",
        "Get the latest portfolio value for that token in USD"
      )
      .action((csvFile, options) => {
        this.action.handle(csvFile, options);
      });
  }
}
