import {Form} from "react-bootstrap";
import {ReactNode} from "react";

export type IconSwitchProps = {
	disabled?: boolean;
	checked: boolean;
	onChange: (checked: boolean) => any;
	size?: number;
	iconOn: ReactNode;
	iconOff: ReactNode;
};

export function IconSwitch({disabled, checked, iconOn, iconOff, size, onChange}: IconSwitchProps) {
	return (
		<div
			className="d-flex align-items-center gap-2 cursor-pointer"
			onClick={(e) => onChange(!checked)}
		>
			<Form.Switch
				disabled={disabled}
				size={size}
				type="switch"
				checked={checked}
				className="cursor-pointer"
			/>
			{
				checked ? iconOn : iconOff
			}
		</div>
	);
}

export default IconSwitch;
