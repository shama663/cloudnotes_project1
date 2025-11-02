import React from "react";

export default function NoteEditor({ value, onChange, onSave }) {
  return (
    <div className="note-editor">
      <textarea
        placeholder="Start typing your note..."
        value={value}
        onChange={onChange}
      ></textarea>
      <button onClick={onSave}>Save Note</button>
    </div>
  );
}
