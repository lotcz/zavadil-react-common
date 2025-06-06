import {useMemo} from "react";
import {NumberSelect} from "./NumberSelect";
import {LookupTableEntity} from "zavadil-ts-common";
import {GenericSelectOption} from "./StringSelect";

export type LookupSelectProps = {
	id?: number | null;
	onChange: (n: number | null | undefined) => any;
	options?: Array<LookupTableEntity> | null;
	showEmptyOption?: boolean;
	disabled?: boolean;
	emptyOptionLabel?: string;
	sort?: boolean;
	labelGetter?: <T extends LookupTableEntity>(item: T) => string;
}

export function LookupSelect({id, sort, disabled, labelGetter, onChange, options, showEmptyOption, emptyOptionLabel}: LookupSelectProps) {
	const lOptions: GenericSelectOption<number>[] = useMemo(
		() => {
			let result: Array<LookupTableEntity> = []
			if (options) {
				result = sort ? options.sort((a, b) => a.name > b.name ? 1 : -1) : options;
			}
			return result
				.map(
					(o) => {
						return {
							id: o.id,
							label: labelGetter ? labelGetter(o) : o.name
						}
					}
				);
		},
		[options]
	);

	return (
		<NumberSelect
			disabled={disabled}
			value={id}
			options={lOptions}
			onChange={onChange}
			showEmptyOption={showEmptyOption}
			emptyOptionLabel={emptyOptionLabel}
		/>
	);
}
