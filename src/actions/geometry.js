
// Action names
export const UPDATE_GEOMETRY_PARAM = 'UPDATE_GEOMETRY_PARAM'
export const UPDATE_AIRFOIL = 'UPDATE_AIRFOIL'

// Actions creators

export function changeGeometryParameter (param, value) {
  return { type: UPDATE_GEOMETRY_PARAM, param, value }
}

export function changeAirfoil (filename, airfoil) {
  return { type: UPDATE_AIRFOIL, filename, airfoil }
}
