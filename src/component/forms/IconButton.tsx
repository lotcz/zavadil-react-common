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
				(icon) ? (
						children ? <div className="d-flex align-items-center gap-2">
								{icon}
								<div>{children}</div>
							</div>
							: icon
					)
					: children
			}
		</Button>
	);
}

export default IconButton;
