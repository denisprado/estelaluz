import Logo from "@/components/Logo";
import { getCategories } from "@/helpers/functions";
import Link from "next/link";

export default async function Header() {

	const data = await getCategories('categoryWork')
	return (
		<nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
			<div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-4 px-2">
				<Link href="/" className="flex items-center rtl:space-x-reverse">
					<Logo></Logo>
				</Link>

				<div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse items-center">
					<ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 mr-4">
						<li>
							<a href="/cursos" className="hover:font-bold block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-gray-700 md:p-0 md:dark:hover:text-gray-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">cursos</a>
						</li>
						<li>
							<a href="/sobre" className="hover:font-bold block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-gray-700 md:p-0 md:dark:hover:text-gray-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">sobre</a>
						</li>
						<li>
							<a href="/contato" className=" block py-2 px-3 text-gray-900 rounded hover:font-bold hover:bg-gray-100 md:hover:bg-transparent md:hover:text-gray-700 md:p-0 md:dark:hover:text-gray-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">contato</a>
						</li>
					</ul>
					<Link href={'/adquira'} type="button" className="text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-gray-600 dark:hover:bg-black dark:focus:ring-gray-800">Adquira</Link>
					<button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
						<span className="sr-only">Open main menu</span>
						<svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
							<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
						</svg>
					</button>
				</div>
				<div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
					<ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
						{data.map(cat => {
							const title: string = cat.title as string
							return (
								<li key={cat.id}>
									<a href={`/${cat.slug}`} className="hover:outline-2 hover:outline-offset-2 hover:outline-black transition duration-1000 block py-2 px-3 text-white bg-black rounded md:bg-transparent md:text-gray-700 md:p-0 md:dark:text-gray-500" aria-current="page">{title.toLowerCase() as String}</a>
								</li>
							)
						})}

					</ul>
				</div>
			</div>
		</nav>
	)
}