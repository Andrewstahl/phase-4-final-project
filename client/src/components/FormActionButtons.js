import React from "react";

export default function FormActionButtons({
  currentElement,
  onDelete,
  onCancel,
}) {
  return (
    <div className="form-action-buttons">
      <input type="submit" value="Submit" />
      {currentElement !== undefined ? (
        <button className="delete" onClick={(e) => onDelete(e)}>
          Delete
        </button>
      ) : null}
      <button className="cancel" onClick={onCancel}>
        Cancel
      </button>
    </div>
  );
}
