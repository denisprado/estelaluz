
export default function Footer() {
	return <footer className="rounded-lg shadow dark:bg-gray-800  border-t-2 min-h-16" style={{ background: `var(--background-end-rgb)` }}>
		<div className="w-full mx-auto max-w-screen-xl py-8 mt-8 min-h-16 md:flex md:items-center md:justify-between">
			<span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href={process.env.NEXT_PUBLIC_SERVER_URL} className="hover:underline">Estela Luz</a>. Todos os direitos resrvados.
			</span>
			<ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
				<li>
					<a href="/sobre" className="hover:underline me-4 md:me-6">Sobre</a>
				</li>
				<li>
					<a href="/cursos" className="hover:underline me-4 md:me-6">Cursos</a>
				</li>
				<li>
					<a href="/adquira" className="hover:underline me-4 md:me-6">Adquira</a>
				</li>
				<li>
					<a href="/contato" className="hover:underline">Contato</a>
				</li>
			</ul>
		</div>
	</footer>
}
