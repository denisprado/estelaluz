
import { CategoryWork, Work as WorkType } from "@/payload-types";
import { getPayloadHMR } from "@payloadcms/next/utilities";
import config from "@payload-config";
import Card from '@/components/Card';
import Loading from "../../loading";
import PageContainer from "@/components/PageContainer";
import CardListContainer from "@/components/CardListContainer";
import { PageTitle } from "@/components/PageTitle";
import { Pagination } from '@/components/Pagination'
import { PaginatedDocs, TypeWithID } from "payload";
import configPromise from '@payload-config'
import qs from 'qs'

export const dynamic = 'force-static'
export const revalidate = 600
const LIMIT = 8

async function getPost(cat: string, collection: string, pageNumber: number): Promise<[WorkType[], PaginatedDocs<any>, (Record<string, unknown> & TypeWithID)]> {
	const payload = await getPayloadHMR({ config })
	console.log(cat)
	const category = await payload.find({
		collection: 'categoryWork',
	})

	const catDocs = category.docs
	const catDoc = catDocs.filter((catDoc) => {
		return catDoc?.slug! === cat
	})

	const query = {
		category: {
			equals: catDoc[0]?.id!
		},
	}
	const stringifiedQuery = qs.stringify(
		{
			where: query,
			limit: LIMIT,
			sort: 'sticky',
			page: pageNumber,
		},
		{ addQueryPrefix: true },
	)

	const works = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL
		}/api/works${stringifiedQuery}&depth=2`,
	)?.then(res => res.json())

	const docs: WorkType[] = works.docs as unknown as WorkType[]

	return [docs, works, catDoc[0]]
}


export default async function Work({ params: { worksCat, pageNumber = 2 } }: { params: { worksCat: string; pageNumber: number }; }) {
	const [docs, works, catDoc] = await getPost(worksCat, 'works', pageNumber);
	const categoryTitle = catDoc.title as string

	if (!docs) {
		return <Loading />;
	}
	return (
		<PageContainer>
			<PageTitle align="start">{categoryTitle}</PageTitle>
			<div className="w-full">
				<CardListContainer>
					{docs && docs!?.map((work: WorkType) =>
						<Card post={work} key={work.id} />
					)}
				</CardListContainer>
				<>
					{works.totalPages > 1 && <Pagination page={works.page!} totalPages={works.totalPages} category={worksCat} />}
				</>
			</div>
		</PageContainer>
	);
}

export async function generateStaticParams({ params: { worksCat, pageNumber = 2 } }: { params: { worksCat: string; pageNumber: number }; }) {
	const payload = await getPayloadHMR({ config: configPromise })
	const posts = await payload.find({
		collection: 'works',
		depth: 0,
		limit: LIMIT,
		page: pageNumber,
		where: {
			category: {
				// nested property name to filter on
				all: {
					slug: {
						equals: worksCat
					},
				}// operator to use and boolean value that needs to be true
			},
		}
	})

	const pages = []

	for (let i = 1; i <= posts.totalPages; i++) {
		pages.push(i)
	}

	return pages
}

