import { createContext, useContext, useState } from 'react'
import { usePlayerContext } from '../../player-context-provider'

type VideoContext = {
	provider: 'youtube' | 'vimeo' | 'other'
	url: string
	progress?: number
	setProgress: (progress: number) => void
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
	const [progress, setProgress] = useState<number>()

	// @ts-ignore
	const provider = lo?.protected?.provider

	// @ts-ignore
	const url = lo?.protected?.media?.find((media) => media.key === 'video').value

	if (!provider || !url) {
		return null
	}

	return (
		<VideoContext.Provider value={{ provider, url, progress, setProgress }}>
			{children}
		</VideoContext.Provider>
	)
}
