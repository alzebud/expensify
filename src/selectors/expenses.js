import moment from "moment";

const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) => {
  return expenses.filter(exp => {
    const createdAtMoment = moment(exp.createdAt);
    const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, "day") : true;
    const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, "day"): true;
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

export default getVisibleExpenses;