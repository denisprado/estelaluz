import CardListContainer from "@/components/CardListContainer";
import LayoutContainer from "@/components/LayoutContainer";
import PageContainer from "@/components/PageContainer";
import { PageTitle } from "@/components/PageTitle";
import ProductCategories from "@/components/ProductCategories";
import { getCategories } from "@/helpers/functions";

export default async function RootLayout({
	children, params,
}: Readonly<{
	children: React.ReactNode;
	params?: {
		category?: string;
	};
}>) {
	const productCategories = await getCategories('categoryProduct');
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