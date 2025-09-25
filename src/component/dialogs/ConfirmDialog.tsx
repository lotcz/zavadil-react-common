import {Button, Modal, Stack} from "react-bootstrap";
import {BasicDialogProps} from "./DialogProps";
import {createContext} from "react";
import {Localize} from "../localization";

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

export const ConfirmDialogContext = createContext<ConfirmDialogContextData>(new ConfirmDialogContextData(() => undefined));

export type ConfirmDialogProps = BasicDialogProps & {
	onConfirm: () => any;
};

export function ConfirmDialog({name, text, onClose, onConfirm}: ConfirmDialogProps) {
	return (
		<Modal show={true} backdrop={true} onHide={onClose}>
			<Modal.Header>{name || 'Confirm'}</Modal.Header>
			<Modal.Body>{text}</Modal.Body>
			<Modal.Footer>
				<Stack direction="horizontal">
					<Button variant="link" onClick={onClose}><Localize text="Back"/></Button>
					<Button variant="primary" onClick={onConfirm}><Localize text="Yes"/></Button>
				</Stack>
			</Modal.Footer>
		</Modal>
	);
}
