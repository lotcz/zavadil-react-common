import {useCallback, useMemo} from "react";
import {LookupClient, LookupTableEntity, StringUtil} from "zavadil-ts-common";
import {AutocompleteSelect} from "./AutocompleteSelect";

export type AutocompleteLookupSelectProps<T extends LookupTableEntity> = {
	selected?: T | null;
	onChange: (e: T | null) => any;
	lookupClient: LookupClient<T>;
	disabled?: boolean;
	labelGetter?: (item: T) => string;
}

export function AutocompleteLookupSelect<T extends LookupTableEntity>({
	selected,
	disabled,
	labelGetter,
	onChange,
	lookupClient
}: AutocompleteLookupSelectProps<T>) {
	const finalLabelGetter = useMemo(
		() => labelGetter ? labelGetter : (item: LookupTableEntity) => item.name,
		[labelGetter]
	);

	const search = useCallback(
		(s: string) => lookupClient
			.loadPage({search: StringUtil.safeLowercase(s), page: 0, size: 10, sorting: [{name: 'name'}]})
			.then((p) => p.content),
		[labelGetter]
	);

	return (
		<AutocompleteSelect
			disabled={disabled}
			selected={selected}
			labelGetter={finalLabelGetter}
			onSearch={search}
			onChange={onChange}
		/>
	);
}
