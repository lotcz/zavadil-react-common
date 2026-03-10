import {PropsWithChildren} from "react";
import {Form} from "react-bootstrap";
import {Localize} from "../localization";

export type FormRowProps = PropsWithChildren & {
	label: string;
	forId?: string;
};

export function FormRow({forId, label, children}: FormRowProps) {
	return (
		<Form.Group>
			<Form.Label htmlFor={forId}>
				<Localize text={label}/>
			</Form.Label>
			<div>{children}</div>
		</Form.Group>
	);
}
