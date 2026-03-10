import {Form, FormControlProps} from "react-bootstrap";
import {FormRow} from "./FormRow";

export type FormRowControlProps = FormControlProps & {
	label: string;
	id?: string;
};

export function FormRowControl(props: FormRowControlProps) {
	return (
		<FormRow label={props.label} id={props.id}>
			<Form.Control {...props}/>
		</FormRow>
	);
}
