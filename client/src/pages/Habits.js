import React, { useState } from "react";
import AddEditHabit from "../components/AddEditHabit";
// import styled from "styled-components";
import "../assets/index.css"
import Habit from "../components/Habit";

function Habits({ user }) {
  const [userHabits, setUserHabits] = useState(user.user_habits)
  const [currentUserHabit, setCurrentUserHabit] = useState(undefined)
  const [fetchMethod, setFetchMethod] = useState("POST")
  const [showAddHabit, setShowAddHabit] = useState(false)
  const [showDelete, setShowDelete] = useState(false)

  const habitElements = userHabits.map(userHabit => {
    return <Habit key={userHabit.id} userHabit={userHabit} handleClick={() => {
      setCurrentUserHabit(userHabit)
      setFetchMethod("PATCH")
      setShowAddHabit(!showAddHabit)
      setShowDelete(true)
    }}/>
  })

  function handleAddHabit(newUserHabit) {
    setShowAddHabit(false)
    if (fetchMethod === "POST") {
      setUserHabits([...userHabits, newUserHabit])
    } else {
      const updatedUserHabits = userHabits.map(userHabit => {
        if (userHabit.id === newUserHabit.id) {
          return newUserHabit
        } else {
          return userHabit
        }
      })
      setUserHabits(updatedUserHabits)
    }
  }

  function handleDelete(deletedUserHabit) {
    setShowAddHabit(false)
    const updatedUserHabits = userHabits.filter(userHabit => userHabit.id !== deletedUserHabit.id)
    setUserHabits(updatedUserHabits)
  }
  
  return (
    <>
      <div className="add-edit-button-div">
        <button className="add-edit-button" onClick={() => {
          setCurrentUserHabit(undefined)
          setFetchMethod("POST")
          setShowAddHabit(!showAddHabit)
          setShowDelete(false)
        }}
        >
          Add New Habit
        </button>
      </div>
      {showAddHabit ?
        <AddEditHabit 
          user={user}  
          currentUserHabit={currentUserHabit} 
          fetchMethod={fetchMethod} 
          toggleDeleteButton={showDelete}
          onSubmit={handleAddHabit} 
          onCancel={() => setShowAddHabit(!showAddHabit)}
          onDelete={handleDelete}
        />
        :
        null
      }
      <div className="habit-list-elements-div">
        {habitElements}
      </div>
    </>
  )
}

export default Habits;