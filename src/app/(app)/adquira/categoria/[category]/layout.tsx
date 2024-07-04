import CardListContainer from "@/components/CardListContainer";
import LayoutContainer from "@/components/LayoutContainer";
import PageContainer from "@/components/PageContainer";
import { PageTitle } from "@/components/PageTitle";
import ProductCategories from "@/components/ProductCategories";
import { getCategories } from "@/helpers/functions";
import { Product } from "@/payload-types";
import configPromise from '@payload-config';
import { getPayloadHMR } from "@payloadcms/next/utilities";

async function getPosts(cat: string, collection: string): Promise<Product[] | Product[]> {
	const payload = await getPayloadHMR({ config: configPromise })
	const posts = await payload.find({
		collection: collection,
		// where: {
		// 	"product_category.slug": {
		// 		equals: cat ? cat : null,
		// 	}
		// },
	})
	//console.log(posts.docs[0]?.product_category!)
	const docs: Product[] = posts.docs as unknown as Product[]
	const dataOfPost = cat !== 'todos' ? docs.filter((doc) => {
		const productCategory: Product['product_category'] = doc.product_category as unknown as Product['product_category']
		return (typeof productCategory !== 'number' && productCategory.slug === cat)
	}) : docs

	return dataOfPost as unknown as Product[]
}

export default async function RootLayout({
	children, params,
}: Readonly<{
	children: React.ReactNode;
	params?: {
		category?: string;
	};
}>) {
	const productCategories = await getCategories('categoryProduct') as Product[];
	return (
		<LayoutContainer>
			<div className="md:max-w-7xl flex flex-col self-start items-start justify-start w-full">
				<PageContainer>
					<div className="flex flex-col gap-8 justify-start w-full py-8 md:w-1/2">

						<PageTitle align="start">
							ADQUIRA UMA OBRA
						</PageTitle>
						<p>Cada peça que compartilho com vocês é uma extensão da minha jornada pessoal e das minhas experiências de vida. Meus murais capturam a essência das histórias que encontro ao longo do caminho, enquanto minhas pinturas exploram a interação entre forma e cor em um espaço ampliado.</p>

						<ProductCategories productCategories={productCategories}></ProductCategories>
					</div>
					<CardListContainer>
						{children}
					</CardListContainer>
				</PageContainer>
			</div>
		</LayoutContainer >
	);
}