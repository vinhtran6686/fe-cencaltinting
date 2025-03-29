import { combineReducers } from '@reduxjs/toolkit'

// Import reducers
// Add more reducers as your features grow
// import userReducer from '../modules/users/redux/userSlice'

// Example of a simple empty reducer
const emptyReducer = (state = {}, action: any) => state

const rootReducer = combineReducers({
  // Add a placeholder reducer to avoid empty reducer error
  empty: emptyReducer
})

export default rootReducer 