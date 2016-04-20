
import { UPDATE_EXPORT_SETTING } from '../actions/exportSettings'

const defaultState = {
  problemType: 'KRATOS_structural',
  differentVertices: false,
  externalMesh: true,
  internalMesh: true,
}

function newState (param, value) {
  const newstate = {}
  newstate[param] = value
  return newstate
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case UPDATE_EXPORT_SETTING:
      return Object.assign({}, state, newState(action.param, action.value))

    default:
      return state
  }
}
