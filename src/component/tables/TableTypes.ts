import {ReactNode} from "react";

export type RenderResult = undefined | string | ReactNode;

export type HeaderRenderFunc<T> = (item: T) => RenderResult;

export type HeaderCol = {
	name: string;
	label: RenderResult;
	sortable?: boolean;
};

export type TableHeader = Array<HeaderCol>;

export type SelectableHeaderCol<T> = HeaderCol & {
	renderer: HeaderRenderFunc<T>;
};

export type SelectableTableHeader<T> = Array<SelectableHeaderCol<T>>;
