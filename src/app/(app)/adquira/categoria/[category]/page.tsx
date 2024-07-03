
import Card from '@/components/Card';
import { Product } from "@/payload-types";
import configPromise from '@payload-config';
import { getPayloadHMR } from '@payloadcms/next/utilities';

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
	return (
		products && products!?.map((product: Product) => {
			return (<Card post={product} key={product.id} />)
		}
		)
	);
}



