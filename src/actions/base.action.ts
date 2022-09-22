import fs from "node:fs";
import csvParser from "csv-parser";
import moment from "moment";

import { AbstractAction } from "./abstract.action";
import { TransactionLog } from "../transaction-log";

export class BaseAction extends AbstractAction {
  csvHeaders = ["timestamp", "transaction_type", "token", "amount"];

  async handle(
    csvFile: string,
    options: { token?: string; date?: string }
  ): Promise<void> {
    if (!fs.existsSync(csvFile)) {
      console.error(`${csvFile} does not exist!`);
      process.exit(0);
    }

    const token = options.token;
    const date = options.date;
    let startUnix = 0,
      endUnix = 0;
    if (date !== undefined) {
      if (moment(date, "YYYY-MM-DD", true).isValid()) {
        startUnix = moment(date).startOf("date").unix();
        endUnix = moment(date).endOf("date").unix();
      } else {
        console.log(`${date} is not a valid date`);
        process.exit(0);
      }
    }

    const totalPerToken: Record<string, number> = {};
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
        const cond =
          (!token && !date) ||
          (token &&
            date &&
            row.timestamp <= endUnix &&
            row.timestamp >= startUnix &&
            row.token === token) ||
          (!date && token && row.token === token) ||
          (!token &&
            date &&
            row.timestamp <= endUnix &&
            row.timestamp >= startUnix);

        if (cond) {
          totalPerToken[row.token] ??= 0;
          if (row.transaction_type === "DEPOSIT") {
            totalPerToken[row.token] += parseFloat(row.amount);
          } else if (row.transaction_type === "WITHDRAWAL") {
            totalPerToken[row.token] -= parseFloat(row.amount);
          }
        }
      })
      .on("end", async () => {
        const tokens = Object.keys(totalPerToken);
        if (tokens.length === 0) {
          console.log("No info");
        } else {
          const portfolios = await Promise.all(
            tokens.map((t) =>
              this.converter.portfolioToUSD(t, totalPerToken[t])
            )
          );
          portfolios.forEach((p, index) => {
            console.log(`Token ${tokens[index]} portfolios: ${p}`);
          });
        }
      });
  }
}
