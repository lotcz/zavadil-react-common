import {DateUtil} from 'zavadil-ts-common';

export type DateTimeProps = {
	value?: Date | null;
};

export function DateTime({value}: DateTimeProps) {
	return (
		<div className="text-nowrap">{DateUtil.formatDateTimeForHumans(value)}</div>
	);
}
