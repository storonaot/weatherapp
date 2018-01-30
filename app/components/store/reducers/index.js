import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import citiesByPage from './citiesByPage'
import weatherByCity from './weatherByCity'
import favoriteCities from './favoriteCities'

export default combineReducers({
  routing: routerReducer,
  citiesByPage,
  weatherByCity,
  favoriteCities
})
