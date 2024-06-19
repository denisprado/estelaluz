import Link from "next/link";

import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import Image from "next/image";
import { CategoryWork } from "@/collections/CategoryWork";
import { Work as WorkType } from "@/payload-types";

async function getworks(cat: string) {
	const payload = await getPayloadHMR({ config: configPromise })
	const works = await payload.find({
		collection: 'work',
		where: {
			'category.slug': {
				equals: cat ?? '',
			}
		},
	})
	return works.docs
}

function getThumbSrc(work: WorkType) {
	const gallery = work.gallery
	console.log(gallery)
	if (!gallery) return (null)
	const image = gallery[0].image
	const src = typeof image !== 'number' ? image.thumbnailURL : '/media/'
	return src
}


export default async function Work({ params }: { params: { work: string } }) {
	const works = await getworks(params.work)
	return (
		<div className="md:max-w-7xl flex flex-col self-center items-start justify-center w-full">
			<div className="flex justify-center  w-full  p-14">
				<p className="text-5xl">{params.work}</p>
			</div>
			<div className="min-h-screen w-full ">
				<div className="grid grid-cols-12 p-4 gap-4 w-full flex-wrap">
					{works && works!?.map((work: WorkType) => {
						const src = getThumbSrc(work)
						return (
							src && <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 h-28" key={work.id}>
								<Link href={params.work + '/' + work.slug}><Image src={src!} width={300} height={100} alt={work.title} className="rounded-3xl"></Image></Link>
								<Link href={params.work + '/' + work.slug}>{work.title}</Link>
							</div>
						)
					})}
				</div>
			</div>
		</div>
	)
}