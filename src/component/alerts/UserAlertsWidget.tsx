import {UserAlert, UserAlerts, UserAlertType} from 'zavadil-ts-common';
import {useCallback, useEffect, useState} from "react";
import UserAlertWidget from "./UserAlertWidget";
import UserAlertTypeIcon from "./UserAlertTypeIcon";
import {Stack} from "react-bootstrap";
import {IconButton} from "../forms";
import {BsEye, BsTrash} from "react-icons/bs";
import {VscEyeClosed} from "react-icons/vsc";

export type UserAlertsWidgetProps = {
	userAlerts: UserAlerts;
};

export function UserAlertsWidget({userAlerts}: UserAlertsWidgetProps) {
	const [showAll, setShowAll] = useState<boolean>(false);
	const [totalAlerts, setTotalAlerts] = useState<number>(userAlerts.alerts.length);
	const [renderedAlerts, setRenderedAlerts] = useState<UserAlert[]>([...userAlerts.visibleAlerts]);
	const [summary, setSummary] = useState<Map<UserAlertType, number>>(userAlerts.getSummary());

	const onChangeHandler = useCallback(
		() => {
			setTotalAlerts(userAlerts.alerts.length);
			setRenderedAlerts(showAll ? [...userAlerts.alerts] : [...userAlerts.visibleAlerts]);
			setSummary(userAlerts.getSummary());
		},
		[userAlerts, showAll]
	);

	useEffect(() => {
			userAlerts.addOnChangeHandler(onChangeHandler);
			const handle = setInterval(
				() => userAlerts.updateVisibility(),
				100
			);
			return () => {
				clearInterval(handle);
				userAlerts.removeOnChangeHandler(onChangeHandler);
			}
		},
		[userAlerts, onChangeHandler]
	);

	if (totalAlerts <= 0) return <></>;

	return (
		<div className="user-alerts border rounded bg-body text-body position-fixed text-end" style={{bottom: 15, right: 15, zIndex: 2147483647}}>
			{
				renderedAlerts.length > 0 &&
				<div className="max-w-50 p-2 border-bottom">
					{
						renderedAlerts.map((a, index) => <UserAlertWidget key={index} userAlert={a} maxDurationMs={userAlerts.maxVisibilityMs}/>)
					}
				</div>
			}
			<div className="p-2">
				<Stack direction="horizontal" gap={2} className="justify-content-end align-items-center">
					{
						showAll ? <IconButton size="sm" variant="primary" onClick={() => setShowAll(false)} icon={<VscEyeClosed/>}>Hide</IconButton>
							: <IconButton size="sm" variant="primary" onClick={() => setShowAll(true)} icon={<BsEye/>}>Show All</IconButton>
					}
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
					<IconButton size="sm" variant="danger" onClick={() => userAlerts.reset()} icon={<BsTrash/>}>Reset</IconButton>
				</Stack>
			</div>
		</div>
	);
}

export default UserAlertsWidget;
