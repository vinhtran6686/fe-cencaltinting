import { createSlice } from '@reduxjs/toolkit';
import { ContactState } from './contactTypes';
 
const initialState: ContactState = {
  contacts: [],
  selectedContactId: null,
  status: 'idle',
  error: null
};
 
const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: { 
  },
});
 
export default contactSlice.reducer;
 