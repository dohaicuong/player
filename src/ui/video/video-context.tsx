import { createContext, useContext } from 'react'
import { usePlayerContext } from '../../player-context-provider'

type VideoContext = {
	provider: 'youtube' | 'vimeo' | 'other'
	url: string
}
const VideoContext = createContext<VideoContext>(null!)

export const useVideoContext = () => useContext(VideoContext)

export type VideoContextProviderProps = {
	children?: React.ReactNode
}

export const VideoContextProvider: React.FC<VideoContextProviderProps> = ({
	children,
}) => {
	const { lo } = usePlayerContext()

	// @ts-ignore
	const provider = lo?.protected?.provider

	// @ts-ignore
	const url = lo?.protected?.media?.find((media) => media.key === 'video').value

	if (!provider || !url) {
		return null
	}

	return (
		<VideoContext.Provider value={{ provider, url }}>
			{children}
		</VideoContext.Provider>
	)
}
