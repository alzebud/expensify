import moment from "moment";
import reducerFilters from "../../reducers/filters";

test("should set up default filter values", () => {
  const state = reducerFilters(undefined, {type: "@@INIT"});
  expect(state).toEqual({
    text: "",
    sortBy: "date",
    startDate: moment().startOf("month"),
    endDate: moment().endOf("month")
  });
});

test("should set sortBy to amount", () => {
  const state = reducerFilters(undefined, {type: "sort_by_amount"});
  expect(state.sortBy).toBe("amount");
});

test("should set sortBy to date", () => {
  const currentState = {
    text: "",
    startDate: undefined,
    endDate: undefined,
    sortBy: "amount"
  };
  const action = {type: "sort_by_date"}
  const state = reducerFilters(currentState, action);
  expect(state.sortBy).toBe("date");
});

test("should set text filter", () => {
  const text = "this is my filter";
  const action = {type: "set_text_filter", text};
  const state = reducerFilters(undefined, action);
  expect(state.text).toBe(text);
});

test("should set start-date filter", () => {
  const date = moment();
  const action = {type: "set_start_date", date};
  const state = reducerFilters(undefined, action);
  expect(state.startDate).toEqual(date);
});

test("should set end-date filter", () => {
  const date = moment();
  const action = {type: "set_end_date", date};
  const state = reducerFilters(undefined, action);
  expect(state.endDate).toEqual(date);
});

