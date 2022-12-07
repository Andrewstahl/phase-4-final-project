import React from "react";
import Error from "../styles/Error";
import FormActionButtons from "./FormActionButtons";

export default function LogForm({
  user,
  logData,
  textarea,
  currentLog,
  errors,
  onChange,
  onSubmit,
  onCancel,
  onDelete,
}) {
  const habitOptions = user.user_habits.map((user_habit) => {
    return (
      <option key={user_habit.own_habit.id}>{user_habit.own_habit.name}</option>
    );
  });

  return (
    <div className="add-edit-log-container">
      <form className="add-edit-log-form" onSubmit={onSubmit}>
        <label htmlFor="name">Habit Name</label>
        <select
          name="name"
          id="name"
          placeholder="Enter Habit Here"
          value={logData.name}
          onChange={(e) => onChange(e)}
          required
        >
          <option default disabled>
            Select a Habit
          </option>
          {habitOptions}
        </select>
        <label htmlFor="amount">Amount</label>
        <input
          type="number"
          minimum="0"
          name="amount"
          id="amount"
          placeholder="Enter Amount Here"
          value={logData.amount}
          onChange={(e) => onChange(e)}
          required
        />
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="datetime-local"
          name="date"
          placeholder="Enter Date Here"
          value={logData.date}
          onChange={(e) => onChange(e)}
        />
        <label htmlFor="description">Add a Note</label>
        <textarea
          id="description"
          name="description"
          value={textarea}
          rows="3"
          onChange={(e) => onChange(e)}
        />

        <FormActionButtons
          currentElement={currentLog}
          onDelete={onDelete}
          onCancel={onCancel}
        />
        <div>
          {errors.map((error) => (
            <Error key={error} error={error}></Error>
          ))}
        </div>
      </form>
    </div>
  );
}
