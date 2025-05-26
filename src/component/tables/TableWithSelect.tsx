import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {EntityBase, ObjectUtil} from 'zavadil-ts-common';
import {AdvancedTable, AdvancedTableProps} from "./AdvancedTable";
import {RenderFunc, SelectableTableHeader, TableHeader} from "./TableTypes";
import {BsCheckAll} from "react-icons/bs";
import IconCheck from "../forms/IconCheck";

export type SelectableItem<T extends EntityBase> = {
	selected: boolean;
	item: T;
};

export type TableWithSelectProps<T extends EntityBase> = Omit<AdvancedTableProps, 'header'> & {
	showSelect?: boolean;
	header: SelectableTableHeader<T>;
	items?: Array<T>;
	onSelect?: (selected: Array<T>) => any;
	onClick?: (selected: T) => any;
};

function createRenderer<T>(name: string): RenderFunc<T> {
	return (e: T) => ObjectUtil.getNestedValue(e, name);
}

export function TableWithSelect<T extends EntityBase>({
	showSelect,
	header,
	items,
	onSelect,
	onClick,
	totalItems,
	paging,
	onPagingChanged
}: TableWithSelectProps<T>) {
	const [selectAll, setSelectAll] = useState<boolean>(false);
	const [selectableItems, setSelectableItems] = useState<Array<SelectableItem<T>>>();

	const updateSelectAll = useCallback(
		(sa: boolean) => {
			if (selectableItems) {
				setSelectableItems(selectableItems.map(
					(i) => {
						return {selected: sa, item: i.item};
					}
				));
			}
			setSelectAll(sa);
		},
		[selectableItems]
	);

	const selectableHeader = useMemo(
		() => {
			const h: TableHeader = [...header];
			if (showSelect !== false) {
				h.unshift(
					{
						name: '',
						label: <div className="py-1">
							<IconCheck
								checked={selectAll}
								onChange={
									() => updateSelectAll(!selectAll)
								}
								iconOn={<BsCheckAll/>}
							/>
						</div>
					}
				);
			}
			return h;
		},
		[header, selectAll, updateSelectAll]
	);

	useEffect(
		() => {
			setSelectableItems(items ? items.map(
				(i) => {
					return {selected: selectAll, item: i};
				}
			) : undefined);
		},
		[items]
	);

	useEffect(
		() => {
			if (!selectableItems) return;
			if (!onSelect) return;
			onSelect(selectableItems.filter((i) => i.selected).map((i) => i.item));
		},
		[selectableItems, onSelect]
	);

	return <AdvancedTable
		header={selectableHeader}
		hover={onClick !== undefined}
		paging={paging}
		striped={true}
		totalItems={totalItems}
		onPagingChanged={onPagingChanged}
	>
		{
			selectableItems && selectableItems.map(
				(item, index) => <tr
					key={index}
					className={`selectable ${onClick ? 'cursor-pointer' : ''} ${item.selected ? 'table-active table-primary' : ''}`}
					onClick={
						(e) => {
							if (onClick) onClick(item.item);
						}
					}
				>
					{
						(showSelect !== false) && <td>
							<div className="py-2 d-flex align-items-center">
								<IconCheck
									checked={item.selected}
									onChange={
										() => {
											item.selected = !item.selected;
											if (selectAll && !item.selected) {
												setSelectAll(false);
											}
											setSelectableItems([...selectableItems]);
										}
									}
								/>
							</div>
						</td>
					}
					{
						header.map(
							(h, index) => {
								const renderer = h.renderer || createRenderer(h.name);
								return <td key={index}>{renderer(item.item)}</td>
							}
						)
					}
				</tr>
			)
		}
	</AdvancedTable>
}

export default TableWithSelect;
