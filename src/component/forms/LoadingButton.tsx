import {Spinner} from "react-bootstrap";
import {PropsWithChildren} from "react";
import {IconButton, IconButtonProps} from "./IconButton";

export type ActiveButtonProps = IconButtonProps & {
	loading?: boolean;
};

export function LoadingButton({disabled, icon, loading, children, size, onClick}: PropsWithChildren<ActiveButtonProps>) {
	return (
		(loading === true) ? <IconButton disabled={true} onClick={onClick} icon={<Spinner size={size}/>}>{children}</IconButton>
			: <IconButton disabled={disabled} onClick={onClick} icon={icon}>{children}</IconButton>
	);
}

export default LoadingButton;
