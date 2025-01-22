import {BsBug, BsExclamationDiamond, BsInfo, BsQuestion} from "react-icons/bs";
import {IconType} from "react-icons";
import {UserAlertType} from "zavadil-ts-common";

export type UserAlertTypeIconProps = {
	type: UserAlertType;
	size?: string | number;
	customVariant?: string;
};

const ICONS = new Map<UserAlertType, IconType>(
	[
		[UserAlertType.error, BsBug],
		[UserAlertType.warning, BsExclamationDiamond],
		[UserAlertType.info, BsInfo]
	]
);

export function UserAlertTypeIcon({type, size, customVariant}: UserAlertTypeIconProps) {
	const iconFunc = ICONS.get(type) || BsQuestion;
	return <div className={`d-flex align-items-center text-${customVariant === undefined ? type : customVariant}`}>{iconFunc({size: size})}</div>
}

export default UserAlertTypeIcon;
