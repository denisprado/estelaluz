import Link from "next/link";
import classNames from "classnames";

interface Href {
	pathname: string,
	query: { product: string },
}

export default function TextLink({ url, text, className }: { url: string | Href, text: string, className?: string }) {
	return (
		<Link href={url} className={classNames("font-medium transform transition duration-500  opacity-100 hover:opacity-80 block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-gray-700 md:p-0 md:dark:hover:text-gray-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700", className)}>{text}</Link>
	)
}