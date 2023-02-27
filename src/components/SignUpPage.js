import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../config/firebase";

const SignUpPage = ({ isSignUp }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  const signUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(auth.currentUser, { displayName: userName });
      console.log(userCredential);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={`SignUpPage ${isSignUp ? "show" : ""}`}>
      <form onSubmit={signUp}>
        <h1 className="offscreen">Sign up</h1>
        <label className="offscreen" htmlFor="userName">
          User Name:
        </label>
        <input
          type="text"
          id="userName"
          placeholder="Enter your user name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <label className="offscreen" htmlFor="signUpEmail">
          Email:
        </label>
        <input
          type="email"
          id="signUpEmail"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="offscreen" htmlFor="signUpPassword">
          Password:
        </label>
        <input
          type="password"
          id="signUpPassword"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpPage;
