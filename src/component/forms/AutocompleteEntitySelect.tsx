import {useCallback} from "react";
import {EntityBase, EntityClient, StringUtil} from "zavadil-ts-common";
import {AutocompleteSelect} from "./AutocompleteSelect";

export type AutocompleteEntitySelectProps<T extends EntityBase> = {
	selected?: T | null;
	onChange: (e: T | null) => any;
	entityClient: EntityClient<T>;
	disabled?: boolean;
	labelGetter?: (item: T) => string;
}

export function AutocompleteEntitySelect<T extends EntityBase>({
	selected,
	disabled,
	labelGetter,
	onChange,
	entityClient
}: AutocompleteEntitySelectProps<T>) {

	const search = useCallback(
		(s: string) => entityClient
			.loadPage({search: StringUtil.safeLowercase(s), page: 0, size: 10, sorting: [{name: 'id'}]})
			.then((p) => p.content),
		[labelGetter]
	);

	return (
		<AutocompleteSelect
			disabled={disabled}
			selected={selected}
			labelGetter={labelGetter}
			onSearch={search}
			onChange={onChange}
		/>
	);
}
