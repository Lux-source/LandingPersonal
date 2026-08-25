/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				cream: {
					DEFAULT: '#FDF6EC',
					100: '#FDF0DC',
					200: '#FDE9CC',
				},
				ink: '#2A211A',
				muted: '#5B4B3E',
				faint: '#A89684',
				line: '#EADFD0',
				terracotta: {
					DEFAULT: '#C4522F',
					dark: '#9A3D20',
					light: '#E07A52',
				},
				olive: {
					DEFAULT: '#5C6B3C',
					light: '#8CA05E',
				},
				mustard: {
					DEFAULT: '#E8A020',
					deep: '#5B4423',
				},
				placeholder: '#C4713F',
				night: {
					DEFAULT: '#17120E',
					surface: '#211A14',
					raised: '#2B211A',
					line: '#3A2E24',
				},
			},
			fontFamily: {
				display: ['Gloock', 'Georgia', 'Cambria', 'serif'],
				sans: ['Karla', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
			},
			borderRadius: {
				blob: '48% 52% 44% 56% / 52% 44% 56% 48%',
				'blob-inner': '46% 54% 42% 58% / 50% 46% 54% 50%',
			},
			keyframes: {
				rise: {
					'0%': { opacity: '0', transform: 'translateY(14px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
			},
			animation: {
				rise: 'rise 0.5s cubic-bezier(0.22, 1, 0.36, 1) both',
			},
		},
	},
	plugins: [],
}
