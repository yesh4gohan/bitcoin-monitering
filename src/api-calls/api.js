import axios from "axios";

export const FetchAmount = to => {
  return axios
    .get(`https://api.coindesk.com/v1/bpi/currentprice/${to}.json`)
    .then(res => res.data)
    .catch(err => console.log(err));
};

export const FetchHisTory = (start, end, type) => {
  console.log(type)
  return axios
    .get(
      `https://api.coindesk.com/v1/bpi/historical/close.json`,{
        params:{
          currency:type,
          start:end,
          end:start
        }
      }
    )
    .then(res => res.data)
    .catch(err => console.log(err));
};
