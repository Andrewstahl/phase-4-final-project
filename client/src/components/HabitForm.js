import React, { useState, useEffect, useCallback } from "react";
import Error from "../styles/Error";
import FormActionButtons from "./FormActionButtons";
import CreatableSelect from "react-select/creatable";

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
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState();

  useEffect(() => {
    fetch("/habits").then((r) => {
      if (r.ok) {
        r.json().then((habits) => {
          const habitOptions = habits.map((habit) => {
            return {
              value: habit.name.toLowerCase().replace(" ", "_"),
              label: habit.name,
            };
          });
          setOptions(habitOptions);
        });
      } else {
        r.json().then((errors) => console.error(errors));
      }
    });
  }, []);

  const handleSelectCreate = useCallback(
    (inputValue) => {
      const newValue = {
        value: inputValue.toLowerCase().replace(" ", "_"),
        label: inputValue,
      };
      setOptions([...options, newValue]);
      setValue(newValue);
      onChange(newValue);
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
        {currentUserHabit === undefined ? (
          <>
            <label htmlFor="name">Habit Name</label>
            <CreatableSelect
              isClearable
              isDisabled={isLoading}
              isLoading={isLoading}
              options={options}
              onChange={(e) => onChange(e)}
              onCreateOption={handleSelectCreate}
              value={value}
            />
          </>
        ) : null}
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
