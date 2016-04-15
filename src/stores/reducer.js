
import { combineReducers } from 'redux'

// Reducers
import data from './data'
import display from './display'
import geometry from './geometry'

export default combineReducers({
  data,
  display,
  geometry,
})
