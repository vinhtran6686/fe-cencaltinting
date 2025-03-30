// Re-export Redux components
import inventoryReducer from './redux/inventorySlice';
import * as inventoryTypes from './redux/inventoryTypes';

import inventoryService from './services';

export const inventory = {
  types: inventoryTypes,
  service: inventoryService
};

export default inventoryReducer;
