import { ReactNode } from "react"

const CardListContainer = ({ children }: { children: ReactNode }) => {
	return (
		<div className="grid grid-cols-12 gap-8 w-full flex-wrap">{children}</div>
	)
}

export default CardListContainer