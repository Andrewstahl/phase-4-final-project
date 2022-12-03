import React, { useState, useEffect } from "react";
// import styled from "styled-components";

function Habits({ user }) {
  const [habits, setHabits] = useState(user.habits)
  // const [showAddHabit, setShowAddHabit] = useState(false)

  // useEffect(() => {
  //   fetch("/users")
  //     .then(r => r.json())
  //     .then(user => setHabits(user.habits))
  // }, [])

  const habitElements = habits.map(habit => {
    return (
      <div className="habit-element-container">
        <p key={habit.id}>{habit.name}</p>
        <span>{habit.option}</span>
      </div>
    )
  })
  
  return (
    <>
      {/* {showAddHabit ?
        <AddEditHabit 
          currentHabit={undefined} 
          fetchMethod={"POST"} 
          onSubmit={handleAddHabit} 
          onCancel={() => setShowAddHabit(!showAddHabit)} 
        />
        :
        null
      }
      <div className="add-edit-button-div">
        <button className="add-edit-button" onClick={() => setShowAddHabit(!showAddHabit)}>Add New Habit</button>
      </div> */}
      <div className="habit-list-elements-div">
        {habitElements}
      </div>
    </>
  )
}

export default Habits;