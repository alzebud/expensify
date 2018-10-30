import {createStore, combineReducers} from "redux";
import uuid from "uuid";


const addExpense = ({description = "", note = "", amount = 0, createdAt = 0} = {}) => ({
  type: "add_expense",
  expense: {id: uuid(), description, note, amount, createdAt}
});

const removeExpense = ({id} = {}) => ({type: "remove_expense", id});

const editExpense = (id, updates) => ({type: "edit_expense", id, updates});

const redExpDef = [];
const reducerExpenses = (state = redExpDef, action) => {
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

const setTextFilter = (text = "") => ({type: "filter_text", text});

const sortByAmount = () => ({type: "sort_by_amount"});
const sortByDate = () => ({type: "sort_by_date"});

const setStartDate = (date) => ({type: "set_start_date", date});
const setEndDate = (date) => ({type: "set_end_date", date});

const redFiltDef = {text: "", sortBy: "date", startDate: undefined, endDate: undefined};
const reducerFilters = (state = redFiltDef, action) => {
  switch (action.type) {
    case "filter_text":
      return {...state, text: action.text};
    case "sort_by_amount":
      return {...state, sortBy: "amount"};
    case "sort_by_date":
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
    if (sortBy === "date") {
      return a.createdAt < b.createdAt ? 1 : -1;
    } else if (sortBy === "amount") {
      return a.amount < b.amount ? 1 : b.amount < a.amount ? -1 : 0;
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
  // console.log(store.getState());
  console.log(visibleExpenses);
});

const exp1 = store.dispatch(addExpense({description: "rent", amount: 100, createdAt: -21000}));
const exp2 = store.dispatch(addExpense({description: "coffee", amount: 300, createdAt: -1000}));
// store.dispatch(removeExpense({id: exp1.expense.id}));
// store.dispatch(editExpense(exp2.expense.id, {amount: 500, description: "croissant"}));

// store.dispatch(setTextFilter("f"));
// store.dispatch(setTextFilter());

store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

// store.dispatch(setStartDate(0));
// store.dispatch(setStartDate());

// store.dispatch(setEndDate(1250));

const demoState = {
  expenses: [{
    id: "aldkfjlaskdjf",
    description: "January rent",
    note: "This was the final payment for that address",
    amount: 54500,
    createdAt: 0
  }],
  filters: {
    text: "rent",
    sortBy: "amount",  // date or amount
    startDate: undefined,
    endDate: undefined
  }
};