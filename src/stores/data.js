
import { REPLACE_AIRFOILS } from '../actions/data'

const defaultState = {
  airfoils: [],
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case REPLACE_AIRFOILS:
      return Object.assign({}, state, {
        airfoils: Object.assign({}, action.airfoils)
      })

    default:
      return state
  }
}
