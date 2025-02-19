import { z } from 'zod';

/* --------------------------------- Reviews -------------------------------- */
export const reviewSchema = z.object({
    _id: z.string(),
    reviewName: z.string(),
    description: z.string(),
    fileToReview: z.string(),

})

export type Review = z.infer<typeof reviewSchema>

export type ReviewFormData = Pick<Review, 'reviewName' | 'description'> & {
    fileToReview: File | null
}