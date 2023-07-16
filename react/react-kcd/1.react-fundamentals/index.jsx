// FORMS

// to get value from Input without state
function handleSubmit(event) {
  // In side onSubmit of form pass this function
  event.preventDefault(); // avoid reload after form submit
  const value = event.traget.elements.usernameInput.value;
  // pass the id/name of input after elements.
  const { username, password } = event.target.elements;
  // in this way it should be an id of that input and access value via username.value
}
// (e.g) <input type="text" id="usernameInput" />
