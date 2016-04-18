
import { UPDATE_INTERNAL_MESH, UPDATE_EXTERNAL_MESH, UPDATE_AIRFOIL_SHELL } from '../actions/meshes'

const defaultState = {
  internalMesh: {
    vertices: undefined,
    faces: undefined,
    segments: undefined,
    facesFromSegments: undefined,
  },
  externalMesh: {
    vertices: undefined,
    faces: undefined,
    segments: undefined,
    facesFromSegments: undefined,
  },
  airfoilShell: {
    vertices: undefined,
    faces: undefined,
    segments: undefined,
    facesFromSegments: undefined,
  },
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case UPDATE_AIRFOIL_SHELL:
      return Object.assign({}, state, {
        airfoilShell: Object.assign({}, action.shell),
      })

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
