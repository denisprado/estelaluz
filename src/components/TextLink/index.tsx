import Link from "next/link";
import classNames from "classnames";
export default function TextLink({ url, text, className }: { url: string, text: string, className?: string }) {
	return (
		<Link href={url} className={classNames("hover:font-bold block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-gray-700 md:p-0 md:dark:hover:text-gray-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white transition-all delay-300 md:dark:hover:bg-transparent dark:border-gray-700", className)}>{text}</Link>
	)
}