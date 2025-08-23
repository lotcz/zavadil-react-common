import React from 'react';
import {ProgressBar} from "react-bootstrap";
import {CacheStats} from 'zavadil-ts-common';

export type CacheStatsControlProps = {
	name: string;
	stats: CacheStats;
}

export function CacheStatsControl({name, stats}: CacheStatsControlProps) {
	return (
		<div>
			<div className="d-flex align-items-center gap-2">
				<pre>{name}</pre>
				<pre>
				[
					{stats.cachedItems}
					{stats.capacity > 0 && ' / '}
					{stats.capacity > 0 && stats.capacity}
					]
				</pre>
			</div>
			{
				stats.capacity > 0 &&
				<div className="p-1">
					<ProgressBar
						now={stats.cachedItems}
						min={0}
						max={stats.capacity}
					/>
				</div>
			}
		</div>
	);
}
