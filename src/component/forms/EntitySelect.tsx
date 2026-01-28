import {EntityBase} from "zavadil-ts-common";
import {EntityIdSelect} from "./EntityIdSelect";

export type EntitySelectProps<T extends EntityBase> = {
	value?: T | null;
	onChange: (e: T | null | undefined) => any;
	options?: Array<T> | null;
	showEmptyOption?: boolean;
	disabled?: boolean;
	emptyOptionLabel?: string;
	sort?: boolean;
	labelGetter: (item: T) => string;
}

export function EntitySelect<T extends EntityBase>(
	{value, sort, disabled, labelGetter, onChange, options, showEmptyOption, emptyOptionLabel}: EntitySelectProps<T>
) {

	return (
		<EntityIdSelect
			disabled={disabled}
			id={value ? value.id : null}
			options={options}
			sort={sort}
			onChange={
				(id) => {
					if (!options || !id) {
						onChange(undefined);
						return;
					}
					onChange(options.find((o) => o.id === id));
				}
			}
			labelGetter={labelGetter}
			showEmptyOption={showEmptyOption}
			emptyOptionLabel={emptyOptionLabel}
		/>
	);
}
