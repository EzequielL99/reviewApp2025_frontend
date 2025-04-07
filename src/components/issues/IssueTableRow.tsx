import { updateIssue } from "@/api/IssueAPI";
import { CategoryFieldSchema, CategorySchema, Issue } from "@/types/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

type IssueListItemProps = {
  issue: Issue;
  schema: CategorySchema;
};

const severityColorReference = (severity: Issue["severity"]) => {
  switch (severity) {
    case "low":
      return "bg-amber-500";
    case "medium":
      return "bg-orange-500";
    case "high":
      return "bg-red-500";
  }
};

export default function IssueTableRow({ issue, schema }: IssueListItemProps) {
  const params = useParams();
  const reviewId = params.reviewId!;

  const queryClient = useQueryClient();

  const [isChecked, setIsChecked] = useState(issue.solved);
  const cssClasses = "p-2";

  const { mutate } = useMutation({
    mutationFn: updateIssue,
    onError: (error) => {
      console.error(error.message);
      toast.error("Error al actualizar el problema.", {
        autoClose: 3000,
      });
    },
    onSuccess: (data) => {
      setIsChecked(!isChecked);
      toast.success(data, {
        autoClose: 3000,
      });
      queryClient.invalidateQueries({ queryKey: ["review", reviewId] });
    },
  });

  const renderAttributeField = (issue: Issue, field: CategoryFieldSchema) => {
    switch (issue.category) {
      case "HardcodedData":
        return (
          <td className={cssClasses} key={field.key}>
            {issue["attr"][field.key as keyof typeof issue.attr]}
          </td>
        );
      case "NamingConvention":
        return (
          <td className={cssClasses} key={field.key}>
            {issue["attr"][field.key as keyof typeof issue.attr]}
          </td>
        );
    }
  };

  const handleChange = () => {
    const data = {
      issueId: issue._id,
      reviewId,
    };
    mutate(data);
  };

  const renderStandardField = (issue: Issue, field: CategoryFieldSchema) => {
    switch (field.key) {
      case "solved":
        return (
          <td className={`${cssClasses} text-center`} key={field.key}>
            <label
              htmlFor={`chkBoxSolved-${issue._id}`}
              className="flex items-center justify-center cursor-pointer select-none"
            >
              <input
                type="checkbox"
                className="sr-only"
                onChange={handleChange}
                id={`chkBoxSolved-${issue._id}`}
                checked={isChecked}
              />
              <span
                className={`w-5 h-5 border-2 rounded-full cursor-pointer flex items-center justify-center
                  ${
                    isChecked
                      ? "bg-red-600 border-red-600"
                      : "bg-white border-gray-400"
                  }`}
              >
                {isChecked && (
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </span>
            </label>
          </td>
        );
      case "severity":
        return (
          <td className={`${cssClasses} text-center`} key={field.key}>
            <span
              title={issue.severity}
              className={`w-4 h-4 ${severityColorReference(
                issue.severity
              )} rounded-full block m-auto`}
            ></span>
          </td>
        );
      default:
        return (
          <td className={cssClasses} key={field.key}>
            {issue[field.key as keyof typeof issue]}
          </td>
        );
    }
  };

  return (
    <tr className="hover:bg-red-100">
      {schema.map((field) =>
        field.isAttr
          ? renderAttributeField(issue, field)
          : renderStandardField(issue, field)
      )}
    </tr>
  );
}
