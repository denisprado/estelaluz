import Card from "@/components/Card";
import EmblaCarousel from "@/components/EmblaCarousel";
import { hasCoordinates } from "@/helpers/functions";
import { Work as WorkType } from "@/payload-types";
import configPromise from '@payload-config';
import { getPayloadHMR } from "@payloadcms/next/utilities";
import Map from '@/components/Map'
import PageContainer from "@/components/PageContainer";
import CardListContainer from "@/components/CardListContainer";
import { PageTitle } from "@/components/PageTitle";


export default async function Work({ params }: { params: { slug: string } }) {

	const allWorks = await getPost(params.slug, 'works');

	return (

		allWorks.map(async (work: any) => {
			const { title, description, category } = work as WorkType;
			const id = work?.id ? work?.id as number : null;
			const allWorksExceptThis: WorkType[] = await getPost(params.slug, 'works', id);
			const gallery: WorkType['gallery'] = work?.gallery as WorkType['gallery'];

			return (
				<PageContainer key={work.id} className="mt-8">
					<div className="flex justify-center w-full min-h-96">
						<EmblaCarousel gallery={gallery} />
					</div>

					<PageTitle caps={''} align="start">{title}</PageTitle>

					<div className="grid grid-cols-12 border justify-center w-full gap-8">
						<div className="col-span-7">
							<p className="text-base">{description}</p>
						</div>
						<div className="col-span-5">
							<Map hasCoordinates={hasCoordinates} work={work}></Map>
						</div>
					</div>

					{
						allWorksExceptThis.length > 0 && (
							<PageContainer>
								<div className="flex justify-center w-full p-14 divide-x-4">
									<p className="text-3xl">Outros Trabalhos na Categoria {typeof category !== 'number' ? category?.title! : ''}</p>
								</div>
								<div className="w-full">
									<CardListContainer>
										{allWorksExceptThis.map((work) =>
											<Card post={work} key={work.id} />
										)}
									</CardListContainer>
								</div>
							</PageContainer>
						)
					}
				</PageContainer >
			);
		})
	);
}


async function getPost(slug: string | null, collection: string, excludeWorkId?: number | null): Promise<WorkType[]> {
	const payload = await getPayloadHMR({ config: configPromise });
	const where: any = {};

	if (excludeWorkId === undefined || excludeWorkId === null) {
		where.slug = {
			// equals: slug
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

	const dataOfPost = data.docs.filter(doc => doc.slug === slug)

	return excludeWorkId ? data.docs as unknown as WorkType[] : dataOfPost as unknown as WorkType[];
}