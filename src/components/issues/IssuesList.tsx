import { Issue } from "@/types/index"
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

type IssuesListProps = {
    issues: Issue[]
}

type CategoryFieldSchema =
    {
        key: string;
        label: string;
        isAttr: boolean;
    }


const categorySchemas = {
    NamingConvention: [
        { key: 'severity', label: 'Severidad', isAttr: false },
        { key: 'process', label: 'Proceso', isAttr: false },
        { key: 'page', label: 'Pagina', isAttr: false },
        { key: 'stageName', label: 'Nombre de Etapa', isAttr: true },
        { key: 'expectedNC', label: 'Nomenclatura Esperada', isAttr: true },
        { key: 'solved', label: 'Solucionado', isAttr: false }
    ],
    PageWithoutDescription: [
        { key: 'severity', label: 'Severidad', isAttr: false },
        { key: 'process', label: 'Proceso', isAttr: false },
        { key: 'page', label: 'Pagina', isAttr: false },
        { key: 'solved', label: 'Solucionado', isAttr: false }
    ],
    HardcodedData: [
        { key: 'severity', label: 'Severidad', isAttr: false },
        { key: 'process', label: 'Proceso', isAttr: false },
        { key: 'page', label: 'Pagina', isAttr: false },
        { key: 'stageName', label: 'Nombre de Etapa', isAttr: true },
        { key: 'expression', label: 'Expresión', isAttr: true },
        { key: 'solved', label: 'Solucionado', isAttr: false }
    ]
}

export default function IssuesList({ issues }: IssuesListProps) {
    const categories = [...new Set(issues.map(issue => issue.category))];

    const renderIssueData = (issue: Issue, field: CategoryFieldSchema) => {
        if (field.isAttr && issue.category === 'HardcodedData') {
            return <td className="px-2" key={field.key}>{issue['attr'][field.key as keyof typeof issue.attr]}</td>
        } else if (field.isAttr && issue.category === 'NamingConvention') {
            return <td className="px-2" key={field.key}>{issue['attr'][field.key as keyof typeof issue.attr]}</td>
        } else if (!field.isAttr) {
            return <td className="px-2" key={field.key}>{issue[field.key as keyof typeof issue]}</td>
        }
    }

    return (
        <TabGroup>
            <TabList className='flex space-x-4'>
                {categories.map(category => (
                    <Tab key={category} className='p-2 border-b-2'>
                        {category}
                    </Tab>
                ))}
            </TabList>

            <TabPanels>
                {categories.map(category => {
                    const schema = categorySchemas[category];
                    const filteredIssues = issues.filter(issue => issue.category === category);

                    return (
                        <TabPanel key={category} className='py-5'>
                            <table>
                                <thead>
                                    <tr>
                                        {schema.map(field => (
                                            <th key={field.key} className="bg-gray-300 text-gray-500 font-normal py-2">
                                                {field.label}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        filteredIssues
                                            .map(issue => (
                                                <tr key={issue._id} className="text-center">
                                                    {schema.map(field => renderIssueData(issue, field))}
                                                </tr>
                                            ))
                                    }
                                </tbody>
                            </table>
                        </TabPanel>
                    )
                })}
            </TabPanels>
        </TabGroup>
    )
}
