import classNames from "classnames";
import { ReactNode } from "react";

export const PageTitle = ({ children, align = 'center', caps = 'uppercase' }: { children: ReactNode; align?: "center" | "start", caps?: 'uppercase' | '' }) => {
	return (
		<div className={classNames("flex w-full pt-14 pb-10", "justify-" + align)}>
			<p className={classNames("text-5xl", caps)}>
				{children}
			</p>
		</div>
	);
};
