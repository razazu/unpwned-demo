"use client";

import { useEffect, useState } from "react";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const OPENAI_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
const STRIPE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const API_SECRET = process.env.NEXT_PUBLIC_API_SECRET;

export default function Home() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Ship the landing page", done: true },
    { id: 2, title: "Add AI features", done: true },
    { id: 3, title: "Security audit", done: false },
    { id: 4, title: "Launch on Product Hunt", done: false },
  ]);

  useEffect(() => {
    document.cookie = "session_token=abc123xyz; path=/";
    document.cookie = "user_prefs=dark_mode; path=/";

    console.log("App initialized with config:", {
      supabase: SUPABASE_URL,
      stripe: STRIPE_KEY,
      env: "production",
    });
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      fontFamily: "system-ui, sans-serif",
      color: "white",
      padding: "40px 20px",
    }}>
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: 800, marginBottom: 8 }}>
          ✨ VibeTasks
        </h1>
        <p style={{ fontSize: "1.1rem", opacity: 0.85, marginBottom: 40 }}>
          The AI-powered task manager — vibe coded in one weekend
        </p>

        <div style={{
          background: "rgba(255,255,255,0.15)",
          borderRadius: 16,
          padding: 24,
          backdropFilter: "blur(10px)",
        }}>
          <h2 style={{ fontSize: "1.3rem", marginBottom: 16 }}>My Tasks</h2>
          {tasks.map((task) => (
            <div
              key={task.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 0",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <span style={{ fontSize: "1.2rem" }}>
                {task.done ? "✅" : "⬜"}
              </span>
              <span style={{
                textDecoration: task.done ? "line-through" : "none",
                opacity: task.done ? 0.6 : 1,
              }}>
                {task.title}
              </span>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: 40,
          padding: 20,
          background: "rgba(255,255,255,0.1)",
          borderRadius: 12,
          fontSize: "0.85rem",
          opacity: 0.7,
        }}>
          <p>Built with Next.js + Supabase + OpenAI</p>
          <p>© 2026 VibeTasks. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
