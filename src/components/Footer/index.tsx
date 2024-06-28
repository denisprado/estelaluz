
export default function Footer() {
	return <footer className="bg-white rounded-lg shadow m-4 dark:bg-gray-800">
		<div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
			<span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://flowbite.com/" className="hover:underline">Estela Luz</a>. Todos os direitos resrvados.
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
