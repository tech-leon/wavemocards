import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'var(--background)',
  			foreground: 'var(--foreground)'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
			transitionDuration: {
        DEFAULT: "300ms",
      },
      transitionTimingFunction: {
        DEFAULT: "ease-in-out",
      },
  	}
  },
  plugins: [
    require("tailwindcss-animate"),
    function ({ addBase, theme }: { addBase: StringConstructor, theme: StringConstructor }) {
      addBase({
        "a, button, input, select, textarea": {
          transition:
            "all " +
            theme("transitionDuration.DEFAULT") +
            " " +
            theme("transitionTimingFunction.DEFAULT"),
        },
      });
    },
  ],
};
export default config;
