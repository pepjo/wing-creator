
import { combineReducers } from 'redux'

// Reducers
import data from './data'
import display from './display'
import geometry from './geometry'
import meshes from './meshes'
import exportSettings from './exportSettings'

const reducer = combineReducers({
  data,
  display,
  geometry,
  meshes,
  exportSettings,
})

export default function (state, action) {
  const newState = reducer(state, action)

  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('savedSettings', JSON.stringify(
      Object.assign({}, state, { version: process.env.version })
    ))
  }

  return newState
}
