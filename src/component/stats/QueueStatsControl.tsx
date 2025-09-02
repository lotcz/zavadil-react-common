import React from 'react';
import {Placeholder, ProgressBar} from "react-bootstrap";
import {QueueStats} from 'zavadil-ts-common';
import {QueueStateControl} from "./QueueStateControl";

export type QueueStatsControlProps = {
	name: string;
	stats?: QueueStats | null;
}

export function QueueStatsControl({name, stats}: QueueStatsControlProps) {
	const max = stats ? stats.remaining + stats.processed : undefined

	return (
		<div>
			<div className="d-flex align-items-center gap-2">
				<pre>{name}</pre>
				<pre>[{stats?.processed !== undefined ? stats.processed : '?'} / {max !== undefined ? max : '?'}]</pre>
				<QueueStateControl state={stats ? stats.state : 'Unknown'}/>
			</div>
			<div className="p-1">
				{
					stats ? <ProgressBar variant="primary" striped={true} animated={true} min={0} now={stats.processed} max={max || 1}/>
						: <Placeholder className="w-100" animation="glow">
							<Placeholder className="w-100"/>
						</Placeholder>
				}
			</div>
		</div>
	);
}
