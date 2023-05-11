/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx}",
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ['var(--font-raleway)']
			},
			transitionProperty: {
				'max-height': 'max-height',
			},
		},
	},
	plugins: [
		require('@tailwindcss/container-queries'),
		require('@tailwindcss/typography'),
		require("daisyui"),
	],
	daisyui: {
		styled: true,
		themes: ["dark", "bumblebee", "emerald", "corporate", "cyberpunk", "valentine", "halloween", "aqua", "lofi", "wireframe", "black", "luxury", "autumn", "night", "winter"],
		base: true,
		utils: true,
		logs: true,
		rtl: false,
		prefix: "",
		darkTheme: "dark",
	},
}