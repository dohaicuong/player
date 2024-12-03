import { Button } from '@go1private/react'
import { SettingsIcon } from '@go1private/react-icons'
import { css } from '@go1private/styled-system/css'
import { useTheme } from 'next-themes'

export const ThemeSwitchButton = () => {
	const { setTheme } = useTheme()

	return (
		<Button
			variant="tertiary"
			icon={SettingsIcon}
			onClick={() => {
				setTheme((prev) => {
					if (prev === 'light') return 'dark'

					return 'light'
				})
			}}
			classes={{
				root: css.raw({
					_hover: {
						backgroundColor: 'surface.primary_weakest',
					},
				}),
				icon: css.raw({ color: 'text.neutral' }),
			}}
		/>
	)
}
