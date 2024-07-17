import LayoutContainer from "@/components/LayoutContainer";

export default function RootLayout({
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