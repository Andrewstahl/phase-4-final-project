import React, { useState, useEffect } from "react";
import AddEditHabit from "../components/AddEditHabit";
// import styled from "styled-components";

function Habits({ user }) {
  const [habits, setHabits] = useState(user.habits)
  const [currentHabit, setCurrentHabit] = useState(undefined)
  const [fetchMethod, setFetchMethod] = useState("POST")
  const [showAddHabit, setShowAddHabit] = useState(false)

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
        <button onClick={() => {
          setCurrentHabit(habit)
          setFetchMethod("PATCH")
          setShowAddHabit(!showAddHabit)
        }}></button>
      </div>
    )
  })

  function handleAddHabit(habit) {
    console.log(habit)
  }
  
  return (
    <>
      {showAddHabit ?
        <AddEditHabit 
          currentHabit={currentHabit} 
          fetchMethod={fetchMethod} 
          onSubmit={handleAddHabit} 
          onCancel={() => setShowAddHabit(!showAddHabit)} 
        />
        :
        null
      }
      <div className="add-edit-button-div">
        <button className="add-edit-button" onClick={() => {
          setCurrentHabit(undefined)
          setFetchMethod("POST")
          setShowAddHabit(!showAddHabit)
        }}>Add New Habit</button>
      </div>
      <div className="habit-list-elements-div">
        {habitElements}
      </div>
    </>
  )
}

export default Habits;