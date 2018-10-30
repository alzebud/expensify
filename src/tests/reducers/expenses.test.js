import reducerExpenses from "../../reducers/expenses";
import expenses from "../fixtures/expenses";

test("should set default state", () => {
  const state = reducerExpenses(undefined, {type: "@@INIT"});
  expect(state).toEqual([]);
});

test("should remove expense by id", () => {
  const action = {type: "remove_expense", id: expenses[1].id};
  const state = reducerExpenses(expenses, action);
  expect(state).toEqual([expenses[0], expenses[2]]);
});

test("should not remove expenses if id not found", () => {
  const action = {type: "remove_expense", id: "-1"};
  const state = reducerExpenses(expenses, action);
  expect(state).toEqual(expenses);
});

test("should add an expense", () => {
  const expense = {
    id: "109",
    description: "laptop",
    note: "",
    createdAt: 20000,
    amount: 29500
  };
  const action = {
    type: "add_expense",
    expense
  };
  const state = reducerExpenses(expenses, action);
  expect(state).toEqual([...expenses, expense]);
});

test("should edit an expense", () => {
  const amount = 122000;
  const action = {
    type: "edit_expense",
    id: expenses[1].id,
    updates: {amount}
  };
  const state = reducerExpenses(expenses, action);
  expect(state[1].amount).toBe(amount);
});

test("should not edit an expense if id not found", () => {
  const amount = 122000;
  const action = {
    type: "edit_expense",
    id: "-1",
    updates: {amount}
  };
  const state = reducerExpenses(expenses, action);
  expect(state).toEqual(expenses);
});