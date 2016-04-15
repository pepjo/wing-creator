
// Action names
export const PUSH_WINDOW_SIZE = 'PUSH_WINDOW_SIZE'

// Actions creators

export function pushWindowSize (width, height) {
  return { type: PUSH_WINDOW_SIZE, width, height }
}
