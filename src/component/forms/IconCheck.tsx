import {ReactNode, useMemo} from "react";
import {SwitchProps} from "./Switch";
import {BsCheckCircle, BsCircle} from "react-icons/bs";

export type IconCheckProps = SwitchProps & {
	iconOn?: ReactNode;
	iconOff?: ReactNode;
};

export function IconCheck({disabled, checked, iconOn, iconOff, size, onChange}: IconCheckProps) {
	const renderedIcon = useMemo(
		() => checked ? (iconOn ? iconOn : <BsCheckCircle size={size}/>) : (iconOff ? iconOff : <BsCircle size={size} className="text-muted"/>),
		[checked, iconOn, iconOff, size]
	);

	return (
		<div
			className="d-flex align-items-center cursor-pointer"
			onClick={(e) => {
				e.stopPropagation();
				e.preventDefault();
				onChange(!checked)
			}
			}
		>
			{renderedIcon}
		</div>
	);
}

export default IconCheck;
