import classNames from "classnames"
import { ReactNode } from "react"

const LayoutContainer = ({ children, debug = false }: { children: ReactNode, debug?: boolean }) => {
	return (
		<div className={classNames("flex flex-row items-start justify-center w-full px-2 sm:px-4", process.env.NODE_ENV === 'development' && debug && 'border border-red-600')}>{children}</div>
	)
}

export default LayoutContainer