import { AbstractCommand } from "./abstract.command";
import { Command } from "commander";

export class DateCommand extends AbstractCommand {
  load(program: Command) {
    program
      .command("date <csvFile>")
      .alias("d")
      .description("Get the portfolio value per token in USD on that date")
      .action(async (csvFile: string) => {
        await this.action.handle(csvFile);
      });
  }
}
