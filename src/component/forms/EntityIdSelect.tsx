import {useMemo} from "react";
import {NumberSelect} from "./NumberSelect";
import {EntityBase} from "zavadil-ts-common";
import {GenericSelectOption} from "./StringSelect";

export type EntityIdSelectProps<T extends EntityBase> = {
	id?: number | null;
	onChange: (n: number | null | undefined) => any;
	options?: Array<T> | null;
	showEmptyOption?: boolean;
	disabled?: boolean;
	emptyOptionLabel?: string;
	sort?: boolean;
	labelGetter: (item: T) => string;
}

export function EntityIdSelect<T extends EntityBase>(
	{id, sort, disabled, labelGetter, onChange, options, showEmptyOption, emptyOptionLabel}: EntityIdSelectProps<T>
) {
	const lOptions: GenericSelectOption<number>[] = useMemo(
		() => {
			let result: Array<T> = []
			if (options) {
				result = sort ? options.sort((a, b) => labelGetter(a) > labelGetter(b) ? 1 : -1) : options;
			}
			return result
				.map(
					(o) => {
						return {
							id: o.id,
							label: labelGetter(o)
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
