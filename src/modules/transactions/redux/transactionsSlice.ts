import { createSlice } from '@reduxjs/toolkit';
import { TransactionsState } from './transactionsTypes';

const initialState: TransactionsState = {
  transactions: [],
  selectedTransactionId: null,
  status: 'idle',
  error: null
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
  }, 
});

export default transactionsSlice.reducer;