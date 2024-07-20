import type { Metadata } from "next";
import { Montserrat, Lato } from "next/font/google";
import "./globals.css";
import "./embla.css";
import Footer from "@/components/Footer";
import FloatBtn from "@/components/WhatsAppBtn";
import { Header } from "@/components/component/header";
import MenuItems from "@/components/MenuItems";
import { Navbar } from "@/components/component/navbar";

const montserrat = Montserrat({
	subsets: ["latin-ext"],
	weight: ["100", "400", '700'],
	variable: '--montserrat',
});

const lato = Lato({ weight: ['300', '400', '700'], subsets: ['latin-ext'], variable: '--lato' })

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
			<body className={montserrat.className + ' overflow-x-hidden overflow-y-scroll ' + lato.className}>
				<div className="grid min-h-[100dvh] grid-rows-[auto_1fr_auto] ">
					<Navbar menu={<MenuItems />} />
					<main>
						{children}
					</main>
					<Footer />
				</div>
				<FloatBtn />
			</body>
		</html>
	);
}
