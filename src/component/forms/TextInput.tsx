import {StringUtil} from 'zavadil-ts-common';
import {Form, InputGroup} from "react-bootstrap";
import {useMemo} from "react";

export type TextInputProps = {
	value?: string | null;
	onChange: (s: string) => any;
	disabled?: boolean;
	onBlur?: () => any;
	className?: string;
};

export function TextInput({value, onChange, onBlur, disabled, className}: TextInputProps) {
	const actual = useMemo(
		() => StringUtil.getNonEmpty(value),
		[value]
	);

	return (
		<InputGroup className={className}>
			<Form.Control
				type="text"
				disabled={disabled}
				value={actual}
				onChange={(e) => onChange(e.target.value)}
				onBlur={onBlur}
			/>
		</InputGroup>
	);
}

export default TextInput;
