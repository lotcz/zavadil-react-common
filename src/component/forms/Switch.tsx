import { Form } from "react-bootstrap";
import { useMemo, ReactNode } from "react";
import { StringUtil } from "zavadil-ts-common";

export type SwitchProps = {
  id?: string;
  disabled?: boolean;
  checked: boolean;
  onChange: (checked: boolean) => any;
  size?: number;
  label?: string | ReactNode;
};

export function Switch({
  id,
  label,
  disabled,
  checked,
  size,
  onChange,
}: SwitchProps) {
  const actualId = useMemo(() => (id ? id : StringUtil.randomString()), [id]);
  return (
    <Form.Switch
      disabled={disabled}
      id={actualId}
      size={size}
      type="switch"
      checked={checked}
      onChange={(e) => onChange(!checked)}
      className="cursor-pointer"
      label={label}
    />
  );
}
