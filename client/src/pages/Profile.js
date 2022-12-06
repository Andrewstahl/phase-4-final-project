import React, { useState } from "react";
import Error from "../styles/Error";
import toast, { Toaster } from "react-hot-toast"
import Login from "./Login";

function Profile({ user }) {
  const [username, setUsername] = useState(user.username)
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")
  const [deleteConfirmation, setDeleteConfirmation] = useState("")
  const [errors, setErrors] = useState([])

  const successNotify = () => toast.success("Account Updated")
  const failureNotify = () => toast.error("Account Not Updated (see errors)")

  function handleUsernameSubmit(e) {
    e.preventDefault()
    
    fetch("/me", {
      method: "PATCH",
      headers: {
        "CONTENT-TYPE": "application/json"
      },
      body: JSON.stringify({username})
    }).then((r) => {
      if (r.ok) {
        successNotify("Username has been updated")
        setUsername("")
      } else {
        r.json().then((err) => setErrors(err.errors))
      } 
    })
  }

  function handlePasswordSubmit(e) {
    e.preventDefault()
    setErrors([])
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
        successNotify("Password has been updated!")
        setPassword("")
        setPasswordConfirmation("")
      } else {
        failureNotify("Password has not been update")
        r.json().then((err) => setErrors(err.errors))
      } 
    })
  }

  function handleDeleteSubmit(e) {
    e.preventDefault()
    setErrors([])
    if (deleteConfirmation.toLowerCase() !== "delete") {
      failureNotify("Please enter the word 'Delete' into the delete box and try again")
    } else {
      fetch("/me", {
        method: "DELETE",
        headers: {
          "CONTENT-TYPE": "application/json"
        }
      }).then((r) => {
        if (r.ok) {
          successNotify("Account has been deleted!")
          fetch("/logout", {
            method: "DELETE",
            headers: {
              "CONTENT-TYPE": "application/json"
            }
          }).then((r) => <Login />)
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