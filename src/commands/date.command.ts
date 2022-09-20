import { AbstractCommand } from "./abstract.command";
import { Command } from "commander";

export class DateCommand extends AbstractCommand {
  load(program: Command) {
    program
      .option(
        "--date <date>",
        "Get the portfolio value per token in USD on that date"
      )
      .action(async (csvFile: string, options: { date: boolean | string }) => {
        await this.action.handle(csvFile, options);
      });
  }
}
