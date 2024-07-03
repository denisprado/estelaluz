'use client'

import { CategoryProduct } from "@/payload-types";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const ProductCategories = (props: { productCategories: CategoryProduct[]; }) => {
	const pathName = usePathname()
	const [all, setAll] = useState('')
	return (
		<div className="flex flex-col sm:flex-row gap-4">
			<Link href={'/adquira/categoria/todos'} className={classNames("uppercase font-bold hover:underline-offset-2 hover:underline", pathName === '/adquira/todos' && 'underline-offset-2 underline')}>todos</Link>
			{props.productCategories.map(cat => {
				const isActive = pathName === "/adquira/categoria/" + cat.slug
				console.log(isActive, pathName, "/adquira/categoria/" + cat.slug)
				return <Link href={cat?.slug!} key={cat.id} className={classNames("hover:underline-offset-2 hover:underline uppercase font-bold", isActive && 'underline-offset-2 underline')}>{cat.title}</Link>;
			})}
		</div>);
}

export default ProductCategories