// Persist state

// Lazy initialization while performing expensive initialisation

// BAD WAY
useState(window.localStorage.getItem("item") || initialState);
// this might be a performance issue that rerendering and fetching item from local storage

// BETTER WAY
function getInitialValue() {
  return window.localStorage.getItem("item") || initialState;
}
useState(getInitialValue);
// This will avoid unwanted re-renders. while assigning state to that initialvalue we do not need to fetch everytime from localstorage

// SHORTER WAY
useState(() => window.localStorage.getItem("item") || initialState);
