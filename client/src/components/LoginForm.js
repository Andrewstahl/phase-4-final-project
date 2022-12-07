import React, { useState } from "react";
import Error from "../styles/Error";

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
    fetch("/login", {
      method: "POST",
      headers: {
        "CONTENT-TYPE": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => onLogin(user));
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <>
      <div>
        <h1 className="login-page-header">Login Now</h1>
      </div>
      <form onSubmit={(e) => handleSubmit(e)}>
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
        <div className="form__submit__div">
          <input type="submit" value="Submit" />
        </div>
        <div>
          {errors.map((error) => (
            <Error key={error} error={error}></Error>
          ))}
        </div>
      </form>
    </>
  );
}

export default LoginForm;
