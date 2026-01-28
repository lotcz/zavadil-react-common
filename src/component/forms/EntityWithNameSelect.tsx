import {EntityWithName} from "zavadil-ts-common";
import {EntitySelect} from "./EntitySelect";

export type EntityWithNameSelectProps<T extends EntityWithName> = {
	value?: T | null;
	onChange: (e: T | null | undefined) => any;
	options?: Array<T> | null;
	showEmptyOption?: boolean;
	disabled?: boolean;
	emptyOptionLabel?: string;
	sort?: boolean;
}

export function EntityWithNameSelect<T extends EntityWithName>(
	{value, sort, disabled, onChange, options, showEmptyOption, emptyOptionLabel}: EntityWithNameSelectProps<T>
) {
	return (
		<EntitySelect
			value={value}
			labelGetter={(e) => e.name}
			disabled={disabled}
			sort={sort}
			options={options}
			onChange={onChange}
			showEmptyOption={showEmptyOption}
			emptyOptionLabel={emptyOptionLabel}
		/>
	);
}
