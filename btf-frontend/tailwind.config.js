/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#0A0A0C",
          900: "#0F0F12",
          800: "#17171B",
          700: "#1F1F24",
          600: "#2A2A31",
          500: "#38383F",
        },
        bone: {
          50: "#FAFAF9",
          100: "#F1F0EE",
          200: "#DFDDD9",
          300: "#B8B5AE",
          400: "#8C8981",
        },
        crimson: {
          50: "#FDF1F2",
          100: "#FBDFE2",
          200: "#F3B5BC",
          300: "#E27B87",
          400: "#CC4A5A",
          500: "#A8203A",
          600: "#8E1730",
          700: "#711227",
          800: "#560D1D",
          900: "#3E0915",
        },
        brass: {
          400: "#C9A44C",
          500: "#B08A34",
        },
      },
      fontFamily: {
        display: ["'Oswald'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(0,0,0,0.4), 0 8px 24px -8px rgba(0,0,0,0.5)",
        "card-hover": "0 4px 12px rgba(0,0,0,0.5), 0 20px 40px -12px rgba(0,0,0,0.6)",
        glow: "0 0 0 1px rgba(168,32,58,0.4), 0 8px 24px -4px rgba(168,32,58,0.35)",
        inset: "inset 0 1px 0 rgba(255,255,255,0.04)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      letterSpacing: {
        widest2: "0.25em",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(16px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        scaleIn: {
          "0%": { opacity: 0, transform: "scale(0.96)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-400px 0" },
          "100%": { backgroundPosition: "400px 0" },
        },
        loadingSlide: {
          "0%": { transform: "translateX(-100%)" },
          "50%": { transform: "translateX(150%)" },
          "100%": { transform: "translateX(150%)" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) both",
        fadeIn: "fadeIn 0.4s ease both",
        scaleIn: "scaleIn 0.25s cubic-bezier(0.16,1,0.3,1) both",
        shimmer: "shimmer 1.6s infinite linear",
        loadingSlide: "loadingSlide 1.1s ease-in-out infinite",
      },
      backgroundImage: {
        "grain": "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
}
