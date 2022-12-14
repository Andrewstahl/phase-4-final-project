import React, { useState } from "react";
import AddEditHabit from "../components/AddEditHabit";
import Habit from "../components/Habit";
import "../assets/Habits.css";

export default function Habits({ user, userHabits, onAddHabit, onDeleteHabit }) {
  const [currentUserHabit, setCurrentUserHabit] = useState(undefined);
  const [fetchMethod, setFetchMethod] = useState("POST");
  const [showAddHabit, setShowAddHabit] = useState(false);

  const habitElements = Array.from(userHabits)
    .reverse()
    .map((userHabit) => {
      return (
        <Habit
          key={userHabit.id}
          userHabit={userHabit}
          handleClick={() => {
            setCurrentUserHabit(userHabit);
            setFetchMethod("PATCH");
            setShowAddHabit(!showAddHabit);
          }}
        />
      );
    });

  function handleAddHabit(newUserHabit) {
    setShowAddHabit(false);
    onAddHabit(newUserHabit, fetchMethod)
  }

  function handleDeleteHabit(deletedUserHabit) {
    setShowAddHabit(false);
    onDeleteHabit(deletedUserHabit)
  }

  return (
    <>
      <div className="add-edit-button-div">
        <button
          className="add-edit-button"
          onClick={() => {
            setCurrentUserHabit(undefined);
            setFetchMethod("POST");
            setShowAddHabit(!showAddHabit);
          }}
        >
          Add New Habit
        </button>
      </div>
      {showAddHabit ? (
        <AddEditHabit
          user={user}
          currentUserHabit={currentUserHabit}
          fetchMethod={fetchMethod}
          onSubmit={handleAddHabit}
          onCancel={() => setShowAddHabit(!showAddHabit)}
          onDelete={handleDeleteHabit}
        />
      ) : null}
      <div className="habit-list-elements-div">{habitElements}</div>
    </>
  );
}
