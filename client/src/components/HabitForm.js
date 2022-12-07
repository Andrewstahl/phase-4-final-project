import React, { useState, useCallback } from "react";
import Error from "../styles/Error";
import FormActionButtons from "./FormActionButtons";
import CreateableSelect from 'react-select/creatable';

export default function HabitForm({
  habitData,
  currentUserHabit,
  errors,
  onChange,
  onSubmit,
  onCancel,
  onDelete,
}) {
  
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState(
    fetch('/habits')
    .then(r => {
      if (r.ok) {

      } else {
        r.json().then(errors => console.error(errors))
      }
    })
  );
  const [value, setValue] = useState();

  const handleSelectChange = useCallback((inputValue) => setValue(inputValue), []);

  const handleSelectCreate = useCallback(
    (inputValue) => {
      const newValue = { value: inputValue.toLowerCase(), label: inputValue };
      setOptions([...options, newValue]);
      setValue(newValue);
    },
    [options]
  );

  return (
    <div className="add-edit-habit-container">
      <form className="add-edit-habit-form" onSubmit={onSubmit}>
        <label htmlFor="option">Option</label>
        <select
          name="option"
          id="option"
          value={habitData.option}
          onChange={(e) => onChange(e)}
          required
        >
          <option value="build">Build</option>
          <option value="break">Break</option>
        </select>
        <label htmlFor="name">Habit Name</label>
        <CreatableSelect
          isClearable
          isDisabled={isLoading}
          isLoading={isLoading}
          onChange={(newValue) => setValue(newValue)}
          onCreateOption={handleCreate}
          options={options}
          value={value}
        />
        {/* <input
          type="text"
          name="name"
          id="name"
          placeholder="Enter Habit Here"
          value={habitData.name}
          onChange={(e) => onChange(e)}
          required
        /> */}
        <label htmlFor="amount">Amount</label>
        <input
          type="number"
          minimum="0"
          name="amount"
          id="amount"
          placeholder="Enter Amount Here"
          value={habitData.amount}
          onChange={(e) => onChange(e)}
          required
        />
        <label htmlFor="frequency">Frequency (Every)</label>
        <select
          name="frequency"
          id="frequency"
          value={habitData.frequency}
          onChange={(e) => onChange(e)}
          required
        >
          <option default value="hour">
            Hour
          </option>
          <option value="day">Day</option>
          <option value="week">Week</option>
          <option value="month">Month</option>
          <option value="other">Other</option>
        </select>
        <div>
          <p>
            I want to {habitData.option} the habit of {habitData.name}{" "}
            {habitData.amount > 0 ? habitData.amount : 0}{" "}
            {habitData.amount == 1 ? "time" : "times"} every{" "}
            {habitData.frequency}
          </p>
        </div>
        <FormActionButtons
          currentElement={currentUserHabit}
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
