import React from "react";

function Habit({ userHabit, handleClick }) {
  return (
    <>
      <div className="user-habit-element-container">
        <h2 className="user-habit-name" key={userHabit.id}>
          [{userHabit.option}] {userHabit.own_habit.name}
        </h2>
        <p className="user-habit-amount-frequency">
          {userHabit.amount} x {userHabit.frequency}
        </p>
        <button className="user-habit-edit-button" onClick={handleClick}>
          Edit Habit
        </button>
      </div>
    </>
  );
}

export default Habit;
