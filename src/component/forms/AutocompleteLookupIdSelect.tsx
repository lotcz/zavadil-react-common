import {useCallback, useEffect, useState} from "react";
import {LookupClient, LookupTableEntity} from "zavadil-ts-common";
import {AutocompleteLookupSelect} from "./AutocompleteLookupSelect";

export type AutocompleteLookupIdSelectProps<T extends LookupTableEntity> = {
	id?: number | null;
	onChange: (id?: number | null) => any;
	lookupClient: LookupClient<T>;
	disabled?: boolean;
	labelGetter?: (item: T) => string;
}

export function AutocompleteLookupIdSelect<T extends LookupTableEntity>({
	id,
	disabled,
	labelGetter,
	onChange,
	lookupClient
}: AutocompleteLookupIdSelectProps<T>) {
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
			lookupClient.loadSingle(id).then(setSelected);
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
		<AutocompleteLookupSelect
			disabled={disabled}
			selected={selected}
			labelGetter={labelGetter}
			lookupClient={lookupClient}
			onChange={selectionChanged}
		/>
	);
}
