
// Action names
export const UPDATE_EXPORT_SETTING = 'UPDATE_EXPORT_SETTING'

// Actions creators

export function updateExportSetting (param, value) {
  return { type: UPDATE_EXPORT_SETTING, param, value }
}
