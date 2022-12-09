import React, { useState } from "react";
import LogForm from "./LogForm";
import moment from "moment";

export default function AddEditLog({
  user,
  userHabits,
  currentLog,
  fetchMethod,
  onSubmit,
  onCancel,
  onDelete,
}) {
  const [errors, setErrors] = useState([]);
  const [logData, setLogData] = useState(() => {
    if (currentLog !== undefined) {
      return {
        name: currentLog.own_habit.name,
        date: moment(currentLog.date).format("YYYY-MM-DD hh:mm"),
        amount: currentLog.amount,
      };
    } else {
      return {
        name: "",
        date: moment().format("YYYY-MM-DD hh:mm"),
        amount: 0,
      };
    }
  });
  const [textarea, setTextArea] = useState(() => {
    console.log(currentLog)
    return currentLog !== undefined ? currentLog.description : "";
  });

  console.log(textarea)

  function handleChange(e) {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    if (name === "description") {
      setTextArea(value);
    } else {
      setLogData({
        ...logData,
        [name]: value,
      });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);

    const logUrlEnding = fetchMethod === "POST" ? "" : `${currentLog.id}`;

    fetch(`/logs/${logUrlEnding}`, {
      method: fetchMethod,
      headers: {
        "CONTENT-TYPE": "application/json",
      },
      body: JSON.stringify({
        user_id: user.id,
        habit: logData.name,
        date: logData.date,
        amount: logData.amount,
        description: textarea,
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((logResponse) => onSubmit(logResponse));
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  function handleDelete(e) {
    e.preventDefault();
    setErrors([]);
    fetch(`/logs/${currentLog.id}`, {
      method: "DELETE",
      headers: {
        "CONTENT-TYPE": "application/json",
      },
    }).then((r) => onDelete(currentLog));
  }

  return (
    <LogForm
      userHabits={userHabits}
      logData={logData}
      textarea={textarea}
      currentLog={currentLog}
      errors={errors}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onCancel={onCancel}
      onDelete={handleDelete}
    />
  );
}
