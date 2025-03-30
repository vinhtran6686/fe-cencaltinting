export interface Invoice {
  id: string;
}

export interface InvoiceState {
  invoices: Invoice[];
  selectedInvoiceId: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}