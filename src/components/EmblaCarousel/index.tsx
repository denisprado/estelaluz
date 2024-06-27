'use client'
import React, { useState, useEffect, useCallback } from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import { Thumb } from './ThumbsButton'
import { Media, Work } from '@/payload-types'
import Image from 'next/image'
import imageLoader from '@/helpers/loader'
type PropType = {
	gallery: Work['gallery']
	options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = (props) => {
	const { gallery, options } = props
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

	function getUrl(image: Media | number) {
		// const src =
		//   typeof image !== "number"
		//     ? `https://s3.amazonaws.com/` + "estelaluz" + "/" + image?.filename!
		//     : "/media/";
		const src = typeof image !== "number" ? image?.filename! : "/media/";
		return src;
	}
	return (
		<div className="embla">
			<div className="embla__viewport" ref={emblaMainRef}>
				<div className="embla__container">
					{gallery!?.map((slide) => {
						const src = getUrl(slide.image)
						return (
							<div className="embla__slide" key={slide?.id!!}>
								<div className="embla__slide__number">
									<Image priority loader={imageLoader} src={src!} className="rounded-3xl w-full" fill style={{ objectFit: 'cover' }} alt={""}></Image>
								</div>
							</div>
						)
					})}
				</div>
			</div>

			{gallery!.length > 1 && <div className="embla-thumbs">
				<div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
					<div className="embla-thumbs__container">
						{gallery!.map((slide, i) => {
							const src = getUrl(slide.image)
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
			</div>}
		</div>
	)
}

export default EmblaCarousel
