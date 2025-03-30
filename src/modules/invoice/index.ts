// Re-export Redux components
import invoiceReducer from './redux/invoiceSlice';
import * as invoiceTypes from './redux/invoiceTypes';

import invoiceService from './services';

export const invoice = {
  types: invoiceTypes,
  service: invoiceService
};

export default invoiceReducer;
