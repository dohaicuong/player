import { Button } from '@go1private/react'
import { CrossIcon, FlagIcon, StarIcon } from '@go1private/react-icons'
import { css } from '@go1private/styled-system/css'
import { Go1Icon } from '../../components/go1-icon'
import { usePlayerContext } from '../../player-context-provider'
import { ThemeSwitchButton } from '../theme-switch-button'

export const DrawerToolbar = () => {
	const { setDetailsOpen } = usePlayerContext()

	return (
		<div
			className={css({
				display: 'flex',
				paddingLeft: 'element.medium',
				alignItems: 'center',
			})}
		>
			<Go1Icon />
			<div className={css({ flexGrow: 1 })} />
			<ThemeSwitchButton />
			<Button
				variant="tertiary"
				icon={StarIcon}
				classes={{
					root: css.raw({
						_hover: {
							backgroundColor: 'surface.primary_weakest',
						},
					}),
					icon: css.raw({ color: 'text.neutral' }),
				}}
			/>
			<Button
				variant="tertiary"
				icon={FlagIcon}
				classes={{
					root: css.raw({
						_hover: {
							backgroundColor: 'surface.primary_weakest',
						},
					}),
					icon: css.raw({ color: 'text.neutral' }),
				}}
			/>
			<Button
				variant="tertiary"
				icon={CrossIcon}
				classes={{
					root: css.raw({
						_hover: {
							backgroundColor: 'surface.primary_weakest',
						},
					}),
					icon: css.raw({ color: 'text.neutral' }),
				}}
				onClick={() => setDetailsOpen(false)}
			/>
		</div>
	)
}
