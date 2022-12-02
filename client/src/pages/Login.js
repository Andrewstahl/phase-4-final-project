import "../assets/Login.css"
import React, { useState } from "react";
import styled from "styled-components";
import SignUpForm from "../components/SignUpForm";
import LoginForm from "../components/LoginForm";

function Login({ onLogin }) {
  const [showLogin, setShowLogin] = useState(true)

  return (
    <>
      {showLogin ? (
        <>
          <LoginForm onLogin={onLogin} />
          <div className="login__signup__switch__container">  
            <Divider />
            <p className="login__signup__switch__header">Don't Have an Account?</p>
            <button 
              className="login__signup__switch__button"
              onClick={() => setShowLogin(false)}
            >
              Signup
            </button>
          </div>
        </>
      ) : (
        <>
          <SignUpForm onLogin={onLogin} />
          <div className="login__signup__switch__container">
            <Divider />
            <p className="login__signup__switch__header">Already Have an Account?</p>
            <button 
              className="login__signup__switch__button"
              onClick={() => setShowLogin(true)}
            >
              Login
            </button>
          </div>
        </>
      )}
    </>
  )

}

const Divider = styled.hr`
  border-bottom: 1px solid grey;
  margin: 10px 0;
`;

export default Login;
