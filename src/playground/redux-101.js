import { createStore } from "redux";

const incrementCount = ({ incrBy = 1 } = {}) => ({
  type: "INCREMENT",
  incrBy
});

const decrementCount = ({ decrBy = 1 } = {}) => ({
  type: "DECREMENT",
  decrBy
});

const reset = () => ({ type: "RESET" });

const setCount = ({ count = 0 } = {}) => ({ type: "SET", count });

const store = createStore((state = { count: 0 }, action) => {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + action.incrBy };
    case "DECREMENT":
      const decrBy = typeof action.decrBy === "number" ? action.decrBy : 1;
      return { count: state.count - decrBy };
    case "SET":
      return { count: action.count };
    case "RESET":
      return { count: 0 };
    default:
      return state;
  }
});

const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(incrementCount({ incrBy: 5 }));

store.dispatch(incrementCount());

store.dispatch(reset());

store.dispatch(setCount({ count: 10 }));

store.dispatch(decrementCount({ decrBy: 13 }));

store.dispatch(decrementCount());
