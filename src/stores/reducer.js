
import { combineReducers } from 'redux'

// Reducers
import data from './data'
import display from './display'
import geometry from './geometry'
import meshes from './meshes'
import exportSettings from './exportSettings'

export default combineReducers({
  data,
  display,
  geometry,
  meshes,
  exportSettings,
})
