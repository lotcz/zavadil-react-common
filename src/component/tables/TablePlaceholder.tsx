import React, {useMemo} from 'react';
import {Table} from "react-bootstrap";
import {PlaceholderSize} from "react-bootstrap/usePlaceholder";

const DEFAULT_COLS = 1;
const DEFAULT_ROWS = 20;
const DEFAULT_SIZE: PlaceholderSize = "lg";

export type TablePlaceholderProps = {
	cols?: number;
	rows?: number;
	size?: PlaceholderSize;
};

export function TablePlaceholder({cols, rows, size}: TablePlaceholderProps) {
	const colsN: number = useMemo(() => cols === undefined ? DEFAULT_COLS : cols, [cols]);
	const rowsN: number = useMemo(() => rows === undefined ? DEFAULT_ROWS : rows, [rows]);
	const sizeS: PlaceholderSize = useMemo(() => size === undefined ? DEFAULT_SIZE : size, [size]);

	return (
		<div>
			<Table responsive>
				<tbody>
				{
					Array.from(
						{length: rowsN},
						(_, i) => <tr key={i}>
							{
								Array.from(
									{length: colsN},
									(_, i) => <td key={i}>
										<div className="w-100 p-1 m-1"></div>
									</td>
								)
							}
						</tr>
					)
				}
				</tbody>
			</Table>
		</div>
	);
}

export default TablePlaceholder;
