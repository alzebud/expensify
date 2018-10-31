import React from 'react';
import {connect} from "react-redux";
import numeral from "numeral";
import selectExpenses from "../selectors/expenses";
import selectExpensesTotal from "../selectors/expenses-total";

export const ExpenseSummary = ({expenseCount, expenseTotal}) => {
  return (
    <div>
      <h1>Viewing {expenseCount} expense{expenseCount === 1 ? "" : "s"} totaling {numeral(expenseTotal/100).format("$0,0.00")}</h1>
    </div>
  );
};

const mapStateToProps = state => {
  const visibleExpenses = selectExpenses(state.expenses, state.filters);
  return {
    expenseCount: visibleExpenses.length,
    expenseTotal: selectExpensesTotal(visibleExpenses)
  }
};

export default connect(mapStateToProps)(ExpenseSummary);