import {Spinner} from "react-bootstrap";
import {PropsWithChildren} from "react";
import {IconButton, IconButtonProps} from "./IconButton";

export type ActiveButtonProps = IconButtonProps & {
	loading?: boolean;
};

export function LoadingButton({disabled, icon, loading, children, size, onClick}: PropsWithChildren<ActiveButtonProps>) {
	return (
		(loading === true) ? <IconButton disabled={true} onClick={onClick} size={size} icon={<Spinner size="sm"/>}>{children}</IconButton>
			: <IconButton disabled={disabled} onClick={onClick} icon={icon} size={size}>{children}</IconButton>
	);
}

export default LoadingButton;
