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
          DEFAULT: "#000000",
          secondary: "#0A0A0A",
          card: "#111111",
          elevated: "#1A1A1A",
        },
        brand: {
          primary: "#D4AF37", // Gold
          "primary-light": "#E8CC6A",
          "primary-dark": "#AA8022",
          secondary: "#00E676", // Green
          "secondary-dark": "#00C853",
          white: "#FFFFFF",
          grey: "#888888",
          "grey-light": "#A1A1AA",
          "grey-dark": "#27272A",
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      spacing: {
        '2': '8px',
        '4': '16px',
        '6': '24px',
        '8': '32px',
        '12': '48px',
        '16': '64px',
        '24': '96px',
      },
      borderRadius: {
        card: "16px",
        button: "8px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-gold": "linear-gradient(135deg, #D4AF37 0%, #AA8022 100%)",
        "gradient-green": "linear-gradient(135deg, #00E676 0%, #00C853 100%)",
        "gradient-dark": "linear-gradient(180deg, #000000 0%, #0A0A0A 100%)",
      },
      animation: {
        "fade-in-up": "fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in": "fadeIn 0.6s ease-out forwards",
        ticker: "ticker 60s linear infinite",
        "shimmer": "shimmer 2.5s ease-in-out infinite",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      boxShadow: {
        "soft": "0 4px 24px -4px rgba(0, 0, 0, 0.5)",
        "hover": "0 8px 32px -4px rgba(0, 0, 0, 0.6)",
        "gold-glow": "0 0 24px rgba(212, 175, 55, 0.15)",
      },
    },
  },
  plugins: [],
};
