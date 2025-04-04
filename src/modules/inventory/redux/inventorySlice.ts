import { createSlice } from '@reduxjs/toolkit';
import { InventoryState } from './inventoryTypes';
 
const initialState: InventoryState = {
  items: [],
  selectedItemId: null,
  status: 'idle',
  error: null
};
 
const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
  },
});

export default inventorySlice.reducer; 