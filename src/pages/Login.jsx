import { useState } from "react";
import { supabase } from "../supabaseClient";
import "../styles/auth.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setError("");
    setLoading(true);

    const { error: err } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (err) return setError(err.message);

    window.location.href = "/Home";
  }

  return (
    <div className="auth-page">
      <div className="auth-card fade-in">
        <h1>Welcome Back</h1>
        <p className="sub">Login to continue your health journey</p>

        <div className="input-group">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </div>

        <div className="input-group">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>

        {error && <p className="error">{error}</p>}

        <button
          onClick={handleLogin}
          className={loading ? "loading-btn" : ""}
          disabled={loading}
        >
          {loading ? "Signing in..." : "Login"}
        </button>

        <p className="footer-text">
          Don’t have an account? <a href="/signup">Create one</a>
        </p>
      </div>
    </div>
  );
}
