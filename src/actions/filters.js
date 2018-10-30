export const setTextFilter = (text = "") => ({type: "set_text_filter", text});

export const sortByAmount = () => ({type: "sort_by_amount"});

export const sortByDate = () => ({type: "sort_by_date"});

export const setStartDate = date => ({type: "set_start_date", date});

export const setEndDate = date => ({type: "set_end_date", date});