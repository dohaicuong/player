import { parseAsString, useQueryState } from 'nuqs'
import { createContext, useContext, useEffect, useState } from 'react'
import { contentGatewayV3 } from './services/content-gateway-v3'

type PlayState = 'loading' | 'ready' | 'started'

type PlayerContext = {
	jwt: string | null
	contentId: string | null
	lo: Lo | undefined

	playState: PlayState
	setPlayState: React.Dispatch<React.SetStateAction<PlayState>>

	detailsOpen: boolean
	setDetailsOpen: React.Dispatch<React.SetStateAction<boolean>>

	onPlay?: () => void
}
const PlayerContext = createContext<PlayerContext>(null!)

export const usePlayerContext = () => useContext(PlayerContext)

type PlayerContextProviderProps = {
	children: React.ReactNode
	onPlay?: () => void
}
export const PlayerContextProvider: React.FC<PlayerContextProviderProps> = ({
	children,
	onPlay,
}) => {
	const [jwt] = useQueryState('jwt', parseAsString)
	const [contentId] = useQueryState('content-id', parseAsString)
	const [playState, setPlayState] = useState<PlayState>('loading')
	const [detailsOpen, setDetailsOpen] = useState(false)

	const [lo, setLo] = useState<Lo>()
	useEffect(() => {
		if (jwt && contentId) {
			contentGatewayV3['/v3/learning-objects/{id}']
				.get({
					headers: { Authorization: `Bearer ${jwt}` },
					params: { id: contentId },
					query: {
						'include[]': ['core', 'protected', 'provider', 'relevance'],
					},
				})
				.json()
				.then((data) => {
					if (data === undefined) throw new Error('Unable to get lo')

					setLo(data)
				})
		}
	}, [jwt, contentId])

	return (
		<PlayerContext.Provider
			value={{
				jwt,
				contentId,
				lo,
				playState,
				setPlayState,
				detailsOpen,
				setDetailsOpen,
				onPlay,
			}}
		>
			{children}
		</PlayerContext.Provider>
	)
}

type Lo = Awaited<ReturnType<typeof getLo>>
const getLo = (jwt: string, id: string) => {
	return contentGatewayV3['/v3/learning-objects/{id}']
		.get({
			headers: { Authorization: `Bearer ${jwt}` },
			params: { id },
			query: {
				'include[]': ['core', 'protected', 'provider', 'generated_metadata'],
			},
		})
		.json()
}
