import {StringUtil} from 'zavadil-ts-common';
import {Button, Form, InputGroup} from "react-bootstrap";
import {BsXCircle} from "react-icons/bs";
import {useCallback, useMemo} from "react";

export type TextInputWithResetProps = {
	value?: string | null;
	onChange: (s: string) => any;
	onReset?: () => any;
};

export function TextInputWithReset({value, onChange, onReset}: TextInputWithResetProps) {
	const actual = useMemo(
		() => StringUtil.getNonEmpty(value),
		[value]
	);

	const reset = useCallback(
		() => {
			onChange('');
			if (onReset) onReset();
		},
		[onReset, onChange]
	);

	return (
		<InputGroup>
			<Form.Control
				type="text"
				value={actual}
				onChange={(e) => onChange(e.target.value)}
			/>
			<Button onClick={reset}>
				<div className="d-flex align-items-center">
					<BsXCircle/>
				</div>
			</Button>
		</InputGroup>
	);
}

export default TextInputWithReset;
