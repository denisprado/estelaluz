import { getPayloadHMR } from "@payloadcms/next/utilities"
import configPromise from '@payload-config'
import Image from "next/image"
import Link from "next/link"
import { Media } from "@/collections/Media"
import EmblaCarousel from "@/components/EmblaCarousel"

export default async function Work({ params }: { params: { slug: string } }) {


	async function getData(slug: string | null) {
		const payload = await getPayloadHMR({ config: configPromise })
		const data = await payload.find({
			collection: 'work',
			where: {
				slug: {
					equals: slug ?? '',
				}
			},
		})
		return data.docs
	}

	const data = await getData(params.slug)
	console.log(data)

	const work = data[0]
	const gallery = work.gallery
	console.log(gallery)
	return (
		<div className="md:max-w-7xl flex flex-col self-center items-start justify-start w-full ">
			<div className="flex justify-center w-full min-h-96 p-7  mt-8">
				{gallery && <EmblaCarousel slides={gallery} />}
				{/* <Image src={gallery?.url} className="rounded-3xl" fill style={{ objectFit: 'cover' }} alt={work.image.alt}></Image> */}
			</div>
			<div className="flex justify-center w-full p-7">
				<p className="text-5xl">{work?.title as string}</p>
			</div>
			<div className="flex justify-center w-full p-14 gap-8">
				<p className="text-base w-full">{work?.description as string}</p>
				{work.coordenadas?.latitude && work.coordenadas?.longitude && <div className=" w-full border-2 rounded-lg p-4">

					<iframe src={`https://www.google.com/maps/embed/v1/streetview?key=AIzaSyBFQ2XvHhidZ5rCrKnJ9GZMzldlkTUsRKQ&location=${work.coordenadas?.longitude},${work.coordenadas?.latitude}&heading=161&pitch=10&fov=35&`} width="600" height="450" allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
				</div>}
			</div>
			<div className="md:max-w-7xl flex flex-col self-center items-start justify-center w-full">
				<div className="flex justify-center  w-full  p-14">
					<p className="text-3xl">Outros Trabalhos na Categoria {typeof work.category !== 'number' ? work.category?.title : ''}</p>
				</div>
				<div className="min-h-screen w-full ">
					<div className="grid grid-cols-12 p-4 gap-4 w-full flex-wrap">
						{data.map(doc => {
							return (
								<div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 h-28" key={doc.id}>
									{/* <Link href={doc.slug}><Image src={doc.image.thumbnailURL as string} width={300} height={100} alt={doc.title as string} className="rounded-3xl"></Image></Link> */}
									<Link href={doc.slug}>{doc.title as string}</Link>
								</div>
							)
						})}
					</div>
				</div>
			</div>
		</div>
	)
}