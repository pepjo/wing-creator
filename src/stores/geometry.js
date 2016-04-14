
// import { PLAN_UI } from '../actions/admin.js'

const defaultState = {
  airfoil: 'NACA0012',
  ribs: {
    n: 5,
    thickness: 5,
    type: 'solid',
  },
  length: 5,
  root: 2,
  skin: {
    thickness: 0,
    type: 'shell',
  },
}

export default (state = defaultState, action) => {
  switch (action.type) {
    // case GET_ALL_PLANS:
    //   return Object.assign({}, state, {
    //     gettingPlans: true
    //   })

    default:
      return state
  }
}
