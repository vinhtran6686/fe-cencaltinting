export interface Proposal {
  id: string;
}

export interface ProposalState {
  proposals: Proposal[];
  selectedProposalId: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}