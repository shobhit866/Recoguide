import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";
import "../styles/nav.css";

export default function Navbar() {

  async function logout() {
    await supabase.auth.signOut();
    window.location.href = "/login";
  }

  return (
    <header className="nav-wrap">
      <div className="nav-brand">
        <Link to="/">RecoGuide.in</Link>
      </div>

      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
        

        <button onClick={logout} className="logout-btn">Logout</button>
      </nav>
    </header>
  );
}
