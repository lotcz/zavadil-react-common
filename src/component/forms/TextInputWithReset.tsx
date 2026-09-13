import {StringUtil} from 'zavadil-ts-common';
import {Button, Form, InputGroup} from "react-bootstrap";
import {BsXCircle} from "react-icons/bs";
import {useCallback, useMemo} from "react";
import {TextInputProps} from "./TextInput";

export type TextInputWithResetProps = TextInputProps & {
	onReset?: () => any;
};

export function TextInputWithReset({value, onChange, onReset, onBlur, disabled, className}: TextInputWithResetProps) {

	const isEmpty = useMemo(
		() => StringUtil.isBlank(value),
		[value]
	);

	const reset = useCallback(
		() => {
			if (onReset) {
				onReset();
			} else {
				onChange('');
			}
		},
		[onReset, onChange]
	);

	return (
		<InputGroup className={className}>
			<Form.Control
				type="text"
				disabled={disabled}
				value={StringUtil.toString(value)}
				onChange={(e) => onChange(e.target.value)}
				onBlur={onBlur}
			/>
			<Button onClick={reset} disabled={isEmpty}>
				<div className="d-flex align-items-center">
					<BsXCircle/>
				</div>
			</Button>
		</InputGroup>
	);
}

export default TextInputWithReset;
