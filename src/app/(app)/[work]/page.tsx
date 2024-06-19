import Link from "next/link";

import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import Image from "next/image";
import { CategoryWork } from "@/collections/CategoryWork";

async function getData(cat: string) {
	const payload = await getPayloadHMR({ config: configPromise })
	const data = await payload.find({
		collection: 'work',
		where: {
			'category.slug': {
				equals: cat ?? '',
			}
		},
	})
	return data.docs
}


export default async function Work({ params }: { params: { work: string } }) {
	const data = await getData(params.work)
	return (
		<div className="md:max-w-7xl flex flex-col self-center items-start justify-center w-full">
			<div className="flex justify-center  w-full  p-14">
				<p className="text-5xl">{params.work}</p>
			</div>
			<div className="min-h-screen w-full ">
				<div className="grid grid-cols-12 p-4 gap-4 w-full flex-wrap">
					{data.map(doc => {
						return (
							<div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 h-28" key={doc.id}>
								{/* <Link href={params.work + '/' + doc.slug}><Image src={doc.image.thumbnailURL as string} width={300} height={100} alt={doc.title as string} className="rounded-3xl"></Image></Link> */}
								<Link href={params.work + '/' + doc.slug}>{doc.title as string}</Link>
							</div>
						)
					})}
				</div>
			</div>
		</div>
	)
}