import React, { useState } from "react";

function SignUpForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState([]);

  return (
    <form >
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
        <button type="submit">Submit</button>
      </div>
      <div>
        {errors.map((err) => (
          <>
            <span>!</span>
            <p>{err}</p>
          </>
        ))}
      </div>
    </form>
  )
}

export default SignUpForm;