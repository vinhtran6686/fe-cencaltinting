// Re-export Redux components
import servicesReducer from './redux/servicesSlice';
import * as servicesTypes from './redux/servicesTypes';

import servicesService from './services';

export const services = {
  types: servicesTypes,
  service: servicesService
};

export default servicesReducer;
