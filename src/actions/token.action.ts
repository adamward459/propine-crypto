import fs from "node:fs";
import csvParser from "csv-parser";

import { AbstractAction } from "./abstract.action";
import { TransactionLog } from "../transaction-log";

export class TokenAction extends AbstractAction {
  csvHeaders = ["timestamp", "transaction_type", "token", "amount"];

  async handle(
    csvFile: string,
    options: { token?: string; date?: string }
  ): Promise<void> {
    if (!fs.existsSync(csvFile)) {
      console.error(`${csvFile} does not exist!`);
      process.exit(0);
    }

    const token = options.token.toString().toUpperCase();
    let total = 0;
    console.log("Running...");

    fs.createReadStream(csvFile)
      .pipe(csvParser())
      .on("headers", (headers) => {
        for (const h of headers) {
          if (!this.csvHeaders.includes(h)) {
            console.log(`Missing ${h} in csv content`);
            process.exit(0);
          }
        }
      })
      .on("data", (row: TransactionLog) => {
        if (row.token === token) {
          if (row.transaction_type === "DEPOSIT") {
            total += parseFloat(row.amount);
          } else if (row.transaction_type === "WITHDRAWAL") {
            total -= parseFloat(row.amount);
          }
        }
      })
      .on("end", async () => {
        console.log("Result: ", this.converter.portfolioToUSD(token, total));
      });
  }
}
