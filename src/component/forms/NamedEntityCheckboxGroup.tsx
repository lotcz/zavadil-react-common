import {useCallback} from "react";
import {EntityBase, EntityWithName} from "zavadil-ts-common";
import EntityCheckboxGroup from "./EntityCheckboxGroup";

export type NamedEntityCheckboxGroupProps = {
	selectedIds: Array<number>;
	items: Array<EntityWithName>;
	onChange(selectedIds: Array<number>): any;
}

export function NamedEntityCheckboxGroup({selectedIds, items, onChange}: NamedEntityCheckboxGroupProps) {

	const labelGetter = useCallback(
		// @ts-ignore
		(e: EntityBase) => e.name,
		[]
	);

	return (
		<EntityCheckboxGroup selectedIds={selectedIds} items={items} labelGetter={labelGetter} onChange={onChange}/>
	);
}

export default NamedEntityCheckboxGroup;
