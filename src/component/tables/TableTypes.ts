import {ReactNode} from "react";

export type RenderResult = undefined | string | ReactNode;

export type RenderFunc<T> = (item: T) => RenderResult;

export type HeaderCol = {
	name: string;
	sort?: string | false;
	label: RenderResult;
};

export type TableHeader = Array<HeaderCol>;

export type SelectableHeaderCol<T> = HeaderCol & {
	renderer?: RenderFunc<T>;
};

export type SelectableTableHeader<T> = Array<SelectableHeaderCol<T>>;
