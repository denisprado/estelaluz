/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/0NNQWGDKG4Q
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/

/** Add fonts into your Next.js project:

import { Inter } from 'next/font/google'

inter({
	subsets: ['latin'],
	display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
import Link from "next/link"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { NavigationMenu, NavigationMenuList, NavigationMenuLink } from "@/components/ui/navigation-menu"
import Logo from "../Logo"
import MenuItems from "../MenuItems"
import { JSX, SVGProps } from "react"

export function Navbar() {
	return (
		<header className="flex w-full h-20 shrink-0 items-center px-4 md:px-6">
			<div className="flex items-center gap-6 w-full">
				<Link href="#" className="flex items-center gap-2" prefetch={false}>
					<Logo />
				</Link>
				<Sheet>
					<SheetTrigger asChild>
						<Button variant="outline" size="icon" className="lg:hidden">
							<MenuIcon className="h-6 w-6" />
							<span className="sr-only">Toggle navigation menu</span>
						</Button>
					</SheetTrigger>
					<SheetContent side="left">
						<div className="grid gap-4 py-6">
							<MenuItems />
						</div>
					</SheetContent>
				</Sheet>
				<div className="hidden lg:flex items-center gap-4">
					<NavigationMenu>
						<NavigationMenuList>
							<NavigationMenuLink asChild>
								<MenuItems />
							</NavigationMenuLink>
						</NavigationMenuList>
					</NavigationMenu>
				</div>
			</div>
			<Button className="ml-auto">Adquira</Button>
		</header>
	)
}

function MenuIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<line x1="4" x2="20" y1="12" y2="12" />
			<line x1="4" x2="20" y1="6" y2="6" />
			<line x1="4" x2="20" y1="18" y2="18" />
		</svg>
	)
}