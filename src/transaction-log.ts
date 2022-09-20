export type TransactionLog = {
  timestamp: number;
  transaction_type: "DEPOSIT" | "WITHDRAWAL";
  token: string;
  amount: string;
};
