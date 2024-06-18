import { Link } from "@remix-run/react";

type TabsType = {
  id: string;
  path: string;
  label: string;
  isActive: boolean;
};

type TabsPropsType = {
  tabs: Array<TabsType>;
};

const renderColorTabs = (isActive: boolean) =>
  isActive
    ? `border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500`
    : `border-transparent hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300`;

const TabsNavigation = ({ tabs = [] }: TabsPropsType) => (
  <div className="border-b border-gray-200 text-center text-sm font-medium text-gray-500 dark:border-gray-700 dark:text-gray-400">
    <nav>
      <ul className="-mb-px flex flex-wrap">
        {tabs.map((item) => (
          <li className="me-2" key={item.id}>
            <Link
              to={item.path}
              className={`inline-block rounded-t-lg border-b-2 p-4 ${renderColorTabs(item.isActive)}`}
              aria-current="page"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  </div>
);

export default TabsNavigation;
