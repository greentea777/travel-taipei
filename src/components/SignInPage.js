import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";

const SignInPage = ({ isSignIn, setIsLogInBox }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signIn = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setIsLogInBox(false);
      navigate("/");
    } catch (err) {
      console.log("You have not signed up yet!");
    }
  };

  return (
    <div className={`SignInPage ${isSignIn ? "show" : ""}`}>
      <form onSubmit={signIn}>
        <h1 className="offscreen">Sign in</h1>
        <label className="offscreen" htmlFor="email">
          Email:{" "}
        </label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="offscreen" htmlFor="password">
          Password:{" "}
        </label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Sign In</button>
      </form>
    </div>
  );
};

export default SignInPage;
