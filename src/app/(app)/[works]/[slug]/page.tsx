import Card from "@/components/Card";
import EmblaCarousel from "@/components/EmblaCarousel";
import { hasCoordinates } from "@/helpers/functions";
import { Work as WorkType } from "@/payload-types";
import configPromise from '@payload-config';
import { getPayloadHMR } from "@payloadcms/next/utilities";
import Map from '@/components/Map'
import { equal } from "assert";

export default async function Work({ params }: { params: { slug: string } }) {

	const allWorks = await getPost(params.slug, 'works');

	return (

		allWorks.map(async (work: any) => {
			const { title, description, category } = work as WorkType;
			const id = work?.id ? work?.id as number : null;
			const allWorksExceptThis: WorkType[] = await getPost(params.slug, 'works', id);
			const gallery: WorkType['gallery'] = work?.gallery as WorkType['gallery'];

			return (
				<div key={work.id} className="md:max-w-7xl flex flex-col self-center items-start justify-start w-full">
					<div className="flex justify-center w-full min-h-96 p-4 mt-8">
						<EmblaCarousel gallery={gallery} />
					</div>
					<div className="flex justify-start w-full p-8 mt-4">
						<p className="text-5xl font-extrabold">{title}</p>
					</div>
					<div className="flex justify-center w-full p-8 gap-8">
						<p className="text-base w-full">{description}</p>
						<Map hasCoordinates={hasCoordinates} work={work}></Map>
					</div>
					{
						allWorksExceptThis.length > 0 && (
							<div className="md:max-w-7xl flex flex-col self-center items-start justify-center w-full">
								<div className="flex justify-center w-full p-14 divide-x-4">
									<p className="text-3xl">Outros Trabalhos na Categoria {typeof category !== 'number' ? category?.title! : ''}</p>
								</div>
								<div className="min-h-screen w-full">
									<div className="grid grid-cols-12 p-4 gap-4 w-full flex-wrap">
										{allWorksExceptThis.map((work) =>
											<Card post={work} />
										)}
									</div>
								</div>
							</div>
						)
					}
				</div >
			);
		})
	);
}


async function getPost(slug: string | null, collection: string, excludeWorkId?: number | null): Promise<WorkType[]> {
	const payload = await getPayloadHMR({ config: configPromise });
	const where: any = {};

	if (excludeWorkId === undefined || excludeWorkId === null) {
		where.slug = {
			equal: slug
		};
	}

	if (excludeWorkId !== undefined && excludeWorkId !== null) {
		where.id = {
			not_equals: excludeWorkId,
		};
	}

	const data = await payload.find({
		collection: collection,
		where: where,
	});

	return data.docs as unknown as WorkType[];
}