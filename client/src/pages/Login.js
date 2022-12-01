import React, { useState } from "react";
import SignUpForm from "../components/SignUpForm";

function Login({ onLogin }) {
  const [showLogin, setShowLogin] = useState(true)

  return (
    <>
      {showLogin ? (
        <>
          <h1>Login Form Placeholder</h1>
        </>
      ) : (
        <>
        
        </>
      )}
    </>
  )

}
