
// Action names
export const UPDATE_INTERNAL_MESH = 'UPDATE_INTERNAL_MESH'
export const UPDATE_AIRFOIL_SHELL = 'UPDATE_AIRFOIL_SHELL'
export const UPDATE_EXTERNAL_MESH = 'UPDATE_EXTERNAL_MESH'
export const UPDATE_FLUIDBOX_MESH = 'UPDATE_FLUIDBOX_MESH'

// Actions creators

export function updateAirfoilPoints (shell) {
  return { type: UPDATE_AIRFOIL_SHELL, shell }
}

export function updateInternalMesh (mesh) {
  return { type: UPDATE_INTERNAL_MESH, mesh }
}

export function updateExternalMesh (mesh) {
  return { type: UPDATE_EXTERNAL_MESH, mesh }
}

export function updateFluidBoxMesh (mesh) {
  return { type: UPDATE_FLUIDBOX_MESH, mesh }
}
