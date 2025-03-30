// Re-export Redux components
import appointmentsReducer from './redux/appointmentsSlice';
import * as appointmentTypes from './redux/appointmentTypes';

import appointmentsService from './services';

export const appointments = {
  types: appointmentTypes,
  service: appointmentsService
};

export default appointmentsReducer; 