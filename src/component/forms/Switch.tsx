import {Form} from "react-bootstrap";
import React from "react";

export type SwitchProps = {
	disabled?: boolean;
	checked: boolean;
	onChange: (checked: boolean) => any;
	size?: number;
};

export function Switch({disabled, checked, size, onChange}: SwitchProps) {
	return (
		<Form.Switch
			disabled={disabled}
			size={size}
			type="switch"
			checked={checked}
			onChange={(e) => onChange(!checked)}
			className="cursor-pointer"
		/>
	);
}

export default Switch;
