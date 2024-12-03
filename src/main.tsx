import { NuqsAdapter } from 'nuqs/adapters/react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { App } from './App.tsx'
import './index.css'
import { ThemeProvider } from 'next-themes'
import { PlayerContextProvider } from './player-context-provider.tsx'

const root = document.getElementById('root')
if (!root) throw new Error('Not found root element with id root!')
createRoot(root).render(
	<StrictMode>
		<ThemeProvider attribute="class">
			<NuqsAdapter>
				<PlayerContextProvider>
					<App />
				</PlayerContextProvider>
			</NuqsAdapter>
		</ThemeProvider>
	</StrictMode>,
)
