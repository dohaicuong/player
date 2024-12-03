import { ProgressBar } from '@go1private/react'
import { css } from '@go1private/styled-system/css'
import { usePlayerContext } from '../../player-context-provider'
import { useVideoContext } from '../video/video-context'

export const DrawerTitle = () => {
	const { lo } = usePlayerContext()
	const { progress } = useVideoContext()
	const progressNumber = `${Math.round((progress || 0) * 100).toFixed(0)}% progress`

	return (
		<div
			className={css({
				padding: '200',
				paddingBottom: 'element.medium',
				marginTop: '025',
				borderBottomWidth: '100',
				borderBottomStyle: 'solid',
				borderBottomColor: 'border.neutral',
			})}
		>
			<span
				className={css({
					textStyle: 'heading_4',
					color: 'text.neutral',
					lineClamp: 1,
				})}
			>
				{lo?.core?.title}
			</span>
			<span
				className={css({
					textStyle: 'ui_tiny_regular',
					color: 'text.neutral',
				})}
			>
				{[lo?.provider?.name, lo?.core?.type, lo?.relevance?.duration]
					.filter(Boolean)
					.join(' · ')}
			</span>

			<div
				className={css({
					marginTop: 'element.medium',
					display: 'flex',
					gap: 'element.small',
					alignItems: 'center',
					textStyle: 'ui_tiny_regular',
					color: 'text.neutral',
				})}
			>
				<ProgressBar
					progressPercentage={progress || 0}
					classes={{
						bar: css.raw({
							backgroundColor: 'surface.success_strong',
						}),
					}}
				/>
				<span className={css({ whiteSpace: 'nowrap' })}>{progressNumber}</span>
			</div>
		</div>
	)
}
