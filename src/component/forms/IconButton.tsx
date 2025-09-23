import {Button} from "react-bootstrap";
import {PropsWithChildren, ReactNode} from "react";
import {ButtonVariant} from "react-bootstrap/types";

export type IconButtonProps = {
	disabled?: boolean;
	onClick: () => any;
	size?: "sm" | "lg";
	icon?: ReactNode;
	variant?: ButtonVariant;
};

export function IconButton({disabled, variant, icon, size, children, onClick}: PropsWithChildren<IconButtonProps>) {
	return (
		<Button disabled={disabled === true} size={size} onClick={onClick} variant={variant}>
			<div className="d-flex align-items-center gap-2">
				{icon}
				{
					children && <div>{children}</div>
				}
			</div>
		</Button>
	);
}

export default IconButton;
