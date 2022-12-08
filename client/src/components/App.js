import { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "../pages/Login";
import NavBar from "./NavBar";
import Habits from "../pages/Habits";
import Profile from "../pages/Profile";
import Log from "../pages/Log";

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
 *      └─── Profile Settings
 */

function App() {
  const [user, setUser] = useState(null);
  const [userHabits, setUserHabits] = useState(null);

  useEffect(() => {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setUser(user);
          setUserHabits(user.user_habits);
        });
      }
    });
  }, []);

  function handleAddHabit(newUserHabit, fetchMethod) {
    if (fetchMethod === "POST") {
      setUserHabits([...userHabits, newUserHabit]);
    } else {
      const updatedUserHabits = userHabits.map((userHabit) => {
        if (userHabit.id === newUserHabit.id) {
          return newUserHabit;
        } else {
          return userHabit;
        }
      });
      setUserHabits(updatedUserHabits);
    }
  }

  function handleDelete(deletedUserHabit) {
    const updatedUserHabits = userHabits.filter(
      (userHabit) => userHabit.id !== deletedUserHabit.id
    );
    setUserHabits(updatedUserHabits);
  }

  if (!user) return <Login onLogin={setUser} />;

  return (
    <BrowserRouter>
      <NavBar setUser={setUser} />
      <main>
        <Switch>
          <Route exact path="/">
            <Habits
              user={user}
              userHabits={userHabits}
              onAddHabit={handleAddHabit}
              onDeleteHabit={handleDelete}
            />
          </Route>
          <Route exact path="/log">
            <Log user={user} userHabits={userHabits} />
          </Route>
          <Route exact path="/profile">
            <Profile user={user} setUser={setUser} />
          </Route>
        </Switch>
      </main>
    </BrowserRouter>
  );
}

export default App;
