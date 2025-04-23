import {Button} from "react-bootstrap";
import {PropsWithChildren, ReactNode} from "react";
import {ButtonVariant} from "react-bootstrap/types";

export type IconButtonProps = {
	disabled?: boolean;
	onClick: () => any;
	size?: "sm";
	icon?: ReactNode;
	variant?: ButtonVariant;
};

export function IconButton({disabled, variant, icon, size, children, onClick}: PropsWithChildren<IconButtonProps>) {
	return (
		<Button disabled={disabled === true} size={size} onClick={onClick} variant={variant}>
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
