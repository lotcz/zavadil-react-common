import {PropsWithChildren, useMemo} from "react";
import {ActiveButtonProps, LoadingButton} from "./LoadingButton";
import {FaFloppyDisk} from "react-icons/fa6";

export type SaveButtonProps = ActiveButtonProps & {
	isChanged?: boolean;
};

export function SaveButton({disabled, icon, loading, children, size, onClick, isChanged}: PropsWithChildren<SaveButtonProps>) {
	const icn = useMemo(
		() => icon ? icon : <FaFloppyDisk/>,
		[icon]
	);
	const content = useMemo(
		() => isChanged ? <strong>{children}</strong> : children,
		[isChanged, children]
	);

	return (
		<LoadingButton
			disabled={disabled || !isChanged}
			onClick={onClick}
			icon={icn}
			loading={loading}
			size={size}
		>
			{content}
		</LoadingButton>
	);
}

export default SaveButton;
