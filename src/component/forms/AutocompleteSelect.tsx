import {useCallback, useEffect, useMemo, useState} from "react";
import {CancellablePromise, EntityBase} from "zavadil-ts-common";
import TextInputWithReset from "./TextInputWithReset";
import {Dropdown} from "react-bootstrap";

export type AutocompleteSelectProps<T extends EntityBase> = {
	selected?: T | null;
	onChange: (e: T | null) => any;
	onSearch: (text: string) => Promise<Array<T>>;
	disabled?: boolean;
	labelGetter?: (item: T) => string;
}

export function AutocompleteSelect<T extends EntityBase>({selected, disabled, labelGetter, onChange, onSearch}: AutocompleteSelectProps<T>) {
	const [searchPromise, setSearchPromise] = useState<CancellablePromise>();
	const [searchText, setSearchText] = useState<string>();
	const [itemSelection, setItemSelection] = useState<Array<T>>();

	const finalLabelGetter = useMemo(
		() => labelGetter ? labelGetter : (item: T) => {
			if ('name' in item && typeof item.name === 'string') return item.name;
			return `[${item.id}]`;
		},
		[labelGetter]
	);

	const finalCss = useMemo(
		() => selected ? 'border rounded border-primary' : undefined,
		[selected]
	);

	useEffect(() => {
		setSearchText(selected ? finalLabelGetter(selected) : '');
		if (searchPromise) {
			searchPromise.cancel();
			setSearchPromise(undefined);
		}
		setItemSelection(undefined);
	}, [selected, finalLabelGetter]);

	const reset = useCallback(
		() => {
			onChange(null)
			setSearchText('');
			if (searchPromise) {
				searchPromise.cancel();
				setSearchPromise(undefined);
			}
			setItemSelection(undefined);
		},
		[onChange, searchPromise]
	);

	const userChangedText = useCallback(
		(s: string) => {
			setSearchText(s);
			if (searchPromise) {
				searchPromise.cancel();
			}
			const cancellable = new CancellablePromise(onSearch(s));
			cancellable.promise.then(setItemSelection);
			setSearchPromise(cancellable);
		},
		[searchPromise]
	);

	const userLeftControl = useCallback(
		() => {
			if (itemSelection) {
				setItemSelection(undefined);
				setSearchText(selected ? finalLabelGetter(selected) : '');
			}
		},
		[onChange]
	);

	const userSelectedItem = useCallback(
		(item: T) => {
			setItemSelection(undefined);
			onChange({...item});
		},
		[onChange]
	);

	return (
		<Dropdown defaultShow={false} show={itemSelection !== null} onBlur={userLeftControl}>
			<TextInputWithReset
				disabled={disabled}
				value={searchText}
				onChange={userChangedText}
				onReset={reset}
				className={finalCss}
			/>
			{
				itemSelection &&
				<Dropdown.Menu>
					{
						itemSelection.map(
							(item) => <Dropdown.Item
								key={item.id}
								onClick={() => userSelectedItem(item)}
								active={item.id === selected?.id}
							>
								{finalLabelGetter(item)}
							</Dropdown.Item>
						)
					}
				</Dropdown.Menu>
			}
		</Dropdown>
	);
}
