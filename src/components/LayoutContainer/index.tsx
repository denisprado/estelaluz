import { ReactNode } from "react"

const LayoutContainer = ({ children }: { children: ReactNode }) => {
	return (
		<div className="flex flex-row items-start justify-center min-h-screen w-full m-1 pt-16">{children}</div>
	)
}

export default LayoutContainer