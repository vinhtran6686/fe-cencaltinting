// Re-export everything from the contact feature
import contactReducer from './contactSlice';
import * as contactTypes from './contactTypes';

export { 
  contactTypes
};

export default contactReducer; 