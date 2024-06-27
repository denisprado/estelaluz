
import { CategoryProduct, Product } from "@/payload-types";
import configPromise from '@payload-config';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import Card from '@/components/Card';
import { getCategories } from "@/helpers/functions";
import Link from "next/link";

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


export default async function ProductPage({
	params,
}: {
	params?: {
		category?: string;
	};
}) {

	const products = await getPosts(params?.category!, 'products') as Product[];
	const productCategories = await getCategories('categoryProduct') as Product[];

	return (
		<div className="md:max-w-7xl flex flex-col items-start justify-center w-full gap-8">
			<div className="flex flex-col gap-8 justify-center w-full pt-8 md:w-1/2">
				<p className="text-3xl">
					ADQUIRA UMA OBRA
				</p>
				<p>Cada peça que compartilho com vocês é uma extensão da minha jornada pessoal e das minhas experiências de vida. Meus murais capturam a essência das histórias que encontro ao longo do caminho, enquanto minhas pinturas exploram a interação entre forma e cor em um espaço ampliado.</p>
			</div>

			<div className="flex flex-col sm:flex-row gap-4">
				<Link href={'/adquira/todos'} className="uppercase font-bold">todos</Link>
				{productCategories.map(cat => {

					return (
						<Link href={cat?.slug!} key={cat.id} className="uppercase font-bold">{cat.title}</Link>
					)
				})}
			</div>


			<div className="grid grid-cols-12 gap-4 w-full flex-wrap">
				{products && products!?.map((product: Product) => {
					const category = product.product_category
					const { slug } = category as CategoryProduct
					return (<Card category={slug!} post={product} key={product.id} />)
				}
				)}
			</div>

		</div>
	);
}



