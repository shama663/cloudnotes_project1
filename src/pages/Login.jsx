import React, { useState } from "react";
import { auth, provider } from "../firebase";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleAuth = async () => {
    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password);
        onLogin("CloudNotes 💚");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        onLogin("CloudNotes 💚");
      }
    } catch (err) {
      if (
        err.code === "auth/invalid-credential" ||
        err.code === "auth/wrong-password"
      ) {
        alert("⚠️ Incorrect email or password.");
      } else if (err.code === "auth/user-not-found") {
        alert("No user found. Try registering 🌸");
      } else {
        alert("Error: " + err.message);
      }
    }
  };

  const handleGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
      onLogin("CloudNotes 💚");
    } catch (err) {
      alert("Google Sign-in Error: " + err.message);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #b3e5fc, #f8bbd0)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "40px 60px",
          borderRadius: "18px",
          boxShadow: "0 6px 12px rgba(0,0,0,0.1)",
          textAlign: "center",
          width: "380px",
        }}
      >
        <h2
          style={{
            fontSize: "28px",
            color: "#00796b",
            marginBottom: "25px",
          }}
        >
          ☁️ CloudNotes App ☁️
        </h2>

        <input
          type="email"
          placeholder="📧 Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            borderRadius: "10px",
            border: "2px solid #b2dfdb",
            fontSize: "15px",
            outline: "none",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            border: "2px solid #b2dfdb",
            borderRadius: "10px",
            padding: "0 10px",
            marginBottom: "15px",
          }}
        >
          <input
            type={showPassword ? "text" : "password"}
            placeholder="🔑 Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              padding: "12px",
              fontSize: "15px",
            }}
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            style={{ cursor: "pointer" }}
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        <button
          onClick={handleAuth}
          style={{
            width: "100%",
            backgroundColor: "#4db6ac",
            color: "white",
            border: "none",
            borderRadius: "10px",
            padding: "12px",
            fontSize: "16px",
            cursor: "pointer",
            marginBottom: "10px",
          }}
        >
          {isRegister ? "Register" : "Login"}
        </button>

        <p style={{ fontSize: "14px", color: "#555", marginBottom: "20px" }}>
          {isRegister ? "Already registered?" : "New user?"}{" "}
          <span
            onClick={() => setIsRegister(!isRegister)}
            style={{
              color: "#00796b",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            {isRegister ? "Login here" : "Register here"}
          </span>
        </p>

        <button
          onClick={handleGoogle}
          style={{
            width: "100%",
            backgroundColor: "#ba68c8",
            color: "white",
            border: "none",
            borderRadius: "10px",
            padding: "12px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          🌐 Login with Google
        </button>
      </div>
    </div>
  );
}
