import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import axios from "axios";
import logger from "redux-logger";

//////////////////////////////////// ACTION TYPES below:

// const LOAD_LEAGUES = "LOAD_LEAGUES";

//////////////////////////////////// ACTION CREATORS below:

// const _loadLeagues = (leagues) => {
//   return { type: LOAD_LEAGUES, leagues };
// };

//////////////////////////////////// THUNKS below:

// export const loadLeagues = () => {
//   return async (dispatch) => {
//     const leagues = (await axios.get("/api/leagues")).data;
//     dispatch(_loadLeagues(leagues));
//   };
// };

//////////////////////////////////// REDUCERS below:

// const leagues = (state = [], action) => {
//   switch (action.type) {
//     case LOAD_LEAGUES:
//       return action.leagues;
//     default:
//       return state;
//   }
// };

const reducer = combineReducers({
  // leagues,
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
