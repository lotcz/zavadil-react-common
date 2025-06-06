import {StringUtil} from 'zavadil-ts-common';
import {Button, Form, InputGroup} from "react-bootstrap";
import {BsXCircle} from "react-icons/bs";
import {useCallback, useMemo} from "react";

export type TextInputWithResetProps = {
	value?: string | null;
	onChange: (s: string) => any;
	onReset?: () => any;
	disabled?: boolean;
	onBlur?: () => any;
	className?: string;
};

export function TextInputWithReset({value, onChange, onReset, onBlur, disabled, className}: TextInputWithResetProps) {
	const actual = useMemo(
		() => StringUtil.getNonEmpty(value),
		[value]
	);

	const isEmpty = useMemo(
		() => StringUtil.isBlank(value),
		[actual]
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
				value={actual}
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
