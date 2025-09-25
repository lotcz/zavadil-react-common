import {PropsWithChildren, useMemo} from "react";
import {ActiveButtonProps, LoadingButton} from "./LoadingButton";
import {BsTrash} from "react-icons/bs";

export type DeleteButtonProps = ActiveButtonProps & {
	isChanged?: boolean;
};

export function DeleteButton({disabled, icon, loading, children, size, onClick, isChanged}: PropsWithChildren<DeleteButtonProps>) {
	const icn = useMemo(
		() => icon ? icon : <BsTrash/>,
		[icon]
	);

	return (
		<LoadingButton
			disabled={disabled || (isChanged === false)}
			onClick={onClick}
			icon={icn}
			loading={loading}
			size={size}
			variant="danger"
		>
			{children}
		</LoadingButton>
	);
}

export default DeleteButton;
