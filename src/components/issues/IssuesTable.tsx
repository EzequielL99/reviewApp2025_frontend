import { Issue } from "@/types/index";
import IssueTableRow from "./IssueTableRow";

type IssuesTableProps = {
  category: string;
  issues: Issue[];
};

const categorySchemas = {
  NamingConvention: [
    { key: "solved", label: "Solucionado", isAttr: false },
    { key: "severity", label: "Severidad", isAttr: false },
    { key: "process", label: "Proceso", isAttr: false },
    { key: "page", label: "Pagina", isAttr: false },
    { key: "stageName", label: "Nombre de Etapa", isAttr: true },
    { key: "expectedNC", label: "Nomenclatura Esperada", isAttr: true },
  ],
  PageWithoutDescription: [
    { key: "solved", label: "Solucionado", isAttr: false },
    { key: "severity", label: "Severidad", isAttr: false },
    { key: "process", label: "Proceso", isAttr: false },
    { key: "page", label: "Pagina", isAttr: false },
  ],
  HardcodedData: [
    { key: "solved", label: "Solucionado", isAttr: false },
    { key: "severity", label: "Severidad", isAttr: false },
    { key: "process", label: "Proceso", isAttr: false },
    { key: "page", label: "Pagina", isAttr: false },
    { key: "stageName", label: "Nombre de Etapa", isAttr: true },
    { key: "expression", label: "Expresión", isAttr: true },
  ],
};

export default function IssuesTable({ category, issues }: IssuesTableProps) {
  const schema = categorySchemas[category as keyof typeof categorySchemas];

  return (
    <table>
      <thead>
        <tr>
          {schema.map((field) => (
            <th
              key={field.key}
              className="bg-gray-200 text-gray-500 text-left font-normal p-2"
            >
              {field.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {issues.map((issue) => (
          <IssueTableRow key={issue._id} issue={issue} schema={schema} />
        ))}
      </tbody>
    </table>
  );
}
