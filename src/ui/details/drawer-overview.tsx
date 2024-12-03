import { css } from '@go1private/styled-system/css'
import { usePlayerContext } from '../../player-context-provider'

export const DrawerOverview = () => {
	const { lo } = usePlayerContext()

	return (
		<div className={css({ padding: 'element.large' })}>
			{lo?.relevance?.summary && (
				<div
					className={css({
						marginTop: 'element.large',
						display: 'flex',
						flexDirection: 'column',
						gap: 'element.x_small',
					})}
				>
					<span
						className={css({
							textStyle: 'heading_4',
							color: 'text.neutral',
						})}
					>
						Overview
					</span>
					<span
						className={css({
							textStyle: 'ui_default_regular',
							color: 'text.neutral',
						})}
					>
						{lo.relevance.summary}
					</span>
				</div>
			)}

			{lo?.relevance?.learning_outcomes && (
				<div
					className={css({
						marginTop: 'element.large',
						display: 'flex',
						flexDirection: 'column',
						gap: 'element.x_small',
					})}
				>
					<span
						className={css({
							textStyle: 'heading_4',
							color: 'text.neutral',
						})}
					>
						Outcomes
					</span>
					<ul
						className={css({
							textStyle: 'ui_default_regular',
							color: 'text.neutral',
							listStyleType: 'disc',
							listStylePosition: 'inside',
						})}
					>
						{lo.relevance.learning_outcomes.map((outcome) => (
							<li
								key={outcome}
								className={css({
									_first: { marginTop: 0 },
									marginTop: 'element.large',
								})}
							>
								{outcome}
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	)
}
