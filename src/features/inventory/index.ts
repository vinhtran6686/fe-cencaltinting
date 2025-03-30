// Re-export everything from the inventory feature
import inventoryReducer from './inventorySlice';
import * as inventoryTypes from './inventoryTypes';

export { 
  inventoryTypes
};

export default inventoryReducer; 