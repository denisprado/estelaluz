
import { Work as WorkType } from "@/payload-types";
import configPromise from '@payload-config';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import Card from '@/components/Card';
import Loading from "./loading";
import PageContainer from "@/components/PageContainer";
import CardListContainer from "@/components/CardListContainer";
import { PageTitle } from "@/components/PageTitle";

async function getPost(cat: string, collection: string): Promise<WorkType[] | WorkType[]> {
	const payload = await getPayloadHMR({ config: configPromise })
	const posts = await payload.find({
		collection: collection,
		// where: {
		// 	'category.slug': {
		// 		equals: cat,
		// 	}
		// },
	})
	const docs: WorkType[] = posts.docs as unknown as WorkType[]

	const dataOfPost = docs.filter((doc) => {
		const category = doc.category
		return category && typeof category !== 'number' && category?.slug! === cat
	})
	return dataOfPost as unknown as WorkType[]

}




export default async function Work({ params }: { params: { works: string; }; }) {
	const works = await getPost(params.works, 'works') as WorkType[];

	if (!works) {
		return <Loading />;
	}

	return (
		<PageContainer>
			<PageTitle>{params.works}</PageTitle>
			<div className="min-h-screen w-full ">
				<CardListContainer>
					{works && works!?.map((work: WorkType) =>
						<Card category={params.works!} post={work} key={work.id} />
					)}
				</CardListContainer>
			</div>
		</PageContainer>
	);
}



