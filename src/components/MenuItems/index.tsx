import { getCategories } from "@/helpers/functions"
import TextLink from "@/components/TextLink"

const MenuItems = async () => {
	const data = await getCategories('categoryWork')

	return (<ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 mr-4">
		{data.map(cat => {
			const title = cat.title
			return (
				<li key={cat.id}>
					<TextLink url={`/${cat.slug}`} text={title.toLowerCase()}></TextLink>
				</li>
			)
		})}
		<li>
			<TextLink url={"/cursos"} text={"cursos"} />
		</li>
		<li>
			<TextLink url={"/sobre"} text={"sobre"} />
		</li>
		<li>
			<TextLink url={"/contato"} text={"contato"} />
		</li>
	</ul>)
}

export default MenuItems