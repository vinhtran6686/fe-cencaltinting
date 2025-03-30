export interface Transaction {
  id: string;
}

export interface TransactionsState {
  transactions: Transaction[];
  selectedTransactionId: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}