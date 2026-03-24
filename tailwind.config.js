/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ─── NoBeScam Design Tokens ───────────────────────────────────
      // Style: Duolingo-light × Nigerian MSME
      // Base: warm cream background, not pure white
      // Primary: Naija green (action, correct, progress)
      // Danger: warm red (scam, wrong, alert)
      // Gold: amber (streak, score, highlight)
      // Neutral: slate tones (text, borders, muted)
      colors: {
        // ── Backgrounds ──
        bg: {
          base: "#F7F4EF", // warm cream — main page background
          surface: "#FFFFFF", // pure white — cards, modals
          sunken: "#EDE9E1", // slightly darker cream — inset areas
          overlay: "#1C1917", // near-black — modal backdrops
        },
        // ── Primary — Naija Green ──
        brand: {
          DEFAULT: "#2D9A4E", // main action green
          light: "#E8F5ED", // green tint backgrounds
          medium: "#4DB86A", // hover states
          dark: "#1F6B36", // pressed / deep
          xdark: "#174D27", // headings on light bg
        },
        // ── Correct / Safe ──
        safe: {
          DEFAULT: "#2D9A4E",
          bg: "#E8F5ED",
          border: "#A3D9B1",
          text: "#1F6B36",
        },
        // ── Danger / Scam ──
        danger: {
          DEFAULT: "#E03131",
          bg: "#FDEAEA",
          border: "#F5AAAA",
          text: "#9B1C1C",
        },
        // ── Gold / Streak / Score ──
        gold: {
          DEFAULT: "#E8820C",
          light: "#FEF3E2",
          border: "#F9C57A",
          text: "#92400E",
        },
        // ── Neutral / Text ──
        ink: {
          900: "#1C1917", // primary text
          700: "#44403C", // secondary text
          500: "#78716C", // muted / placeholder
          300: "#D6D3D1", // borders / dividers
          100: "#F5F5F4", // subtle backgrounds
        },
        // ── Accent — Nigerian Gold (badges, special) ──
        naija: {
          green: "#2D9A4E",
          gold: "#E8820C",
          white: "#F7F4EF",
        },
      },

      // ─── Typography ───────────────────────────────────────────────
      fontFamily: {
        display: ["Nunito", "sans-serif"], // rounded, friendly — like Duolingo
        body: ["DM Sans", "sans-serif"], // clean readable body
        mono: ["JetBrains Mono", "monospace"],
      },

      // ─── Border Radius ────────────────────────────────────────────
      // Duolingo uses very rounded corners everywhere
      borderRadius: {
        xs: "6px",
        sm: "10px",
        md: "14px",
        lg: "18px",
        xl: "24px",
        "2xl": "32px",
        "3xl": "40px",
        full: "9999px",
      },

      // ─── Box Shadows ──────────────────────────────────────────────
      // Duolingo uses solid-offset shadows (no blur) for cards
      boxShadow: {
        card: "0 4px 0 0 #D6D3D1", // default card bottom border
        "card-brand": "0 4px 0 0 #1F6B36", // green card
        "card-danger": "0 4px 0 0 #9B1C1C", // red card
        "card-gold": "0 4px 0 0 #92400E", // gold card
        btn: "0 4px 0 0 #1F6B36", // green button bottom
        "btn-danger": "0 4px 0 0 #9B1C1C",
        "btn-gold": "0 4px 0 0 #92400E",
        "btn-neutral": "0 4px 0 0 #D6D3D1",
        soft: "0 2px 12px rgba(0,0,0,0.08)", // subtle elevation
        lifted: "0 8px 24px rgba(0,0,0,0.12)",
      },

      // ─── Animations ───────────────────────────────────────────────
      animation: {
        vibrate: "vibrate 0.4s linear infinite",
        "bounce-in": "bounceIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
        "slide-up": "slideUp 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
        "fade-in": "fadeIn 0.3s ease-out",
        pop: "pop 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)",
        shake: "shake 0.4s ease-out",
        "streak-glow": "streakGlow 1.5s ease-in-out infinite",
        float: "float 3s ease-in-out infinite",
        "progress-fill": "progressFill 0.4s ease-out",
        "ping-ring": "pingRing 1.2s ease-out infinite",
      },
      keyframes: {
        vibrate: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "15%": { transform: "rotate(-8deg)" },
          "30%": { transform: "rotate(8deg)" },
          "45%": { transform: "rotate(-6deg)" },
          "60%": { transform: "rotate(6deg)" },
          "75%": { transform: "rotate(-4deg)" },
          "90%": { transform: "rotate(4deg)" },
        },
        bounceIn: {
          "0%": { transform: "scale(0.3)", opacity: "0" },
          "60%": { transform: "scale(1.1)" },
          "80%": { transform: "scale(0.95)" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pop: {
          "0%": { transform: "scale(0.8)", opacity: "0" },
          "70%": { transform: "scale(1.1)" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "20%": { transform: "translateX(-8px)" },
          "40%": { transform: "translateX(8px)" },
          "60%": { transform: "translateX(-5px)" },
          "80%": { transform: "translateX(5px)" },
        },
        streakGlow: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(232,130,12,0.4)" },
          "50%": { boxShadow: "0 0 0 8px rgba(232,130,12,0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        progressFill: {
          "0%": { width: "0%" },
          "100%": { width: "var(--progress-width)" },
        },
        pingRing: {
          "0%": { transform: "scale(1)", opacity: "0.8" },
          "100%": { transform: "scale(2.2)", opacity: "0" },
        },
      },

      // ─── Spacing additions ────────────────────────────────────────
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
      },
    },
  },
  plugins: [],
};
