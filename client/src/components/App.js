import { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "../pages/Login";
import NavBar from "./NavBar";
import Habits from "../pages/Habits";

/**
 * App Hierarchy
 * 
 * App
 * ├─── Login Page
 *      ├─── Login
 *      ├─── Signup
 * ├─── Header
 * ├─── NavBar
 * ├─── Personal Habits
 *      ├─── Habit
 *      ├─── Habit
 *      └─── Habit
 * ├─── User Log
 *      ├─── Log Item
 *      ├─── Log Item
 *      └─── Log Item
 * └─── User Profile
 */

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user))
      }
    })
  }, []);

  if (!user) return <Login onLogin={setUser} />;

  return (
    <BrowserRouter>
      <NavBar setUser={setUser} />
      <main>
        <Switch>
          <Route exact path="/">
            <h1>Log Page</h1>
            <Habits user={user}/>
          </Route>
          <Route exact path="/log">
            <h1>Log Route</h1>
          </Route>
          <Route exact path="/profile">
            <h1>Profile Route</h1>
          </Route>
        </Switch>
      </main>
    </BrowserRouter>
  );
}

export default App;