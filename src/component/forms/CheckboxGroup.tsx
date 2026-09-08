import {useCallback, useMemo} from "react";
import {Stack} from "react-bootstrap";
import {Switch} from "./Switch";

export type CheckboxGroupProps = {
	selectedValues: Array<any>;
	items: Map<any, string>;
	onChange(selectedValues: Array<any>): any;
}

export default function CheckboxGroup({selectedValues, items, onChange}: CheckboxGroupProps) {

	const isSelected = useCallback((value: any) => selectedValues.includes(value), [selectedValues]);

	const handleChange = useCallback(
		(value: any) => {
			onChange(isSelected(value) ? selectedValues.filter((v) => v !== value) : [...selectedValues, value]);
		},
		[selectedValues, onChange, isSelected]
	);

	const itemsArray = useMemo(() => [...items.entries()], [items]);

	return (
		<Stack direction="vertical" className="checkbox-group">
			{
				itemsArray.map(
					(item, index) => <Switch
						checked={isSelected(item[0])}
						onChange={() => handleChange(item[0])}
						label={item[1]}
					/>
				)
			}
		</Stack>
	);
}
