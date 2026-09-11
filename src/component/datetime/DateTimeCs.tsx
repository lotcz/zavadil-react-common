import {DateUtilCs} from 'zavadil-ts-common';

export type DateTimeCsProps = {
	value?: Date | null;
};

export function DateTimeCs({value}: DateTimeCsProps) {
	return (
		<div className="text-nowrap">{DateUtilCs.formatDateTimeForHumans(value)}</div>
	);
}
