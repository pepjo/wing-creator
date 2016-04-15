
import { UPDATE_INTERNAL_MESH, UPDATE_EXTERNAL_MESH } from '../actions/meshes'

const defaultState = {
  internalMesh: {
    vertices: undefined,
    faces: undefined,
  },
  externalMesh: {
    vertices: undefined,
    faces: undefined,
  },
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case UPDATE_INTERNAL_MESH:
      return Object.assign({}, state, {
        internalMesh: Object.assign({}, action.mesh),
      })

    case UPDATE_EXTERNAL_MESH:
      return Object.assign({}, state, {
        externalMesh: Object.assign({}, action.mesh),
      })

    default:
      return state
  }
}
