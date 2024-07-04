import classNames from "classnames"
import { ReactNode } from "react"

const PageContainer = ({ children, className, debug = false }: { children: ReactNode, className?: string, debug?: boolean }) => {
	return (
		<div className={classNames("md:max-w-7xl flex flex-col self-start items-start justify-center w-full gap-8", className, debug && process.env.NODE_ENV === 'development' && 'border border-blue-600')}>{children}</div>
	)
}

export default PageContainer