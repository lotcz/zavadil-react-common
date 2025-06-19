import {DateUtil} from 'zavadil-ts-common';
import {Form} from "react-bootstrap";

export type DateInputProps = {
	value?: Date | null;
	onChange: (d: Date | undefined) => any;
	disabled?: boolean;
};

export function DateInput({value, onChange, disabled}: DateInputProps) {
	return (
		<Form.Control
			type="date"
			disabled={disabled}
			value={DateUtil.formatDateForInput(value)}
			onChange={(e) => {
				onChange(DateUtil.parseDate(e.target.value));
			}}
		/>
	);
}

export default DateInput;
