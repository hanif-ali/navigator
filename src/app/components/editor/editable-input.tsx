"use client";

import { ChangeEventHandler, useState } from "react";
import { Input } from "../ui/input";
import { twMerge } from "tailwind-merge";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

type DefaultProps = Exclude<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange"
>;
type Props = DefaultProps & {
  onChange?: (value: string) => void;
};

export function EditableInput(props: Props) {
  const [value, setValue] = useState(props.value);

	const className = twMerge("outline-none focus-visible:ring-0 px-0 py-0 border-0 bg-transparent", props.className)

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
    props.onChange?.(e.target.value);
  };

  return <Input {...props} className={className} onChange={handleChange} value={value} />;
}
