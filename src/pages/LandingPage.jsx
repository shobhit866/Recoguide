import "../styles/LandingPage.css";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="landing-wrap">

      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Your Health, Made Simple</h1>
          <p className="hero-subtitle">
            Recoguide uses AI to instantly analyze your medical lab reports and give
            clear explanations, diet plans, and health insights — in seconds.
          </p>

          <div className="hero-buttons">
            <Link to="/home" className="btn primary hero-btn">
              Upload Report
            </Link>
            <a href="#features" className="btn ghost hero-btn">
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="features-section">
        <h2 className="section-title">Why Choose Recoguide?</h2>

        <div className="features-grid">

          <div className="feature-card">
            <h3>AI-Powered Parsing</h3>
            <p>Reads ANY report format — PDF, Image, Handwritten scans — with high accuracy.</p>
          </div>

          <div className="feature-card">
            <h3>Clear Explanations</h3>
            <p>Simple Hinglish explanations of your health condition. No medical jargon.</p>
          </div>

          <div className="feature-card">
            <h3>Diet & Lifestyle Plan</h3>
            <p>Personalized diet suggestions based on your abnormal values.</p>
          </div>

          <div className="feature-card">
            <h3>Track Your Health</h3>
            <p>Smart dashboard with trends, charts & progress insights.</p>
          </div>

        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-section">
        <h2 className="section-title">How Recoguide Works</h2>

        <div className="how-steps">
          <div className="how-card">
            <div className="step-num">1</div>
            <p>Upload your report (PDF / Image).</p>
          </div>

          <div className="how-card">
            <div className="step-num">2</div>
            <p>AI extracts & interprets all medical values.</p>
          </div>

          <div className="how-card">
            <div className="step-num">3</div>
            <p>Get summary, advice, diet, & health alerts instantly.</p>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="cta-section">
        <h2>Your Health Deserves Clarity</h2>
        <p>Upload your report & understand it in seconds.</p>

        <Link to="/home" className="btn primary cta-btn">
          Start Now → 
        </Link>
      </section>

    </div>
  );
}
