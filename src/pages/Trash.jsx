import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";

export default function Trash({ onBack }) {
  const [trashNotes, setTrashNotes] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "trash"), (snapshot) => {
      setTrashNotes(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, []);

  const restoreNote = async (note) => {
    await setDoc(doc(db, "notes", note.id), note);
    await deleteDoc(doc(db, "trash", note.id));
  };

  const deleteForever = async (id) => {
    await deleteDoc(doc(db, "trash", id));
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
        🗑 Trash Bin 💚
      </h1>

      {trashNotes.length === 0 ? (
        <p style={{ fontSize: "18px", color: "#555" }}>No notes in trash 🌿</p>
      ) : (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "35px",
          }}
        >
          {trashNotes.map((note) => (
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
                  onClick={() => restoreNote(note)}
                  style={{
                    backgroundColor: "#81c784",
                    color: "white",
                    border: "none",
                    padding: "6px 12px",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >
                  🔄 Restore
                </button>

                <button
                  onClick={() => deleteForever(note.id)}
                  style={{
                    backgroundColor: "#e57373",
                    color: "white",
                    border: "none",
                    padding: "6px 12px",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >
                  ❌ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{ marginTop: "50px" }}>
        <button
          onClick={onBack}
          style={{
            backgroundColor: "#4db6ac",
            color: "white",
            fontSize: "16px",
            border: "none",
            borderRadius: "12px",
            padding: "10px 25px",
            cursor: "pointer",
          }}
        >
          ⬅ Back to Notes
        </button>
      </div>
    </div>
  );
}
