import React, { useEffect, useState } from "react";
import Error from "../styles/Error";
import moment from "moment"

function AddEditLog({ user, currentLog, fetchMethod, toggleDeleteButton, onSubmit, onCancel, onDelete }) {
  const [errors, setErrors] = useState([])
  const [logData, setLogData] = useState(() => {
    if (currentLog !== undefined)  {
      return ({
        name: currentLog.own_habit.name,
        date: moment(currentLog.date).format("YYYY-MM-DD hh:mm"),
        amount: currentLog.amount,
      })
    } else {
      return ({
        name: "",
        date: moment().format("YYYY-MM-DD hh:mm"),
        amount: 0,
      })
    }
  })
  const [textarea, setTextArea] = useState(() => {
    return currentLog !== undefined ? currentLog.description : ""
  })

  const habitOptions = user.user_habits.map(user_habit => {
    return <option key={user_habit.own_habit.id}>{user_habit.own_habit.name}</option>
  })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  function handleChange(e) {
    console.log(e.target.value)
    e.preventDefault()
    const name = e.target.name;
    const value = e.target.value;
    if (name === "description") {
      setTextArea(value)
    } else {
      setLogData({
        ...logData,
        [name]: value
      })
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    setErrors([])

    const logUrlEnding = fetchMethod === "POST" ? "" : `${currentLog.id}`

    fetch(`/logs/${logUrlEnding}`, {
      method: fetchMethod,
      headers: {
        "CONTENT-TYPE": "application/json"
      },
      body: JSON.stringify({
        user_id: user.id,
        habit: logData.name,
        date: logData.date,
        amount: logData.amount,
        description: textarea
      })
    })
    .then((r) => {
      if (r.ok) {
        r.json().then((logResponse) => onSubmit(logResponse))
      } else {
        r.json().then((err) => setErrors(err.errors))
      }
    })
  }  

  function handleDelete(e) {
    e.preventDefault()
    setErrors([])
    fetch(`/logs/${currentLog.id}`, {
      method: "DELETE",
      headers: {
        "CONTENT-TYPE": "application/json"
      }
    })
    .then((r) => onDelete(currentLog))
  }

  return (
    <div className="add-edit-log-container">
      <form className="add-edit-log-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Habit Name</label>
        <select
          name="name"
          id="name"
          placeholder="Enter Habit Here"
          value={logData.name}
          onChange={(e) => handleChange(e)}
          required
        >
          {habitOptions}
        </select>
        <label htmlFor="amount">Amount</label>
        <input
          type="number"
          minimum="0"
          name="amount"
          id="amount"
          placeholder="Enter Amount Here"
          value={logData.amount}
          onChange={(e) => handleChange(e)}
          required
        />
        <label htmlFor="date">Date</label>
        <input 
          id="date" 
          type="datetime-local" 
          name="date" 
          placeholder="Enter Date Here" 
          value={logData.date}
          onChange={(e) => handleChange(e)}
        />
        <label htmlFor="description">Add a Note</label>
        <textarea id="description" name="description" value={textarea} rows="3" onChange={(e) => handleChange(e)}/>
        
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

export default AddEditLog