import Card from "@/components/Card";
import CardListContainer from "@/components/CardListContainer";
import EmblaCarousel from "@/components/EmblaCarousel";
import PageContainer from "@/components/PageContainer";
import { PageTitle } from "@/components/PageTitle";
import { Product, Work } from "@/payload-types";
import { getPayloadHMR } from "@payloadcms/next/utilities";
import config from "@payload-config";
import { serializeLexical } from "@/helpers/serialize";


export default async function ProductPage({ params }: { params: { slug: string } }) {
	const allProducts = await getPost(params.slug, 'products');
	return (
		allProducts.map(async (product: any) => {
			const { title, description, product_category, price, technical_description } = product as Product;
			const id = product?.id ? product?.id as number : null;
			const allProductsExceptThis: Product[] = await getPost(params.slug, 'products', id);
			const gallery: Product['gallery'] = product?.gallery as Product['gallery'];
			return (
				<PageContainer key={product.id}>
					<div className="grid grid-cols-12 gap-8 justify-start items-start">
						<div className="col-span-12">
							<PageTitle align="start">{title}</PageTitle>
						</div>
						<div className="col-span-6">
							<EmblaCarousel tech_description={technical_description && serializeLexical({ nodes: technical_description?.root?.children })} gallery={gallery} />
						</div>


						<div className="flex flex-col col-span-6 gap-8">

							<div className="grid grid-cols-12 justify-center w-full gap-8">
								<div className="col-span-12">
									{description && serializeLexical({ nodes: description?.root?.children })}
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
								<PageContainer>
									<div className="flex justify-start w-full pt-12 pb-6">
										<p className="text-3xl">Outros Produtos na Categoria {typeof product_category !== 'number' ? product_category?.title! : ''}</p>
									</div>
									<div className="w-full">
										<CardListContainer>
											{allProductsExceptThis.map((product) =>
												<Card post={product} key={product.id} />
											)}
										</CardListContainer>
									</div>
								</PageContainer>
							)
						}
					</div>
				</PageContainer >
			);
		})
	);
}


async function getPost(slug: string | null, collection: string, excludeProductId?: number | null): Promise<Product[]> {
	const payload = await getPayloadHMR({ config });
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

	const dataOfPost = data.docs.filter((doc) => doc.slug === slug)

	//return data.docs as unknown as Product[]
	return excludeProductId ? data.docs as unknown as Product[] : dataOfPost as unknown as Product[];
}

function isProduct(post: Work | Product): post is Product {
	return 'price' in post;
}