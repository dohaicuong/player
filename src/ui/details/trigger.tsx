import { FloatingButton, Tooltip } from '@go1private/react'
import { ContentIcon } from '@go1private/react-icons'
import { css } from '@go1private/styled-system/css'
import { usePlayerContext } from '../../player-context-provider'

const DetailTrigger = () => {
	const { detailsOpen, setDetailsOpen, playState } = usePlayerContext()

	if (detailsOpen) return null

	return (
		<Tooltip position={playState === 'started' ? 'right' : undefined}>
			<Tooltip.Trigger>
				<FloatingButton
					classes={{
						root: css.raw({
							position: 'absolute',
							top: 0,
							left: 0,
							zIndex: '900',
							borderRadius: 0,
							color: {
								_dark: 'text.neutral',
							},
							backgroundColor: 'surface.primary_weakest',
						}),
					}}
					icon={ContentIcon}
					onClick={() => setDetailsOpen(true)}
				/>
			</Tooltip.Trigger>
			<Tooltip.Content>
				<span
					className={css({
						textStyle: 'paragraph_small_regular',
						color: 'text.neutral',
					})}
				>
					Details
				</span>
			</Tooltip.Content>
		</Tooltip>
	)
}

export default DetailTrigger
