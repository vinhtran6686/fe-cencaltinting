export interface Contact {
}

export interface ContactState {
  contacts: Contact[];
  selectedContactId: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}