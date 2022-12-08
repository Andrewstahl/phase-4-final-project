import React from "react";
import moment from "moment";

export default function LogEntry({ log, handleClick }) {
  return (
    <>
      <div className="log-element-container">
        <h2 key={log.id} className="log-element-header">
          {log.own_habit.name}
        </h2>
        <h4 className="log-element-date">{moment(log.date).format("MMM D YYYY, H:mm")}</h4>
        <p className="log-element-amount">Amount: {log.amount}</p>
        {log.description !== "" ? (
          <p className="log-element-description">Note: {log.description}</p>
        ) : null}
        <button className="log-edit-button" onClick={handleClick}>
          Edit Log Entry
        </button>
      </div>
    </>
  );
}
