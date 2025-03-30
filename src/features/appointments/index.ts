// Re-export everything from the appointments feature
import appointmentsReducer from './appointmentsSlice';
import * as appointmentsSelectors from './appointmentsSelectors';
import * as appointmentsThunks from './appointmentsThunks';
import * as appointmentTypes from './appointmentTypes';

export { 
  appointmentsSelectors,
  appointmentsThunks,
  appointmentTypes
};

export default appointmentsReducer; 