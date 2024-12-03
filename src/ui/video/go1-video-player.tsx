import { css } from '@go1private/styled-system/css'
import { useRef } from 'react'
import { StartButton } from '../start-button'
import { useVideoContext } from './video-context'

const Go1VideoPlayer = () => {
	const { url } = useVideoContext()
	const ref = useRef<HTMLVideoElement>(null)

	return (
		<div
			className={css({
				flexGrow: 1,
				position: 'relative',
			})}
		>
			<StartButton onClick={() => ref.current?.play()} />
			<video
				ref={ref}
				controls
				src={url}
				className={css({
					objectFit: 'fill',
					height: '100%',
					width: '100%',
				})}
			>
				<track kind="captions" />
			</video>
		</div>
	)
}

export default Go1VideoPlayer
