import {ObjectUtil, PagingRequest, StringUtil} from 'zavadil-ts-common';
import React, {PropsWithChildren, useMemo} from 'react';
import {Table} from "react-bootstrap";
import {BsFillCaretDownFill, BsFillCaretUpFill} from 'react-icons/bs';
import {TableHeader} from "./TableTypes";
import {NumberSelect} from "../forms";
import Localize from "../localization/Localize";
import TablePagination from "./TablePagination";

const DEFAULT_SIZES = [
	{
		id: 10,
		label: '10'
	},
	{
		id: 100,
		label: '100'
	},
	{
		id: 1000,
		label: '1000'
	}
];

export type AdvancedTableProps = {
	header: TableHeader;
	language?: "cs" | "en";
	paging: PagingRequest;
	totalItems: number;
	hover?: boolean;
	showPagingOnBottom?: boolean;
	showPageSizeSelection?: boolean;
	striped?: boolean;
	bordered?: boolean;
	onPagingChanged: (p: PagingRequest) => any
};

export function AdvancedTable({
	hover,
	showPagingOnBottom,
	showPageSizeSelection,
	striped,
	bordered,
	header,
	children,
	paging,
	totalItems,
	onPagingChanged
}: PropsWithChildren<AdvancedTableProps>) {
	const totalPages = Math.ceil(totalItems / paging.size);

	const sizes = useMemo(
		() => {
			const s = paging.size;
			if (DEFAULT_SIZES.find((si) => si.id === s) === null) {
				const ss = ObjectUtil.clone(DEFAULT_SIZES);
				ss.push({id: s, label: String(s)});
				return ss;
			}
			return DEFAULT_SIZES;
		},
		[paging]
	);

	const sortingChanged = (e: React.MouseEvent<HTMLTableCellElement>, fieldName: string) => {
		if (!paging.sorting) paging.sorting = [];
		let field = paging.sorting.find((f) => f.name === fieldName);
		const isSoleField = field && paging.sorting.length === 1;
		if (!(e.ctrlKey || isSoleField)) {
			paging.sorting = [];
			field = undefined;
		}
		if (field) {
			field.desc = !field.desc;
		} else {
			paging.sorting.push({name: fieldName});
		}
		onPagingChanged(ObjectUtil.clone(paging));
	}

	return (
		<div>
			<Table hover={hover} striped={striped} responsive bordered={bordered}>
				<thead>
				<tr>
					<td colSpan={header.length}>
						<div className="d-flex justify-content-between align-items-center gap-2">
							<div><Localize text='Page'/>: {paging.page + 1} / {totalPages}</div>
							{
								totalPages > 0 && <TablePagination paging={paging} totalItems={totalItems} onPagingChanged={onPagingChanged}/>
							}
							<div><Localize text='Total items'/>: {totalItems}</div>
						</div>
					</td>
				</tr>
				<tr>
					{
						header.map(
							(h, index) => {
								const sortBy = h.sort === false ? '' : (StringUtil.isBlank(h.sort) ? h.name : h.sort);
								if (StringUtil.isBlank(sortBy) || (!sortBy)) {
									return <th key={index}>{h.label}</th>
								}
								const field = paging.sorting && paging.sorting.find((s) => s.name === sortBy);
								return (
									<th
										key={index}
										className="user-select-none text-nowrap"
										role="button"
										onClick={(e: React.MouseEvent<HTMLTableCellElement>) => sortingChanged(e, sortBy)}
									>
										{h.label}
										{
											field ? field.desc ? <BsFillCaretDownFill/> : <BsFillCaretUpFill/> : <></>
										}
									</th>
								)
							}
						)
					}
				</tr>
				</thead>
				<tbody>
				{children}
				</tbody>
				{
					totalItems > 0 && <tfoot>
					{
						showPagingOnBottom &&
						<tr>
							<td colSpan={header.length}>
								<div className="d-flex justify-content-between align-items-center gap-2">
									<div><Localize text='Page'/>: {paging.page + 1} / {totalPages}</div>
									{
										totalPages > 0 && <TablePagination paging={paging} totalItems={totalItems} onPagingChanged={onPagingChanged}/>
									}
									<div><Localize text='Total items'/>: {totalItems}</div>
								</div>
							</td>
						</tr>
					}
					{
						showPageSizeSelection &&
						<tr>
							<td colSpan={header.length}>
								<div className="d-flex align-items-center gap-2 justify-content-end">
									<div className="text-nowrap"><Localize text='Page size'/>:</div>
									<div>
										<NumberSelect
											value={paging.size}
											options={sizes}
											onChange={
												(e) => {
													paging.size = e || 10
													onPagingChanged({...paging});
												}
											}
											showEmptyOption={false}
										/>
									</div>
								</div>
							</td>
						</tr>
					}
					</tfoot>
				}
			</Table>
		</div>
	);
}

export default AdvancedTable;
