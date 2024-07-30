import Card from "@/components/Card";
import EmblaCarousel from "@/components/EmblaCarousel";
import { CategoryWork, Work as WorkType } from "@/payload-types";
import config from "@payload-config";
import { getPayloadHMR } from "@payloadcms/next/utilities";
import CardListContainer from "@/components/CardListContainer";
import Map from '@/components/Map';
import PageContainer from "@/components/PageContainer";
import { PageTitle } from "@/components/PageTitle";
import { serializeLexical } from "@/helpers/serialize";
import { TypeWithID } from "payload";


export default async function Work({ params }: { params: { slug: string, worksCat: string } }) {

	const allWorks = await getPost(params.slug, 'works');

	const cat = allWorks[0]?.category && typeof allWorks[0]?.category !== 'number' && allWorks[0]?.category !== undefined && allWorks[0]?.category !== null ? allWorks[0]?.category : {} as CategoryWork

	const allWorksExceptThis: WorkType[] = await getPost(params.slug, 'works', allWorks[0]?.id, cat);

	return (

		allWorks.map(async (work: WorkType) => {
			const { title, description, technical_description, category, mapUrl } = work as WorkType;

			const gallery: WorkType['gallery'] = work?.gallery as WorkType['gallery'];


			return (
				<PageContainer key={work.id} className="mt-4">
					<div className="flex justify-center w-full min-h-96 relative">
						<EmblaCarousel gallery={gallery} tech_description={technical_description && serializeLexical({ nodes: technical_description?.root?.children })} />

					</div>

					<PageTitle align="start">{title}</PageTitle>

					<div className="grid grid-cols-12 justify-center w-full gap-4 md:gap-4 lg:gap-6">
						<div className="col-span-full">
							{serializeLexical({ nodes: description!?.root?.children })}
						</div>
						{mapUrl && <div className={"col-span-full"}>
							<Map work={work} height="800px"></Map>
						</div>}
					</div>

					{
						allWorksExceptThis.length > 0 && (
							<PageContainer>
								<div className="flex justify-start w-full pt-12 pb-6">
									<p className="text-3xl">Outros trabalhos na categoria {typeof category !== 'number' ? category?.title! : ''}</p>
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


async function getPost(slug: string | null, collection: string, excludeWorkId?: number | null, category?: CategoryWork): Promise<WorkType[]> {
	const payload = await getPayloadHMR({ config });
	const where: any = {};

	if (excludeWorkId === undefined || excludeWorkId === null) {
		// where.slug = {
		// 	equals: slug
		// };

	}

	if (excludeWorkId !== undefined && excludeWorkId !== null) {
		where.id = {
			not_equals: excludeWorkId,
		};

	}

	const data = await payload.find({
		collection: collection,
		where: where,
		sort: 'sticky',
	});


	const dataOfPost = data.docs.filter(doc => doc.slug === slug)

	const dataOfSameInCat = data.docs.filter((doc: Record<string, unknown> & TypeWithID | WorkType) => {
		const cat = doc.category as CategoryWork
		const isSameCat = cat?.id === category?.id!
		return isSameCat
	})

	return excludeWorkId ? dataOfSameInCat.slice(0, 4) as unknown as WorkType[] : dataOfPost.slice(0, 1) as unknown as WorkType[];
}