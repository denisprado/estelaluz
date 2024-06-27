import Card from "@/components/Card";
import EmblaCarousel from "@/components/EmblaCarousel";
import { Product, Work } from "@/payload-types";
import configPromise from '@payload-config';
import { getPayloadHMR } from "@payloadcms/next/utilities";

export default async function ProductPage({ params }: { params: { slug: string } }) {
	const allProducts = await getPost(params.slug, 'products');
	return (
		allProducts.map(async (product: any) => {
			const { title, description, product_category, price } = product as Product;
			const id = product?.id ? product?.id as number : null;
			const allProductsExceptThis: Product[] = await getPost(params.slug, 'products', id);
			const gallery: Product['gallery'] = product?.gallery as Product['gallery'];
			return (
				<div key={product.id} className="md:max-w-7xl flex flex-col sm:flex-row  items-start justify-start w-full gap-16 mt-8">
					<div className="flex justify-center w-1/2 min-h-96">
						<EmblaCarousel gallery={gallery} />
					</div>

					<div className="flex flex-col justify-center w-1/2 gap-8">
						<div className="flex justify-start w-full">
							<p className="text-5xl font-extrabold">{title}</p>
						</div>

						<div className="grid grid-cols-12 justify-center w-full gap-8">
							<div className="col-span-7">
								<p className="text-base">{description}</p>
							</div>
							<div className="flex flex-col text-right border">
								<div className="flex flex-row">
									{isProduct(product) && <div className="flex flex-row text-right">
										<div>R$</div> <div>{price!},00</div>
									</div>}
								</div>
								{isProduct(product) && <a href="/contato" className="uppercase font-bold text-sm">Adquira</a>}
							</div>
						</div>
					</div>

					{
						allProductsExceptThis.length > 0 && (
							<div className="md:max-w-7xl flex flex-col self-center items-start justify-center w-full">
								<div className="flex justify-center w-full p-14 divide-x-4">
									<p className="text-3xl">Outros Produtos na Categoria {typeof product_category !== 'number' ? product_category?.title! : ''}</p>
								</div>
								<div className="min-h-screen w-full">
									<div className="grid grid-cols-12 p-4 gap-4 w-full flex-wrap">
										{allProductsExceptThis.map((product) =>
											<Card post={product} key={product.id} />
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


async function getPost(slug: string | null, collection: string, excludeProductId?: number | null): Promise<Product[]> {
	const payload = await getPayloadHMR({ config: configPromise });
	const where: any = {};

	if (excludeProductId === undefined || excludeProductId === null) {
		where.slug = {
			// equals: slug
		};
	}

	if (excludeProductId !== undefined && excludeProductId !== null) {
		where.id = {
			not_equals: excludeProductId,
		};
	}

	const data = await payload.find({
		collection: collection,
		where: where,
	});

	const dataOfPost = data.docs.filter(doc => doc.slug === slug)

	//return data.docs as unknown as Product[]
	return excludeProductId ? data.docs as unknown as Product[] : dataOfPost as unknown as Product[];
}

function isProduct(post: Work | Product): post is Product {
	return 'price' in post;
}