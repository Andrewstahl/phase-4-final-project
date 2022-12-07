import React from "react";
import { NavLink } from "react-router-dom";
import "../assets/NavBar.css";

const linkStyles = {
  width: "100%",
  height: "10%",
  padding: ".5em",
  fontSize: "25px",
  textDecoration: "none",
  color: "white",
  fontWeight: "bold",
  textAlign: "center",
  alignItems: "center",
  verticalAlign: "center",
};

const linkStylesActive = {
  ...linkStyles,
  background: "white",
};

const navLinkStyles = {
  display: "flex",
  borderTop: "1px solid purple",
  borderBottom: "1px solid purple",
  backgroundColor: "rgb(84, 77, 184)",
  padding: "0px 100px",
};

function NavBar({ setUser }) {
  function handleLogoutClick() {
    fetch("/logout", {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
  }

  return (
    <div className="navbar-div">
      <div style={{ ...navLinkStyles }}>
        <NavLink
          to="/"
          exact
          style={({ isActive }) => (isActive ? linkStylesActive : linkStyles)}
        >
          Habits
        </NavLink>
        <NavLink
          to="/log"
          exact
          style={({ isActive }) => (isActive ? linkStylesActive : linkStyles)}
        >
          Daily Log
        </NavLink>
        <NavLink
          to="/profile"
          exact
          style={({ isActive }) => (isActive ? linkStylesActive : linkStyles)}
        >
          Profile
        </NavLink>
      </div>
      <button className="logout-button" onClick={handleLogoutClick}>
        Logout
      </button>
    </div>
  );
}

export default NavBar;
