import { css } from '@go1private/styled-system/css'
import { usePlayerContext } from '../../player-context-provider'

const VideoTitle = () => {
	const { lo, playState, detailsOpen } = usePlayerContext()

	if (playState === 'started') return null
	if (detailsOpen) return null

	return (
		<div
			className={css({
				position: 'absolute',
				top: 0,
				left: 64,
				height: 48,

				display: 'flex',
				alignItems: 'center',
				gap: '050',
				padding: '150',
			})}
		>
			{lo?.core?.title && (
				<span
					className={css({
						textStyle: 'ui_default_bold',
						color: 'text.neutral_on_dark',
					})}
				>
					{lo.core.title}
				</span>
			)}
			{lo?.provider?.name && (
				<span
					className={css({
						textStyle: 'ui_default_regular',
						color: 'text.neutral_on_dark',
					})}
				>
					{' '}
					By {lo.provider.name}
				</span>
			)}
		</div>
	)
}

export default VideoTitle
