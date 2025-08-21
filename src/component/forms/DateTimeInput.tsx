import {DateUtil} from 'zavadil-ts-common';
import {Form} from "react-bootstrap";

export type DateTimeInputProps = {
	value?: Date | null;
	onChange: (d: Date | undefined) => any;
	disabled?: boolean;
};

export function DateTimeInput({value, onChange, disabled}: DateTimeInputProps) {
	return (
		<Form.Control
			type="datetime-local"
			disabled={disabled}
			value={DateUtil.formatDateTimeForInput(value)}
			onChange={(e) => {
				onChange(DateUtil.parseDate(e.target.value));
			}}
		/>
	);
}

export default DateTimeInput;
