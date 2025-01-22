import React from "react";
import {BsBug, BsExclamationDiamond, BsInfo, BsQuestion} from "react-icons/bs";
import {IconType} from "react-icons";
import {UserAlertType} from "zavadil-ts-common";

export type UserAlertTypeIconProps = {
	type: UserAlertType;
	size?: string | number;
};

const ICONS = new Map<UserAlertType, IconType>(
	[
		[UserAlertType.error, BsBug],
		[UserAlertType.warning, BsExclamationDiamond],
		[UserAlertType.info, BsInfo]
	]
);

export function UserAlertTypeIcon({type, size}: UserAlertTypeIconProps) {
	const iconFunc = ICONS.get(type) || BsQuestion;
	return (
		<div className={`text-${type}`}>
			{
				iconFunc({color: `text-${type}`, size: size})
			}
		</div>
	);
}

export default UserAlertTypeIcon;
