/* 
    WHAT THIS FILE INCLUDES
  - how to get data from input with out state
*/

export function LoginForm({ onSubmit, buttonText }) {
  function handleSubmit(event) {
    event.preventDefault();
    const { username, password } = event.target.elements;

    onSubmit({
      username: username.value,
      password: password.value,
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <input id="username" />
      </div>
      <div>
        <button type="submit">{buttonText}</button>
      </div>
    </form>
  );
}
