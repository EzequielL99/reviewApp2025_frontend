import { CategoryFieldSchema, CategorySchema, Issue } from "@/types/index";

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
  const cssClasses = "p-2";

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

  const renderStandardField = (issue: Issue, field: CategoryFieldSchema) => {
    switch (field.key) {
      case "solved":
        return (
          <td className={`${cssClasses} text-center`} key={field.key}>
            <input
              type="checkbox"
              className="cursor-pointer"
              id="chkBoxSolved"
              checked={issue.solved}
            />
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
    <tr id={issue._id} className="hover:bg-red-100">
      {schema.map((field) =>
        field.isAttr
          ? renderAttributeField(issue, field)
          : renderStandardField(issue, field)
      )}
    </tr>
  );
}
