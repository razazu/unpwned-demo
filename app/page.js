"use client";

import { useEffect, useState } from "react";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const OPENAI_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
const STRIPE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const API_SECRET = process.env.NEXT_PUBLIC_API_SECRET;

const VULNERABILITIES = [
  { icon: "\u{1F513}", label: "No Content-Security-Policy", severity: "critical" },
  { icon: "\u{1F6A8}", label: "API keys exposed in JS bundle", severity: "critical" },
  { icon: "\u{1F441}", label: "Open API endpoints (no auth)", severity: "high" },
  { icon: "\u{1F30D}", label: "Permissive CORS (Allow: *)", severity: "high" },
  { icon: "\u{1F6E1}", label: "No HSTS header", severity: "medium" },
  { icon: "\u{1F36A}", label: "Insecure cookies", severity: "medium" },
  { icon: "\u{1F5FA}", label: "Source maps exposed", severity: "medium" },
  { icon: "\u{1F4DC}", label: "No Privacy Policy or ToS", severity: "low" },
  { icon: "\u{1F4E7}", label: "No SPF/DKIM/DMARC", severity: "low" },
  { icon: "\u{26A0}", label: "No rate limiting", severity: "medium" },
];

const severityColor = {
  critical: "#ff3b3b",
  high: "#ff6b35",
  medium: "#ffc107",
  low: "#8b8b8b",
};

