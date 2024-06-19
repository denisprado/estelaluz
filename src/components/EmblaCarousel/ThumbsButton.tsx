import React from 'react'
import Image from 'next/image'
type PropType = {
	selected: boolean
	index: number
	onClick: () => void
	src: string
}

export const Thumb: React.FC<PropType> = (props) => {
	const { selected, index, onClick, src } = props

	return (
		<div
			className={'embla-thumbs__slide'.concat(
				selected ? ' embla-thumbs__slide--selected' : ''
			)}
		>
			<button
				onClick={onClick}
				type="button"
				className="embla-thumbs__slide__number"
			>
				<Image src={process.env.NEXT_PUBLIC_SERVER_URL + src!} className="rounded-3xl w-full" fill style={{ objectFit: 'cover' }} alt={'Image'}></Image>
			</button>
		</div>
	)
}
