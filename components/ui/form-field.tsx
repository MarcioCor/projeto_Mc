import type { ReactNode } from "react";

export type FormControlA11yProps = {
  id: string;
  "aria-invalid": boolean;
  "aria-describedby"?: string;
};

type FormFieldProps = {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
  children: (controlProps: FormControlA11yProps) => ReactNode;
};

/** Monta rótulo + controle + mensagem de erro, ligando tudo para leitores de tela. */
export function FormField({
  id,
  label,
  error,
  optional = false,
  children,
}: FormFieldProps) {
  const errorId = `${id}-erro`;

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-sm font-medium text-stone-800 dark:text-stone-200"
      >
        {label}
        {optional ? (
          <span className="font-normal text-stone-500 dark:text-stone-400">
            {" (opcional)"}
          </span>
        ) : null}
      </label>

      {children({
        id,
        "aria-invalid": Boolean(error),
        "aria-describedby": error ? errorId : undefined,
      })}

      {error ? (
        <p id={errorId} className="text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      ) : null}
    </div>
  );
}
