import type { Metadata } from "next";
import { Montserrat_Alternates, Montserrat } from "next/font/google";
import "./globals.css";
import "./embla.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatBtn from "@/components/WhatsAppBtn";

const montserrat_alternates = Montserrat_Alternates({
	subsets: ["latin-ext"],
	weight: ["100", "400", '700']
});



export const metadata: Metadata = {
	title: "Estela Luz",
	description: "Portfolio",

};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt">

			<body className={montserrat_alternates.className + ' overflow-x-hidden'}>
				<Header />
				{children}
				<Footer />
				<FloatBtn />
			</body>
		</html>
	);
}
