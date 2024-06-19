"use client"
import React, { useState, useEffect, useCallback } from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import { Thumb } from './ThumbsButton'
import { Work } from '@/payload-types'
import Image from 'next/image'
type PropType = {
	slides: Work['gallery']
	options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = (props) => {
	const { slides, options } = props
	const [selectedIndex, setSelectedIndex] = useState(0)
	const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options)
	const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
		containScroll: 'keepSnaps',
		dragFree: true
	})

	const onThumbClick = useCallback(
		(index: number) => {
			if (!emblaMainApi || !emblaThumbsApi) return
			emblaMainApi.scrollTo(index)
		},
		[emblaMainApi, emblaThumbsApi]
	)

	const onSelect = useCallback(() => {
		if (!emblaMainApi || !emblaThumbsApi) return
		setSelectedIndex(emblaMainApi.selectedScrollSnap())
		emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap())
	}, [emblaMainApi, emblaThumbsApi, setSelectedIndex])

	useEffect(() => {
		if (!emblaMainApi) return
		onSelect()

		emblaMainApi.on('select', onSelect).on('reInit', onSelect)
	}, [emblaMainApi, onSelect])

	return (
		<div className="embla">
			<div className="embla__viewport" ref={emblaMainRef}>
				<div className="embla__container">
					{slides!?.map((slide) => {
						const src = typeof slide.image !== 'number' ? slide.image.url : ''
						return (
							<div className="embla__slide" key={slide?.id!!}>
								<div className="embla__slide__number">
									<Image src={src!} className="rounded-3xl w-full" fill style={{ objectFit: 'cover' }} alt={slide?.caption!}></Image>
								</div>
							</div>
						)
					})}
				</div>
			</div>

			<div className="embla-thumbs">
				<div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
					<div className="embla-thumbs__container">
						{slides!.map((slide, i) => {
							const src = typeof slide.image !== 'number' ? slide.image.thumbnailURL : ''
							return (
								<Thumb
									key={slide!.id}
									onClick={() => onThumbClick(i)}
									selected={i === selectedIndex}
									index={i}
									src={src!}
								/>
							)
						})}
					</div>
				</div>
			</div>
		</div>
	)
}

export default EmblaCarousel
