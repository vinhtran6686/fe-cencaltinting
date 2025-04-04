import { createSlice } from '@reduxjs/toolkit';
import { ServicesState } from './servicesTypes';

const initialState: ServicesState = {
  services: [],
  selectedServiceId: null,
  status: 'idle',
  error: null
};

const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
  },
});

export default servicesSlice.reducer; 