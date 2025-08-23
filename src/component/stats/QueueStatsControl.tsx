import React from 'react';
import {ProgressBar} from "react-bootstrap";
import {QueueStats} from 'zavadil-ts-common';
import {QueueStateControl} from "./QueueStateControl";

export type QueueStatsControlProps = {
	name: string;
	stats: QueueStats;
}

export function QueueStatsControl({name, stats}: QueueStatsControlProps) {
	const max = stats.remaining + stats.processed;
	return (
		<div>
			<div className="d-flex align-items-center gap-2">
				<pre>{name}</pre>
				<pre>[{stats.processed} / {max}]</pre>
				<QueueStateControl state={stats.state}/>
			</div>
			<div className="p-1">
				<ProgressBar variant="primary" striped={true} animated={true} min={0} now={stats.processed} max={max || 1}/>
			</div>
		</div>
	);
}
