type SectionHeadingProps = {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
};

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <header className="mx-auto max-w-2xl text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-amber-700 dark:text-amber-400">
        {eyebrow}
      </p>
      <h2
        id={id}
        className="mt-2 text-3xl font-bold tracking-tight text-balance text-stone-900 sm:text-4xl dark:text-stone-50"
      >
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-lg text-pretty text-stone-600 dark:text-stone-400">
          {description}
        </p>
      ) : null}
    </header>
  );
}
