
import { UPDATE_GEOMETRY_PARAM, UPDATE_AIRFOIL, CHANGE_AIRFOIL_TYPE } from '../actions/geometry'

const defaultState = {
  wingParameters: {
    length: 10,
    root: 3,
    tip: 1.5,
    sweep: 30,
  },
  structureParameters: {
    ribs: 5,
    beamCoord: 0.3,
    beamExtension: 2,
  },
  internal: {
    type: 'shell',
    thickness: 5,
  },
  external: {
    type: 'shell',
    thickness: 5,
  },
  airfoil: {
    type: 'fromNACA4',
    filename: undefined,
    uid: 'naca4-4412',
    data: '4412',
    name: 'NACA 4412',
    nPoints: 50,
    distribution: 'sin',
    interpolation: 'linear',
  },
  fluidBox: {
    width: 1.5,
    height: 0.5,
    length: 2.5,
    x: 5,
    angle: 3,
  },
}

function newState (param, value, state) {
  const route = param.split('.')
  const newstate = {}
  newstate[route[0]] = Object.assign({}, state[route[0]])
  newstate[route[0]][route[1]] = value
  return newstate
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case UPDATE_GEOMETRY_PARAM:
      return Object.assign({}, state, newState(action.param, action.value, state))

    case UPDATE_AIRFOIL:
      if (state.airfoil.type === 'fromFile') {
        return Object.assign({}, state, {
          airfoil: Object.assign({}, state.airfoil, {
            filename: action.filename,
            uid: action.filename,
            data: [...action.airfoil.data],
            name: action.airfoil.name,
          }),
        })
      } else if (state.airfoil.type === 'fromNACA4') {
        return Object.assign({}, state, {
          airfoil: Object.assign({}, state.airfoil, {
            uid: `naca4-${action.airfoil}`,
            data: action.airfoil,
            name: `NACA ${action.airfoil}`,
          }),
        })
      }
      return state

    case CHANGE_AIRFOIL_TYPE:
      return Object.assign({}, state, {
        airfoil: Object.assign({}, state.airfoil, {
          type: `${action.airType}`,
          filename: undefined,
          uid: undefined,
          data: action.airType !== 'fromFile' && '',
          name: undefined,
        }),
      })

    default:
      return state
  }
}
