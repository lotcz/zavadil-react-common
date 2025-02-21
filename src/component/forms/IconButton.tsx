import {Button} from "react-bootstrap";
import {PropsWithChildren, ReactNode} from "react";

export type IconButtonProps = {
	disabled?: boolean;
	onClick: () => any;
	size?: "sm";
	icon?: ReactNode;
};

export function IconButton({disabled, icon, size, children, onClick}: PropsWithChildren<IconButtonProps>) {
	return (
		<Button disabled={disabled === true} size={size} onClick={onClick}>
			{
				(icon) ? <div className="d-flex align-items-center gap-1">
						{icon}
						{children}
					</div>
					: children
			}
		</Button>
	);
}

export default IconButton;
