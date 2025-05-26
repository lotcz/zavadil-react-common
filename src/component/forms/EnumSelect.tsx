import {useMemo} from "react";
import {StringSelect} from "./StringSelect";

export type EnumSelectProps = {
	value?: string | null;
	options: Array<string>;
	onChange: (id: string | null | undefined) => any;
	showEmptyOption?: boolean;
	emptyOptionLabel?: string;
};

export function EnumSelect({value, options, onChange, showEmptyOption, emptyOptionLabel}: EnumSelectProps) {
	const nOptions = useMemo(
		() => {
			if (!options) return [];
			return options.map(
				(s) => {
					return {
						id: s,
						label: s
					}
				}
			);
		},
		[options]
	);

	return (
		<StringSelect
			value={value}
			options={nOptions}
			onChange={onChange}
			showEmptyOption={showEmptyOption}
			emptyOptionLabel={emptyOptionLabel}
		/>
	);
}
