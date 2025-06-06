import {useCallback, useEffect, useState} from "react";
import {EntityBase, EntityClient, EntityClientWithStub} from "zavadil-ts-common";
import {AutocompleteEntitySelect} from "./AutocompleteEntitySelect";

export type AutocompleteIdSelectProps<T extends EntityBase, TStub extends EntityBase> = {
	id?: number | null;
	onChange: (id?: number | null) => any;
	entityClient: EntityClient<T> | EntityClientWithStub<T, TStub>;
	disabled?: boolean;
	labelGetter?: (item: T) => string;
}

export function AutocompleteEntityIdSelect<T extends EntityBase, TStub extends EntityBase>({
	id,
	disabled,
	labelGetter,
	onChange,
	entityClient
}: AutocompleteIdSelectProps<T, TStub>) {
	const [selected, setSelected] = useState<T | null>(null);

	useEffect(
		() => {
			if (!id) {
				setSelected(null);
				return;
			}
			if (selected && selected.id === id) {
				setSelected({...selected});
				return;
			}
			if (entityClient instanceof EntityClientWithStub) {
				entityClient.loadSingleStub(id).then(setSelected);
				return;
			}
			entityClient.loadSingle(id).then(setSelected);
		},
		[id]
	);

	const selectionChanged = useCallback(
		(s: T | null) => {
			const nId = s ? s.id : null;
			if (nId !== id) onChange(nId);
			setSelected(s);
		},
		[id, selected]
	);

	return (
		<AutocompleteEntitySelect
			disabled={disabled}
			selected={selected}
			labelGetter={labelGetter}
			entityClient={entityClient}
			onChange={selectionChanged}
		/>
	);
}
