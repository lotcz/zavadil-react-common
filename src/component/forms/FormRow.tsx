import { PropsWithChildren } from "react";
import { Form } from "react-bootstrap";
import { Localize } from "../localization";

export type FormRowProps = PropsWithChildren & {
  label: string;
};

export function FormRow({ label, children }: FormRowProps) {
  return (
    <Form.Group>
      <Form.Label>
        <Localize text={label} />
      </Form.Label>
      <div>{children}</div>
    </Form.Group>
  );
}
