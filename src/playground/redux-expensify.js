import {createStore, combineReducers} from "redux";
import uuid from "uuid";

const addExpense = ({description = "", note = "", amount = 0, createdAt = 0} = {}) => ({
  type: "add_expense",
  expense: {id: uuid(), description, note, amount, createdAt}
});

const removeExpense = id => ({type: "remove_expense", id});

const editExpense = (id, updates) => ({type: "edit_expense", id, updates});

const reducerExpenses = (state = [], action) => {
  switch (action.type) {
    case "add_expense":
      return [...state, action.expense];
    case "remove_expense":
      return state.filter(exp => exp.id !== action.id);
    case "edit_expense":
      return state.map(exp => exp.id === action.id ? {...exp, ...action.updates} : exp);
    default:
      return state;
  }
};

const setTextFilter = (text = "") => ({type: "set_text_filter", text});

const sortByAmount = () => ({type: "sort_by_amount"});

const sortByDate = () => ({type: "sort_by_date"});

const setStartDate = date => ({type: "set_start_date", date});

const setEndDate = date => ({type: "set_end_date", date});

const reducerFilters = (state = {text: "", sortBy: "date", startDate: undefined, endDate: undefined}, action) => {
  switch (action.type) {
    case "set_text_filter":
      return {...state, text: action.text};
    case "sort_by_amount":
    // console.log("sorting by amount");
    return {...state, sortBy: "amount"};
    case "sort_by_date":
    // console.log("sorting by date");
      return {...state, sortBy: "date"};
    case "set_start_date":
      return {...state, startDate: action.date};
    case "set_end_date":
      return {...state, endDate: action.date};
    default:
      return state;
  }
};

const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) => {
  return expenses.filter(exp => {
    const startDateMatch = typeof startDate !== "number" || exp.createdAt >= startDate;
    const endDateMatch = typeof endDate !== "number" || exp.createdAt <= endDate;
    const textMatch = exp.description.toLowerCase().includes(text.toLowerCase());
    return startDateMatch && endDateMatch && textMatch;
  }).sort((a, b) => {
    if (sortBy === "amount") {
      return b.amount - a.amount;
    } else if (sortBy === "date") {
      return a.createdAt - b.createdAt;
    }
  });
};

const store = createStore(
  combineReducers({
    expenses: reducerExpenses,
    filters: reducerFilters
  })
);

store.subscribe(() => {
  const state = store.getState();
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
  console.log(visibleExpenses);
});

const exp3 = store.dispatch(addExpense({description: "bagel", amount: 200, createdAt: 2000}));
const exp1 = store.dispatch(addExpense({description: "rent", amount: 100, createdAt: 1000}));
const exp2 = store.dispatch(addExpense({description: "coffee", amount: 300, createdAt: -1000}));
const exp4 = store.dispatch(addExpense({description: "croissant", amount: 400, createdAt: -1500}));

// store.dispatch(removeExpense(exp1.expense.id));

// store.dispatch(editExpense(exp2.expense.id, {amount: 500}));

// store.dispatch(setTextFilter("rent"));
// store.dispatch(setTextFilter());

store.dispatch(sortByAmount());
store.dispatch(sortByDate());

// store.dispatch(setStartDate(125));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(999));

const demoState = {
  expenses: [{
    id: "asdflkj",
    description: "rent",
    note: "this was th final payment",
    amount: 54500,
    createdAt: 0
  }],
  filters: {
    text: "rent",
    sortBy: "amount",
    startDate: undefined,
    endDate: undefined
  }
};