import LayoutContainer from "@/components/LayoutContainer";

export default function SlugLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<LayoutContainer>
			{children}
		</LayoutContainer>
	);
}