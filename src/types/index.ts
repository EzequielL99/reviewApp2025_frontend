import { z } from 'zod';

/* --------------------------------- Reviews -------------------------------- */
export const reviewSchema = z.object({
    _id: z.string(),
    reviewName: z.string(),
    description: z.string(),
    fileToReview: z.string(),
})

export const dashboardReviewSchema = z.array(
    reviewSchema
    .pick({
        _id: true,
        reviewName: true,
        description: true,
    })
    .extend({
        status: z.string(),
        issues: z.array(z.string())
    })
)

export type Review = z.infer<typeof reviewSchema>

export type DashboardReview = z.infer<typeof dashboardReviewSchema.element>

export type ReviewFormData = Pick<Review, 'reviewName' | 'description'> & {
    fileToReview: File | null
}