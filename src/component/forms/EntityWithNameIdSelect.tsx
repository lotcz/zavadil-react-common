import {EntityWithName} from "zavadil-ts-common";
import {EntityIdSelect} from "./EntityIdSelect";

export type EntityWithNameIdSelectProps<T extends EntityWithName> = {
	id?: number | null;
	onChange: (n: number | null | undefined) => any;
	options?: Array<T> | null;
	showEmptyOption?: boolean;
	disabled?: boolean;
	emptyOptionLabel?: string;
	sort?: boolean;
}

export function EntityWithNameIdSelect<T extends EntityWithName>(
	{id, sort, disabled, onChange, options, showEmptyOption, emptyOptionLabel}: EntityWithNameIdSelectProps<T>
) {
	return (
		<EntityIdSelect
			id={id}
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
