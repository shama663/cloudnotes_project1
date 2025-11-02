import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import jsPDF from "jspdf";

export default function Notes({ onLogout, onTrash }) {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "notes"), (snapshot) => {
      setNotes(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, []);

  const addNote = async () => {
    if (text.trim() === "") return;
    await addDoc(collection(db, "notes"), { text, createdAt: new Date() });
    setText("");
  };

  const deleteNote = async (note) => {
    await setDoc(doc(db, "trash", note.id), note); // move to trash
    await deleteDoc(doc(db, "notes", note.id)); // remove from notes
  };

  const downloadPDF = (noteText) => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.text("CloudNotes 🩷", 10, 10);
    doc.setFont("helvetica", "normal");
    doc.text(noteText || "", 10, 20);
    doc.save("note.pdf");
  };

  return (
    <div
      style={{
        background: "linear-gradient(to right, #b3e5fc, #f8bbd0)",
        minHeight: "100vh",
        textAlign: "center",
        fontFamily: "Poppins, sans-serif",
        padding: "40px",
      }}
    >
      <h1 style={{ fontSize: "32px", color: "#00695c", marginBottom: "30px" }}>
        🌿 CloudNotes App 💚
      </h1>

      <div style={{ marginBottom: "25px" }}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="📝 Write something here..."
          style={{
            width: "70%",
            height: "100px",
            borderRadius: "14px",
            padding: "15px",
            border: "2px solid #80cbc4",
            resize: "none",
            outline: "none",
            fontSize: "16px",
            background: "#ffffffd9",
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
          gap: "35px",
        }}
      >
        {notes.map((note) => (
          <div
            key={note.id}
            style={{
              width: "260px",
              background: "#fff",
              borderRadius: "18px",
              boxShadow: "0 6px 12px rgba(0,0,0,0.1)",
              padding: "20px",
              textAlign: "left",
              position: "relative",
            }}
          >
            <p style={{ fontSize: "15px", color: "#333", marginBottom: "40px" }}>
              {note.text}
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                position: "absolute",
                bottom: "15px",
                width: "85%",
              }}
            >
              <button
                onClick={() => downloadPDF(note.text)}
                style={{
                  backgroundColor: "#ba68c8",
                  color: "white",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                📄 PDF
              </button>
              <button
                onClick={() => deleteNote(note)}
                style={{
                  backgroundColor: "#ef5350",
                  color: "white",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                🗑 Trash
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "50px", display: "flex", gap: "20px", justifyContent: "center" }}>
        <button
          onClick={onTrash}
          style={{
            backgroundColor: "#f48fb1",
            color: "white",
            fontSize: "16px",
            border: "none",
            borderRadius: "12px",
            padding: "10px 25px",
            cursor: "pointer",
          }}
        >
          🗂 View Trash
        </button>

        <button
          onClick={() => auth.signOut().then(onLogout)}
          style={{
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
    </div>
  );
}
