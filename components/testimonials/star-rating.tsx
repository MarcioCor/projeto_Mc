import type { Rating } from "@/types/testimonial";

const MAX_RATING = 5;
const STARS = Array.from({ length: MAX_RATING }, (_, index) => index + 1);

type StarRatingProps = {
  rating: Rating;
};

export function StarRating({ rating }: StarRatingProps) {
  return (
    <div
      role="img"
      aria-label={`Nota ${rating} de ${MAX_RATING}`}
      className="flex gap-0.5"
    >
      {STARS.map((star) => (
        <svg
          key={star}
          aria-hidden="true"
          viewBox="0 0 20 20"
          className={`size-5 ${
            star <= rating
              ? "fill-amber-400"
              : "fill-stone-200 dark:fill-stone-700"
          }`}
        >
          <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z" />
        </svg>
      ))}
    </div>
  );
}
