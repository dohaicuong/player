import { css } from '@go1private/styled-system/css'
import { Suspense, lazy } from 'react'
import DetailTrigger from '../details/trigger'
import { VideoContextProvider, useVideoContext } from './video-context'
import VideoTitle from './video-title'

const DetailsDrawer = lazy(() => import('../details/drawer'))

const VideoUI = () => {
	return (
		<VideoContextProvider>
			<div
				className={css({
					width: '100%',
					height: '100%',
					display: 'flex',
				})}
			>
				<VideoTitle />

				<DetailTrigger />
				<Suspense>
					<DetailsDrawer />
				</Suspense>
				{/* <HoverLoad
					trigger={<DetailTrigger />}
					content={
						<Suspense>
							<DetailsDrawer />
						</Suspense>
					}
				/> */}

				<Suspense>
					<Player />
				</Suspense>
			</div>
		</VideoContextProvider>
	)
}

export default VideoUI

const Go1VideoPlayer = lazy(() => import('./go1-video-player'))
const IframeVideoPlayer = lazy(() => import('./iframe-video-player'))

const Player = () => {
	const { provider } = useVideoContext()

	if (['youtube', 'vimeo'].includes(provider)) {
		return <IframeVideoPlayer />
	}

	return <Go1VideoPlayer />
}
