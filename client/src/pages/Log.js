import React, { useState } from "react";
import AddEditLog from "../components/AddEditLog";
import LogEntry from "../components/LogEntry";
import "../assets/Log.css";

function Log({ user }) {
  const [logs, setLogs] = useState(user.logs);
  const [currentLog, setCurrentLog] = useState(undefined);
  const [fetchMethod, setFetchMethod] = useState("POST");
  const [showAddLog, setShowAddLog] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const logElements = Array.from(logs)
    .reverse()
    .map((log) => {
      return (
        <LogEntry
          key={log.id}
          log={log}
          handleClick={() => {
            setCurrentLog(log);
            setFetchMethod("PATCH");
            setShowAddLog(!showAddLog);
            setShowDelete(true);
          }}
        />
      );
    });

  function handleAddLog(newLog) {
    setShowAddLog(false);
    if (fetchMethod === "POST") {
      setLogs([...logs, newLog]);
    } else {
      const updatedLogs = logs.map((log) => {
        if (log.id === newLog.id) {
          return newLog;
        } else {
          return log;
        }
      });
      setLogs(updatedLogs);
    }
  }

  function handleDelete(deletedLog) {
    setShowAddLog(false);
    const updatedUserHabits = logs.filter((log) => log.id !== deletedLog.id);
    setLogs(updatedUserHabits);
  }

  return (
    <>
      <div className="add-edit-button-div">
        <button
          className="add-edit-button"
          onClick={() => {
            setCurrentLog(undefined);
            setFetchMethod("POST");
            setShowAddLog(!showAddLog);
            setShowDelete(false);
          }}
        >
          Add New Log Entry
        </button>
      </div>
      {showAddLog ? (
        <AddEditLog
          user={user}
          currentLog={currentLog}
          fetchMethod={fetchMethod}
          toggleDeleteButton={showDelete}
          onSubmit={handleAddLog}
          onCancel={() => setShowAddLog(!showAddLog)}
          onDelete={handleDelete}
        />
      ) : null}
      <div className="log-list-elements-div">{logElements}</div>
    </>
  );
}

export default Log;
