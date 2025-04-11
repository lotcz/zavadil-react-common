import {Form} from "react-bootstrap";
import React from "react";

export type SwitchProps = {
	id?: string;
	disabled?: boolean;
	checked: boolean;
	onChange: (checked: boolean) => any;
	size?: number;
};

export function Switch({id, disabled, checked, size, onChange}: SwitchProps) {
	return (
		<Form.Switch
			disabled={disabled}
			id={id}
			size={size}
			type="switch"
			checked={checked}
			onChange={(e) => onChange(!checked)}
			className="cursor-pointer"
		/>
	);
}

export default Switch;
