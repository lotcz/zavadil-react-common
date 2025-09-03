import {DateUtil, UserAlert} from 'zavadil-ts-common';
import {ProgressBar, Stack} from "react-bootstrap";
import UserAlertTypeIcon from "./UserAlertTypeIcon";

export type UserAlertWidgetProps = {
	userAlert: UserAlert;
	maxDurationMs: number;
};

export function UserAlertWidget({userAlert, maxDurationMs}: UserAlertWidgetProps) {
	return (
		<Stack direction="horizontal" gap={2} className="align-items-center">
			{
				userAlert.remainsMs && <div style={{width: 20}}>
					<ProgressBar min={0} max={maxDurationMs} now={userAlert.remainsMs} variant={userAlert.type}/>
				</div>
			}
			<div>{DateUtil.formatDateForHumans(userAlert.time)}</div>
			<UserAlertTypeIcon type={userAlert.type}/>
			<div>{userAlert.message}</div>
		</Stack>
	);
}

export default UserAlertWidget;