export default function Home() {
  const [glitch, setGlitch] = useState(false);
  const [scanLine, setScanLine] = useState(0);

  useEffect(() => {
    document.cookie = "session_token=abc123xyz; path=/";
    document.cookie = "user_prefs=dark_mode; path=/";

    console.log("App initialized with config:", {
      supabase: SUPABASE_URL,
      stripe: STRIPE_KEY,
      env: "production",
    });

    const glitchInterval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 150);
    }, 4000);

    const scanInterval = setInterval(() => {
      setScanLine((prev) => (prev + 1) % 100);
    }, 30);

    return () => {
      clearInterval(glitchInterval);
      clearInterval(scanInterval);
    };
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#080b10",
      fontFamily: "'Courier New', monospace",
      color: "#00ff41",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `repeating-linear-gradient(
          0deg,
          transparent,
          transparent 2px,
          rgba(0, 255, 65, 0.03) 2px,
          rgba(0, 255, 65, 0.03) 4px
        )`,
        pointerEvents: "none",
        zIndex: 1,
      }} />

      <div style={{
        position: "fixed",
        top: `${scanLine}%`,
        left: 0,
        right: 0,
        height: 2,
        background: "linear-gradient(90deg, transparent, rgba(0, 255, 65, 0.4), transparent)",
        pointerEvents: "none",
        zIndex: 2,
      }} />

      <div style={{
        position: "relative",
        zIndex: 3,
        maxWidth: 800,
        margin: "0 auto",
        padding: "40px 20px",
      }}>
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: 40,
        }}>
          <img
            src="/ninja.png"
            alt="PWNED Ninja"
            style={{
              width: 180,
              height: 180,
              marginBottom: 24,
              filter: glitch
                ? "hue-rotate(90deg) brightness(1.5)"
                : "drop-shadow(0 0 30px rgba(255, 0, 0, 0.5))",
              transition: glitch ? "none" : "filter 0.3s ease",
            }}
          />
          <h1 style={{
            fontSize: "3rem",
            fontWeight: 900,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#ff3b3b",
            textShadow: glitch
              ? "3px 0 #00ff41, -3px 0 #ff00ff"
              : "0 0 20px rgba(255, 59, 59, 0.5)",
            margin: 0,
            textAlign: "center",
          }}>
            YOU GOT PWNED
          </h1>
          <p style={{
            color: "#00ff41",
            fontSize: "0.9rem",
            marginTop: 8,
            opacity: 0.7,
            textAlign: "center",
          }}>
            [DEMO TARGET] This site is intentionally vulnerable
          </p>
        </div>

        <div style={{
          border: "1px solid rgba(0, 255, 65, 0.2)",
          background: "rgba(0, 255, 65, 0.03)",
          padding: 24,
          marginBottom: 32,
        }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}>
            <span style={{ fontSize: "0.8rem", opacity: 0.5 }}>
              $ unpwned scan demo.unpwned.io
            </span>
            <span style={{
              background: "#ff3b3b",
              color: "#080b10",
              padding: "2px 10px",
              fontSize: "0.75rem",
              fontWeight: 900,
              letterSpacing: "0.1em",
            }}>
              SCORE: 32/100
            </span>
          </div>

          <div style={{ fontSize: "0.85rem", lineHeight: 1.8 }}>
            <div style={{ color: "#ff3b3b", marginBottom: 4 }}>
              [CRITICAL] 2 critical vulnerabilities found
            </div>
            <div style={{ color: "#ff6b35", marginBottom: 4 }}>
              [HIGH] 2 high severity issues detected
            </div>
            <div style={{ color: "#ffc107", marginBottom: 4 }}>
              [MEDIUM] 4 medium severity warnings
            </div>
            <div style={{ color: "#8b8b8b", marginBottom: 4 }}>
              [LOW] 2 low severity notices
            </div>
          </div>
        </div>

        <div style={{
          border: "1px solid rgba(0, 255, 65, 0.2)",
          background: "rgba(0, 255, 65, 0.03)",
          padding: 24,
          marginBottom: 32,
        }}>
          <h2 style={{
            fontSize: "0.85rem",
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            marginTop: 0,
            marginBottom: 20,
            opacity: 0.6,
          }}>
            Vulnerabilities Found
          </h2>

          {VULNERABILITIES.map((v, i) => (
            <div key={i} style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "10px 0",
              borderBottom: "1px solid rgba(0, 255, 65, 0.08)",
            }}>
              <span style={{ fontSize: "1.1rem", width: 28 }}>{v.icon}</span>
              <span style={{ flex: 1, fontSize: "0.85rem" }}>{v.label}</span>
              <span style={{
                color: severityColor[v.severity],
                fontSize: "0.7rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                padding: "2px 8px",
                border: `1px solid ${severityColor[v.severity]}40`,
              }}>
                {v.severity}
              </span>
            </div>
          ))}
        </div>

        <div style={{
          border: "1px solid rgba(0, 255, 65, 0.2)",
          background: "rgba(0, 255, 65, 0.03)",
          padding: 24,
          marginBottom: 32,
        }}>
          <h2 style={{
            fontSize: "0.85rem",
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            marginTop: 0,
            marginBottom: 16,
            opacity: 0.6,
          }}>
            Exposed Secrets in JS Bundle
          </h2>
          <pre style={{
            background: "#0a0f16",
            padding: 16,
            overflow: "auto",
            fontSize: "0.75rem",
            lineHeight: 1.6,
            color: "#ff6b35",
            margin: 0,
            border: "1px solid rgba(255, 107, 53, 0.2)",
          }}>
{`NEXT_PUBLIC_SUPABASE_URL = "${SUPABASE_URL}"
NEXT_PUBLIC_SUPABASE_ANON_KEY = "${SUPABASE_KEY?.slice(0, 30)}..."
NEXT_PUBLIC_OPENAI_API_KEY = "${OPENAI_KEY}"
NEXT_PUBLIC_STRIPE_KEY = "${STRIPE_KEY}"
NEXT_PUBLIC_API_SECRET = "${API_SECRET}"`}
          </pre>
        </div>

        <div style={{
          textAlign: "center",
          padding: "40px 20px",
          marginBottom: 32,
        }}>
          <p style={{
            fontSize: "1.1rem",
            color: "white",
            fontFamily: "system-ui, sans-serif",
            marginBottom: 8,
          }}>
            Is your app this exposed?
          </p>
          <p style={{
            fontSize: "0.9rem",
            color: "rgba(255,255,255,0.5)",
            fontFamily: "system-ui, sans-serif",
            marginBottom: 24,
          }}>
            Scan your site for free with UNPWNED — AI-powered security in 60 seconds
          </p>
          <a
            href="https://www.unpwned.io?utm_source=demo&utm_medium=demo_site&utm_campaign=demo_target"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              background: "#00ff41",
              color: "#080b10",
              padding: "14px 40px",
              fontSize: "1rem",
              fontWeight: 900,
              fontFamily: "system-ui, sans-serif",
              textDecoration: "none",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              border: "2px solid #00ff41",
              transition: "all 0.2s ease",
            }}
            onMouseOver={(e) => {
              e.target.style.background = "transparent";
              e.target.style.color = "#00ff41";
            }}
            onMouseOut={(e) => {
              e.target.style.background = "#00ff41";
              e.target.style.color = "#080b10";
            }}
          >
            Scan Your Site Free
          </a>
        </div>

        <div style={{
          borderTop: "1px solid rgba(0, 255, 65, 0.1)",
          paddingTop: 20,
          textAlign: "center",
          fontSize: "0.7rem",
          opacity: 0.3,
        }}>
          <p>This is a deliberately vulnerable demo site by UNPWNED</p>
          <p>All API keys and data shown are fake — no real secrets are exposed</p>
          <p>
            <a href="https://www.unpwned.io" style={{ color: "#00ff41" }}>
              unpwned.io
            </a>
            {" "}— One-scan security for vibe-coded apps
          </p>
        </div>
      </div>
    </div>
  );
}
