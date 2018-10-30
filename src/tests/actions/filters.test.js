import moment from "moment";
import {setStartDate, setEndDate, setTextFilter, sortByAmount, sortByDate} from "../../actions/filters";

test("should generate set-start-date action object", () => {
  const action = setStartDate(moment(0));
  expect(action).toEqual({
    type: "set_start_date",
    date: moment(0)
  });
});

test("should generate set-end-date action object", () => {
  const action = setEndDate(moment(0));
  expect(action).toEqual({
    type: "set_end_date",
    date: moment(0)
  });
});

test("should generate set-text-filter object with text value", () => {
  const text = "something in";
  const action = setTextFilter(text);
  expect(action).toEqual({
    type: "set_text_filter",
    text
  });
});

test("should generate set-text-filter object with default", () => {
  const action = setTextFilter();
  expect(action).toEqual({
    type: "set_text_filter",
    text: ""
  });
});

test("should generate action object for sort by date", () => {
  expect(sortByDate()).toEqual({type: "sort_by_date"});
});

test("should generate action object for sort by amount", () => {
  expect(sortByAmount()).toEqual({type: "sort_by_amount"});
});


