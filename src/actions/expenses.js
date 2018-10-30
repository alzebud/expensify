import uuid from "uuid";

export const addExpense = ({description = "", note = "", amount = 0, createdAt = 0} = {}) => ({
  type: "add_expense",
  expense: {id: uuid(), description, note, amount, createdAt}
});

export const removeExpense = ({id}) => ({type: "remove_expense", id});

export const editExpense = (id, updates) => ({type: "edit_expense", id, updates});
