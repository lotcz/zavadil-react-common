import {useMemo} from "react";
import {GenericSelectOption, NumberSelect} from "./Select";
import {LookupTableEntity} from "zavadil-ts-common/dist/type/Entity";

export type LookupSelectProps = {
	id?: number | null;
	onChange: (n: number | null | undefined) => any;
	options?: Array<LookupTableEntity> | null;
	showEmptyOption?: boolean;
	emptyOptionLabel?: string;
	sort?: boolean;
}

export function LookupSelect({id, sort, onChange, options, showEmptyOption, emptyOptionLabel}: LookupSelectProps) {
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
							label: o.name
						}
					}
				);
		},
		[options]
	);

	return (
		<NumberSelect
			value={id}
			options={lOptions}
			onChange={onChange}
			showEmptyOption={showEmptyOption}
			emptyOptionLabel={emptyOptionLabel}
		/>
	);
}
