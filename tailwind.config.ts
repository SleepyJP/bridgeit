import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/providers/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core theme colors
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        accent: "var(--color-accent)",
        background: "var(--color-background)",
        surface: "var(--color-surface)",
        text: "var(--color-text)",
        "text-muted": "var(--color-text-muted)",
        success: "var(--color-success)",
        warning: "var(--color-warning)",
        error: "var(--color-error)",

        // Stained Glass Palette
        glass: {
          ruby: "var(--glass-ruby)",
          amber: "var(--glass-amber)",
          gold: "var(--glass-gold)",
          emerald: "var(--glass-emerald)",
          teal: "var(--glass-teal)",
          sapphire: "var(--glass-sapphire)",
          violet: "var(--glass-violet)",
          lead: "var(--glass-lead)",
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
      },
      backgroundImage: {
        // Stained glass gradients
        'gradient-rainbow': 'linear-gradient(135deg, #E53935 0%, #FF8F00 20%, #FFD54F 40%, #00C853 60%, #00BFA5 80%, #00B0FF 100%)',
        'gradient-warm': 'linear-gradient(135deg, #E53935 0%, #FF8F00 50%, #FFD54F 100%)',
        'gradient-cool': 'linear-gradient(135deg, #00C853 0%, #00BFA5 50%, #00B0FF 100%)',
        'gradient-ruby': 'linear-gradient(145deg, rgba(229, 57, 53, 0.2), rgba(229, 57, 53, 0.05))',
        'gradient-amber': 'linear-gradient(145deg, rgba(255, 143, 0, 0.2), rgba(255, 143, 0, 0.05))',
        'gradient-teal': 'linear-gradient(145deg, rgba(0, 191, 165, 0.2), rgba(0, 191, 165, 0.05))',
        'gradient-sapphire': 'linear-gradient(145deg, rgba(0, 176, 255, 0.2), rgba(0, 176, 255, 0.05))',
      },
      boxShadow: {
        'glass': '0 0 30px rgba(0, 191, 165, 0.1), inset 0 0 30px rgba(0, 191, 165, 0.05)',
        'glass-ruby': '0 0 30px rgba(229, 57, 53, 0.2)',
        'glass-amber': '0 0 30px rgba(255, 143, 0, 0.2)',
        'glass-teal': '0 0 30px rgba(0, 191, 165, 0.2)',
        'glass-sapphire': '0 0 30px rgba(0, 176, 255, 0.2)',
        'glow-rainbow': '0 0 20px rgba(229, 57, 53, 0.3), 0 0 40px rgba(255, 143, 0, 0.2), 0 0 60px rgba(0, 191, 165, 0.2), 0 0 80px rgba(0, 176, 255, 0.2)',
      },
      animation: {
        "marquee-scroll": "marquee-scroll linear infinite",
        "pulse-glow": "pulse-glow-rainbow 4s ease-in-out infinite",
        "float": "float 3s ease-in-out infinite",
        "glass-shimmer": "glass-shimmer 3s ease-in-out infinite",
        "rainbow-shimmer": "rainbow-shimmer 8s linear infinite",
        "color-cycle": "color-cycle 6s linear infinite",
        "border-cycle": "border-color-cycle 6s linear infinite",
        "light-ray": "light-ray 6s ease-in-out infinite",
      },
      keyframes: {
        "marquee-scroll": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-33.33%)" },
        },
        "pulse-glow-rainbow": {
          "0%, 100%": {
            boxShadow: "0 0 20px rgba(229, 57, 53, 0.3), 0 0 30px rgba(0, 191, 165, 0.2)"
          },
          "33%": {
            boxShadow: "0 0 25px rgba(255, 143, 0, 0.4), 0 0 35px rgba(0, 176, 255, 0.3)"
          },
          "66%": {
            boxShadow: "0 0 30px rgba(0, 200, 83, 0.4), 0 0 40px rgba(124, 77, 255, 0.3)"
          },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "glass-shimmer": {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        "rainbow-shimmer": {
          "0%": { filter: "hue-rotate(0deg)" },
          "100%": { filter: "hue-rotate(360deg)" },
        },
        "color-cycle": {
          "0%": { color: "#E53935" },
          "16%": { color: "#FF8F00" },
          "33%": { color: "#FFD54F" },
          "50%": { color: "#00C853" },
          "66%": { color: "#00BFA5" },
          "83%": { color: "#00B0FF" },
          "100%": { color: "#E53935" },
        },
        "border-color-cycle": {
          "0%": { borderColor: "#E53935" },
          "16%": { borderColor: "#FF8F00" },
          "33%": { borderColor: "#FFD54F" },
          "50%": { borderColor: "#00C853" },
          "66%": { borderColor: "#00BFA5" },
          "83%": { borderColor: "#00B0FF" },
          "100%": { borderColor: "#E53935" },
        },
        "light-ray": {
          "0%, 100%": { opacity: "0.3", transform: "translateX(-100%) rotate(45deg)" },
          "50%": { opacity: "0.6", transform: "translateX(200%) rotate(45deg)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
