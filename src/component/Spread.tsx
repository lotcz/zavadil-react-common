import {PropsWithChildren, useMemo} from "react";

export type SpreadProps = {
	center?: boolean;
};

export function Spread({children, center}: PropsWithChildren<SpreadProps>) {
	const css = useMemo(
		() => center === false ? '' : 'd-flex align-items-center justify-content-center',
		[center]
	);

	return <div
		className={`w-100 h-100 position-absolute ${css}`}
		style={{left: 0, right: 0, top: 0, bottom: 0}}
	>
		{children}
	</div>
}

export default Spread;
