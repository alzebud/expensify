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

export default reducerExpenses;