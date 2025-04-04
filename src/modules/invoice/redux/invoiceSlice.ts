import { createSlice } from '@reduxjs/toolkit';
import { InvoiceState } from './invoiceTypes';
 
const initialState: InvoiceState = {
  invoices: [],
  selectedInvoiceId: null,
  status: 'idle',
  error: null
};

const invoiceSlice = createSlice({
  name: 'invoice',
  initialState,
  reducers: {
  },
});

export default invoiceSlice.reducer;
 