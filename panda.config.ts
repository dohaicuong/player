import { go1dPreset } from '@go1private/foundation'
import { defineConfig } from '@pandacss/dev'

export default defineConfig({
	preflight: true,
	presets: [go1dPreset],

	include: [
		'./node_modules/@go1private/react/dist/panda.buildinfo.json',
		'./src/**/*.{js,jsx,ts,tsx}',
	],

	importMap: '@go1private/styled-system',
	outdir: 'styled-system',
})
