import React from "react";
import { NavLink } from "react-router-dom";
import "../assets/NavBar.css"

const linkStyles = {
  // display: "stretch",
  // alignContent: "center",
  width: "100%",
  height: "10%",
  padding: ".5em",
  fontSize: "20px",
  textDecoration: "none",
  color: "rgb(84, 77, 184)",
  fontWeight: "bold",
  textAlign: "center",
  alignItems: "center"
};

const linkStylesActive = {
  ...linkStyles,
  background: "white"
}

const navLinkStyles = {
  display: "flex",
  borderTop: "1px solid purple",
  borderBottom: "1px solid purple"
}

function NavBar({ setUser }) {

  function handleLogoutClick() {
    fetch("/logout", {
      method: "DELETE"
    })
    .then((r) => {
      if (r.ok) {
        setUser(null)
      }
    })
  }

  return (
    <div style={{ margin: "20px 400px" }}>
      <div style={{ ...navLinkStyles }}>
        <NavLink 
          to="/"
          exact
          style={({ isActive }) => (
            isActive ? linkStylesActive : linkStyles 
          )}
        >
          Habits
        </NavLink>
        <NavLink 
          to="/testing"
          exact
          style={({ isActive }) => (
            isActive ? linkStylesActive : linkStyles 
          )}
        >
          Books
        </NavLink>
        <NavLink 
          to="/reviews"
          exact
          style={({ isActive }) => (
            isActive ? linkStylesActive : linkStyles 
          )}
        >
          Reviews
        </NavLink>
        <button onClick={handleLogoutClick}>Logout</button>
      </div>
    </div>
  )
}

export default NavBar