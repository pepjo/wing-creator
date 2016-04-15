
// Action names
export const UPDATE_INTERNAL_MESH = 'UPDATE_INTERNAL_MESH'
export const UPDATE_EXTERNAL_MESH = 'UPDATE_EXTERNAL_MESH'

// Actions creators

export function updateInternalMesh (mesh) {
  return { type: UPDATE_INTERNAL_MESH, mesh }
}

export function updateExternalMesh (mesh) {
  return { type: UPDATE_EXTERNAL_MESH, mesh }
}
