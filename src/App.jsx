import React, { useState, useEffect } from "react";
import Login from "./pages/Login";
import Notes from "./pages/Notes";
import Trash from "./pages/Trash";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function App() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState("login");
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setNickname("CloudNotes App 💚");
        setView("notes");
      } else {
        setUser(null);
        setView("login");
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = (nick) => {
    setNickname(nick);
    setView("notes");
  };

  const handleLogout = async () => {
    await signOut(auth);
    alert("🩵 Logged out successfully 🌿");
  };

  if (view === "login") return <Login onLogin={handleLogin} />;
  if (view === "trash") return <Trash onBack={() => setView("notes")} />;

  return (
    <Notes
      nickname={nickname}
      onTrash={() => setView("trash")}
      onLogout={handleLogout}
    />
  );
}
