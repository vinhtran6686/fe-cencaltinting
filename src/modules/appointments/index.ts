// Re-export Redux components
import appointmentsReducer from './redux/appointmentsSlice';
import * as appointmentsSelectors from './redux/appointmentsSelectors';
import * as appointmentsThunks from './redux/appointmentsThunks';
import * as appointmentTypes from './redux/appointmentTypes';

// Import services
import appointmentsService from './services';

// Create a namespace for selectors, thunks, types, and services
export const appointments = {
  selectors: appointmentsSelectors,
  thunks: appointmentsThunks,
  types: appointmentTypes,
  service: appointmentsService
};

// Export the reducer as default
export default appointmentsReducer; 