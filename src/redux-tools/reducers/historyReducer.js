import {SET_HISTORY} from '../actions/actionTypes'
const initialState = {
timeFrame:{}
}

export default (state = initialState, { type, payload }) => {
  console.log(payload)
  switch (type) {

  case SET_HISTORY:
    return { ...state, ...{timeFrame:payload} }

  default:
    return state
  }
}
