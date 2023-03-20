function createStore(reducer) {
  // The store contains of four parts
  // 1. The state
  // 2. Access the state
  // 3. Listen to changes on the state
  // 4. Update the state // Action will update the state
  // let state = reducer(0,{type:""});
  let state = 0;

  let listeners = [];
  const getState = () => state;
  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  };
  const dispatch = (action) => {
    // The the reducer we made for updating the state. (addTodo)
    console.log(action);
    state = reducer(state, action);
    // Inform all the listener that subscribed about the store update.
    listeners.forEach((listener) => listener());
  };
  return {
    getState,
    subscribe,
    dispatch,
  };
}

let store = Redux.createStore(reducer);

let step = 0;
let limit = 0;

let counter = store.getState();

let h1 = document.querySelector("h1");
h1.innerText = counter;

let increment = document.querySelector(".increment");
let decrement = document.querySelector(".decrement");
let reset = document.querySelector(".reset");

increment.addEventListener("click", () => {
  // counter = counter + 1;
  // h1.innerText = counter
  store.dispatch({ type: "increment", step: step });
});

decrement.addEventListener("click", () => {
  // counter = counter - 1;
  // h1.innerText = counter
  store.dispatch({ type: "decrement", step: step });
});
reset.addEventListener("click", () => {
  // counter = 0;
  // h1.innerText = counter
  store.dispatch({ type: "reset" });
});

store.subscribe(() => {
  counter = store.getState();
  h1.innerText = counter;
  // h1.innerText=counter<limit
});

function reducer(state = 0, action) {
  switch (action.type) {
    case "increment":
      return state + (action.step || 1);
    case "decrement":
      return state - (action.step || 1);
    case "reset":
      return 0;
    default:
      return state;
  }
}

let five = document.querySelector(".five");
let ten = document.querySelector(".ten");
let fifteen = document.querySelector(".fifteen");
let max1 = document.querySelector(".max1");
let max2 = document.querySelector(".max2");
let max3 = document.querySelector(".max3");

five.addEventListener("click", (event) => {
  console.log(event.target.innerText);
  step = Number(event.target.innerText);
});
ten.addEventListener("click", (event) => {
  console.log(event.target.innerText);
  step = Number(event.target.innerText);
});
fifteen.addEventListener("click", (event) => {
  console.log(event.target.innerText);
  step = Number(event.target.innerText);
});

max1.addEventListener("click", (event) => {
  console.log(event.target.innerText);
  limit = Number(event.target.innerText);
});
max2.addEventListener("click", (event) => {
  console.log(event.target.innerText);
  limit = Number(event.target.innerText);
});
max3.addEventListener("click", (event) => {
  console.log(event.target.innerText);
  limit = Number(event.target.innerText);
});
