import {combineReducers} from 'redux';
import Currency from './currencyReducer'
import TimeFRame from './historyReducer';
export default combineReducers({
  currency:Currency,
  timeFrme:TimeFRame
});