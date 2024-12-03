import { css } from '@go1private/styled-system/css'
import { useVideoContext } from './video-context'

const IframeVideoPlayer = () => {
	const { url } = useVideoContext()

	const src = `${url.replace(/watch..=/, 'embed/')}?enablejsapi=1`
	return (
		<iframe
			src={src}
			allowFullScreen
			title="go1 content"
			className={css({
				height: '100%',
				width: '100%',
			})}
		/>
	)
}

export default IframeVideoPlayer
