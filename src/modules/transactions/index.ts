// Re-export Redux components
import transactionsReducer from './redux/transactionsSlice';
import * as transactionsTypes from './redux/transactionsTypes';

import transactionsService from './services';

export const transactions = {
  types: transactionsTypes,
  service: transactionsService
};

export default transactionsReducer;
