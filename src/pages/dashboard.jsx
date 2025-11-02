import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";

export default function Dashboard({ onLogout }) {
  const [notes, setNotes] = useState([]);
  const [noteText, setNoteText] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "notes"), (snapshot) => {
      setNotes(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const addNote = async () => {
    if (noteText.trim() === "") return;
    await addDoc(collection(db, "notes"), {
      text: noteText,
      createdAt: new Date(),
    });
    setNoteText("");
  };

  const deleteNote = async (id) => {
    await deleteDoc(doc(db, "notes", id));
  };

  return (
    <div
      style={{
        background: "linear-gradient(to right, #b3e5fc, #d0f0ec)",
        minHeight: "100vh",
        padding: "40px",
        textAlign: "center",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "30px", color: "#00796b", marginBottom: "20px" }}>
        🌿 CloudNotes App 💚
      </h1>

      <div style={{ marginBottom: "30px" }}>
        <textarea
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder="✍️ Write your thought here..."
          style={{
            width: "70%",
            height: "100px",
            padding: "15px",
            borderRadius: "12px",
            border: "2px solid #80cbc4",
            resize: "none",
            outline: "none",
            fontSize: "16px",
          }}
        ></textarea>
        <br />
        <button
          onClick={addNote}
          style={{
            marginTop: "15px",
            backgroundColor: "#4db6ac",
            color: "white",
            fontSize: "16px",
            border: "none",
            borderRadius: "10px",
            padding: "10px 25px",
            cursor: "pointer",
            transition: "0.3s",
          }}
        >
          ➕ Add Note
        </button>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "25px",
        }}
      >
        {notes.map((note) => (
          <div
            key={note.id}
            style={{
              width: "250px",
              backgroundColor: "white",
              borderRadius: "16px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              padding: "20px",
              textAlign: "left",
              position: "relative",
            }}
          >
            <p style={{ fontSize: "15px", color: "#333", marginBottom: "10px" }}>
              {note.text}
            </p>
            <button
              onClick={() => deleteNote(note.id)}
              style={{
                backgroundColor: "#ef5350",
                color: "white",
                border: "none",
                padding: "6px 12px",
                borderRadius: "8px",
                cursor: "pointer",
                position: "absolute",
                right: "15px",
                bottom: "15px",
              }}
            >
              🗑 Delete
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={() => auth.signOut().then(onLogout)}
        style={{
          marginTop: "40px",
          backgroundColor: "#ff7043",
          color: "white",
          fontSize: "16px",
          border: "none",
          borderRadius: "12px",
          padding: "10px 25px",
          cursor: "pointer",
        }}
      >
        🚪 Logout
      </button>
    </div>
  );
}
