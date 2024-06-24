import EmblaCarousel from "@/components/EmblaCarousel";
import { getUrl } from "@/helpers/functions";
import { Work as WorkType } from "@/payload-types";
import configPromise from '@payload-config';
import { getPayloadHMR } from "@payloadcms/next/utilities";
import Image from "next/image";
import Link from "next/link";

export default async function Work({ params }: { params: { slug: string } }) {

	async function getData(slug: string | null, excludeWorkId?: number | null): Promise<WorkType[]> {
		const payload = await getPayloadHMR({ config: configPromise });
		const where: any = {};

		if (excludeWorkId === undefined || excludeWorkId === null) {
			where.slug = {
				equals: slug ?? '',
			};
		}

		if (excludeWorkId !== undefined && excludeWorkId !== null) {
			where.id = {
				not_equals: excludeWorkId,
			};
		}

		const data = await payload.find<'work'>({
			collection: 'work',
			where: where,
		});

		return data.docs as unknown as WorkType[];
	}

	function getThumbSrc(work: WorkType) {
		const gallery = work.gallery;
		if (!gallery) return null;
		const image = gallery[0].image;
		console.log(gallery)
		const src = getUrl(image)
		return src;
	}

	const allWorks = await getData(params.slug);

	// Função de guarda de tipo para coordenadas
	const hasCoordinates = (coordenadas: any): coordenadas is { latitude: string; longitude: string } => {
		return coordenadas && typeof coordenadas.latitude === 'string' && typeof coordenadas.longitude === 'string';
	}

	return (
		<>

			{allWorks.map(async (work: any) => {
				const { title, description, category } = work as WorkType;

				const id = work?.id ? work?.id as number : null;
				const allWorksExceptThis: WorkType[] = await getData(params.slug, id);
				const gallery: WorkType['gallery'] = work?.gallery as WorkType['gallery'];

				return (
					<div key={work.id} className="md:max-w-7xl flex flex-col self-center items-start justify-start w-full">
						<div className="flex justify-center w-full min-h-96 p-4 mt-8">
							<EmblaCarousel gallery={gallery} />
						</div>
						<div className="flex justify-center w-full p-8 mt-4">
							<p className="text-5xl">{title}</p>
						</div>
						<div className="flex justify-center w-full p-8 gap-8">
							<p className="text-base w-full">{description}</p>
							{hasCoordinates(work?.coordenadas) && (
								<div className="w-full border-2 rounded-lg p-2">
									<iframe
										src={`https://www.google.com/maps/embed/v1/streetview?key=AIzaSyBFQ2XvHhidZ5rCrKnJ9GZMzldlkTUsRKQ&location=${work?.coordenadas?.longitude!},${work?.coordenadas?.latitude!}&heading=161&pitch=10&fov=35&`}
										width="600"
										height="450"
										allowFullScreen={true}
										loading="lazy"
										referrerPolicy="no-referrer-when-downgrade"
									></iframe >
								</div >
							)
							}
						</div >
						{
							allWorksExceptThis.length > 0 && (
								<div className="md:max-w-7xl flex flex-col self-center items-start justify-center w-full">
									<div className="flex justify-center w-full p-14 divide-x-4">
										<p className="text-3xl">Outros Trabalhos na Categoria {typeof category !== 'number' ? category?.title! : ''}</p>
									</div>
									<div className="min-h-screen w-full">
										<div className="grid grid-cols-12 p-4 gap-4 w-full flex-wrap">
											{allWorksExceptThis.map((doc) => {
												const src = getThumbSrc(doc);
												return (
													<div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 h-28" key={doc.id}>
														<Link href={doc.slug}><Image loader={() => src!} src={src!} width={300} height={100} alt={doc.title} className="rounded-3xl" /></Link>
														<Link href={doc.slug}>{doc.title}</Link>
													</div>
												);
											})}
										</div>
									</div>
								</div>
							)
						}
					</div >
				);
			})}
		</>
	);
}
