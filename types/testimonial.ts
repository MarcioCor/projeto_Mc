export type Rating = 1 | 2 | 3 | 4 | 5;

export type Testimonial = {
  id: string;
  author: string;
  petName: string;
  petSpecies: string;
  service: string;
  rating: Rating;
  quote: string;
};
