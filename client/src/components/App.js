import { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "../pages/Login";

/**
 * App Hierarchy
 * 
 * App
 * ├─── Login Page
 *      ├─── Login
 *      ├─── Signup
 * ├─── Header
 * ├─── NavBar
 * ├─── User Home
 * └─── Habit
 *      ├─── Habit
 *      ├─── Habit
 *      └─── Habit
 * 
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
      <main>
        <Switch>
          <Route path="/testing">
            <h1>Test Route</h1>
          </Route>
          <Route path="/">
            {/* <h1>Page Count: {count}</h1> */}
            <h1>Welcome, {user.username}</h1>
          </Route>
        </Switch>
      </main>
    </BrowserRouter>
  );
}

export default App;