import { FetchAmount,FetchHisTory } from "../../api-calls/api";
import { SET_CURRENCY_DATA,SET_HISTORY } from "./actionTypes";
export const getAmount = to => async dispatch => {
  let data = await FetchAmount(to);
  let rate = data.bpi[to].rate_float;
  let desc = data.bpi[to].description;
  console.log(data)
  let time = data.time.updated;
  let pay = {
    rate,
    desc,
    time
  };
  dispatch({
    type: SET_CURRENCY_DATA,
    payload: pay
  });
};

export const getAmountDefault = () => async dispatch => {
  let data = await FetchAmount("USD");
  
  let rate = data.bpi["USD"].rate_float;
  let desc = data.bpi["USD"].description;
  let time = data.time.updated;
  let pay = {
    rate,
    desc,
    time
  };
  dispatch({
    type: SET_CURRENCY_DATA,
    payload: pay
  });
};

export const getHistory = (start,end,type) => async dispatch => {
  let data = await FetchHisTory(start,end,type);
  let pay = data.bpi;
  
  dispatch({
    type:SET_HISTORY,
    payload:pay
  })
}