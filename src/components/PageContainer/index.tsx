import classNames from "classnames"
import { ReactNode } from "react"

const PageContainer = ({ children, className }: { children: ReactNode, className?: string }) => {
	return (
		<div className={classNames("md:max-w-7xl flex flex-col self-center items-start justify-center w-full gap-8", className)}>{children}</div>
	)
}

export default PageContainer