import React from 'react';
import moment from "moment";
import {SingleDatePicker} from "react-dates";
import "react-dates/lib/css/_datepicker.css";

class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: props.expense ? props.expense.description : "",
      amount: props.expense ? (props.expense.amount / 100).toString() : "",
      note: props.expense ? props.expense.note : "",
      createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
      focused: false,
      error: ""
    };
  };
  onDescriptionChange = e => {
    const description = e.target.value;
    this.setState(() => ({description}));
  };
  onAmountChange = e => {
    const amount = e.target.value;
    if (!amount || amount.match(/^\d+(\.\d{0,2})?$/)) {
      this.setState(() => ({amount}));
    }
  };
  onNoteChange = e => {
    const note = e.target.value;
    this.setState(() => ({note}));
  };
  onDateChange = createdAt => {
    if (createdAt) {
      this.setState(() => ({createdAt}));
    }
  };
  onFocusChange = ({focused}) => {
    this.setState(() => ({focused}));
  };
  onSubmit = e => {
    e.preventDefault();
    if (!this.state.description || !this.state.amount) {
      this.setState(() => ({error: "Please provide both description & amount!"}));
    } else {
      this.setState(() => ({error: ""}));
      this.props.onSubmit({
        description: this.state.description,
        amount: parseFloat(this.state.amount, 10) * 100,
        createdAt: this.state.createdAt.valueOf(),
        note: this.state.note
      });
    }
  };
  render() { 
    return ( 
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            placeholder="description"
            autoFocus
            value={this.state.description}
            onChange={this.onDescriptionChange}
          />
          <input
            type="text"
            placeholder="amount"
            value={this.state.amount}
            onChange={this.onAmountChange}
          />
          <SingleDatePicker
            date={this.state.createdAt}
            onDateChange={this.onDateChange}
            focused={this.state.focused}
            onFocusChange={this.onFocusChange}
            numberOfMonths={1}
            isOutsideRange={() => false}
          />
          <textarea
            placeholder="add a note for your expense"
            value={this.state.note}
            onChange={this.onNoteChange}
          ></textarea>
          <button>add expense</button>
        </form>
      </div>
     );
  }
};
 
export default ExpenseForm;