import { combineReducers } from '@reduxjs/toolkit'

// Import reducers for each feature
import appointmentsReducer from '../features/appointments/appointmentsSlice'
// Blank reducers for other features - sẽ được cập nhật sau
import proposalReducer from '../features/proposal/proposalSlice'
import servicesReducer from '../features/services/servicesSlice'
import vehicleRulesReducer from '../features/vehicleRules/vehicleRulesSlice'
import inventoryReducer from '../features/inventory/inventorySlice'
import contactReducer from '../features/contact/contactSlice'
import transactionsReducer from '../features/transactions/transactionsSlice'
import invoiceReducer from '../features/invoice/invoiceSlice'

const rootReducer = combineReducers({
  // Feature reducers
  appointments: appointmentsReducer,
  proposal: proposalReducer,
  services: servicesReducer,
  vehicleRules: vehicleRulesReducer,
  inventory: inventoryReducer,
  contact: contactReducer,
  transactions: transactionsReducer,
  invoice: invoiceReducer,
})

export default rootReducer 