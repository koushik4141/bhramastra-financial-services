/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#050505",
          secondary: "#0D1117",
          card: "#0A0F1A",
          elevated: "#111827",
        },
        brand: {
          saffron: "#FF9933",
          gold: "#FF9933",
          "gold-light": "#FFB870",
          "gold-dark": "#CC7A29",
          green: "#138808",
          "green-dark": "#0F6D06",
          white: "#FFFFFF",
          grey: "#9CA3AF",
          "grey-light": "#D1D5DB",
          blue: "#2D8CFF",
          "blue-dark": "#1A3A5C",
        },
      },
      fontFamily: {
        heading: ["var(--font-cinzel)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      borderRadius: {
        card: "18px",
        button: "12px",
      },
      backdropBlur: {
        xs: "2px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-gold": "linear-gradient(135deg, #D4AF37 0%, #AA8022 100%)",
        "gradient-green": "linear-gradient(135deg, #00E676 0%, #00C853 100%)",
        "gradient-dark": "linear-gradient(180deg, #050505 0%, #0D1117 100%)",
        "gradient-hero": "radial-gradient(ellipse at 70% 50%, rgba(212,175,55,0.06) 0%, transparent 60%)",
      },
      animation: {
        "float-slow": "floatSlow 8s ease-in-out infinite",
        "float-medium": "floatMedium 6s ease-in-out infinite",
        "pulse-glow": "pulseGlow 4s ease-in-out infinite",
        "pulse-glow-green": "pulseGlowGreen 4s ease-in-out infinite",
        orbit: "orbit 20s linear infinite",
        "spin-slow": "spin 30s linear infinite",
        "spin-reverse": "spinReverse 25s linear infinite",
        "draw-ring": "drawRing 3s ease-out forwards",
        ambient: "ambientShift 15s ease-in-out infinite alternate",
        ticker: "ticker 60s linear infinite",
        "ticker-slow": "ticker 90s linear infinite",
        "fade-in-up": "fadeInUp 0.8s ease-out forwards",
        shimmer: "shimmer 2.5s ease-in-out infinite",
        "particle-float": "particleFloat 12s ease-in-out infinite",
      },
      keyframes: {
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px) translateX(0px)" },
          "33%": { transform: "translateY(-20px) translateX(10px)" },
          "66%": { transform: "translateY(-10px) translateX(-8px)" },
        },
        floatMedium: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.3", filter: "blur(0px)" },
          "50%": { opacity: "0.8", filter: "blur(2px)" },
        },
        pulseGlowGreen: {
          "0%, 100%": { opacity: "0.2", boxShadow: "0 0 20px rgba(0,230,118,0.1)" },
          "50%": { opacity: "0.6", boxShadow: "0 0 40px rgba(0,230,118,0.3)" },
        },
        orbit: {
          "0%": { transform: "rotate(0deg) translateX(160px) rotate(0deg)" },
          "100%": { transform: "rotate(360deg) translateX(160px) rotate(-360deg)" },
        },
        spinReverse: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(-360deg)" },
        },
        drawRing: {
          from: { strokeDashoffset: "1005" },
          to: { strokeDashoffset: "0" },
        },
        ambientShift: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "100% 50%" },
        },
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        particleFloat: {
          "0%, 100%": { transform: "translateY(0) translateX(0) scale(1)", opacity: "0.3" },
          "25%": { transform: "translateY(-30px) translateX(15px) scale(1.1)", opacity: "0.6" },
          "50%": { transform: "translateY(-15px) translateX(-10px) scale(0.9)", opacity: "0.4" },
          "75%": { transform: "translateY(-25px) translateX(5px) scale(1.05)", opacity: "0.5" },
        },
      },
      boxShadow: {
        "gold-sm": "0 2px 10px rgba(212,175,55,0.15)",
        "gold-md": "0 4px 20px rgba(212,175,55,0.2)",
        "gold-lg": "0 8px 40px rgba(212,175,55,0.25)",
        "green-sm": "0 2px 10px rgba(0,230,118,0.15)",
        "green-md": "0 4px 20px rgba(0,230,118,0.2)",
        card: "0 4px 30px rgba(0,0,0,0.4)",
        "card-hover": "0 8px 50px rgba(0,0,0,0.6)",
      },
    },
  },
  plugins: [],
};
