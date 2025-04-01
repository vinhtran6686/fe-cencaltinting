// Re-export Redux components
import appointmentsReducer from './redux/appointmentsSlice';
import * as appointmentTypes from './redux/appointmentTypes';

import appointmentsService from './services';
import * as appointmentSelectors from './redux/appointmentsSelectors';

export const appointments = {
  types: appointmentTypes,
  service: appointmentsService,
  selectors: appointmentSelectors
};

export default appointmentsReducer;

// Export hooks
export * from './hooks';

// Export services
export * from './services';

// Export components
export * from './components'; 