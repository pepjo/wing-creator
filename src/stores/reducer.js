
import { combineReducers } from 'redux'

// Reducers
import data from './data'
import display from './display'
import geometry from './geometry'
import meshes from './meshes'

export default combineReducers({
  data,
  display,
  geometry,
  meshes,
})
