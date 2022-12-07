import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import ProfileForm from "../components/ProfileForm";

export default function Profile({ user, setUser }) {
  const [userData, setUserData] = useState({
    username: user.username,
    password: "",
    passwordConfirmation: "",
  });

  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const [errors, setErrors] = useState([]);

  const successUsernameNotify = () =>
    toast.success("Username has been updated!");
  const successPasswordNotify = () =>
    toast.success("Password has been updated!");
  const successDeleteNotify = () =>
    toast.success("Your account has been deleted! You will now be logged out.");
  const failureNotify = () => toast.error("Account Not Updated (see errors)");

  function handleChange(e) {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    if (name === "deleteConfirmation") {
      setDeleteConfirmation(value);
    } else {
      setUserData({
        ...userData,
        [name]: value,
      });
    }
  }

  function handleUsernameSubmit(e) {
    e.preventDefault();
    setErrors([]);

    fetch("/me", {
      method: "PATCH",
      headers: {
        "CONTENT-TYPE": "application/json",
      },
      body: JSON.stringify({
        username: userData.username,
      }),
    }).then((r) => {
      if (r.ok) {
        successUsernameNotify();
        r.json().then((user) =>
          setUserData({ ...userData, username: user.username })
        );
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  function handlePasswordSubmit(e) {
    e.preventDefault();
    setErrors([]);

    if (userData.password === "") {
      failureNotify();
      setErrors(["Password cannot be blank"]);
    } else {
      fetch("/me", {
        method: "PATCH",
        headers: {
          "CONTENT-TYPE": "application/json",
        },
        body: JSON.stringify({
          password: userData.password,
          password_confirmation: userData.passwordConfirmation,
        }),
      }).then((r) => {
        if (r.ok) {
          successPasswordNotify("Password has been updated!");
          setUserData({
            ...userData,
            password: "",
            passwordConfirmation: "",
          });
        } else {
          failureNotify();
          r.json().then((err) => setErrors(err.errors));
        }
      });
    }
  }

  function handleDeleteSubmit(e) {
    e.preventDefault();
    setErrors([]);
    if (deleteConfirmation.toLowerCase() !== "delete") {
      failureNotify();
      setErrors(["Please enter in 'Delete' into the text box and try again"]);
    } else {
      fetch("/me", {
        method: "DELETE",
        headers: {
          "CONTENT-TYPE": "application/json",
        },
      }).then((r) => {
        if (r.ok) {
          successDeleteNotify();
          fetch("/logout", {
            method: "DELETE",
          }).then((r) => {
            if (r.ok) {
              setUser(null);
            }
          });
        } else {
          failureNotify();
          r.json().then((err) => setErrors(err.errors));
        }
      });
    }
  }

  return (
    <>
      <Toaster />
      <ProfileForm
        userData={userData}
        deleteConfirmation={deleteConfirmation}
        errors={errors}
        onChange={handleChange}
        onUsernameSubmit={handleUsernameSubmit}
        onPasswordSubmit={handlePasswordSubmit}
        onDelete={handleDeleteSubmit}
      />
    </>
  );
}
