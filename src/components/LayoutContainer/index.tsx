import classNames from "classnames"
import { ReactNode } from "react"

const LayoutContainer = ({ children, debug = false }: { children: ReactNode, debug?: boolean }) => {
	return (
		<div className={classNames("flex flex-row items-start justify-center min-h-screen w-full m-1 pt-16", process.env.NODE_ENV === 'development' && debug && 'border border-red-600')}>{children}</div>
	)
}

export default LayoutContainer