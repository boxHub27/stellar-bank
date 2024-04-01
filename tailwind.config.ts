import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
  daisyui: {
    themes: false,
    // [
    //   {
    //     mytheme: {
    //       primary: "#001F3F",

    //       secondary: "#F06C0D",

    //       accent: "#d8bdf9",

    //       neutral: "#1f1924",

    //       "base-100": "#F5F5F5",

    //       info: "#72b7f8",

    //       success: "#188653",

    //       warning: "#f2c15f",

    //       error: "#FFB68D",
    //     },
    //     dark: {
    //       ...require("daisyui/src/theming/themes")["[data-theme=dark]"],
    //       primary: "#001F3F",
    //       secondary: "#F06C0D",
    //       error: "#FFB68D",
    //       // "primary-focus": "mediumblue",
    //     },
    //   },
    //   "dark",
    //   "cupcake",
    //   "forest",
    //   "winter",
    //   "black",
    //   "bumblebee",
    // ],
  },
  // theme: {
  //   container: {
  //     center: true,
  //     padding: "2rem",
  //     screens: {
  //       "2xl": "1400px",
  //     },
  //   },
  //   extend: {
  //     colors: {
  //       border: "hsl(var(--border))",
  //       input: "hsl(var(--input))",
  //       ring: "hsl(var(--ring))",
  //       background: "hsl(var(--background))",
  //       foreground: "hsl(var(--foreground))",
  //       primary: {
  //         DEFAULT: "hsl(var(--primary))",
  //         foreground: "hsl(var(--primary-foreground))",
  //       },
  //       secondary: {
  //         DEFAULT: "hsl(var(--secondary))",
  //         foreground: "hsl(var(--secondary-foreground))",
  //       },
  //       destructive: {
  //         DEFAULT: "hsl(var(--destructive))",
  //         foreground: "hsl(var(--destructive-foreground))",
  //       },
  //       muted: {
  //         DEFAULT: "hsl(var(--muted))",
  //         foreground: "hsl(var(--muted-foreground))",
  //       },
  //       accent: {
  //         DEFAULT: "hsl(var(--accent))",
  //         foreground: "hsl(var(--accent-foreground))",
  //       },
  //       popover: {
  //         DEFAULT: "hsl(var(--popover))",
  //         foreground: "hsl(var(--popover-foreground))",
  //       },
  //       card: {
  //         DEFAULT: "hsl(var(--card))",
  //         foreground: "hsl(var(--card-foreground))",
  //       },
  //     },
  //     borderRadius: {
  //       lg: "var(--radius)",
  //       md: "calc(var(--radius) - 2px)",
  //       sm: "calc(var(--radius) - 4px)",
  //     },
  //     keyframes: {
  //       "accordion-down": {
  //         from: { height: 0 },
  //         to: { height: "var(--radix-accordion-content-height)" },
  //       },
  //       "accordion-up": {
  //         from: { height: "var(--radix-accordion-content-height)" },
  //         to: { height: 0 },
  //       },
  //     },
  //     animation: {
  //       "accordion-down": "accordion-down 0.2s ease-out",
  //       "accordion-up": "accordion-up 0.2s ease-out",
  //     },
  //   },
  // },

  plugins: [require("daisyui"), require("tailwindcss-animate")],
} satisfies Config;
