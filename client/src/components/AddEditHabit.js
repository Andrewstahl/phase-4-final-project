import React, { useCallback, useEffect, useState } from "react";

function AddEditHabit({ currentHabit, fetchMethod, onSubmit, onCancel }) {
  const [errors, setErrors] = useState([])
  const [habitData, setHabitData] = useState(() => {
    if (currentHabit !== undefined)  {
      return ({
        name: currentHabit.name,
        option: currentHabit.option
      })
    } else {
      return ({
        name: "",
        option: ""
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

  function handleSubmit(e) {
    e.preventDefault()
    console.log(habitData, fetchMethod)
    
    // fetch("/habits", {
    //   method: fetchMethod,
    //   headers: {
    //     "CONTENT-TYPE": "application/json"
    //   },
    //   body: JSON.stringify({
    //     ...habitData
    //   })
    // })
    // .then((r) => {
    //   if (r.ok) {
    //     r.json().then((habitResponse => {
    //       console.log(habitResponse)
    //       // fetch("/habits", {
    //       //   method: fetchMethod,
    //       //   headers: {
    //       //     "CONTENT-TYPE": "application/json"
    //       //   },
    //       //   body: JSON.stringify({
    //       //     ...habitData
    //       //   })
    //       // })
    //     }))
    //   } else {
    //     r.json().then((err) => setErrors(err.errors));
    //   }
    // })
    // .then(data => onSubmit(data))
  }

  return (
    <div className="add-edit-habit-container">
      <form onSubmit={handleSubmit}>
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
          value={habitData.name}
          onChange={(e) => handleChange(e)}
          required
        />
        <div className="form-action-buttons">
          <input type="submit" value="Submit" />
          <button className="cancel" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>    
  )
}

export default AddEditHabit