import { z } from "zod";

/* ------------------------------ Auth & Users ------------------------------ */
export const userRoleSchema = z.enum(["developer", "auditor", "dev/aud"]);

const authSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  password_confirmation: z.string(),
  role: userRoleSchema,
});

type Auth = z.infer<typeof authSchema>;

export type UserLoginForm = Pick<Auth, "email" | "password">;
export type UserRegistrationForm = Pick<
  Auth,
  "name" | "email" | "password" | "password_confirmation" | "role"
>;

/* --------------------------------- Issues --------------------------------- */
export type CategoryFieldSchema = {
  key: string;
  label: string;
  isAttr: boolean;
};

export type CategorySchema = CategoryFieldSchema[];

interface BaseIssue {
  _id: string;
  severity: "low" | "medium" | "high";
  solved: boolean;
  page: string;
  process: string;
}

interface NamingConventionIssue extends BaseIssue {
  category: "NamingConvention";
  attr: {
    stageType: string;
    stageName: string;
    expectedNC: string;
  };
}

interface PageWithoutDescriptionIssue extends BaseIssue {
  category: "PageWithoutDescription";
}

interface HardcodedData extends BaseIssue {
  category: "HardcodedData";
  attr: {
    stageType: string;
    stageName: string;
    expression: string;
  };
}

export type Issue =
  | NamingConventionIssue
  | PageWithoutDescriptionIssue
  | HardcodedData;

export const issueSeveritySchema = z.enum(["low", "medium", "high"]);

export const issueCategorySchema = z.enum([
  "NamingConvention",
  "PageWithoutDescription",
  "HardcodedData",
]);

export const issueSchema = z.object({
  _id: z.string(),
  category: issueCategorySchema,
  severity: issueSeveritySchema,
  solved: z.boolean(),
  page: z.string(),
  process: z.string(),
  attr: z
    .object({
      stageType: z.string().optional(),
      stageName: z.string().optional(),
      expectedNC: z.string().optional(),
      expression: z.string().optional(),
    })
    .optional(),
});

/* --------------------------------- Reviews -------------------------------- */
export const reviewSchema = z.object({
  _id: z.string(),
  reviewName: z.string(),
  description: z.string(),
  fileToReview: z.string(),
});

export const dashboardReviewSchema = z.array(
  reviewSchema
    .pick({
      _id: true,
      reviewName: true,
      description: true,
    })
    .extend({
      status: z.string(),
      issues: z.array(z.string()),
    })
);

export type Review = z.infer<typeof reviewSchema>;

export type DashboardReview = z.infer<typeof dashboardReviewSchema.element>;

export type ReviewFormData = Pick<Review, "reviewName" | "description"> & {
  fileToReview: File | null;
};
