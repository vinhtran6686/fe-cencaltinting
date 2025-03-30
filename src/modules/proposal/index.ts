// Re-export Redux components
import proposalReducer from './redux/proposalSlice';
import * as proposalTypes from './redux/proposalTypes';

import proposalService from './services';

export const proposal = {
  types: proposalTypes,
  service: proposalService
};

export default proposalReducer;
