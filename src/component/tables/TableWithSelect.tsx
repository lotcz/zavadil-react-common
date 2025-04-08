import React, {useEffect, useMemo, useState} from 'react';
import {EntityBase} from 'zavadil-ts-common';
import {AdvancedTable, AdvancedTableProps} from "./AdvancedTable";
import {SelectableTableHeader, TableHeader} from "./TableTypes";
import {IconSwitch} from "../forms";
import {BsCheck, BsCheckAll, BsCheckCircle} from "react-icons/bs";

export type SelectableItem<T extends EntityBase> = {
	selected: boolean;
	item: T;
};

export type TableWithSelectProps<T extends EntityBase> = Omit<AdvancedTableProps, 'header'> & {
	showSelect?: boolean;
	header: SelectableTableHeader<T>;
	items?: Array<T>;
	onSelect?: (selected: Array<T>) => any;
};

export function TableWithSelect<T extends EntityBase>(props: TableWithSelectProps<T>) {
	const [selectAll, setSelectAll] = useState<boolean>(false);
	const [items, setItems] = useState<Array<SelectableItem<T>>>();

	const header = useMemo(
		() => {
			const h: TableHeader = [...props.header];
			h.unshift(
				{
					name: '',
					label: <IconSwitch
						checked={selectAll}
						onChange={() => setSelectAll(!selectAll)}
						iconOn={<BsCheckAll/>}
						iconOff={<BsCheck className="text-muted"/>}
					/>
				}
			);
			return h;
		},
		[props, selectAll]
	);

	useEffect(
		() => {
			setItems(props.items ? props.items.map(
				(i) => {
					return {selected: selectAll, item: i};
				}
			) : undefined);
		},
		[props, selectAll]
	);

	useEffect(
		() => {
			if (!items) return;
			if (!props.onSelect) return;
			props.onSelect(items.filter((i) => i.selected).map((i) => i.item));
		},
		[items]
	);

	return <AdvancedTable
		header={header}
		paging={props.paging}
		totalItems={props.totalItems}
		onPagingChanged={props.onPagingChanged}
	>
		{
			items && items.map(
				(item, index) => <tr key={index}>
					<td>
						<IconSwitch
							checked={item.selected}
							onChange={
								() => {
									item.selected = !item.selected;
									setItems([...items]);
								}
							}
							iconOn={<BsCheckCircle/>}
							iconOff={<BsCheck className="text-muted"/>}
						/>
					</td>
					{
						props.header.map(
							(h, index) => <td key={index}>{h.renderer(item.item)}</td>
						)
					}
				</tr>
			)
		}
	</AdvancedTable>
}

export default TableWithSelect;
