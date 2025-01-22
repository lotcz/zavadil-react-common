import {DateUtil, UserAlert} from 'zavadil-ts-common';
import {Stack} from "react-bootstrap";
import UserAlertTypeIcon from "./UserAlertTypeIcon";

export type UserAlertWidgetProps = {
	userAlert: UserAlert;
};

export function UserAlertWidget({userAlert}: UserAlertWidgetProps) {
	return (
		<Stack direction="horizontal" gap={2} className="align-items-center">
			<div>{DateUtil.formatDateForHumans(userAlert.time)}</div>
			<UserAlertTypeIcon type={userAlert.type}/>
			<div>{userAlert.message}</div>
		</Stack>
	);
}

export default UserAlertWidget;
