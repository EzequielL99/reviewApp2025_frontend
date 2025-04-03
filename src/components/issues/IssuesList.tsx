import { Issue } from "@/types/index"
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

type IssuesListProps = {
    issues: Issue[]
}

const categorySchemas = {
    NamingConvention: [
        { key: 'severity', label: 'Severidad', isAttr: false  },
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
                        <TabPanel key={category}>
                            <table>
                                <thead>
                                    <tr>
                                        {schema.map(field => (
                                            <th key={field.key}>
                                                {field.label}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        filteredIssues
                                            .map(issue => (
                                                <tr key={issue._id}>
                                                    {schema.map(field => (
                                                        <td key={field.key}>
                                                            {field.isAttr ? issue['attr']![field.key as keyof Issue['attr']] : issue[field.key as keyof Issue]}
                                                        </td>
                                                    ))}
                                                    <p key={issue._id}>{issue.process}</p>
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
