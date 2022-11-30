import { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import SignUpForm from "../pages/SignUpForm";

/**
 * App Hierarchy
 * 
 * App
 * ├─── Login Page
 * ├─── Signup Page
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

  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch("/hello")
      .then((r) => r.json())
      .then((data) => setCount(data.count));
  }, []);

  if (!user) return <SignUpForm />;

  return (
    // <BrowserRouter>
      <main>
        <Switch>
          <Route path="/testing">
            <h1>Test Route</h1>
          </Route>
          <Route path="/">
            <h1>Page Count: {count}</h1>
          </Route>
        </Switch>
      </main>
    // {/* </BrowserRouter> */}
  );
}

export default App;