import React, { useCallback, useEffect, useState } from "react";
import Error from "../styles/Error";

function AddEditHabit({ user, currentHabit, fetchMethod, toggleDeleteButton, onSubmit, onCancel, onDelete }) {
  // const [showDelete, setShowDelete] = useState(toggleDeleteButton)
  const [errors, setErrors] = useState([])
  const [habitData, setHabitData] = useState(() => {
    if (currentHabit !== undefined)  {
      return ({
        name: currentHabit.habit.name,
        option: currentHabit.option,
        amount: currentHabit.amount,
        frequency: currentHabit.frequency
      })
    } else {
      return ({
        name: "",
        option: "build",
        amount: 0,
        frequency: "hour"
      })
    }
  })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  function handleChange(e) {
    e.preventDefault()
    const name = e.target.name;
    const value = e.target.value;
    
    setHabitData({
      ...habitData,
      [name]: value
    })
  }

  function capitalizeEachWord(str) {
    const arr = str.split(" ");
    for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    return arr.join(" ")
  }

  function handleSubmit(e) {
    e.preventDefault()
    setErrors([])
    
    fetch("/habits", {
      method: fetchMethod,
      headers: {
        "CONTENT-TYPE": "application/json"
      },
      body: JSON.stringify({
        name: capitalizeEachWord(habitData.name)
      })
    })
    .then((r) => {
      if (r.ok) {
        r.json().then((habitResponse => {
          console.log("Habit Response", habitResponse, fetchMethod)
          // console.log({
          //   user_id: user.id,
          //   habit_id: habitResponse.id,
          //   option: capitalizeEachWord(habitData.option), 
          //   amount: parseInt(habitData.amount),
          //   frequency: capitalizeEachWord(habitData.frequency)
          // })
          fetch("/user_habits", {
            method: fetchMethod,
            headers: {"CONTENT-TYPE": "application/json"},
            body: JSON.stringify({
              user_id: user.id,
              habit_id: habitResponse.id,
              option: capitalizeEachWord(habitData.option), 
              amount: parseInt(habitData.amount),
              frequency: capitalizeEachWord(habitData.frequency)
            })
          })
          .then((r) => {
            if (r.ok) {
              r.json().then((userHabitResponse) => console.log("New habit created", userHabitResponse))
            } else {
              r.json().then((err) => console.error(err.errors));
            }
          })
        }))
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    })
    .then(newUserHabit => onSubmit(newUserHabit))
  }

  function handleDelete(e) {
    e.preventDefault()
    setErrors([])
    fetch(`/user_habits/${currentHabit.id}`, {
      method: "DELETE",
      headers: {
        "CONTENT-TYPE": "application/json"
      }
    })
    .then((r) => onDelete(currentHabit))
  }

  return (
    <div className="add-edit-habit-container">
      <form className="add-edit-habit-form" onSubmit={handleSubmit}>
        <label htmlFor="option">Option</label>
        <select 
          name="option" 
          id="option" 
          value={habitData.option} 
          onChange={(e) => handleChange(e)}
          required
        >
          <option value="build">Build</option>
          <option value="break">Break</option>
        </select>
        <label htmlFor="name">Habit</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Enter Habit Here"
          value={habitData.name}
          onChange={(e) => handleChange(e)}
          required
        />
        <label htmlFor="amount">Amount</label>
        <input
          type="number"
          minimum="0"
          name="amount"
          id="amount"
          placeholder="Enter Amount Here"
          value={habitData.amount}
          onChange={(e) => handleChange(e)}
          required
        />
        <label htmlFor="frequency">Frequency (Every)</label>
        <select 
          name="frequency" 
          id="frequency" 
          value={habitData.frequency} 
          onChange={(e) => handleChange(e)}
          required
        >
          <option selected value="hour">Hour</option>
          <option value="day">Day</option>
          <option value="week">Week</option>
          <option value="month">Month</option>
          <option value="other">Other</option>
        </select>
        <div>
          <p>I want to {habitData.option} the habit of {habitData.name} {habitData.amount > 0 ? habitData.amount : 0} {habitData.amount == 1 ? "time" : "times"} every {habitData.frequency}</p>
        </div>
        <div className="form-action-buttons">
          <input type="submit" value="Submit" />
          {toggleDeleteButton ? (
            <button className="delete" onClick={(e) => handleDelete(e)}>Delete</button>
          ) : null
        }
        <button className="cancel" onClick={onCancel}>Cancel</button>
        </div>
        <div>
        {errors.map((error) => (
          <Error key={error} error={error}></Error>
        ))}
      </div>
      </form>
    </div>    
  )
}

export default AddEditHabit