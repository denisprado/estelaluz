import classNames from "classnames";
import { ReactNode } from "react";

export const PageTitle = ({ children, align = 'start', caps = '' }: { children: ReactNode; align?: "center" | "start", caps?: 'uppercase' | '' }) => {
	return (
		<div className={classNames("flex w-full my-6", "justify-" + align)}>
			<h1 className={classNames("text-5xl", caps)}>
				{children}
			</h1>
		</div>
	);
};
