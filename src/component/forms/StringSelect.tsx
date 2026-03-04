import {Form, Spinner} from "react-bootstrap";
import {StringUtil} from "zavadil-ts-common";
import {useEffect} from "react";

export type GenericSelectOption<T> = {
	id?: T | null;
	label: string;
}

export type GenericSelectProps<T> = {
	value?: T | null;
	options: Array<GenericSelectOption<T>>;
	onChange: (id: T | null | undefined) => any;
	showEmptyOption?: boolean;
	disabled?: boolean;
	emptyOptionLabel?: string;
}

export type StringSelectProps = GenericSelectProps<string>;

export function StringSelect({value, options, disabled, onChange, showEmptyOption, emptyOptionLabel}: StringSelectProps) {
	useEffect(
		() => {
			if (StringUtil.isBlank(value)) {
				if (options.length > 0 && showEmptyOption !== true) {
					onChange(options[0].id);
				}
			}
		},
		[value, options, showEmptyOption, onChange]
	);

	return (
		<Form.Select
			value={value || ''}
			onChange={(e) => onChange(e.target.value)}
			disabled={disabled}
		>
			{
				(showEmptyOption === true) && (
					<option key={""} value={""}>{emptyOptionLabel || ''}</option>
				)
			}
			{
				options ?
					options.map(
						(o, i) => <option key={i} value={o.id || ''}>{o.label || ''}</option>
					) : <span><Spinner/></span>
			}
		</Form.Select>
	)
}
