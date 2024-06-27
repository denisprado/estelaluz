
import { Work as WorkType } from "@/payload-types";
import configPromise from '@payload-config';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import Card from '@/components/Card';

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
	console.log(docs)
	const dataOfPost = docs.filter((doc) => {
		const category = doc.category
		return category && typeof category !== 'number' && category?.slug! === cat
	})
	return dataOfPost as unknown as WorkType[]

}

export default async function Work({ params }: { params: { works: string; }; }) {
	const works = await getPost(params.works, 'works') as WorkType[];
	return (
		<div className="md:max-w-7xl flex flex-col self-center items-start justify-center w-full">
			<div className="flex justify-center  w-full  p-14">
				<p className="text-5xl">
					{params.works!.toUpperCase()}
				</p>
			</div>
			<div className="min-h-screen w-full ">
				<div className="grid grid-cols-12 p-4 gap-4 w-full flex-wrap">
					{works && works!?.map((work: WorkType) =>
						<Card category={params.works!} post={work} key={work.id} />
					)}
				</div>
			</div>
		</div>
	);
}



