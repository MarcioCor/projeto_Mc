import type { Testimonial } from "@/types/testimonial";
import { AuthorAvatar } from "./author-avatar";
import { StarRating } from "./star-rating";

type TestimonialCardProps = {
  testimonial: Testimonial;
};

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const { author, petName, petSpecies, service, rating, quote } = testimonial;

  return (
    <figure className="flex h-full flex-col rounded-2xl border border-stone-200 bg-white p-6 shadow-sm dark:border-stone-800 dark:bg-stone-900">
      <div className="flex items-center justify-between gap-4">
        <StarRating rating={rating} />
        <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-700 dark:bg-stone-800 dark:text-stone-300">
          {service}
        </span>
      </div>

      <blockquote className="mt-4 flex-1 text-pretty text-stone-700 dark:text-stone-300">
        <p>“{quote}”</p>
      </blockquote>

      <figcaption className="mt-6 flex items-center gap-3">
        <AuthorAvatar name={author} />
        <div>
          <p className="font-semibold text-stone-900 dark:text-stone-50">
            {author}
          </p>
          <p className="text-sm text-stone-500 dark:text-stone-400">
            Tutor(a) de {petName} · {petSpecies}
          </p>
        </div>
      </figcaption>
    </figure>
  );
}
