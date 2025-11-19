import { useState } from "react";
import { supabase } from "../supabaseClient";
import "../styles/auth.css";


export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("male");
  const [error, setError] = useState("");

  async function handleSignup() {
    setError("");

    const { data, error: err } = await supabase.auth.signUp({ email, password });
    if (err) return setError(err.message);

    await supabase.from("profiles").insert({
      id: data.user.id,
      full_name: fullName,
      gender
    });

    alert("Signup successful!");
    window.location.href = "/login";
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Create Account</h1>
        <p className="sub">Join Diagnofy and understand your health better</p>

        <input value={fullName} onChange={(e)=>setFullName(e.target.value)} placeholder="Full Name" className="block" />
        
        <select value={gender} onChange={(e)=>setGender(e.target.value)} className="block">
          <option value="male" className="option">Male</option>
          <option value="female" className="option">Female</option>
        </select>

        <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" className="block" />
        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" className="block" />

        {error && <p className="error">{error}</p>}

        <button onClick={handleSignup}>Sign up</button>
        <p className="footer-text">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}
