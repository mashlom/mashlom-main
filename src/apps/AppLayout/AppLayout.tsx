import { ReactNode } from "react";

import "./AppLayout.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

export function AppLayout({ children }: { children: ReactNode }) {
	return <div className="AppLayout">{children}</div>;
}

AppLayout.Footer = function Footer({ children }: { children: ReactNode }) {
	return <div className="Footer">{children}</div>;
};

AppLayout.FooterItem = function FooterItem({
	children,
	icon,
	onClick,
}: {
	children: ReactNode;
	icon: IconProp;
	onClick?: () => void;
}) {
	return (
		<button onClick={onClick} className="FooterItem">
			<div className="bottom-menu-color">
				<FontAwesomeIcon icon={icon} />
			</div>
			<span className="text">{children}</span>
		</button>
	);
};
