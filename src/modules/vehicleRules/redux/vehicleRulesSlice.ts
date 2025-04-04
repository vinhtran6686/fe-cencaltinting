import { createSlice } from '@reduxjs/toolkit';
import { VehicleRulesState } from './vehicleRulesTypes';

const initialState: VehicleRulesState = {
  vehicleRules: [],
  selectedVehicleRuleId: null,
  status: 'idle',
  error: null
};

const vehicleRulesSlice = createSlice({
  name: 'vehicleRules',
  initialState,
  reducers: {
  },
});

export default vehicleRulesSlice.reducer;