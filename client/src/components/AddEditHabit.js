import React, { useState } from "react";
import HabitForm from "./HabitForm";

export default function AddEditHabit({
  user,
  currentUserHabit,
  fetchMethod,
  onSubmit,
  onCancel,
  onDelete,
}) {
  const [errors, setErrors] = useState([]);
  const [habitData, setHabitData] = useState(() => {
    if (currentUserHabit !== undefined) {
      return {
        name: currentUserHabit.own_habit.name,
        option: currentUserHabit.option,
        amount: currentUserHabit.amount,
        frequency: capitalizeEachWord(currentUserHabit.frequency),
      };
    } else {
      return {
        name: "",
        option: "build",
        amount: 0,
        frequency: "hour",
      };
    }
  });

  function handleChange(e) {
    if ("label" in e) {
      setHabitData({
        ...habitData,
        name: e.label,
      });
    } else {
      e.preventDefault();
      const name = e.target.name;
      const value = e.target.value;

      setHabitData({
        ...habitData,
        [name]: value,
      });
    }
  }

  function capitalizeEachWord(str) {
    const arr = str.split(" ");
    for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    return arr.join(" ");
  }

  function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);

    const userHabitUrlEnding =
      fetchMethod === "POST" ? "" : `${currentUserHabit.id}`;

    fetch(`/user_habits/${userHabitUrlEnding}`, {
      method: fetchMethod,
      headers: { "CONTENT-TYPE": "application/json" },
      body: JSON.stringify({
        user_id: user.id,
        habit: capitalizeEachWord(habitData.name),
        option: capitalizeEachWord(habitData.option),
        amount: parseInt(habitData.amount),
        frequency: capitalizeEachWord(habitData.frequency),
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((userHabitResponse) => onSubmit(userHabitResponse));
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  function handleDelete(e) {
    e.preventDefault();
    setErrors([]);
    fetch(`/user_habits/${currentUserHabit.id}`, {
      method: "DELETE",
      headers: {
        "CONTENT-TYPE": "application/json",
      },
    }).then((r) => onDelete(currentUserHabit));
  }

  return (
    <HabitForm
      habitData={habitData}
      currentUserHabit={currentUserHabit}
      errors={errors}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onCancel={onCancel}
      onDelete={handleDelete}
    />
  );
}
