import type { ComponentProps } from "react";
import { formControlClassName } from "./form-control-styles";

export function Select({ className = "", ...props }: ComponentProps<"select">) {
  return (
    <select className={`${formControlClassName} ${className}`} {...props} />
  );
}
