import {createStore, combineReducers} from "redux";
import reducerExpenses from '../reducers/expenses';
import reducerFilters from '../reducers/filters';

export default () => {
  const store = createStore(
    combineReducers({
      expenses: reducerExpenses,
      filters: reducerFilters
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  return store;
};
