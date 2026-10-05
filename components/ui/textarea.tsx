import type { ComponentProps } from "react";
import { formControlClassName } from "./form-control-styles";

export function Textarea({
  className = "",
  ...props
}: ComponentProps<"textarea">) {
  return (
    <textarea
      className={`${formControlClassName} resize-y ${className}`}
      {...props}
    />
  );
}
