import React, { useState } from "react";
import Error from "../styles/Error";

function SignUpForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState([]);

  function handleSubmit(e) {
    e.preventDefault()
    setErrors([])
    fetch("/signup", {
      method: "POST",
      headers: {
        "CONTENT-TYPE": "application/json"
      },
      body: JSON.stringify({
        username,
        password,
        password_confirmation: passwordConfirmation
      })
    }).then((r) => {
      if (r.ok) {
        r.json().then(user => onLogin(user))
      } else {
        r.json().then((err) => setErrors(err.errors))
      }
    })
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div>
        <h1>Sign Up Now</h1>
      </div>
      <div>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          autoComplete="off"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          autoComplete="off"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password-confirmation">Password Confirmation</label>
        <input
          type="password"
          id="password-confirmation"
          name="password-confirmation"
          autoComplete="off"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />
      </div>
      <div>
        <input type="submit" value="Submit" />
      </div>
      <div>
        {errors.map((err) => (
          <Error key={err} props={err}>{err}</Error>
        ))}
      </div>
    </form>
  )
}

export default SignUpForm;