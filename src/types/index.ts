import { z } from 'zod';

/* --------------------------------- Issues --------------------------------- */
interface BaseIssue {
    _id: string;
    severity: 'low' | 'medium' | 'high';
    solved: boolean;
    page: string;
    process: string;
}

interface NamingConventionIssue extends BaseIssue {
    category: 'NamingConvention';
    attr: {
        stageType: string;
        stageName: string;
        expectedNC: string;
    }
}

interface PageWithoutDescriptionIssue extends BaseIssue {
    category: 'PageWithoutDescription'
}

interface HardcodedData extends BaseIssue {
    category: 'PageWithoutDescription'
    attr: {
        stageType: string;
        stageName: string;
        expression: string;
    }
}

export type Issue = NamingConventionIssue | PageWithoutDescriptionIssue | HardcodedData;

export const issueSeveritySchema = z.enum(['low', 'medium', 'high']);

export const issueCategorySchema = z.enum(['NamingConvention', 'PageWithoutDescription', 'HardcodedData']);

export const issueSchema = z.object({
    _id: z.string(),
    category: issueCategorySchema,
    severity: issueSeveritySchema,
    solved: z.boolean(),
    page: z.string(),
    process: z.string(),
    attr: z.object({
        stageType: z.string().optional(),
        stageName: z.string().optional(),
        expectedNC: z.string().optional(),
        expression: z.string().optional()
    }).optional()
});

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