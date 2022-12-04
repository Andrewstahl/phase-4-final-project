import React, { useState } from "react";
import Error from "../styles/Error";
import { useHistory } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast"

function Profile({ user }) {
  const [showUsernameForm, setShowUsernameForm] = useState(false)
  const [showPasswordForm, setShowPasswordForm] = useState(false)
  const [showDeleteForm, setShowDeleteForm] = useState(false)
  const [username, setUsername] = useState(user.username)
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")
  const [deleteConfirmation, setDeleteConfirmation] = useState("")
  const [errors, setErrors] = useState([])

  const history = useHistory()

  const successNotify = () => toast.success("Account Updated")
  const failureNotify = () => toast.error("Account Not Updated (see errors)")

  function handleSubmit(e) {
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
        successNotify()
        // history.push("/profile")
      } else {
        failureNotify()
        r.json().then((err) => setErrors(err.errors))
      } 
    })
  }
  // function handleSubmit(e) {
  //   e.preventDefault()
    
  //   fetch("/me", {
  //     method: "PATCH",
  //     headers: {
  //       "CONTENT-TYPE": "application/json"
  //     },
  //     body: JSON.stringify({username})
  //   }).then((r) => {
  //     if (r.ok) {
  //       history.push("/profile")
  //     } else {
  //       r.json().then((err) => setErrors(err.errors))
  //     } 
  //   })
  // }

  function hideAllForms() {
    setShowUsernameForm(false)
    setShowPasswordForm(false)
    setShowDeleteForm(false)
    setErrors([])
  }

  return (
    <>
      <Toaster />
      <div className="profile-settings-container">
        <button onClick={() => {
          hideAllForms()
          setShowUsernameForm(!showUsernameForm)
          setUsername(user.username)
        }}>Update Username</button>
        {showUsernameForm ? (
          <form onSubmit={handleSubmit}>
            <input 
              placeholder="Enter Username"
              name="username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)} 
            />
            <input type="submit" value="Submit" />
          </form>
        ) : null
        }
        <button onClick={() => {
          hideAllForms()
          setShowPasswordForm(!showPasswordForm)
        }}>Update Password</button>
        {showPasswordForm ? (
          <form onSubmit={handleSubmit}>
            <input 
              placeholder="Enter Password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
            />
            <input 
              placeholder="Confirm Password"
              name="passwordConfirmation"
              id="passwordConfirmation"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)} 
            />
            <input type="submit" value="Submit" />
          </form>
        ) : null
        }
        <button onClick={() => {
          hideAllForms()
          setShowDeleteForm(!showDeleteForm)
        }}>Delete Account</button>
        {showDeleteForm ? (
          <>
            <h2>Are You Sure? This Cannot Be Undone</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="deleteConfirmation">Type in "Delete" in the field below and press submit</label>
              <input 
                placeholder="Enter 'Delete' below to delete account"
                name="deleteConfirmation"
                id="deleteConfirmation"
                value={deleteConfirmation}
                onChange={(e) => setDeleteConfirmation(e.target.value)} 
              />
              <input type="submit" value="Submit" />
            </form>
          </>
        ) : null
        }
        {/* {errors.map((err) => console.log(err))} */}
        {errors.map((error) => (
          <Error key={error} error={error}></Error>
        ))}
      </div>
    </>
  )
}

export default Profile;