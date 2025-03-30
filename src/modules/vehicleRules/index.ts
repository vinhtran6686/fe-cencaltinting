// Re-export Redux components
import vehicleRulesReducer from './redux/vehicleRulesSlice';
import * as vehicleRulesTypes from './redux/vehicleRulesTypes';

import vehicleRulesService from './services';

export const vehicleRules = {
  types: vehicleRulesTypes,
  service: vehicleRulesService
};

export default vehicleRulesReducer;
