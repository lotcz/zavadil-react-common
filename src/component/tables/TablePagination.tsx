import {ObjectUtil, PagingRequest} from 'zavadil-ts-common';
import React from 'react';
import {Pagination} from "react-bootstrap";

const MAX_DISPLAY_PAGES = 10;

export type TablePaginationProps = {
	paging: PagingRequest;
	totalItems: number;
	onPagingChanged: (p: PagingRequest) => any
};

export function TablePagination({
	paging,
	totalItems,
	onPagingChanged
}: TablePaginationProps) {
	const totalPages = Math.ceil(totalItems / paging.size);

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

	return <Pagination size="sm" className="flex-wrap m-0">{paginationItems}</Pagination>
}

export default TablePagination;
