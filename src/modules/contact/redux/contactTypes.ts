export interface Contact {
  _id: string;
}

export interface ContactState {
  contacts: Contact[];
  selectedContactId: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}