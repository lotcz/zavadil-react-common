import {PropsWithChildren, useMemo} from "react";
import {Form} from "react-bootstrap";
import {Localize} from "../localization";
import {StringUtil} from "zavadil-ts-common";

export type FormRowProps = PropsWithChildren & {
	label: string;
	id?: string;
};

export function FormRow({id, label, children}: FormRowProps) {
	const actualId = useMemo(() => id || StringUtil.randomString(), [id]);
	return (
		<Form.Group>
			<Form.Label id={actualId}>
				<Localize text={label}/>
			</Form.Label>
			<div>{children}</div>
		</Form.Group>
	);
}
