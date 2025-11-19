import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import ReportDetail from "./pages/ReportDetail";
import Navbar from "./components/Navbar";
import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import LandingPage from "./pages/LandingPage";
import TipOfTheDayCard from "./components/TipOfTheDayCard";


export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/report/:id" element={<ReportDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
     
      </Routes>

      <TipOfTheDayCard />
    </BrowserRouter>
  );
}
