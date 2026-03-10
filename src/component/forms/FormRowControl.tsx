import {Form, FormControlProps} from "react-bootstrap";
import {FormRow} from "./FormRow";
import {useMemo} from "react";
import {StringUtil} from "zavadil-ts-common";

export type FormRowControlProps = FormControlProps & {
	label: string;
};

export function FormRowControl(props: FormRowControlProps) {
	const actualId = useMemo(() => props.id || StringUtil.randomString(), [props]);
	return (
		<FormRow label={props.label} forId={actualId}>
			<Form.Control {...props} id={actualId}/>
		</FormRow>
	);
}
