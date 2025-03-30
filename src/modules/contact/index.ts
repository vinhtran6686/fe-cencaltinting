// Re-export Redux components
import contactReducer from './redux/contactSlice';
import * as contactTypes from './redux/contactTypes';

import contactService from './services';

export const contact = {
  types: contactTypes,
  service: contactService
};

export default contactReducer;
