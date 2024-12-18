import chalk from 'chalk';
import { existsSync } from 'fs';
import { readJSONSync, writeJSONSync } from 'fs-extra/esm';
import { loadConfig } from './setup.js';
import { Transaction } from './types.js';

const { transactionFile } = loadConfig();

if (!existsSync(transactionFile)) {
  writeJSONSync(transactionFile, []);
}

export const loadTransactions = (): Transaction[] => {
  return readJSONSync(transactionFile);
};

export const saveTransaction = (expenses: Transaction[]): void => {
  writeJSONSync(transactionFile, expenses, { spaces: 2 });
};

export const reorderTransactions = (
  transactions: Transaction[]
): Transaction[] => {
  return transactions.map((transaction, index) => ({
    ...transaction,
    id: index + 1,
  }));
};
