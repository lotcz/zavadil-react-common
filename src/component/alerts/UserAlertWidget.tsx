import {DateUtil, UserAlert} from 'zavadil-ts-common';
import {Alert, Stack} from "react-bootstrap";

export type UserAlertWidgetProps = {
	userAlert: UserAlert;
};

export function UserAlertWidget({userAlert}: UserAlertWidgetProps) {
	return (
		<Stack direction="horizontal">
			<span>{DateUtil.formatDateForHumans(userAlert.time)}</span>
			<Alert variant={userAlert.type}>
				{userAlert.message}
			</Alert>
		</Stack>
	);
}

export default UserAlertWidget;
