import { FloatingButton } from '@go1private/react'
import { PlayIcon } from '@go1private/react-icons'
import { css } from '@go1private/styled-system/css'
import { usePlayerContext } from '../player-context-provider'

export const StartButton: React.FC<
	React.ComponentProps<typeof FloatingButton>
> = (props) => {
	const { playState, setPlayState, onPlay } = usePlayerContext()

	if (playState === 'started') return null

	return (
		<div
			className={css({
				position: 'absolute',
				top: 0,
				left: 0,
				bottom: 0,
				right: 0,
				zIndex: 899,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			})}
		>
			<FloatingButton
				{...props}
				type="button"
				icon={PlayIcon}
				onClick={(e) => {
					setPlayState('started')
					onPlay?.()
					props.onClick?.(e)
				}}
			>
				Start
			</FloatingButton>
		</div>
	)
}
