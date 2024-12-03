import { css } from '@go1private/styled-system/css'
import { usePlayerContext } from '../../player-context-provider'
import { DrawerOverview } from './drawer-overview'
import { DrawerTitle } from './drawer-title'
import { DrawerToolbar } from './drawer-toolbar'

const DetailsDrawer = () => {
	const { detailsOpen } = usePlayerContext()

	if (!detailsOpen) return null

	return (
		<div
			className={css({
				flexBasis: 393,
				flexShrink: 0,
				background: 'surface.neutral',
				borderRightStyle: 'solid',
				borderRightWidth: '100',
				borderRightColor: 'border.neutral',
			})}
		>
			<DrawerToolbar />
			<DrawerTitle />
			<DrawerOverview />
		</div>
	)
}

export default DetailsDrawer
