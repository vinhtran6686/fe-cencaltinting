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
  extraReducers: (builder) => {
  },
});

export default transactionsSlice.reducer;