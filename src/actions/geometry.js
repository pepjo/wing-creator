
// Action names
export const UPDATE_GEOMETRY_PARAM = 'UPDATE_GEOMETRY_PARAM'
export const UPDATE_AIRFOIL = 'UPDATE_AIRFOIL'
export const CHANGE_AIRFOIL_TYPE = 'CHANGE_AIRFOIL_TYPE'

// Actions creators

export function changeGeometryParameter (param, value) {
  return { type: UPDATE_GEOMETRY_PARAM, param, value }
}

export function changeAirfoil (airfoil, filename) {
  return { type: UPDATE_AIRFOIL, airfoil, filename }
}

export function changeAirfoilType (airType) {
  return { type: CHANGE_AIRFOIL_TYPE, airType }
}
