import {ObjectUtil} from "zavadil-ts-common";
import {useMemo} from "react";
import {Duration} from "./Duration";

export type ElapsedProps = {
	date?: Date | null;
};

export function Elapsed({date}: ElapsedProps) {
	const ms = useMemo(
		() => {
			if (ObjectUtil.isEmpty(date)) return null;
			return Date.now() - date.getTime();
		},
		[date]
	);
	return <Duration ms={ms}/>;
}
