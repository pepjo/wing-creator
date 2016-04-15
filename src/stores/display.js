
import { PUSH_WINDOW_SIZE } from '../actions/display'

// Set default state
let height = 700
let width = 1200
if (typeof window !== 'undefined') {
  height = window.innerHeight
  width = window.innerWidth
}
const defaultState = {
  width,
  height,
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case PUSH_WINDOW_SIZE:
      return Object.assign({}, state, {
        width: action.width,
        height: action.height,
      })

    default:
      return state
  }
}
