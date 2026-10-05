import type { ContactFormState } from "@/types/contact";

type FormFeedbackProps = {
  status: ContactFormState["status"];
  message?: string;
};

const STATUS_STYLES = {
  success:
    "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-300",
  error:
    "border-red-200 bg-red-50 text-red-800 dark:border-red-900 dark:bg-red-950/50 dark:text-red-300",
} as const;

/** Região sempre presente para que leitores de tela anunciem as mudanças. */
export function FormFeedback({ status, message }: FormFeedbackProps) {
  return (
    <div role="status" aria-live="polite">
      {status !== "idle" && message ? (
        <p
          className={`rounded-lg border px-4 py-3 text-sm font-medium ${STATUS_STYLES[status]}`}
        >
          {message}
        </p>
      ) : null}
    </div>
  );
}
