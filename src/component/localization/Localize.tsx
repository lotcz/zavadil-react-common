import {useContext} from "react";
import {LocalizationContext} from "./LocalizationContext";

export type LocalizeProps = {
	text: string;
};

export function Localize({text}: LocalizeProps) {
	const localization = useContext(LocalizationContext);
	return <>{localization.translate(text)}</>;
}

export default Localize;
