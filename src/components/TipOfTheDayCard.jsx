import React from "react";
import "../styles/tip.css";

const tips = [
  "Keep a 12-hour eating window daily (like 8am–8pm) — improves sugar levels and gut health.",
  "Take a 10–12 min walk after meals — proven to reduce blood sugar spikes.",
  "Replace one wheat chapati with a bowl of dal or sprouts to improve protein intake.",
  "Avoid checking your phone for the first 30 minutes after waking — lowers morning stress.",
  "Include 1 handful of mixed nuts daily (almonds, walnuts) for better heart health.",
  "Keep your dinner the lightest meal of the day — helps sleep and fat metabolism.",
  "If you sit for long hours, stand or stretch for 2–3 minutes every 30 minutes.",
  "Have 1 seasonal fruit daily — increases fibre and reduces inflammation.",
  "Stop drinking water right after meals — wait 25–30 minutes for better digestion.",
  "Swap sugar tea with lemon water twice a week — cuts 1000+ calories a month.",
  "Sleep before 11 PM — your liver and hormones recover better.",
  "Don’t store cooked food for more than 24 hours — reduces bacterial growth risk.",
  "Take sunlight for 10 minutes between 7–9 AM — boosts Vitamin-D naturally.",
  "Do slow breathing (5 minutes) before sleep — reduces anxiety and BP.",
  "Check your BP twice a month after age 30 — early detection saves lives.",
  "Never skip breakfast on empty stomach caffeine — irritates acidity and cortisol.",
  "Eat 2 bowls of vegetables daily — improves skin, gut movement, and sugar control.",
  "Replace white rice with brown rice or millet twice a week.",
  "Increase protein at breakfast (eggs, curd, sprouts) — boosts metabolism for the day.",
  "If urine is dark yellow, you're dehydrated — increase water gradually through the day."
];


export default function TipOfTheDayCard() {
  const index = new Date().getDate() % tips.length;

  return (
    <div className="tip-footer">
      <span className="tip-label">Today's Health Tip:</span>
      <span className="tip-text">{tips[index]}</span>
    </div>
  );
}
