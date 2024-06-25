import Link from "next/link";

import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import Image from "next/image";
import { Work as WorkType } from "@/payload-types";
import { getUrl } from "@/helpers/functions";
import imageLoader from "@/helpers/loader";

async function getworks(cat: string): Promise<WorkType[]> {
	const payload = await getPayloadHMR({ config: configPromise })
	const works = await payload.find({
		collection: 'works',
		where: {
			'category.slug': {
				equals: cat ?? '',
			}
		},
	})
	return works.docs as unknown as WorkType[]
}

function getThumbSrc(work: WorkType) {
	const gallery = work.gallery!
	const image = gallery[0].image
	const src = getUrl(image)
	return src;
}

export default async function Work({ params }: { params: { work: string } }) {
	const works = await getworks(params.work)
	return (
		<div className="md:max-w-7xl flex flex-col self-center items-start justify-center w-full">
			<div className="flex justify-center  w-full  p-14">
				<p className="text-5xl">
					{params.work!.toUpperCase()}
				</p>
			</div>
			<div className="min-h-screen w-full ">
				<div className="grid grid-cols-12 p-4 gap-4 w-full flex-wrap">
					{works && works!?.map((work: WorkType) => {
						const src = getThumbSrc(work)
						return (
							src! && <Link href={params.work! + '/' + work.slug!} className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 flex flex-col gap-2">
								<div className="w-full h-[300px] relative overflow-hidden " key={work.id!}>
									<Image src={src!} alt={work.title!} className="rounded-3xl w-full h-full" fill style={{ objectFit: 'cover' }}>
									</Image>
								</div>
								<div>{work.title!}</div>
							</Link>
						)
					})}
				</div>
			</div>
		</div >
	)
}