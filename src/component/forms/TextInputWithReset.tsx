import {StringUtil} from 'zavadil-ts-common';
import {Button, Form, InputGroup} from "react-bootstrap";
import {BsXCircle} from "react-icons/bs";
import {useMemo} from "react";

export type TextInputWithResetProps = {
	value?: string | null;
	onChange: (s: string) => any;
};

export function TextInputWithReset({value, onChange}: TextInputWithResetProps) {
	const actual = useMemo(
		() => StringUtil.getNonEmpty(value),
		[value]
	);

	return (
		<InputGroup>
			<Form.Control
				type="text"
				value={actual}
				onChange={(e) => onChange(e.target.value)}
			/>
			<Button onClick={() => onChange('')}>
				<div className="d-flex align-items-center">
					<BsXCircle/>
				</div>
			</Button>
		</InputGroup>
	);
}

export default TextInputWithReset;
