import {useCallback, useMemo} from "react";
import {NumberUtil} from "zavadil-ts-common";
import {GenericSelectProps, StringSelect} from "./StringSelect";

export type NumberSelectProps = GenericSelectProps<number>;

export function NumberSelect({value, options, disabled, onChange, showEmptyOption, emptyOptionLabel}: NumberSelectProps) {
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
		(s: string | null | undefined) => onChange(NumberUtil.parseNumber(s)),
		[onChange]
	);

	return (
		<StringSelect
			disabled={disabled}
			value={nValue}
			options={nOptions}
			onChange={nChange}
			showEmptyOption={showEmptyOption}
			emptyOptionLabel={emptyOptionLabel}
		/>
	);
}
