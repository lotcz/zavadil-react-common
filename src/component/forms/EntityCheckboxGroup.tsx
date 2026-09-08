import {useMemo} from "react";
import {EntityBase} from "zavadil-ts-common";
import CheckboxGroup from "./CheckboxGroup";

export type EntityCheckboxGroupProps = {
	selectedIds: Array<number>;
	items: Array<EntityBase>;
	labelGetter: (e: EntityBase) => string;
	onChange(selectedIds: Array<number>): any;
}

export function EntityCheckboxGroup({selectedIds, items, labelGetter, onChange}: EntityCheckboxGroupProps) {

	const itemsArray = useMemo(
		() => {
			const result = new Map<any, string>();
			items.forEach((item) => result.set(item.id, labelGetter(item)));
			return result;
		},
		[items, labelGetter]
	);

	return (
		<CheckboxGroup selectedValues={selectedIds} items={itemsArray} onChange={onChange}/>
	);
}

export default EntityCheckboxGroup;
