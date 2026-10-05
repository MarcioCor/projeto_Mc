import type { ComponentProps } from "react";
import { formControlClassName } from "./form-control-styles";

export function Input({ className = "", ...props }: ComponentProps<"input">) {
  return (
    <input className={`${formControlClassName} ${className}`} {...props} />
  );
}
