import {Button, Form, InputGroup} from "react-bootstrap";
import {BsClipboard} from "react-icons/bs";
import {useCallback} from "react";
import {StringUtil} from "zavadil-ts-common";

export type TextToClipboardProps = {
	text?: string | null;
	onClipboardCopy?: () => any;
};

export function TextToClipboard({text, onClipboardCopy}: TextToClipboardProps) {

	const toClipboard = useCallback(
		() => {
			if (StringUtil.isBlank(text)) return;
			navigator.clipboard
				.writeText(text)
				.then(
					() => {
						if (onClipboardCopy) {
							onClipboardCopy();
						}
					}
				);
		},
		[text, onClipboardCopy]
	);

	return (
		<InputGroup>
			<Form.Control
				type="text"
				disabled={true}
				value={String(text)}
				onClick={toClipboard}
			/>
			<Button onClick={toClipboard}>
				<div className="d-flex align-items-center">
					<BsClipboard/>
				</div>
			</Button>
		</InputGroup>
	);
}

export default TextToClipboard;
