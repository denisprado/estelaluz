import Link from "next/link";

const ButtonLink = ({ url, text }: { url: string, text: string }) => <Link href={url} type="button" className="text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-gray-600 dark:hover:bg-black dark:focus:ring-gray-800">{text}</Link>

export default ButtonLink