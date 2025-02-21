import {Form, Spinner} from "react-bootstrap";
import {useCallback, useMemo} from "react";
import {NumberUtil} from "zavadil-ts-common";

export type GenericSelectOption<T> = {
	id?: T | null;
	label: string;
}

export type GenericSelectProps<T> = {
	value?: T | null;
	options: Array<GenericSelectOption<T>>;
	onChange: (id: T | null) => any;
	showEmptyOption?: boolean;
	emptyOptionLabel?: string;
}

export type StringSelectProps = GenericSelectProps<string>;

export function StringSelect({value, options, onChange, showEmptyOption, emptyOptionLabel}: StringSelectProps) {
	return (
		<Form.Select
			value={value || ''}
			onChange={(e) => onChange(e.target.value)}
		>
			{
				(showEmptyOption === undefined || showEmptyOption) && (
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

export type NumberSelectProps = GenericSelectProps<number>;

export function NumberSelect({value, options, onChange, showEmptyOption, emptyOptionLabel}: NumberSelectProps) {
	const nValue = useMemo(
		() => {
			if (!value) return '';
			return String(value);
		},
		[value]
	);

	const nOptions = useMemo(
		() => {
			if (!options) return [];
			return options.map(
				(o) => {
					return {
						id: o.id ? String(o.id) : '',
						label: o.label
					}
				}
			);
		},
		[options]
	);

	const nChange = useCallback(
		(s: string | null) => onChange(NumberUtil.parseNumber(s)),
		[onChange]
	);

	return (
		<StringSelect
			value={nValue}
			options={nOptions}
			onChange={nChange}
			showEmptyOption={showEmptyOption}
			emptyOptionLabel={emptyOptionLabel}
		/>
	);
}
