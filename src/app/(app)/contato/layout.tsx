export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="flex items-start justify-center min-h-screen w-full m-1 pt-16">
			{children}
		</div>
	);
}