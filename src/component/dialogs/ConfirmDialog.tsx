import {Button, Modal, Stack} from "react-bootstrap";
import {BasicDialogProps} from "./DialogProps";

export class ConfirmDialogContextData {
	setProps: (props?: ConfirmDialogProps) => any;

	constructor(setProps: (props?: ConfirmDialogProps) => any) {
		this.setProps = setProps;
	}

	confirm(name: string, text: string, onConfirmed: () => any) {
		this.setProps(
			{
				name: name,
				text: text,
				onConfirm: () => {
					onConfirmed();
					this.setProps(undefined);
				},
				onClose: () => this.setProps(undefined)
			}
		)
	}
}

/*
export const ConfirmDialogContext = createContext<ConfirmDialogContextData>(new ConfirmDialogContextData(() => undefined));
*/

export type ConfirmDialogProps = BasicDialogProps & {
	onConfirm: () => any;
};

export function ConfirmDialog({name, text, onClose, onConfirm}: ConfirmDialogProps) {
	return (
		<Modal show={true}>
			<Modal.Header>{name || 'Confirm'}</Modal.Header>
			<Modal.Body>{text}</Modal.Body>
			<Modal.Footer>
				<Stack direction="horizontal">
					<Button variant="link" onClick={onClose}>Zpět</Button>
					<Button variant="primary" onClick={onConfirm}>Ano</Button>
				</Stack>
			</Modal.Footer>
		</Modal>
	);
}
