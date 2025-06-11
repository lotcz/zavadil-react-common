import {UserAlert, UserAlerts, UserAlertType} from 'zavadil-ts-common';
import {useEffect, useState} from "react";
import UserAlertWidget from "./UserAlertWidget";
import UserAlertTypeIcon from "./UserAlertTypeIcon";
import {Button, Stack} from "react-bootstrap";

export type UserAlertsWidgetProps = {
	userAlerts: UserAlerts;
};

export function UserAlertsWidget({userAlerts}: UserAlertsWidgetProps) {
	const [renderedAlerts, setRenderedAlerts] = useState<UserAlert[]>([...userAlerts.alerts]);
	const [summary, setSummary] = useState<Map<UserAlertType, number>>(userAlerts.getSummary());

	useEffect(() => {
		userAlerts.addOnChangeHandler(() => {
			setRenderedAlerts([...userAlerts.alerts]);
			setSummary(userAlerts.getSummary());
		});
	}, [userAlerts]);

	if (renderedAlerts.length === 0) return <></>;

	return (
		<div className="user-alerts border rounded bg-body text-body position-fixed text-end" style={{bottom: 15, right: 15, zIndex: 2147483647}}>
			{
				<div className="max-w-50 p-2 border-bottom">
					{
						renderedAlerts.map((a, index) => <UserAlertWidget key={index} userAlert={a}/>)
					}
				</div>
			}
			<div className="p-2">
				<Stack direction="horizontal" gap={2} className="justify-content-end align-items-center">
					<Button size="sm" variant="primary" onClick={() => userAlerts.reset()}>Clear</Button>
					{
						Array.from(summary.entries()).map(
							(entry, index) => (
								<Stack key={index} direction="horizontal" gap={1} className="px-1 border rounded align-items-center">
									<UserAlertTypeIcon type={entry[0]} customVariant={entry[1] === 0 ? 'muted' : undefined}/>
									<div className={entry[1] > 0 ? `text-${entry[0]} fw-bold` : 'text-muted'}>
										{entry[1]}
									</div>
								</Stack>
							)
						)
					}
				</Stack>
			</div>
		</div>
	);
}

export default UserAlertsWidget;
