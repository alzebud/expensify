import {addExpense, editExpense, removeExpense} from "../../actions/expenses";

test("should set up remove-expense action object", () => {
  const action = removeExpense({id: "123abc"});
  expect(action).toEqual({
    type: "remove_expense",
    id: "123abc"
  });
});

test("should set up edit-expense action object", () => {
  const action = editExpense("abc123", {note: "new note"});
  expect(action).toEqual({
    type: "edit_expense",
    id: "abc123",
    updates: {
      note: "new note"
    }
  });
});

test("should set up add-expense action object with provided values", () => {
  const expenseData = {
    description: "rent",
    amount: 109500,
    createdAt: 1000,
    note: "rent for last month"
  };
  const action = addExpense(expenseData);
  expect(action).toEqual({
    type: "add_expense",
    expense: {
      ...expenseData,
      id: expect.any(String)
    }
  });
});

test("should set up add-expense action object with default values", () => {
  const action = addExpense();
  expect(action).toEqual({
    type: "add_expense",
    expense: {
      description: "",
      note: "",
      amount: 0,
      createdAt: 0,
      id: expect.any(String)
    }
  });
});