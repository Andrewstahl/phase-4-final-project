import React, { useState } from "react";

function Habit({ userHabit, handleClick }) {

  return (
    <>
      <div className="user-habit-element-container">
        <p key={userHabit.id}>{userHabit.habit.name}</p>
        <span>
          {userHabit.amount} x {userHabit.frequency}
        </span>
        <button className="user-habit-edit-button" onClick={handleClick}>Edit Habit</button>
      </div>
    </>
  )
}

export default Habit;