import { createSlice } from '@reduxjs/toolkit';
import { ProposalState } from './proposalTypes';

const initialState: ProposalState = {
  proposals: [],
  selectedProposalId: null,
  status: 'idle',
  error: null
};

const proposalSlice = createSlice({
  name: 'proposal',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
  },
});

export default proposalSlice.reducer;