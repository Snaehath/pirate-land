/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
	theme: {
		extend: {
			colors: {
				main: 'var(--main)',
				overlay: 'var(--overlay)',
				bg: 'var(--bg)',
				bw: 'var(--bw)',
				blank: 'var(--blank)',
				text: 'var(--text)',
				mtext: 'var(--mtext)',
				border: 'var(--border)',
				ring: 'var(--ring)',
				ringOffset: 'var(--ring-offset)',

				secondaryBlack: '#212121',
			},
			borderRadius: {
				base: '5px'
			},
			boxShadow: {
				shadow: 'var(--shadow)'
			},
			translate: {
				boxShadowX: '4px',
				boxShadowY: '4px',
				reverseBoxShadowX: '-4px',
				reverseBoxShadowY: '-4px',
			},
			fontWeight: {
				base: '500',
				heading: '700',
			},
			fontFamily: {
				"pirate-kids": ["pirate-kids", "sans-serif"],
				"inter": ["inter", "sans-serif"],
			},
			keyframes: {
				"custom-fade-in": {
					from: {
						opacity: "0",
					},
					to: {
						opacity: "1",
					},
				},
			},
			animation: {
				"fade-in": "custom-fade-in 0.42s ease-in",
			}
		},
	},
	plugins: [require("tailwindcss-animate")],
}