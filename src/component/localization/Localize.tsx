import {useContext, useMemo} from "react";
import {LocalizationContext} from "./LocalizationContext";
import {TranslateParams} from "zavadil-ts-common";

export type LocalizeProps = {
	text: string;
	tag?: string | Array<string>;
};

export function Localize({text, tag}: LocalizeProps) {
	const localization = useContext(LocalizationContext);

	const p: TranslateParams | undefined = useMemo(
		() => {
			if (tag === undefined || tag === '') return undefined;
			if (typeof tag === 'string') return {tags: [tag]};
			return {tags: tag};
		},
		[tag]
	);

	const t = useMemo(
		() => localization.translate(text, p),
		[localization, text, p]
	);
	return <>{t}</>;
}

export default Localize;
