
import Card from '@/components/Card';
import { Product } from "@/payload-types";
import { getPayloadHMR } from "@payloadcms/next/utilities";
import config from "@payload-config";


async function getPosts(cat: string, collection: string): Promise<Product[] | Product[]> {
	const payload = await getPayloadHMR({ config })
	const posts = await payload.find({
		collection: collection,
		// where: {
		// 	"category.slug": {
		// 		equals: cat ? cat : null,
		// 	}
		// },
	})
	//console.log(posts.docs[0]?.category!)
	const docs: Product[] = posts?.docs! as unknown as Product[]
	const dataOfPost = cat !== 'todos' ? docs.filter((doc) => {
		const productCategory: Product['category'] = doc.category as unknown as Product['category']
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



