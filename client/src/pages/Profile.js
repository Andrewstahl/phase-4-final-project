import React, { useState } from "react";
import Error from "../styles/Error";
import toast, { Toaster } from "react-hot-toast"
import Login from "./Login";
import { useHistory, useRouteMatch } from "react-router-dom";

function Profile({ user }) {
  const [username, setUsername] = useState(user.username)
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")
  const [deleteConfirmation, setDeleteConfirmation] = useState("")
  const [errors, setErrors] = useState([])

  const successUsernameNotify = () => toast.success("Username has been updated!")
  const successPasswordNotify = () => toast.success("Password has been updated!")
  const successDeleteNotify = () => toast.success("Your account has been deleted! You will now be logged out.")
  const failureNotify = () => toast.error("Account Not Updated (see errors)")
  
  const history = useHistory()

  function handleUsernameSubmit(e) {
    e.preventDefault()
    setErrors([])
    
    fetch("/me", {
      method: "PATCH",
      headers: {
        "CONTENT-TYPE": "application/json"
      },
      body: JSON.stringify({username})
    }).then((r) => {
      if (r.ok) {
        successUsernameNotify()
        r.json().then((user) => setUsername(user.username))
      } else {
        r.json().then((err) => setErrors(err.errors))
      } 
    })
  }

  function handlePasswordSubmit(e) {
    e.preventDefault()
    setErrors([])

    if (password === "") {
      failureNotify()
      setErrors(["Password cannot be blank"])
    } else {
      fetch("/me", {
        method: "PATCH",
        headers: {
          "CONTENT-TYPE": "application/json"
        },
        body: JSON.stringify({
          password, 
          password_confirmation: passwordConfirmation
        })
      }).then((r) => {
        if (r.ok) {
          successPasswordNotify("Password has been updated!")
          setPassword("")
          setPasswordConfirmation("")
        } else {
          failureNotify()
          r.json().then((err) => setErrors(err.errors))
        } 
      })
    }

  }

  function handleDeleteSubmit(e) {
    e.preventDefault()
    setErrors([])
    if (deleteConfirmation.toLowerCase() !== "delete") {
      failureNotify()
      setErrors(["Please enter in 'Delete' into the text box and try again"])
    } else {
      fetch("/me", {
        method: "DELETE",
        headers: {
          "CONTENT-TYPE": "application/json"
        }
      }).then((r) => {
        if (r.ok) {
          successDeleteNotify()
          history('/')
          // return <Login />
          // fetch("/logout", {
          //   method: "DELETE",
          //   headers: {
          //     "CONTENT-TYPE": "application/json"
          //   }
          // }).then((r) => {return (<Login />)})
        } else {
          failureNotify()
          r.json().then((err) => setErrors(err.errors))
        } 
      })
    }
  }

  return (
    <>
      <Toaster />
      <div className="profile-change-container">
        <form className="profile-change-username" onSubmit={handleUsernameSubmit}>
          <label htmlFor="username">Enter New Username</label>
          <input 
            type="text"
            placeholder="Enter Username"
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)} 
          />
          <input type="submit" value="Change Username" />
        </form>
        <form className="profile-change-password" onSubmit={handlePasswordSubmit}>
          <input 
            type="password"
            placeholder="Enter Password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
          />
          <input 
            type="password"
            placeholder="Confirm Password"
            name="passwordConfirmation"
            id="passwordConfirmation"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)} 
          />
          <input type="submit" value="Change Password" />
        </form>
        <form className="profile-change-delete" onSubmit={handleDeleteSubmit}>
          <label htmlFor="deleteConfirmation">Type in "Delete" in the field below and press submit</label>
          <input 
            type="text"
            placeholder="Enter 'Delete' below to delete account"
            name="deleteConfirmation"
            id="deleteConfirmation"
            value={deleteConfirmation}
            onChange={(e) => setDeleteConfirmation(e.target.value)} 
          />
          <input className="delete-account" type="submit" value="Delete Account" />
        </form>
        {errors.map((error) => (
          <Error key={error} error={error}></Error>
        ))}
      </div>
    </>
  )
}

export default Profile;