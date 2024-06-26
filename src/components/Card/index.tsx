import Link from "next/link";
import Image from "next/image";
import imageLoader from "@/helpers/loader";
import { Product, Work } from "@/payload-types";
import { getUrl } from "@/helpers/functions";
import { useRouter } from "next/navigation";

const Card = ({ category, post }: { category?: string, post: Work | Product }) => {
	const src = getThumbSrc(post);

	const url = category ? category + '/' + post.slug! : post.slug!

	return (
		src! && <Link href={url} className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 flex flex-col gap-2">
			<div className="w-full h-[300px] relative overflow-hidden " key={post.id!}>
				<Image src={src!} alt={post.title!} className="rounded-3xl w-full h-full" fill style={{ objectFit: 'cover' }}
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw">
				</Image>
			</div>
			<div>{post.title!}</div>
		</Link>
	)
}

export function getThumbSrc(post: Work | Product) {
	const gallery = post.gallery!
	const image = gallery[0].image
	const src = getUrl(image)
	return src;
}

export default Card