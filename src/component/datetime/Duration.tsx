import {DateUtil, ObjectUtil} from "zavadil-ts-common";

export type DurationProps = {
	ms?: number | null;
};

export function Duration({ms}: DurationProps) {
	if (ObjectUtil.isEmpty(ms)) return <></>;
	return <div className="text-nowrap">{DateUtil.formatDuration(ms)}</div>;
}
