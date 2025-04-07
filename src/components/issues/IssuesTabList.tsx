import { Issue } from "@/types/index";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import IssuesTable from "./IssuesTable";

type IssuesListProps = {
  issues: Issue[];
};



type GroupedIssues = {
  [key: string]: Issue[];
};

const initialCategoryGroups: GroupedIssues = {
  NamingConvention: [],
  PageWithoutDescription: [],
  HardcodedData: [],
};

export default function IssuesTabList({ issues }: IssuesListProps) {
  const groupedIssues = issues.reduce((acc, issue: Issue) => {
    let currentGroup = acc[issue.category] ? [...acc[issue.category]] : [];
    currentGroup = [...currentGroup, issue];
    return { ...acc, [issue.category]: currentGroup };
  }, initialCategoryGroups);

  return (
    <TabGroup>
      <TabList className="flex space-x-4">
        {Object.keys(groupedIssues).map((category) => (
          <Tab key={category} className="p-2 border-b-2 cursor-pointer hover:bg-gray-300 data-[selected]:bg-red-600 data-[selected]:text-white outline-0 transition-colors">
            {category}
          </Tab>
        ))}
      </TabList>

      <TabPanels>
        {Object.entries(groupedIssues).map(([category, issues]) => {
          return (
            <TabPanel key={category} className="py-5">
              {issues.length === 0 ? (
                <p>No se encontraron problemas</p>
              ) : (
                <IssuesTable category={category} issues={issues} />
              )}
            </TabPanel>
          );
        })}
      </TabPanels>
    </TabGroup>
  );
}
