import {UserAlert, UserAlerts, UserAlertType} from 'zavadil-ts-common';
import {useEffect, useState} from "react";
import UserAlertWidget from "./UserAlertWidget";
import UserAlertTypeIcon from "./UserAlertTypeIcon";
import {Badge, Stack} from "react-bootstrap";

export type UserAlertsWidgetProps = {
	userAlerts: UserAlerts;
};

export function UserAlertsWidget({userAlerts}: UserAlertsWidgetProps) {
	const [renderedAlerts, setRenderedAlerts] = useState<UserAlert[]>([]);
	const [lastAlert, setLastAlert] = useState<UserAlert>();
	const [summary, setSummary] = useState<Map<UserAlertType, number>>();
	const [isOpen, setIsOpen] = useState<boolean>(false);

	useEffect(() => {
		userAlerts.addOnChangeHandler(() => {
			setRenderedAlerts([...userAlerts.alerts]);
		});
	}, [userAlerts]);

	useEffect(() => {
		if (renderedAlerts.length === 0) {
			setLastAlert(undefined);
			setSummary(undefined);
			return;
		}
		setLastAlert(renderedAlerts[renderedAlerts.length - 1]);
		setSummary(userAlerts.getSummary());
	}, [renderedAlerts]);

	return (
		<div className="user-alerts rounded bg-body text-body position-fixed text-end" style={{bottom: 15, right: 15}}>
			<div>
				{
					isOpen ? renderedAlerts.map((a) => <UserAlertWidget userAlert={a}/>)
						: (lastAlert != undefined && lastAlert.type === UserAlertType.error &&
							<UserAlertWidget userAlert={lastAlert}/>)
				}
			</div>
			<div className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
				<Stack direction="horizontal">
					{
						summary ? (
							Array.from(summary.entries()).map(
								(entry) => (
									<div>
										<UserAlertTypeIcon type={entry[0]}/>
										<Badge>entry[1]</Badge>
									</div>
								)
							)
						) : <span>0</span>
					}
				</Stack>
			</div>
		</div>
	);
}

export default UserAlertsWidget;
