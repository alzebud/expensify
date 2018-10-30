import moment from "moment";

const reducerFilters = (state, action) => {
  state = state || {text: "", sortBy: "date", startDate: moment().startOf("month"), endDate: moment().endOf("month")};
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

// const reducerFilters = (state = {text: "", sortBy: "date", startDate: undefined, endDate: undefined}, action) => {
//   switch (action.type) {
//     case "set_text_filter":
//       return {...state, text: action.text};
//     case "sort_by_amount":
//     // console.log("sorting by amount");
//     return {...state, sortBy: "amount"};
//     case "sort_by_date":
//     // console.log("sorting by date");
//       return {...state, sortBy: "date"};
//     case "set_start_date":
//       return {...state, startDate: action.date};
//     case "set_end_date":
//       return {...state, endDate: action.date};
//     default:
//       return state;
//   }
// };

export default reducerFilters;