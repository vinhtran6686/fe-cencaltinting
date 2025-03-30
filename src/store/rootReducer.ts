import { combineReducers } from '@reduxjs/toolkit'

// Import reducers from modules
import appointmentsReducer from '../modules/appointments'
// Blank reducers for other features - sẽ được cập nhật sau
import proposalReducer from '../modules/proposal/redux/proposalSlice'
import servicesReducer from '../modules/services/redux/servicesSlice'
import vehicleRulesReducer from '../modules/vehicleRules/redux/vehicleRulesSlice'
import inventoryReducer from '../modules/inventory/redux/inventorySlice'
import contactReducer from '../modules/contact/redux/contactSlice'
import transactionsReducer from '../modules/transactions/redux/transactionsSlice'
import invoiceReducer from '../modules/invoice/redux/invoiceSlice'

const rootReducer = combineReducers({
  // Module reducers
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