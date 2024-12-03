import { css } from '@go1private/styled-system/css'
import { Suspense, lazy } from 'react'
import { usePlayerContext } from './player-context-provider'

const VideoUI = lazy(() => import('./ui/video'))
const InteractiveUI = lazy(() => import('./ui/interactive'))

export const App = () => {
	const { lo } = usePlayerContext()

	return (
		<Suspense>
			<div className={css({ width: '100vw', height: '100vh' })}>
				{lo?.core?.type === 'video' && <VideoUI />}
				{lo?.core?.type === 'interactive' && <InteractiveUI />}
			</div>
		</Suspense>
	)
}
