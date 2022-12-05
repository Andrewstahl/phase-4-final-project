import React, { useState, useEffect } from "react";
import AddEditHabit from "../components/AddEditHabit";
// import styled from "styled-components";

function Habits({ user }) {
  const [userHabits, setUserHabits] = useState(user.user_habits)
  const [currentHabit, setCurrentHabit] = useState(undefined)
  const [fetchMethod, setFetchMethod] = useState("POST")
  const [showAddHabit, setShowAddHabit] = useState(false)

  // useEffect(() => {
  //   fetch("/users")
  //     .then(r => r.json())
  //     .then(user => setHabits(user.habits))
  // }, [])

  const habitElements = userHabits.map(userHabit => {
    return (
      <div className="user-habit-element-container">
        <p key={userHabit.id}>{userHabit.habit.name}</p>
        <span>{userHabit.option}</span>
        <button onClick={() => {
          setCurrentHabit(userHabit.habit)
          setFetchMethod("PATCH")
          setShowAddHabit(!showAddHabit)
        }}></button>
      </div>
    )
  })

  function handleAddHabit(habit) {
    // console.log(habit)
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