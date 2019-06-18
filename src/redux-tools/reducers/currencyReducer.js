import {SET_CURRENCY_DATA} from '../actions/actionTypes';
const initialState = {
  rate:0,
  desc:"United States Dollar"
}

export default (state = initialState, { type, payload }) => {
  console.log(payload)
  switch (type) {

  case SET_CURRENCY_DATA:
    return { ...state, ...{rate:payload.rate},...{desc:payload.desc},...{time:payload.time} }

  default:
    return state
  }
}
