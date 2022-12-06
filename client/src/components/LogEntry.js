import React from "react";

function LogEntry({ log, handleClick }) {

  return (
    <>
      <div className="log-element-container">
        <h3 key={log.id} className="log-element-header">{log.own_habit.name}</h3>
        <p className="log-element-date">{log.date.split("T")[0]}</p>
        <p className="log-element-amount">{log.amount}</p>
        <p className="log-element-description">{log.description}</p>
        <button className="log-edit-button" onClick={handleClick}>Edit Log Entry</button>
      </div>
    </>
  )

}

export default LogEntry;