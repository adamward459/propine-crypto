import { AbstractCommand } from "./abstract.command";
import { Command } from "commander";

export class TokenCommand extends AbstractCommand {
  load(program: Command): void {
    program
      .option(
        "--token <token>",
        "Get the latest portfolio value for that token in USD"
      )
      .argument("<csvFile>")
      .action(async (csvFile: string, options: { token: string | boolean }) => {
        await this.action.handle(csvFile, options);
      });
  }
}
