import { useState } from 'react'

export type HoverLoadProps = {
	trigger: React.ReactNode
	content: React.ReactNode
}

export const HoverLoad: React.FC<HoverLoadProps> = ({ trigger, content }) => {
	const [load, setLoad] = useState(false)

	if (!load) {
		return <div onMouseEnter={() => setLoad(true)}>{trigger}</div>
	}

	return (
		<>
			{trigger}
			{content}
		</>
	)
}
