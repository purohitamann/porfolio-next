
/** @type {import('tailwindcss').Config} */
const config = {
	darkMode: 'class',
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			keyframes: {
				fade: {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				}
			},
			animation: {
				fade: 'fade 0.6s ease-out',
			},
			colors: {
				   background: '#18181b',
				   foreground: '#fafafa',
				   card: {
					   DEFAULT: '#232326',
					   foreground: '#fafafa'
				   },
				   popover: {
					   DEFAULT: '#232326',
					   foreground: '#fafafa'
				   },
				   primary: {
					   DEFAULT: '#18181b',
					   foreground: '#fafafa'
				   },
				   secondary: {
					   DEFAULT: '#232326',
					   foreground: '#fafafa'
				   },
				   muted: {
					   DEFAULT: '#27272a',
					   foreground: '#a1a1aa'
				   },
				   accent: {
					   DEFAULT: '#232326',
					   foreground: '#fafafa'
				   },
				   destructive: {
					   DEFAULT: '#18181b',
					   foreground: '#fafafa'
				   },
				   border: '#27272a',
				   input: '#27272a',
				   ring: '#a1a1aa',
				   chart: {
					   '1': '#18181b',
					   '2': '#232326',
					   '3': '#27272a',
					   '4': '#52525b',
					   '5': '#a1a1aa'
				   }
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
};

export default config;
