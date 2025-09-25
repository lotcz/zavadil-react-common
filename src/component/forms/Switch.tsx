import {Form} from "react-bootstrap";
import React from "react";

export type SwitchProps = {
	id?: string;
	disabled?: boolean;
	checked: boolean;
	onChange: (checked: boolean) => any;
	size?: number;
	label?: string | React.ReactNode;
};

export function Switch({id, label, disabled, checked, size, onChange}: SwitchProps) {
	return (
		<Form.Switch
			disabled={disabled}
			id={id}
			size={size}
			type="switch"
			checked={checked}
			onChange={(e) => onChange(!checked)}
			className="cursor-pointer"
			label={label}
		/>
	);
}

export default Switch;
