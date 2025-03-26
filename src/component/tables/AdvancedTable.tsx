import {ObjectUtil, PagingRequest} from 'zavadil-ts-common';
import React, {PropsWithChildren, useMemo} from 'react';
import {Pagination, Table} from "react-bootstrap";
import {BsFillCaretDownFill, BsFillCaretUpFill} from 'react-icons/bs';
import {TableHeader} from "./TableHeader";
import {NumberSelect} from "../forms";

const MAX_DISPLAY_PAGES = 10;

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

const LANG_STRINGS_CS = new Map<string, string>();
LANG_STRINGS_CS.set("Page", "Stránka");
LANG_STRINGS_CS.set("Page size", "Velikost stránky");
LANG_STRINGS_CS.set("Total items", "Celkem záznamů");

const LANGUAGES = new Map<string, Map<string, string>>();
LANGUAGES.set("cs", LANG_STRINGS_CS);

function t(l: string | undefined, en: string): string {
	if (!l) return en;
	const lang = LANGUAGES.get(l);
	if (!lang) return en;
	const tran = lang.get(en);
	if (!tran) return en;
	return tran;
}

export type AdvancedTableProps = {
	header: TableHeader;
	language?: "cs" | "en";
	paging: PagingRequest;
	totalItems: number;
	hover?: boolean;
	striped?: boolean;
	bordered?: boolean;
	onPagingChanged: (p: PagingRequest) => any
};

export function AdvancedTable({
	language,
	hover,
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

	const pageChanged = (page: number) => {
		paging.page = page;
		onPagingChanged(ObjectUtil.clone(paging));
	}

	const paginationItems = [];
	if (totalPages > 1) {
		paginationItems.push(<Pagination.First key="first" onClick={() => pageChanged(0)} disabled={paging.page === 0}/>);
		paginationItems.push(<Pagination.Prev key="prev" onClick={() => pageChanged(paging.page - 1)} disabled={paging.page === 0}/>);

		let start = 0;
		let end = totalPages - 1;

		if (paging.page >= MAX_DISPLAY_PAGES) {
			const maxPagesSide = Math.round((MAX_DISPLAY_PAGES - 3) / 2);
			start = paging.page - maxPagesSide;
		}

		if (start > (totalPages - MAX_DISPLAY_PAGES)) {
			start = totalPages - MAX_DISPLAY_PAGES;
		}

		end = start + MAX_DISPLAY_PAGES;

		if (start < 0) start = 0;
		if (end >= totalPages) end = totalPages - 1;

		if (start > 0) {
			paginationItems.push(<Pagination.Ellipsis key="ellipsis"/>);
		}

		for (let number = start; number <= end; number++) {
			paginationItems.push(
				<Pagination.Item key={number} active={number === paging.page} onClick={() => pageChanged(number)}>
					{number + 1}
				</Pagination.Item>,
			);
		}

		if (end < (totalPages - 1)) {
			paginationItems.push(<Pagination.Ellipsis key="ellipsis"/>);
		}

		paginationItems.push(<Pagination.Next key="next" onClick={() => pageChanged(paging.page + 1)} disabled={paging.page === (totalPages - 1)}/>);
		paginationItems.push(<Pagination.Last key="last" onClick={() => pageChanged(totalPages - 1)} disabled={paging.page === (totalPages - 1)}/>);
	}

	const pagination = <div className="d-flex justify-content-between align-items-center gap-2">
		<div>{t(language, 'Page')}: {paging.page + 1} / {totalPages}</div>
		<Pagination size="sm" className="flex-wrap m-0">{paginationItems}</Pagination>
		<div>{t(language, 'Total items')}: {totalItems}</div>
	</div>;

	return (
		<div>
			<Table hover={hover} striped={striped} responsive bordered={bordered}>
				<thead>
				<tr>
					<td colSpan={header.length}>{pagination}</td>
				</tr>
				<tr>
					{
						header.map(
							(h, index) => {
								if (h.name === '') {
									return <th key={index}>{h.label}</th>
								}
								const field = paging.sorting && paging.sorting.find((s) => s.name === h.name);
								return (
									<th
										key={index}
										className="user-select-none"
										role="button"
										onClick={(e: React.MouseEvent<HTMLTableCellElement>) => sortingChanged(e, h.name)}
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
				<tfoot>
				<tr>
					<td colSpan={header.length}>{pagination}</td>
				</tr>
				<tr>
					<td colSpan={header.length}>
						<div className="d-flex align-items-center gap-2 justify-content-end">
							<div className="text-nowrap">{t(language, 'Page size')}:</div>
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
				</tfoot>
			</Table>
		</div>
	);
}

export default AdvancedTable;
